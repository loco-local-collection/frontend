"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface SearchBoxProps {
  onSelectPlace: (lat: number, lng: number, title: string) => void;
}

export default function SearchBox({ onSelectPlace }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { title: string; lat: number; lng: number }[]
  >([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    setError(""); // 에러 초기화
    // TODO: API 호출 로직 추가
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 items-center mt-4">
        <Input
          id="search"
          placeholder="장소 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          error={error}
        />
        <Button
          variant="primary"
          styleType="filled"
          onClick={handleSearch}
          className="h-12"
        >
          검색
        </Button>
      </div>

      {results.length > 0 && (
        <ul className="mt-4 border rounded-md bg-primary shadow-md">
          {results.map((place, index) => (
            <li
              key={index}
              onClick={() => onSelectPlace(place.lat, place.lng, place.title)}
              className="p-2 hover:bg-interactive-secondary cursor-pointer"
            >
              {place.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
