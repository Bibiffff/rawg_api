import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout";

// Providers
import { GamesProvider } from "./providers/GamesProvider";
import { UserProvider } from "./providers/UserProvider";

// Pages
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import GameDetails from "./components/gameDetails/GameDetails";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Developer from "./components/developer/Developer";
import { DevelopersProvider } from "./providers/DevelopersProvider";
import DeveloperDetails from "./components/developerDetails/DeveloperDetails";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <GamesProvider>
          <DevelopersProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games/details/:gameId" element={<GameDetails />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/developers/details/:developerId" element={<DeveloperDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
          </DevelopersProvider>
        </GamesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
