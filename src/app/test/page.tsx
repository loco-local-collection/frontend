"use client";

import SpotCreateModal from "@/components/organisms/SpotCreateModal";

export default function TestPage() {
  return (
    <div>
      <SpotCreateModal
        isOpen={true}
        onClose={() => {
          return null;
        }}
        onCreate={() => {
          return null;
        }}
      />
    </div>
  );
}
