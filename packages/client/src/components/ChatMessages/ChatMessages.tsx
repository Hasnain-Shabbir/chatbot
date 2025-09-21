import { useEffect, useRef, type ClipboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
  content: string;
  role: 'user' | 'bot';
};

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const onCopyMessage = (e: ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          key={index}
          className={`px-3 py-1 max-w-md rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 self-start text-black'}`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
