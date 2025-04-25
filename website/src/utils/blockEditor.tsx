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

/**
 * Renders a single block of content
 * 
 * @param block - The block to render
 * @param index - The index of the block in its parent
 * @returns A React node representing the rendered block
 */
function renderBlock(block: Block, index: number | string): React.ReactNode {
  if (!block.type) return null;
  
  // Handle content based on its type
  if (typeof block.data.text === 'string') {
    // Text content with optional marks
    let renderedContent: React.ReactNode = block.data.text;
    
    if (block.marks && block.marks.length > 0) {
      renderedContent = applyMarks(block.data.text, block.marks);
    }
    
    // Render the block based on its type
    return renderBlockByType(block, renderedContent, index);
  } else if (Array.isArray(block.data.text)) {
    // Nested blocks (like list items)
    return renderNestedBlocks(block, index);
  }
  
  // Fallback for empty blocks
  return renderBlockByType(block, '', index);
}

/**
 * Renders a block based on its type
 * 
 * @param block - The block to render
 * @param content - The content to render inside the block
 * @param index - The index of the block in its parent
 * @returns A React node representing the rendered block
 */
function renderBlockByType(block: Block, content: React.ReactNode, index: number | string): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{content}</p>;
    case 'heading':
      const level = block.attrs?.level || 1;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      return React.createElement(HeadingTag, { key: index }, content);
    case 'blockquote':
      return <blockquote key={index}>{content}</blockquote>;
    case 'codeBlock':
      return <pre key={index}><code>{content}</code></pre>;
    default:
      return <div key={index}>{content}</div>;
  }
}

/**
 * Renders nested blocks (like list items)
 * 
 * @param block - The block containing nested blocks
 * @param index - The index of the block in its parent
 * @returns A React node representing the rendered nested blocks
 */
function renderNestedBlocks(block: Block, index: number | string): React.ReactNode {
  if (!Array.isArray(block.data.text)) return null;
  
  switch (block.type) {
    case 'bulletList':
      return (
        <ul key={index}>
          {block.data.text.map((item, itemIndex) => (
            <li key={itemIndex}>
              {typeof item === 'string' 
                ? item 
                : Array.isArray(item) 
                  ? item.map((nestedBlock, nestedIndex) => 
                      renderBlock(nestedBlock, `${itemIndex}-${nestedIndex}`))
                  : null}
            </li>
          ))}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={index}>
          {block.data.text.map((item, itemIndex) => (
            <li key={itemIndex}>
              {typeof item === 'string' 
                ? item 
                : Array.isArray(item) 
                  ? item.map((nestedBlock, nestedIndex) => 
                      renderBlock(nestedBlock, `${itemIndex}-${nestedIndex}`))
                  : null}
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <div key={index}>
          {block.data.text.map((nestedBlock, nestedIndex) => 
            renderBlock(nestedBlock, `${index}-${nestedIndex}`))}
        </div>
      );
  }
}

/**
 * Applies marks (formatting) to text content
 * 
 * @param content - The text content to format
 * @param marks - The marks to apply
 * @returns A React node with the marks applied
 */
function applyMarks(content: string | Block[] | undefined, marks: Mark[]): React.ReactNode {
  // Handle empty content or non-string content
  if (!content || typeof content !== 'string') {
    console.warn('Content must be a non-empty string');
    return null;
  }
  
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
      case 'strike':
        result = <s>{result}</s>;
        break;
      case 'code':
        result = <code>{result}</code>;
        break;
      case 'link':
        const href = mark.attrs?.href || '#';
        result = <a href={href}>{result}</a>;
        break;
      default:
        console.warn('Unknown mark type:', mark.type);
        break;
    }
  });
  
  return result;
} 