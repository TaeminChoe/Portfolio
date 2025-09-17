"use-client";
import { AlertProvider } from "@/features/alerts";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AlertProvider>{children}</AlertProvider>;
}
