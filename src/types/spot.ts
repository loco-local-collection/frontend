export interface Place {
  id: number;
  title: string;
  description?: string;
  lat: number;
  lng: number;
  likes: number;
  comments: number;
  createdAt: string;
  imageUrl?: string;
  tags: string[];
  author: {
    name: string;
    profileImage: string;
  };
}
