import { Container, Grid } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';
import Router from './router/Router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Container>
        <Grid container >
          <SideBar />
          <Router />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
