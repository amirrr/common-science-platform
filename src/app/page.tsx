import { Suspense } from "react";
import ResearchNoticePage from "@/components/research-notice-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ResearchNoticePage />
    </Suspense>
  );
}
