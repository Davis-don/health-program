import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Homepage from './pages/Homepage';

function App() {

  const queryClient = new QueryClient();
  return (
<div className="app">
<QueryClientProvider client={queryClient}>
<BrowserRouter>
<Routes>
<Route path="/" element={<Homepage />} />
<Route path="/dashboard" element={<Dashboard />} />
</Routes>
</BrowserRouter>
</QueryClientProvider>

</div>
  )
}

export default App
