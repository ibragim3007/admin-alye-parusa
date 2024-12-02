import { QueryClientProvider } from '@tanstack/react-query';
import AppRoter from './router/AppRouter';
import { queryClient } from '@/shared/api/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
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
  );
}

export default App;
