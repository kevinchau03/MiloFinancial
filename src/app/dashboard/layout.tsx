import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-full w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col p-4 relative">
              <SidebarTrigger className="absolute top-4 left-4 z-50" />
              <div className="h-full w-full overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
