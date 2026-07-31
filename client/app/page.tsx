"use client";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Sparkles, Upload, UploadCloud, FileText, X } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000")
      .then((response) => {
        if (response.status === 200) {
          setMessage("Server is up and running!");
          setOk(true);
        } else {
          setMessage("Server is not responding as expected.");
          setOk(false);
        }
      })
      .catch(() => {
        setMessage("Server is not responding.");
        setOk(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    noClick: true,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setSelectedFile(null);
        router.push("/ask");
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[170px]" />
        <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[170px]" />
        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 backdrop-blur-xl">
          <Sparkles className="h-4 w-4" />
          Local AI Assistant
        </div>

        <h1 className="text-center text-5xl font-black leading-tight md:text-6xl">
          Welcome to your
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">AI Workspace</span>
        </h1>

        <p className="mt-6 max-w-2xl text-center text-lg text-slate-400">Upload PDFs, search semantically, and chat with your documents using completely local AI models.</p>

        {/* Glass Card */}
        <div className="mt-14 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-[0_0_80px_rgba(59,130,246,.15)]">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_35px_rgba(59,130,246,.45)]">
                <Upload className="h-8 w-8 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Upload Documents</h2>

                <p className="text-slate-400">Drag & drop your PDFs or browse from your computer.</p>
              </div>
            </div>

            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`
                rounded-3xl
                border-2
                border-dashed
                p-14
                transition-all
                duration-300
                ${isDragActive ? "border-cyan-400 bg-cyan-400/10 scale-[1.02]" : "border-white/10 bg-white/5"}
              `}
            >
              <UploadCloud className="mx-auto mb-6 h-16 w-16 text-cyan-400" />

              <p className="text-xl font-semibold">Drag & Drop your PDF</p>

              <p className="mt-2 text-slate-400">or click below</p>

              <input {...getInputProps()} className="hidden" id="upload" />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={open}
                  className="mt-8 inline-flex cursor-pointer items-center rounded-xl border border-cyan-400/70 bg-cyan-500/40 px-6 py-3 font-medium text-cyan-100 backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.18)] hover:border-cyan-300/70 hover:bg-cyan-400/25 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] active:scale-95"
                >
                  Browse Files
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="mt-8 inline-flex items-center rounded-xl border border-emerald-400/70 bg-emerald-500/40 px-6 py-3 font-medium text-emerald-100 backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:border-emerald-300/70 hover:bg-emerald-400/25 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-95"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload File
                  </button>
                )}
              </div>

              {selectedFile && (
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/50">
                      <FileText className="h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{selectedFile.name}</p>

                      <p className="text-sm text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>

                  <button type="button" onClick={() => setSelectedFile(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
            {message ? (
              <div className={`text-2xl font-semibold ${ok ? "text-green-500" : "text-red-300"}`}>Server Status : {message}</div>
            ) : (
              <>
                <div className="mb-2 text-sm uppercase tracking-wider text-slate-500">Connecting...</div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                  <span className="text-slate-300">Waiting for backend...</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
