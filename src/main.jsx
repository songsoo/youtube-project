import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiCheckContextProvider } from './context/ApiCheckContextProvider';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ApiCheckContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </ApiCheckContextProvider>
    </StrictMode>,
);
