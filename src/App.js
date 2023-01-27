import './App.css';
import Home from './components/Home/Home';
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Home />
    </div>
  );
}

export default App;
