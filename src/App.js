import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Router';

function App() {
  return (
    <div className='bg-[#faf7f5] min-h-screen'>
      <RouterProvider router={router}/>
      <Toaster/>
    </div>
  );
}

export default App;
