import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import DialogContentList from '../../../components/DialogContentList';
import { Auth } from '../../../services/api';
import AwaitingButton from '../../../components/AwaitingButton';
import string from '../../../services/helpers/string';

const initialState = {
  mail: '',
  password: '',
  name: '',
  company: '',
};

export default function Register() {
  const [form, setForm] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    return Auth.register(form)
      .then((response) => {
        if (response.status === 201) {
          setForm(initialState);
          setMessage('criado com sucesso!');
        } else {
          setMessage('Falha ao cadastrar!');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <DialogContentList component="form" onSubmit={handleRegister}>
      <ListSubheader>Vamos cadastrar alguns dados ...</ListSubheader>
      <ListItem>
        <TextField
          fullWidth
          required
          size="small"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: string.Capitalize(e.target.value) })}
          variant="outlined"
          helperText="Nome completo"
          type="text"
          label="Nome"
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          required
          size="small"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: string.Capitalize(e.target.value) })}
          variant="outlined"
          helperText="informe a empresa alvo deste app"
          label="Empresa"
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          required
          size="small"
          value={form.mail}
          onChange={(e) => setForm({ ...form, mail: e.target.value })}
          variant="outlined"
          helperText="Cadastre o email de acesso"
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
          error={Boolean(form.password && !string.testPassword(form.password))}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          variant="outlined"
          helperText={form.password && !string.testPassword(form.password)
            ? 'Senha deve conter caracteres especiais' : 'informe sua senha segura'}
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

          {message || 'Cadastrar'}
        </AwaitingButton>
      </div>
    </DialogContentList>
  );
}
