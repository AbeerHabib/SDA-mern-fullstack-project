import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { store } from './redux/store';
import BackToTopBtn from './components/layout/BackToTopBtn';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
    <BackToTopBtn />
  </Provider>
)
