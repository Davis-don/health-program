import './App.css'
import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from "react-query";

function App() {

  const queryClient = new QueryClient();
  return (
<div className="app">
<QueryClientProvider client={queryClient}>
<Dashboard/>
</QueryClientProvider>

</div>
  )
}

export default App
