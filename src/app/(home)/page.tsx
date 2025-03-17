import CategoryFilter from "@/components/spotMain/CategoryFilter";
import Header from "@/components/organisms/Header";
import { SpotMain } from "@/components/spotMain/SpotMain";

export default async function HomePage() {
  return (
    <div>
      <Header />
      <CategoryFilter />
      <SpotMain />
    </div>
  );
}
