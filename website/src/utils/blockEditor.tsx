import React from 'react';

interface Block {
  type: string;
  content?: string | Block[];
  attrs?: Record<string, any>;
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
}

interface BlockEditorContent {
  type: string;
  content: Block[];
}

export function renderBlockEditor(content: BlockEditorContent | string | null): React.ReactNode {
  if (!content) return null;
  
  // If content is a string, return it directly
  if (typeof content === 'string') return content;
  
  // If content is not properly structured, return null
  if (!content.type || !Array.isArray(content.content)) {
    console.error('Invalid block editor content structure:', content);
    return null;
  }
  
  // Render the content based on its type
  switch (content.type) {
    case 'doc':
      return (
        <div className="block-editor-content">
          {content.content.map((block, index) => renderBlock(block, index))}
        </div>
      );
    default:
      console.warn('Unknown block editor content type:', content.type);
      return null;
  }
}

function renderBlock(block: Block, index: number): React.ReactNode {
  if (!block.type) return null;
  
  // Apply marks to the content
  const content = typeof block.content === 'string' ? block.content : '';
  let renderedContent: React.ReactNode = content;
  
  if (block.marks && block.marks.length > 0) {
    renderedContent = applyMarks(content, block.marks);
  }
  
  // Render the block based on its type
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{renderedContent}</p>;
    case 'heading':
      const level = block.attrs?.level || 1;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      return React.createElement(HeadingTag, { key: index }, renderedContent);
    case 'bulletList':
      return (
        <ul key={index}>
          {Array.isArray(block.content) && block.content.map((item, itemIndex) => (
            <li key={itemIndex}>{typeof item.content === 'string' ? item.content : ''}</li>
          ))}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={index}>
          {Array.isArray(block.content) && block.content.map((item, itemIndex) => (
            <li key={itemIndex}>{typeof item.content === 'string' ? item.content : ''}</li>
          ))}
        </ol>
      );
    case 'blockquote':
      return <blockquote key={index}>{renderedContent}</blockquote>;
    case 'codeBlock':
      return <pre key={index}><code>{renderedContent}</code></pre>;
    default:
      return <div key={index}>{renderedContent}</div>;
  }
}

function applyMarks(content: string, marks: Array<{ type: string; attrs?: Record<string, any> }>): React.ReactNode {
  let result: React.ReactNode = content;
  
  marks.forEach(mark => {
    switch (mark.type) {
      case 'bold':
        result = <strong>{result}</strong>;
        break;
      case 'italic':
        result = <em>{result}</em>;
        break;
      case 'underline':
        result = <u>{result}</u>;
        break;
      case 'link':
        const href = mark.attrs?.href || '#';
        result = <a href={href}>{result}</a>;
        break;
      default:
        // For unknown marks, just keep the content as is
        console.warn('Unknown mark type:', mark.type);
    }
  });
  
  return result;
} 