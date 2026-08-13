import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardAppSidebar from "./_components/DashboardAppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardAppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1 py-4 px-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
