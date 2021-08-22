import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useSocket } from 'socket.io-hook';
import DialogContentList from '../../../components/DialogContentList';
import { Auth } from '../../../services/api';
import AwaitingButton from '../../../components/AwaitingButton';

const initialState = {
  mail: '',
  password: '',
};

export default function Login(props) {
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const socket = useSocket();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    return Auth.login(form)
      .then((response) => {
        if (response.status === 200) {
          setMessage('logado com sucesso');
          socket.disconnect();
          // eslint-disable-next-line react/prop-types
          props.history.push('/');
        } else if (response.status === 403) {
          setMessage('Falha na conexão');
        } else {
          setMessage('Não autorizado');
        }
      })
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  return (
    <DialogContentList component="form" onSubmit={handleLogin}>
      <ListSubheader>Faça login com suas credenciais de acesso</ListSubheader>
      <ListItem>
        <TextField
          fullWidth
          required
          size="small"
          value={form.mail}
          onChange={(e) => setForm({ ...form, mail: e.target.value })}
          variant="outlined"
          helperText="Email de acesso"
          type="mail"
          label="email"
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          required
          size="small"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          variant="outlined"
          helperText="informe sua senha segura"
          type="password"
          label="password"
        />
      </ListItem>
      <div style={{ margin: 16 }}>
        <AwaitingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {message || 'Entre'}
        </AwaitingButton>
      </div>
    </DialogContentList>
  );
}
