'use client';

import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import MenuBar from './MenuBar';

interface RichTextEditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'right', 'center'],
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] min-w-full pr-5 prose prose-sm sm:prose lg:prose-lg xl:prose-md m-5 dark:prose-invert focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
  });

  useEffect(() => {
    if (!editor || content === undefined) return;

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Listen for editor updates
  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      onChange?.(editor.getHTML());
    };

    editor.on('update', updateHandler);

    return () => {
      editor.off('update', updateHandler);
    };
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className="w-full rounded-md border bg-background text-foreground shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="w-full p-2" />
    </div>
  );
}
