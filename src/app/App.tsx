import { QueryClientProvider } from '@tanstack/react-query';
import AppRoter from './router/AppRouter';
import { queryClient } from '@/shared/api/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theme from '@/shared/theme/theme';
function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <AppRoter />
        <ToastContainer
          position="top-left"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
