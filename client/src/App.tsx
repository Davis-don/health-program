import './App.css'
import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from "react-query";
import Homepage from './pages/Homepage';

function App() {

  const queryClient = new QueryClient();
  return (
<div className="app">
<QueryClientProvider client={queryClient}>
  <Homepage/>
{/* <Dashboard/> */}
</QueryClientProvider>

</div>
  )
}

export default App
