import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./components/auth-guard";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";

const App: React.FC = () => {
  return (
    <AuthGuard>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthGuard>
  );
};

export default App;
