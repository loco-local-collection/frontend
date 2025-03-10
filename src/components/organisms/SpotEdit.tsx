"use client";

import type { Spot } from "@/types/map";
import { useState } from "react";

interface SpotEditProps {
  initialData: Spot[];
}

export default function SpotEdit({ initialData }: SpotEditProps) {
  const [] = useState<Spot[]>(initialData);

  return <div>spot edit</div>;
}
