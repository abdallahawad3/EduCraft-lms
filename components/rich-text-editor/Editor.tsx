'use client';

import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';

interface RichTextEditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'right', 'center'],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] min-w-full pr-5 prose prose-sm sm:prose lg:prose-lg xl:prose-md m-5 dark:prose-invert focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
  });

  if (!editor) {
    return null;
  }
  if (content !== undefined) {
    editor.commands.setContent(content);
  }

  editor.on('update', () => {
    const html = editor.getHTML();
    onChange?.(html);
  });

  return (
    <div className="w-full rounded-md border bg-background text-foreground shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-2 w-full" />
    </div>
  );
};

export default RichTextEditor;
