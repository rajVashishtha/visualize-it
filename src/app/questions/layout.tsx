import Breadcrumb from "@/components/Breadcrumb";

export default function QuestionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
}
