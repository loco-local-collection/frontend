export interface User {
  id: string; // PK
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  provider: string;
  socialId: string;
  isDeleted: boolean;
  createAt: Date;
  updateAt: Date;
}
