import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./lib/auth";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Overview } from "./pages/Overview";
import { Inbox } from "./pages/Inbox";
import { Leads } from "./pages/Leads";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { Tickets } from "./pages/Tickets";
import { Appointments } from "./pages/Appointments";
import { Settings } from "./pages/Settings";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Layout />;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
