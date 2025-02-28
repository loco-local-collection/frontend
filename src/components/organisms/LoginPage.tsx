"use client";

import { useState } from "react";
import { Card } from "../molecules/Card";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setError(null);
    console.log("로그인 시도:", { email, password });
    // TODO: API 연동
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary">
      <Card className="w-96 p-6" title="로그인">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ? "이메일을 입력해주세요." : ""}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ? "비밀번호를 입력해주세요." : ""}
          />
          {error && <p className="text-danger text-sm">{error}</p>}
          <Button type="submit" variant="primary">
            로그인
          </Button>
        </form>
      </Card>
    </div>
  );
};
