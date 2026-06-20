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
          <Route index element={<Navigate to="/images" replace />} />
          <Route path="images"    element={<ImagesPage />} />
          <Route path="videos"    element={<VideosPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="all-files" element={<AllFilesPage />} />
          <Route path="trash"     element={<TrashPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
