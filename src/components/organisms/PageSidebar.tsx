import { Home, Folder, User, Search, AlertTriangle } from "lucide-react";

export default function PageSidebar({ title, rooms }) {
  const dummyRooms = [
    {
      id: 1,
      name: "스터디 모임",
      updatedAt: "2025-02-27",
      members: 5,
      active: false,
    },
    {
      id: 2,
      name: "개발 프로젝트",
      updatedAt: "2025-02-26",
      members: 12,
      active: true,
    }, // 현재 선택된 방
    {
      id: 3,
      name: "친구들과의 채팅",
      updatedAt: "2025-02-25",
      members: 3,
      active: false,
    },
  ];

  return (
    <nav className="w-64 bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="font-semibold mb-4 text-lg">{title}</h3>
      <ul className="space-y-2">
        {dummyRooms.map((room) => (
          <li
            key={room.id}
            className={`flex flex-col p-3 rounded cursor-pointer transition ${
              room.active
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <span className="font-medium">{room.name}</span>
            <span className="text-xs text-gray-500">
              {room.updatedAt} | 참여자 {room.members}명
            </span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        + 방 만들기
      </button>
    </nav>
  );
}
