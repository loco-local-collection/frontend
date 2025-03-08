export interface Place {
  id: string; // PK
  title: string; // 추가
  description: string; // 추가
  lat: number; // 추가
  lng: number; // 추가
  likes: number; // 추가
  imgUrl: string; // 추가
  createAt: Date;
  updateAt: Date;
  userId: string; // FK, addedBy임
  roomId: string; // FK
  // locationId: string; // FK, 프론트엔드에서 lat, lng으로 대체
}
