"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // 아이콘 추가
import { IconButton } from "../atoms/IconButton";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  className?: string;
}

export default function Header(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={clsx(props.className)}>
      <header className="flex items-center justify-between px-8 py-4 border-b">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div>
            <Image width={64} height={32} src={"/Loco.svg"} alt={"home"} />
          </div>

          {/* 데스크톱용 네비게이션 (md 이상에서 표시) */}
          <nav className="hidden md:flex space-x-4 text-secondary">
            <Link href="#">스팟</Link>
            <Link href="#">즐겨찾기</Link>
            <Link href="#">프로필</Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* 공고등록 & 로그인 (데스크톱용) */}
          <div className="hidden md:flex space-x-4 text-gray-700">
            <a href="#">스팟생성</a>
            <a href="#">로그인</a>
          </div>

          {/* 모바일 햄버거 버튼 (md 이하에서만 표시) */}

          <IconButton
            variant="outline"
            icon={<FiMenu />}
            aria-label="검색"
            onClick={() => setMenuOpen(true)}
            className="icon-interactive-secondary text-2xl md:hidden border-none"
          ></IconButton>
        </div>
      </header>

      {/* 모바일 사이드 메뉴 (햄버거 메뉴) */}
      {menuOpen && (
        <div
          className={`fixed inset-0 bg-inverse-bold bg-opacity-50 z-50 flex justify-end md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-80 bg-primary h-full p-6 shadow-lg">
            {/* 닫기 버튼 */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">메뉴</h2>
              <IconButton
                variant="outline"
                icon={<FiX />}
                aria-label="닫기"
                onClick={() => setMenuOpen(false)}
                className="text-2xl border-none icon-interactive-secondary"
              ></IconButton>
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
    </div>
  );
}
