import Modal from "../molecules/Modal";
// import { Input } from "../molecules/Input";
import { Button } from "../atoms/Button";
import { Card } from "../molecules/Card";
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={""}>
      <Card className="w-96 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">로그인</h2>
        {/* <Input placeholder="이메일 입력" />
        <Input type="password" placeholder="비밀번호 입력" />
        <Button className="w-full">로그인</Button> */}
        <div className="flex flex-col w-full gap-4">
          <Button
            leftIcon={<FaGoogle />}
            variant="secondary"
            styleType="outlined"
          >
            Google 로그인
          </Button>
          <Button
            leftIcon={<RiKakaoTalkFill />}
            variant="secondary"
            styleType="outlined"
          >
            Naver 로그인
          </Button>
          <Button
            leftIcon={<SiNaver />}
            variant="secondary"
            styleType="outlined"
          >
            Kakao 로그인
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
