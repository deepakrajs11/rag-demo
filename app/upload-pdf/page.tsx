'use client'

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface PDFUploadProps {
  onUpload?: (file: File) => Promise<void>;
  apiEndpoint?: string;
}

const PDFUpload = ({
  onUpload,
  apiEndpoint = "/api/upload-pdf",
}: PDFUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file");
      setStatus("error");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage("File size must be less than 10MB");
      setStatus("error");
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setStatus("idle");
      setMessage("");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setStatus("idle");
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setMessage("Uploading and processing PDF...");

    try {
      if (onUpload) {
        await onUpload(file);
      } else {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }
      }

      setStatus("success");
      setMessage("PDF uploaded and indexed successfully!");
      setFile(null);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Upload failed");
    }
  };

  const resetUpload = () => {
    setFile(null);
    setStatus("idle");
    setMessage("");
  };

  return (
    <Card className="w-full max-w-xl border-border bg-card shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Upload PDF Document
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Drag and drop your PDF file or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex min-h-50 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all duration-200",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            status === "error" && "border-destructive/50 bg-destructive/5",
          )}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            disabled={status === "uploading"}
          />

          {!file ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className={cn(
                  "rounded-full p-4 transition-colors",
                  dragActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {dragActive ? "Drop your PDF here" : "Choose a PDF file"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or drag and drop it here
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {file.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg p-4",
              status === "success" && "bg-primary/10 text-primary",
              status === "error" && "bg-destructive/10 text-destructive",
              status === "uploading" && "bg-muted text-muted-foreground",
            )}
          >
            {status === "uploading" && (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
            {status === "success" && <CheckCircle className="h-5 w-5" />}
            {status === "error" && <AlertCircle className="h-5 w-5" />}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {file && status !== "uploading" && (
            <Button variant="outline" onClick={resetUpload} className="flex-1">
              Clear
            </Button>
          )}
          <Button
            onClick={handleUpload}
            disabled={!file || status === "uploading"}
            className={cn("flex-1", !file && "w-full")}
          >
            {status === "uploading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFUpload;
