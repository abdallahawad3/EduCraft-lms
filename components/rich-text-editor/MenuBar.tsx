/* eslint-disable react-hooks/rules-of-hooks */
import { useEditorState, type Editor } from "@tiptap/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Code2Icon,
  Heading1,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  Italic,
  ListIcon,
  ListOrderedIcon,
  ShieldMinus,
  Strikethrough,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface IMenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: IMenuBarProps) => {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
      isHeading1: editor.isActive("heading", { level: 1 }),
      isHeading2: editor.isActive("heading", { level: 2 }),
      isHeading3: editor.isActive("heading", { level: 3 }),
      isHeading4: editor.isActive("heading", { level: 4 }),
      isHeading5: editor.isActive("heading", { level: 5 }),
      isHeading6: editor.isActive("heading", { level: 6 }),
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isBlockquote: editor.isActive("blockquote"),
      isCodeBlock: editor.isActive("codeBlock"),
      isHorizontalRule: editor.isActive("horizontalRule"),
      isTextAlignLeft: editor.isActive({ textAlign: "left" }),
      isTextAlignCenter: editor.isActive({ textAlign: "center" }),
      isTextAlignRight: editor.isActive({ textAlign: "right" }),
    }),
  });

  return (
    <div>
      <TooltipProvider>
        <div className="flex items-center gap-1 bg-muted py-2 px-1">
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isBold}
                  onPressedChange={() => editor.chain().focus().toggleBold().run()}
                  className={cn(editorState.isBold && "bg-primary text-primary-foreground")}
                >
                  <Bold size={16} />
                  <TooltipContent>Bold</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isStrike}
                  onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                  className={cn(editorState.isStrike && "bg-primary text-primary-foreground")}
                >
                  <Strikethrough size={16} />
                  <TooltipContent>Strike</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isItalic}
                  onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                  className={cn(editorState.isItalic && "bg-primary text-primary-foreground")}
                >
                  <Italic size={16} />
                  <TooltipContent>Italic</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          {/* Headings */}
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading1}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={cn(editorState.isHeading1 && "bg-primary text-primary-foreground")}
                >
                  <Heading1 size={16} />
                  <TooltipContent>Heading 1</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading2}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={cn(editorState.isHeading2 && "bg-primary text-primary-foreground")}
                >
                  <Heading2Icon size={16} />
                  <TooltipContent>Heading 2</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading3}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={cn(editorState.isHeading3 && "bg-primary text-primary-foreground")}
                >
                  <Heading3Icon size={16} />
                  <TooltipContent>Heading 3</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading4}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  className={cn(editorState.isHeading4 && "bg-primary text-primary-foreground")}
                >
                  <Heading4Icon size={16} />
                  <TooltipContent>Heading 4</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading5}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                  className={cn(editorState.isHeading5 && "bg-primary text-primary-foreground")}
                >
                  <Heading5Icon size={16} />
                  <TooltipContent>Heading 5</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isHeading6}
                  onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                  className={cn(editorState.isHeading6 && "bg-primary text-primary-foreground")}
                >
                  <Heading6Icon size={16} />
                  <TooltipContent>Heading 6</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>

          {/* Bullet List */}

          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isBulletList}
                  onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                  className={cn(editorState.isBulletList && "bg-primary text-primary-foreground")}
                >
                  <ListIcon size={16} />
                  <TooltipContent>Bullet List</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          {/* Ordered List */}
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isOrderedList}
                  onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                  className={cn(editorState.isOrderedList && "bg-primary text-primary-foreground")}
                >
                  <ListOrderedIcon size={16} />
                  <TooltipContent>Ordered List</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isBlockquote}
                  onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                  className={cn(editorState.isBlockquote && "bg-primary text-primary-foreground")}
                >
                  <ShieldMinus size={16} />
                  <TooltipContent>Blockquote</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isCodeBlock}
                  onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={cn(editorState.isCodeBlock && "bg-primary text-primary-foreground")}
                >
                  <Code2Icon size={16} />
                  <TooltipContent>Code Block</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>

          <Separator orientation="vertical" className="mx-2 w-.7!" />
          {/* Text Alignment */}
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isTextAlignLeft}
                  onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                  className={cn(
                    editorState.isTextAlignLeft && "bg-primary text-primary-foreground",
                  )}
                >
                  <AlignLeftIcon size={16} />
                  <TooltipContent>Align Left</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isTextAlignCenter}
                  onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                  className={cn(
                    editorState.isTextAlignCenter && "bg-primary text-primary-foreground",
                  )}
                >
                  <AlignCenterIcon size={16} />
                  <TooltipContent>Align Center</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className={"border"}
              render={
                <Toggle
                  size={"sm"}
                  pressed={editorState.isTextAlignRight}
                  onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                  className={cn(
                    editorState.isTextAlignRight && "bg-primary text-primary-foreground",
                  )}
                >
                  <AlignRightIcon size={16} />
                  <TooltipContent>Align Right</TooltipContent>
                </Toggle>
              }
            />
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MenuBar;
