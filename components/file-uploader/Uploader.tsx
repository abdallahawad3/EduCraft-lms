'use client';

export interface IUploaderState {
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
import { RenderUploadingContent } from './RenderState';

interface IUploaderProps {
  onChange?: (value: string) => void;
  value?: string;
  imageUrl?: string;
  type?: 'image' | 'video';

  videoUrl?: string;
}

const Uploader = ({
  onChange,
  value,
  imageUrl,
  videoUrl,
  type,
}: IUploaderProps) => {
  const [fileState, setFileState] = useState<IUploaderState>({
    error: false,
    file: null,
    id: null,
    fileType: type || 'image',
    isDeleting: false,
    progress: 0,
    uploading: false,
    key: value,
    objectUrl: imageUrl || videoUrl || undefined,
  });

  async function UploadFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));
    try {
      // 1- Get presigned url
      const presignedUrlResponse = await fetch('/api/s3/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: file.type.startsWith('image') ? true : false,
        }),
      });

      if (!presignedUrlResponse) {
        toast.error('Failed to get presigned Url');
        setFileState((prev) => ({
          ...prev,
          error: true,
        }));

        return;
      }

      const { key, presignedUrl } = await presignedUrlResponse.json();

      // 2- Track the uploading files
      await new Promise<void>((resolve, reject) => {
        //1- Create a new XMLHttpRequest to upload the file to S3 using the presigned URL
        const xhr = new XMLHttpRequest();
        //2- Track the progress of the upload and update the state accordingly
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };
        // 3- Handle the response from the S3 upload and update the state accordingly
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key,
            }));
            onChange?.(key);
            toast.success('File uploaded successfully');
            resolve();
          } else {
            console.log('Tigris response:', xhr.responseText);
            reject(new Error(xhr.responseText));
          }
        };
        // 4- Handle any errors that occur during the upload and update the state accordingly
        xhr.onerror = () => {
          reject(new Error('Uploaded Failed'));
        };
        // 5- Send the file to S3 using the presigned URL
        xhr.open('PUT', presignedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error('Failed to upload file');
      console.log(error);

      setFileState((prev) => ({
        ...prev,
        error: true,
        uploading: false,
      }));
    }
  }

  async function handleDeleteFile() {
    if (!fileState.objectUrl || fileState.isDeleting) return;
    try {
      setFileState((prev) => ({ ...prev, isDeleting: true }));
      const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error('Failed to delete file');
        setFileState((prev) => ({ ...prev, isDeleting: false }));
        throw new Error('Failed to delete file');
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      setFileState({
        error: false,
        file: null,
        id: null,
        fileType: 'image',
        isDeleting: false,
        progress: 0,
        uploading: false,
      });
      onChange?.('');
      toast.success('File deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete file');
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          fileType: type || 'image',
          isDeleting: false,
        });
        UploadFile(file);
      }
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024, // 5MB for images, 100MB for videos
    disabled: fileState.uploading || fileState.isDeleting,
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
        <RenderUploadingContent
          type={type || 'image'}
          handleDeleteFile={handleDeleteFile}
          fileState={fileState}
          isDragActive={isDragActive}
        />
      </CardContent>
    </Card>
  );
};

export default Uploader;
