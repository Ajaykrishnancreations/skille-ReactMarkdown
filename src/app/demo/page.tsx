"use client"
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import demoContent from '!!raw-loader!./FastApi.md';
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const MarkdownPreviewer: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
  }, [isDarkTheme]);
  const components: any = {
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '');
      const customStyle = {
        backgroundColor: '#2d2d2d',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      };
      const syntaxHighlighterStyle = solarizedlight;

      return !inline && match ? (
        <SyntaxHighlighter style={syntaxHighlighterStyle} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} customStyle={customStyle} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className={`mt-2 mb-2 ${isDarkTheme ? 'text-white' : ''}`}>{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}>{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}>{children}</h3>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <div className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}><strong>{children}</strong></div>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <div className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}><p>{children}</p></div>
    ),
  };
  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <div className='p-10'>
      <div className={`p-10 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} rounded border-1 border-gray-200`}>
        <button onClick={toggleTheme} className={`bg-${isDarkTheme ? 'gray-300 text-black bg-gray-200' : 'gray-700 text-white bg-gray-800'} p-2 rounded `}>
          Toggle Theme
        </button>
        <ReactMarkdown components={components} children={demoContent} />
      </div>
    </div>
  );
};
export default MarkdownPreviewer;