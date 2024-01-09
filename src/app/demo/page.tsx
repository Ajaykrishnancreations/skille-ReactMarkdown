"use client"
import React, { useEffect, useState, useRef } from 'react';
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
interface TitleProps {
  title: string;
  selected: boolean;
  onClick: () => void;
  isBold: boolean;
}
const Title: React.FC<TitleProps> = ({ title, selected, onClick, isBold }) => (
  <div
    className={`basis-2/12 mt-5 cursor-pointer ${selected ? 'font-bold' : ''}`}
    onClick={onClick}
  >
    {isBold ? <strong>{title}</strong> : title}
  </div>
);
const MarkdownPreviewer: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [headingIds, setHeadingIds] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const extractTitles = (source: string) => {
    const regex = /^#{1,3}\s+(.*)/gm;
    const matches = Array.from(source.matchAll(regex), (match) => match[1]);
    setTitles(matches);
    const headingIds = matches.map((title) => title.toLowerCase().replace(/\s+/g, '-'));
    setHeadingIds(headingIds);
  };

  useEffect(() => {
    extractTitles(demoContent);
    if (!selectedTitle && titles.length > 0) {
      handleTitleClick(titles[0]);
    }
  }, [titles, selectedTitle]);

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
    const index = titles.indexOf(title);
    if (index !== -1) {
      const element = document.getElementById(headingIds[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
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
    h1: ({ children }: { children: React.ReactNode }) => {
      const headingText = String(children);
      const headingId = headingText.toLowerCase().replace(/\s+/g, '-');
      return (
        <h1 id={headingId} className={`mt-2 mb-2 ${isDarkTheme ? 'text-white' : ''}`}>
          {children}
        </h1>
      );
    },
    h2: ({ children }: { children: React.ReactNode }) => {
      const headingText = String(children);
      const headingId = headingText.toLowerCase().replace(/\s+/g, '-');
      return (
        <h2 id={headingId} className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}>
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children: React.ReactNode }) => {
      const headingText = String(children);
      const headingId = headingText.toLowerCase().replace(/\s+/g, '-');
      return (
        <h3 id={headingId} className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}>
          {children}
        </h3>
      );
    },
    strong: ({ children }: { children: React.ReactNode }) => (
      <div className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}><strong>{children}</strong></div>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <div className={`mt-5 ${isDarkTheme ? 'text-white' : ''}`}><p>{children}</p></div>
    ),
  };
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  return (
    <div className='p-10'>
      <button
        onClick={toggleTheme}
        className={`bg-${isDarkTheme ? 'gray-300 text-black bg-gray-200' : 'gray-700 text-white bg-gray-800'} p-2 rounded `}
      >
        Toggle Theme
      </button>
      <div className='flex flex-row'>
        <div className='basis-10/12' style={{ height: '90vh', overflow: 'scroll' }} ref={contentRef}>
          <div className={`p-10 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} rounded border-1 border-gray-200`}>
            <ReactMarkdown components={components} children={demoContent} />
          </div>
        </div>
        <div className='basis-2/12 p-10'>
          {titles.map((title, index) => (
            <Title
              key={index}
              title={title}
              selected={selectedTitle === title}
              onClick={() => handleTitleClick(title)} isBold={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MarkdownPreviewer;
