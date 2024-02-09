type PostParams = {
  postId: string;
  title: string;
  description: string;
  user: string;
  tags: string[];
  slug: string;
  isDraft: boolean;
  isThreadsEnabled: boolean;
  postedOn: Date;
};

export class Post {
  postId: string;
  title: string;
  description: string;
  user: string;
  tags: string[];
  slug: string;
  isDraft: boolean;
  isThreadsEnabled: boolean;
  postedOn: Date;

  constructor(params: PostParams) {
    this.postId = params.postId;
    this.title = params.title;
    this.description = params.description;
    this.user = params.user;
    this.tags = params.tags;
    this.slug = params.slug;
    this.isDraft = params.isDraft;
    this.isThreadsEnabled = params.isThreadsEnabled;
    this.postedOn = params.postedOn;
  }
}
