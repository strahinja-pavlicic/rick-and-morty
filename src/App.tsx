import { Routes, Route } from "react-router";

import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Characters } from "./pages/Characters";
import { CharacterDetail } from "./pages/CharacterDetail";
import { EpisodeDetail } from "./pages/EpisodeDetail";
import { LocationDetail } from "./pages/LocationDetail";

import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <div>Home Page</div>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/characters"
        element={
          <PrivateRoute>
            <Layout>
              <Characters />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CharacterDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/episodes/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EpisodeDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/locations/:id"
        element={
          <PrivateRoute>
            <Layout>
              <LocationDetail />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
