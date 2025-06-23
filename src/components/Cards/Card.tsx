'use client';

import React from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`rounded-xl bg-gray-800 border border-gray-700 shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }: CardProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
