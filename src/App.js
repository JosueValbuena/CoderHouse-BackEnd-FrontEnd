import './App.css';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Router />
    </div>
  );
}

export default App;
