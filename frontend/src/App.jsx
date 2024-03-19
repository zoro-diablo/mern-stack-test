import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Specific from './pages/Specific';
import EditForm from './components/EditForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className='App'>
          <BrowserRouter>
            <Navbar />
            <div className='pages'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:id' element={<Specific />} />
                <Route path='/edit/:id' element={<EditForm />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};
export default App;
