import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  );
}
