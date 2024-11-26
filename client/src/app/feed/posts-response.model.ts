type Creator = {
  name: string;
};

export type Post = {
  _id: string;
  creator: Creator;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
};

export type PostResponse = {
  post: Post;
};

export type PostsResponse = {
  totalItems?: number;
  posts: Post[];
};
