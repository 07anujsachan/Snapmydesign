import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";
import { FC, useEffect } from "react";

interface RichTextEditorProps {
  value: string[];
  onChange: (content: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ value, onChange }) => {
  const initialContent = Array.isArray(value)
    ? value.join("<br>")
    : value || "";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Strike,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded p-2 mt-2">
      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 font-bold text-xl ${
            editor.isActive("bold") ? "text-blue-500" : ""
          }`}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 italic font-bold text-xl ${
            editor.isActive("italic") ? "text-blue-500" : ""
          }`}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 underline font-bold text-xl ${
            editor.isActive("underline") ? "text-blue-500" : ""
          }`}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 line-through font-bold text-xl ${
            editor.isActive("strike") ? "text-blue-500" : ""
          }`}
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 ${
            editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
          }`}
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 ${
            editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
          }`}
        >
          <AlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 ${
            editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
          }`}
        >
          <AlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 ${
            editor.isActive("bulletList") ? "text-blue-500" : ""
          }`}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 ${
            editor.isActive("orderedList") ? "text-blue-500" : ""
          }`}
        >
          <ListOrdered />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
