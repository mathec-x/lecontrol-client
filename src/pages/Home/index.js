/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BuildIcon from '@material-ui/icons/Build';
import StorefrontIcon from '@material-ui/icons/Storefront';
import StyledCard from '../../components/StyledCard';
import FlexBox from '../../components/FlexBox';
import StyledAvatar from '../../components/StyledAvatar';
import StyledListItem from '../../components/StyledListItem';

/**
 * @type {React.FC<import('react-router-dom').RouteComponentProps}
 */
const Home = (props) => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const list = React.useMemo(() => products
    .sort((a, b) => a.label.localeCompare(b.label)), [products]);
  return (
    <Grid container spacing={2} direction="row" alignContent="space-between" alignItems="center" style={{ height: '100%' }}>
      <Grid
        item
        xs={12}
        md={8}
        style={{ padding: 48 }}
      >
        <Box>
          <Typography>
            Olá
            {' '}
            {user.name}
            , Seja bem vindo
          </Typography>
        </Box>
        <FlexBox minHeight="65vh">
          <StyledCard onClick={() => props.history.push('/register', { background: props.location })}>
            <FlexBox direction="column">
              <StyledAvatar color="primary" size="large" spacing={2}>
                <StorefrontIcon fontSize="large" />
              </StyledAvatar>
              <Typography variant="subtitle2">Cadastrar Produto</Typography>
            </FlexBox>
          </StyledCard>
          <StyledCard onClick={() => console.log('Não implementado')}>
            <FlexBox direction="column">
              <StyledAvatar color="primary" size="large" spacing={2}>
                <SupervisedUserCircleIcon fontSize="large" />
              </StyledAvatar>
              <Typography variant="subtitle2">Minha Conta</Typography>
            </FlexBox>
          </StyledCard>
        </FlexBox>
        <Hidden smDown>
          <Button disabled variant="contained" color="primary" startIcon={<BuildIcon />}>
            Configurações
          </Button>
        </Hidden>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className="main"
      >
        <div className="asset-bg" />
        <List
          dense
          subheader={(
            <ListSubheader>
              Sua lojinha tem
              {' '}
              {products.length}
              {' '}
              produtos
            </ListSubheader>
)}
        >
          {list.map((product) => (
            <StyledListItem
              key={`bar-list-${product.label}`}
              disabled={product.delete}
              divider
              button
              primary={product.label}
              secondary={`${product.delete ? 'Excluíndo ' : ''}produto`}
              onClick={() => props.history.push(`/register/${product.uuid}`, { background: props.location })}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
export default Home;
