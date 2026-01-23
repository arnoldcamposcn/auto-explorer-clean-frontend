import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './presentation/routes/AppRoutes';
// import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      {/* <AppRoutes /> */}
      <AppRoutes/>
    </>
  );
}

export default App;