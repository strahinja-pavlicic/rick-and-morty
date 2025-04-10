import { Routes, Route } from "react-router";

import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Characters } from "@/pages/characters/Characters";
import { CharacterDetail } from "@/pages/characters/CharacterDetail";
import { EpisodeDetail } from "@/pages/EpisodeDetail";
import { LocationDetail } from "@/pages/LocationDetail";

import { PrivateRoute } from "@/components/PrivateRoute";
import { Layout } from "@/components/Layout";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
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
        path="/character/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CharacterDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/episode/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EpisodeDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/location/:id"
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
