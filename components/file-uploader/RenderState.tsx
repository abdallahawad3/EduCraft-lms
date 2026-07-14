import { cn } from '@/lib/utils';
import { CloudUploadIcon, ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';

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
