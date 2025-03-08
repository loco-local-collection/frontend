export interface Place {
  id: string; // PK
  createAt: Date;
  updateAt: Date;
  userId: string; // FK => addedBy임
  roomId: string; // FK
  locationId: string; // FK
}
