"use client";

import React, { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ThemeName = "forest" | "midnight";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("forest");


  const themes = {
    forest: {
      bg: "bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900",
      card: "bg-slate-800/50 backdrop-blur-xl border-emerald-500/20",
      button:
        "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700",
      text: "text-slate-100",
      subtext: "text-slate-400",
      icon: Moon,
    },
    midnight: {
      bg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      card: "bg-slate-800/50 backdrop-blur-xl border-purple-500/20",
      button:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      text: "text-slate-100",
      subtext: "text-slate-400",
      icon: Sun,
    },
  };

  const theme = themes[currentTheme];

  const toggleTheme = () =>
    setCurrentTheme((t) => (t === "forest" ? "midnight" : "forest"));

  const validateFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Only PDF files are allowed");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setMessage("PDF must be smaller than 10MB");
      return false;
    }
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const dropped = e.dataTransfer.files[0];
    if (dropped && validateFile(dropped)) {
      setFile(dropped);
      setStatus("idle");
      setMessage("");
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setMessage("Uploading and indexing document...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setStatus("success");
      setMessage("Document uploaded and indexed successfully");
      setFile(null);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} relative flex items-center justify-center p-6 pt-20`}
    >
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h2 className={`font-bold text-xl ${theme.text}`}>Document Uploader</h2>

        <div className="flex items-center gap-2">
          {/* Go to Chat */}
          <button
            onClick={() => router.push("/chatbot")}
            className={cn(
              "p-3 rounded-xl border transition-all hover:scale-105",
              theme.card,
              theme.text,
            )}
            title="Go to Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-3 rounded-xl text-white transition-all hover:scale-105",
              theme.button,
            )}
            title="Toggle theme"
          >
            <theme.icon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "w-full max-w-xl rounded-2xl border p-8 shadow-2xl",
          theme.card,
        )}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`mx-auto mb-4 w-fit p-4 rounded-xl ${theme.button}`}>
            <Upload className="w-7 h-7 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${theme.text}`}>
            Upload PDF Document
          </h1>
          <p className={`mt-2 text-sm ${theme.subtext}`}>
            Upload documents to power your RAG assistant
          </p>
        </div>

        {/* Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all cursor-pointer",
            dragActive
              ? "border-emerald-400 bg-emerald-500/10"
              : "border-emerald-500/30 hover:border-emerald-400",
            status === "error" && "border-red-500/40 bg-red-500/10",
          )}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (!selected) return;

              if (validateFile(selected)) {
                setFile(selected);
                setStatus("idle");
                setMessage("");
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={status === "uploading"}
          />

          {!file ? (
            <>
              <FileText className="w-10 h-10 text-emerald-400 mb-4" />
              <p className={`font-medium ${theme.text}`}>
                Drag & drop a PDF here
              </p>
              <p className={`text-sm ${theme.subtext}`}>
                or click to browse (max 10MB)
              </p>
            </>
          ) : (
            <>
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <p className={`font-medium ${theme.text}`}>{file.name}</p>
              <p className={`text-sm ${theme.subtext}`}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}
        </div>

        {/* Status */}
        {message && (
          <div className="mt-6 flex items-center gap-3 text-sm">
            {status === "uploading" && (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            )}
            {status === "success" && (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            )}
            {status === "error" && (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={theme.subtext}>{message}</span>
          </div>
        )}

        {/* Action */}
        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className={cn(
            "mt-8 w-full py-3 rounded-xl text-white font-medium transition-all",
            theme.button,
            (!file || status === "uploading") &&
              "opacity-50 cursor-not-allowed",
          )}
        >
          {status === "uploading" ? "Uploading..." : "Upload & Index PDF"}
        </button>
      </div>
    </div>
  );
}
