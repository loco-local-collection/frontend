"use client";

import { MswWrapper } from "@/components/mswWrapper/MswWrapper";
import { TestButton } from "@/components/mswWrapper/TestButton";

export default function TestPage() {
  return (
    <div>
      <MswWrapper>
        <TestButton />
      </MswWrapper>
    </div>
  );
}
