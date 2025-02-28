import Link from "next/link";
import { Button } from "../atoms/Button";
import LoginModal from "./LoginModal";
import SearchBox from "../molecules/SearchBox";
import { useSidebar } from "@/hooks/ui/useSidebar";
import { useModal } from "@/hooks/ui/useModal";

const menuItems = [
  { name: "메인 페이지", icon: "🏠", path: "/" },
  { name: "내 방 목록", icon: "📂", path: "/my-rooms" },
  { name: "마이페이지", icon: "👤", path: "/my-profile" },
  { name: "둘러보기", icon: "🔍", path: "/explore" },
  { name: "신고하기", icon: "⚠️", path: "/report" },
];

export default function Sidebar({ isLoggedIn, user, rooms }) {
  const { activeMenu, setActiveMenu, handleSelectPlace } = useSidebar();
  const { isOpen, toggle } = useModal();

  return (
    <aside className="w-64 p-4 bg-gray-100 min-h-screen flex flex-col">
      {/* 로그인 상태에 따라 다른 UI */}
      {isLoggedIn ? (
        <div className="flex flex-col space-y-4">
          {/* 프로필 & 로그아웃 */}
          <div className="flex items-center justify-between">
            <span className="font-bold">{user?.nickname}</span>
            <Button styleType="outlined">로그아웃</Button>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="mt-4">
            <SearchBox onSelectPlace={handleSelectPlace} />
            <h3 className="font-semibold mb-2">메뉴</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                      activeMenu === item.path ? "bg-blue-200" : "bg-white"
                    }`}
                    onClick={() => setActiveMenu(item.path)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <Button className="w-full" onClick={toggle}>
            로그인
          </Button>
          <LoginModal isOpen={isOpen} onClose={toggle} />
        </div>
      )}
    </aside>
  );
}
