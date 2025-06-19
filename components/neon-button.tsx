"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NeonButtonProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  download?: boolean | string;
  target?: string;
  children?: React.ReactNode;
}

export function NeonButton({
  text,
  className = "",
  size = "md",
  href,
  download,
  target,
  children,
  ...props
}: NeonButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const getSizeClasses = () => {
    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-8 py-3 text-sm",
      lg: "px-10 py-4 text-lg",
      xl: "px-12 py-5 text-xl",
    };
    return sizes[size] || sizes.md;
  };

  const buttonClasses = cn(
    "group relative inline-block overflow-hidden rounded-full bg-black text-white font-bold transition-all duration-300",
    "hover:scale-105",
    "active:scale-95",
    getSizeClasses(),
    className
  );

  // If the button should be a link
  if (href) {
    return (
      <div className="relative inline-block">
        <Link
          href={href}
          download={download}
          target={target}
          className={buttonClasses}
          {...props}
        >
          {/* Button content */}
          <span className="relative z-10">{children || text}</span>
          
          {/* Neon border */}
          <span className="neon-border"></span>
          
          {/* Glow effect */}
          <span className="absolute inset-0 shadow-[0_0_8px_rgba(147,51,234,0.3)] opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4),0_0_40px_rgba(147,51,234,0.2),0_0_80px_rgba(147,51,234,0.1)]"></span>
        </Link>
      </div>
    );
  }

  // Regular button
  return (
    <div className="relative inline-block">
      <button className={buttonClasses} {...props}>
        {/* Button content */}
        <span className="relative z-10">{children || text}</span>
        
        {/* Neon border */}
        <span className="neon-border"></span>
        
        {/* Glow effect */}
        <span className="absolute inset-0 shadow-[0_0_8px_rgba(147,51,234,0.3)] opacity-40 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4),0_0_40px_rgba(147,51,234,0.2),0_0_80px_rgba(147,51,234,0.1)]"></span>
      </button>
    </div>
  );
}