// src/components/QuillEditor.jsx
import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = forwardRef(({ value, onChange }, ref) => {
  return (
    <div suppressHydrationWarning>
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Write your blog content here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      />
    </div>
  );
});

export default QuillEditor;