import CardList from "@/components/spotMain/CardList";
import CategoryFilter from "@/components/spotMain/CategoryFilter";
import Header from "@/components/organisms/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <CategoryFilter />
      <CardList />
    </div>
  );
}
