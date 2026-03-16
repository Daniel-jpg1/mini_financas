import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Accounts from "./pages/accounts/Accounts.jsx";
import Categories from "./pages/categories/Categories.jsx";
import Transactions from "./pages/transactions/Transactions.jsx";
import Installments from "./pages/installments/Installments.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/installments" element={<Installments />} />
    </Routes>
  );
}

export default App;
