import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const PsychPage = lazy(() => import("../../pages/PsychPage/PsychPage.jsx"));
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NorFoundPage/NotFoundPage.jsx")
);

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/psychologists" element={<PsychPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
