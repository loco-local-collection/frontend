import CardList from "@/components/organisms/CardList";
import CategoryFilter from "@/components/organisms/CategoryFilter";
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
