export interface Spot {
  id: number;
  title: string;
  description?: string;
  lat: number;
  lng: number;
  likes: number;
  createdAt: string;
  imageUrl?: string;
}
