import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import { FC } from "react";
import { AlignLeft, List, ListOrdered } from "lucide-react";

// Define the props type
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded p-2 mt-2">
      {/* Toolbar */}
      <div className="flex gap-2 border-b pb-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive("bold") ? "text-blue-500" : ""
          }`}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive("italic") ? "text-blue-500" : ""
          }`}
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive("underline") ? "text-blue-500" : ""
          }`}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive("strike") ? "text-blue-500" : ""
          }`}
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
          }`}
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 text-2xl font-extrabold ${
            editor.isActive("bulletList") ? "text-blue-500" : ""
          }`}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 text-5xl font-extrabold ${
            editor.isActive("orderedList") ? "text-blue-500" : ""
          }`}
        >
          <ListOrdered />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[150px]" />
    </div>
  );
};

export default RichTextEditor;
