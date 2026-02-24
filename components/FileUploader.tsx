import React, { useRef, useState } from 'react';
import { Upload, X, AlertTriangle } from 'lucide-react';
import { processFile } from '../utils/fileHelpers';
import { UploadedFile } from '../types';

const MAX_FILE_SIZE_MB = 10;

interface FileUploaderProps {
  label: string;
  subLabel?: string;
  file: UploadedFile | undefined;
  onFileChange: (file: UploadedFile | undefined) => void;
  accept?: string;
  className?: string;
  required?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  subLabel,
  file,
  onFileChange,
  accept = "image/*",
  className = "",
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndProcess = async (selectedFile: File) => {
    setError(null);

    // File size validation
    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    // File type validation
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    try {
      const processed = await processFile(selectedFile);
      onFileChange(processed);
    } catch (err) {
      console.error("Error processing file", err);
      setError("Failed to process image. Try another file.");
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      await validateAndProcess(selectedFile);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    onFileChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      await validateAndProcess(droppedFile);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-indigo-400 text-[10px]">Required</span>}
      </label>

      <div
        className={`
          relative group cursor-pointer 
          border-2 border-dashed rounded-xl 
          transition-all duration-300 ease-in-out
          ${isDragging
            ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
            : file
              ? 'border-indigo-500/30 bg-white/[0.02]'
              : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/[0.02]'
          }
          h-40 flex flex-col items-center justify-center
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          className="hidden"
        />

        {file ? (
          <div className="relative w-full h-full p-2 animate-scale-in">
            <img
              src={file.previewUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={handleClear}
              className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-all duration-200 backdrop-blur-sm border border-white/10"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/50 px-2.5 py-1 rounded-md text-[10px] text-white truncate backdrop-blur-sm border border-white/5">
              {file.file.name}
              <span className="text-gray-400 ml-1.5">
                ({(file.file.size / 1024).toFixed(0)}KB)
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5 transition-all duration-300
              ${isDragging
                ? 'bg-indigo-500/20 text-indigo-300 scale-110'
                : 'bg-white/5 text-gray-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10'
              }
            `}>
              <Upload size={20} />
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {isDragging ? 'Drop to upload' : 'Click or drag to upload'}
            </p>
            {subLabel && <p className="text-[10px] text-gray-600 mt-0.5">{subLabel}</p>}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-red-400 animate-fade-in">
          <AlertTriangle size={12} />
          {error}
        </div>
      )}
    </div>
  );
};