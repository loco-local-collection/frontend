import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi"; // 아이콘 추가
import { HiSearch } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 border-b">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="text-xl font-bold text-pink-500">요즘것들</div>

          {/* 데스크톱용 네비게이션 (md 이상에서 표시) */}
          <nav className="hidden md:flex space-x-4 text-gray-700">
            <a href="#">대외활동</a>
            <a href="#">공모전</a>
            <a href="#">국비교육</a>
            <a href="#">매거진</a>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar (데스크톱용) */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="검색어를 입력해주세요..."
              className="border rounded-full px-4 py-1 text-sm w-56"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <button className="text-lg">
                <FiSearch />
              </button>
            </span>
          </div>

          {/* 공고등록 & 로그인 (데스크톱용) */}
          <div className="hidden md:flex space-x-4 text-gray-700">
            <a href="#">공고등록</a>
            <a href="#">로그인</a>
          </div>

          {/* 모바일 햄버거 버튼 (md 이하에서만 표시) */}
          <button className="text-2xl md:hidden">
            <HiSearch />
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl md:hidden"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 (햄버거 메뉴) */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="w-80 bg-white h-full p-6 shadow-lg">
            {/* 닫기 버튼 */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">메뉴</h2>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                <FiX />
              </button>
            </div>

            {/* 모바일 메뉴 리스트 */}
            <nav className="mt-4 space-y-4">
              <a href="#" className="block text-gray-700">
                대외활동
              </a>
              <a href="#" className="block text-gray-700">
                공모전
              </a>
              <a href="#" className="block text-gray-700">
                국비교육
              </a>
              <a href="#" className="block text-gray-700">
                매거진
              </a>
              <a href="#" className="block text-gray-700">
                대학생활능력시험
              </a>
              <hr className="my-4" />
              <a href="#" className="block text-gray-700">
                공고등록
              </a>
              <a href="#" className="block text-gray-700">
                로그인
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
