import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ImagesPage    from "./pages/ImagesPage";
import VideosPage    from "./pages/VideosPage";
import DocumentsPage from "./pages/DocumentsPage";
import AllFilesPage  from "./pages/AllFilesPage";
import TrashPage     from "./pages/TrashPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/file-manager/all-files" replace />} />
          <Route path="file-manager/images"    element={<ImagesPage />} />
          <Route path="file-manager/videos"    element={<VideosPage />} />
          <Route path="file-manager/documents" element={<DocumentsPage />} />
          <Route path="file-manager/all-files" element={<AllFilesPage />} />
          <Route path="file-manager/trash"     element={<TrashPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
