interface Breadcrumb {
  displayName: string;
  href?: string;
}

export const getBreadcrumbs = (
  pathname: string
): Breadcrumb[] => {
    const parts = pathname.split("/").filter(Boolean);
    const breadcrumbs = parts.map((part: string, idx: number) => ({
      displayName: part
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: "/" + parts.slice(0, idx + 1).join("/"),
    }));
    return breadcrumbs;
}