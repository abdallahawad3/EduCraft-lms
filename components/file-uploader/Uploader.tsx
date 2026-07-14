'use client';

interface IUploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: 'image' | 'video';
}

import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { RenderEmptyState } from './RenderState';

const Uploader = () => {
  // This state to track all you need to track file
  const [fileState, setFileState] = useState<IUploaderState>({
    error: false,
    file: null,
    id: null,
    fileType: 'image',
    isDeleting: false,
    progress: 0,
    uploading: false,
  });

  function UplaodFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));

    //TODO Needed to upload image or file into S3 provider
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        setFileState({
          file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          fileType: 'image',
          isDeleting: false,
        });
      }
    },
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: handleFileRejection,
  });

  // Handle all rejections types
  function handleFileRejection(fileRejections: FileRejection[]) {
    if (fileRejections.length > 0) {
      const fileInvalidType = fileRejections.find(
        (rejections) => rejections.errors[0].code === 'file-invalid-type',
      );

      if (fileInvalidType) {
        toast.error('Only image are allowed', {
          position: 'top-right',
        });
      }
      const fileTooLargeError = fileRejections.find(
        (rejections) => rejections.errors[0].code === 'file-too-large',
      );

      if (fileTooLargeError) {
        toast.error('File you uploaded is too large', {
          position: 'top-right',
        });
      }

      const tooManyFilesError = fileRejections.find(
        (rejection) => rejection.errors[0].code === 'too-many-files',
      );

      if (tooManyFilesError) {
        toast.error('You can only upload one file at a time.', {
          position: 'top-right',
        });
        return;
      }
    }
  }

  return (
    <Card
      className={cn(
        'relative border-2 border-dashed transition-colors duration-200 w-full ease-in-out h-64',
        isDragActive
          ? 'border-primary bg-primary/10 border-solid'
          : 'border-border hover:border-primary',
      )}
      {...getRootProps()}
    >
      <CardContent className="flex items-center justify-center w-full h-full">
        <input {...getInputProps()} />
        <RenderEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};

export default Uploader;
