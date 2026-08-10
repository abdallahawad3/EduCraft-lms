import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentsStatus } from "../data/admin/admin-get-enrollments-status";

export default async function Page() {
  const enrollments = await adminGetEnrollmentsStatus();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <SectionCards />
      <ChartAreaInteractive enrollments={enrollments} />
    </div>
  );
}
