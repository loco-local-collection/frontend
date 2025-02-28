"use client";

import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
// import { searchPlaces } from "@/libs/search"; // ✅ API 호출 분리

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
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("검색어를 입력해주세요.");
      return;
    }

    setError("");

    try {
      // const data = await searchPlaces(trimmedQuery); // ✅ API 호출 분리
      // setResults(data);
    } catch (error) {
      setError("검색에 실패했습니다.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 items-center mt-4">
        <Input
          id="search"
          placeholder="장소 검색..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(""); // ✅ 입력 시 에러 초기화
          }}
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
        <ul
          role="listbox"
          className="mt-4 border rounded-md bg-primary shadow-md"
        >
          {results.map((place, index) => (
            <li
              key={index}
              role="option"
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
