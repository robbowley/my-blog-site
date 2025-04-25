import React from 'react';

/**
 * Represents a block of content in the editor
 */
interface Block {
  type: string;
  data: {
    text: string;
  };
}

/**
 * Represents the structure of EditorJS content
 */
interface EditorJSContent {
  time: number;
  blocks: Block[];
  version: string;
}

/**
 * Renders content from the block editor
 * 
 * @param content - The content to render, which can be an EditorJSContent object, a string, or null
 * @returns A React node representing the rendered content
 */
export function renderBlockEditor(content: EditorJSContent | string | null): React.ReactNode {
  if (!content) return null;
  
  // If content is a string, return it directly
  if (typeof content === 'string') return content;
  
  // Handle EditorJS content structure
  if ('blocks' in content && 'version' in content) {
    return (
      <div className="block-editor-content">
        {content.blocks.map((block, index) => (
          <div key={index}>{block.data.text}</div>
        ))}
      </div>
    );
  }
  
  console.error('Invalid block editor content structure:', content);
  return null;
} 