import DocumentPage from "./DocumentPage";

export default function DocumentViewer() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <DocumentPage page={1} />

        <DocumentPage page={2} />

        <DocumentPage page={3} />
      </div>
    </div>
  );
}