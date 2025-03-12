"use client";

import { MswWrapper } from "@/components/msw-wrapper/MswWrapper";
import { TestButton } from "@/components/msw-wrapper/TestButton";

export default function TestPage() {
  return (
    <div>
      <MswWrapper>
        <TestButton />
      </MswWrapper>
    </div>
  );
}
