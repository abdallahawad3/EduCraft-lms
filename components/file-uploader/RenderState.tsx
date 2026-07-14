import { cn } from '@/lib/utils';
import { CloudUploadIcon, ImageIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { IUploaderState } from './Uploader';
interface IRenderStateProps {
  fileState: IUploaderState;
  isDragActive: boolean;
  handleDeleteFile: () => void;
}
export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            'size-6 text-muted-foreground',
            isDragActive && 'text-primary',
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drag your files here or{' '}
        <span className={'text-primary font-bold cursor-pointer'}>
          click to upload
        </span>
      </p>

      <Button className="mt-4">Select Files</Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex justify-center items-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className="text-destructive size-6" />
      </div>
      <p className="font-semibold text-md text-muted-foreground">
        Something went wrong. Please try again.
      </p>
      <Button className="mt-4">Retry File Selection</Button>
    </div>
  );
}

export function RenderUploadingContent({
  fileState,
  isDragActive,
  handleDeleteFile,
}: IRenderStateProps) {
  if (fileState.uploading && fileState.file) {
    return (
      <RenderUploadingState
        progress={fileState.progress}
        file={fileState.file}
      />
    );
  }

  if (fileState.error) {
    return <RenderErrorState />;
  }

  if (fileState.objectUrl) {
    return (
      <RenderUploadedContent
        previewUrl={fileState.objectUrl}
        handleDeleteFile={handleDeleteFile}
      />
    );
  }

  return <RenderEmptyState isDragActive={isDragActive} />;
}

function RenderUploadedContent({
  previewUrl,
  handleDeleteFile,
}: {
  previewUrl: string;
  handleDeleteFile: () => void;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={previewUrl}
        alt="Preview"
        fill
        className="object-contain p-2 relative"
      />

      <Button
        className={cn('absolute top-4 right-4 z-10')}
        size="icon"
        variant={'destructive'}
        onClick={handleDeleteFile}
      >
        <XIcon />
      </Button>
    </div>
  );
}

function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>
        Uploading {progress}% <span className="font-bold">{file.name}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>
      <p className="text-xs text-muted-foreground truncate mt-1 max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
