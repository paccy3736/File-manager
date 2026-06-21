import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ImagesPage    from "./pages/ImagesPage";
import VideosPage    from "./pages/VideosPage";
import DocumentsPage from "./pages/DocumentsPage";
import AllFilesPage  from "./pages/AllFilesPage";
import TrashPage     from "./pages/TrashPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/file-manager/images" replace />} />
        <Route path="/file-manager" element={<AppLayout />}>
          <Route index element={<Navigate to="/file-manager/images" replace />} />
          <Route path="dashboard"  element={<DashboardPage />} />
          <Route path="images"     element={<ImagesPage />} />
          <Route path="videos"     element={<VideosPage />} />
          <Route path="documents"  element={<DocumentsPage />} />
          <Route path="all-files"  element={<AllFilesPage />} />
          <Route path="trash"      element={<TrashPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
