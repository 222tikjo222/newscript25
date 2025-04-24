import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
}

export const Link: React.FC<LinkProps> = ({ 
  href, 
  className, 
  children,
  target,
  ...rest 
}) => {
  return (
    <a 
      href={href} 
      className={className}
      target={target}
      {...rest}
    >
      {children}
    </a>
  );
};