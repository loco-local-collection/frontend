import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { IconButton } from "@/components/atoms/IconButton";
import { Dropdown } from "@/components/atoms/Dropdown";

interface Comment {
  id: number;
  userName: string;
  text: string;
  userAvatar: string;
}

/**
 * PlaceDetailModal 하단의 댓글 부분
 */
export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userName: "아이스맛구실장",
      text: "여기 아이스크림 맛있어요!",
      userAvatar: "/logo.svg",
    },
    {
      id: 2,
      userName: "우아의맛집",
      text: "오레오 맛 추천! 사진도 예쁘게 잘 나와요",
      userAvatar: "/logo.svg",
    },
  ]);

  // 정렬 옵션 상태
  const [sortOption, setSortOption] = useState("latest");
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된순" },
    { value: "popular", label: "인기순" },
  ];

  const [commentText, setCommentText] = useState("");
  const showSendButton = commentText.trim().length > 0;

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  // 새 댓글 추가
  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      userName: "사용자",
      text: text,
      userAvatar: "/logo.svg",
    };

    setComments([...comments, newComment]);
    console.log("새 댓글 전송:", text);
  };

  const handleSubmitComment = () => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    handleAddComment(trimmedComment);
    setCommentText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleSubmitComment();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">
          댓글 {comments.length}개
        </h3>

        {/* 정렬 옵션 */}
        <div className="flex justify-end mb-3">
          <Dropdown
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            options={sortOptions}
          />
        </div>
      </div>

      {/* 댓글 입력 영역 */}
      <div className="mb-4 relative">
        <input
          value={commentText}
          onChange={handleCommentChange}
          placeholder="댓글추가..."
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-focusRing transition-colors pr-10"
        />
        {showSendButton && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center">
            <IconButton
              onClick={handleSubmitComment}
              icon={<Send size={16} />}
              variant="primary"
              size="sm"
              aria-label="댓글 전송"
              className="bg-transparent text-blue-500 hover:bg-blue-50"
            />
          </div>
        )}
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar src={comment.userAvatar} alt={comment.userName} size="md" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {comment.userName}
              </p>
              <p className="text-sm text-gray-600">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
