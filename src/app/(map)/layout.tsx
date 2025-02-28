// app/layout.tsx (공통 레이아웃 컴포넌트)
"use client";

import PlaceSearchMap from "@/components/organisms/PlaceSearchMap";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* 오른쪽 사이드바 (각 페이지별 다름) */}
      <main className="flex-1">
        <PlaceSearchMap />
        {children}
      </main>
    </div>
  );
}
