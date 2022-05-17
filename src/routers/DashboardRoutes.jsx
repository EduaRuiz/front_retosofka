import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import Game from "../components/pages/user/Game";
import WelcomePage from "../components/pages/user/WelcomePage";

export const DashboardRoutes = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<WelcomePage/>} key="Welcome" />
          <Route path="/Game" element={<Game/>} key="Game" />
        </Route>
      </Routes>
    </>
  );
};
