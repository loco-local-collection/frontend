export interface Room {
  id: string; // PK
  name: string;
  description: string;
  isPrivate: boolean;
  shareLink: string;
  createAt: Date;
  updateAt: Date;
  userId: string; // FK
}
