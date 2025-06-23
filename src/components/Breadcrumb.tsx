"use client";

import { getBreadcrumbs } from "@/modules/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  
  const pathname = usePathname();
  const breadcrumbs = React.useMemo(() => {
    return getBreadcrumbs(pathname);
  }, [pathname]);

  return (
    <nav className="bg-orange-200 py-3 px-6 shadow-sm text-xl">
      <ol className="flex items-center space-x-2 text-gray-700">
        <li>
          <Link href="/" className="hover:underline text-slate-600 font-medium">
            Home
          </Link>
        </li>

        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center space-x-2">
            <span>/</span>
            {idx === breadcrumbs.length - 1 ? (
              <span className="text-slate-500">{crumb.displayName}</span>
            ) : (
              <Link
                href={crumb.href as string}
                className="hover:underline text-slate-600 font-medium"
              >
                {crumb.displayName}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
