import DocumentHeader from "./DocumentHeader";
import DocumentSearch from "./DocumentSearch";
import DocumentViewer from "./DocumentViewer";

export default function DocumentPanel() {
  return (
    <div className="flex h-full flex-col">
      <DocumentHeader />
      <DocumentSearch />
      <DocumentViewer />
    </div>
  );
}