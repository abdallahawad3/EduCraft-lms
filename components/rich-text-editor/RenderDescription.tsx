'use client';
import TextAlign from '@tiptap/extension-text-align';
import { generateHTML } from '@tiptap/html';
import type { JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';
import { useMemo } from 'react';
const RenderDescription = ({ description }: { description: JSONContent }) => {
  const outPut = useMemo(() => {
    return generateHTML(description, [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'list-item'],
        alignments: ['left', 'right', 'center'],
      }),
    ]);
  }, [description]);

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(outPut)}
    </div>
  );
};

export default RenderDescription;
