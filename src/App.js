import { Fragment } from 'react';
import Root from './routes/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <Root />
      <ToastContainer autoClose={3000}/>
    </Fragment>
  );
}

export default App;
