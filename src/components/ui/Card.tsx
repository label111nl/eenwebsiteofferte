import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'bg-white rounded-lg shadow-sm overflow-hidden',
        onClick && 'cursor-pointer transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-4 py-5 sm:px-6 border-b border-gray-200', className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-4 py-5 sm:p-6', className)}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200', className)}>
      {children}
    </div>
  );
};