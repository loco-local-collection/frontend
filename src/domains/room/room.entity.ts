export interface Room {
  id: string; // PK
  label: string; // erd에는 없는데 추가해야할 듯
  title: string;
  description: string;
  isPrivate: boolean;
  shareLink: string;
  thumbnail: string; // erd에는 없는데 추가해야 할 듯
  createAt: Date;
  updateAt: Date;
  userId: string; // FK
  tags?: string[]; // 태그도 추가
}
