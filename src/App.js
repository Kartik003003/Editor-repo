import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { saveAs } from 'file-saver';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(contentStateJSON));
  }, [editorState]);

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onInlineStyleClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onBlockTypeClick = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  
  const onSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'editor-content.txt');
  };
  
  const styles = {
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      backgroundColor: '#1ABC9C ',
    },
    editorContainer: {
      width: '70%',
      height:'70%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    editorToolbar: {
      marginBottom: '10px',
    },
    editor: {
      border: '1px solid #C70039',
      padding: '10px',
      borderRadius: '4px',
      minHeight: 'auto',
    },
    button: {
      marginRight: '10px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: '1px solid #007BFF',
      borderRadius: '4px',
      background: '#007BFF',
      color: '#fff',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    inlineStyleButton: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '5px',
      margin: '0 5px',
      
    },
    colorButton: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '5px',
      margin: '0 5px',
    },
    sizeButton: {
      
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '5px',
      margin: '0 5px',
    },
  };

  return (
    <div style={styles.body}>
    <div style={styles.editorContainer}>
    <div style={styles.heading}>Editor</div>
    <div style={styles.editorToolbar}>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('BOLD')}>Bold</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('ITALIC')}>Italic</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('UNDERLINE')}>Underline</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('STRIKETHROUGH')}>Strikethrough</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('CODE')}>Code</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('SUPERSCRIPT')}>Superscript</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('SUBSCRIPT')}>Subscript</button>
          <button style={styles.inlineStyleButton} onClick={() => onInlineStyleClick('MARK')}>Highlight</button>

          <button style={styles.blockTypeButton} onClick={() => onBlockTypeClick('header-one')}>Heading</button>
          <button style={styles.blockTypeButton} onClick={() => onBlockTypeClick('blockquote')}>Quote</button>
          <button style={styles.blockTypeButton} onClick={() => onBlockTypeClick('unordered-list-item')}>Bullet List</button>
          <button style={styles.blockTypeButton} onClick={() => onBlockTypeClick('ordered-list-item')}>Numbered List</button>

          <button onClick={onSaveClick} style={styles.button}>Save</button>
        </div>
      <div style={styles.editor}>
        
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  </div>
  );

};

export default MyEditor;
