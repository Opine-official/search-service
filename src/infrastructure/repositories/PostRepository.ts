import {
  IPostRepository,
  User,
  PostSearch,
} from '../../domain/interfaces/IPostRepository';
import { Post } from '../../domain/entities/Post';
import PostModel from '../models/PostModel';
// import { FilterQuery } from 'mongoose';

export class PostRepository implements IPostRepository {
  public async save(post: Post): Promise<Error | void> {
    try {
      const postDocument = new PostModel({
        postId: post.postId,
        title: post.title,
        description: post.description,
        user: post.user,
        tags: post.tags,
        slug: post.slug,
        isDraft: post.isDraft,
        isThreadsEnabled: post.isThreadsEnabled,
        postedOn: post.postedOn,
      });

      await postDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new post');
    }
  }

  public async delete(slug: string): Promise<void | Error> {
    try {
      await PostModel.deleteOne({
        slug: slug,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while deleting');
    }
  }

  public async search(query: string): Promise<PostSearch[] | Error> {
    try {
      const regex = new RegExp(query, 'i');

      const posts = await PostModel.find(
        { $or: [{ title: regex }, { description: regex }] },
        {
          postId: 1,
          title: 1,
          description: 1,
          user: 1,
          tags: 1,
          slug: 1,
          postedOn: 1,
          _id: 0,
        },
      )
        .populate('user', 'name username profile userId')
        .exec();

      const result: PostSearch[] = posts.map((post) => ({
        postId: post.postId!,
        title: post.title!,
        description: post.description!,
        user: post.user as unknown as User,
        tags: post.tags!,
        slug: post.slug!,
        postedOn: post.postedOn!,
      }));

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while searching posts');
    }
  }

  public async findByTag(tag: string): Promise<PostSearch[] | Error> {
    try {
      const posts = await PostModel.find({ tags: tag })
        .sort({ postedOn: -1 })
        .populate('user', 'name username profile userId');

      const result: PostSearch[] = posts.map((post) => ({
        postId: post.postId!,
        title: post.title!,
        description: post.description!,
        user: post.user as unknown as User,
        tags: post.tags!,
        slug: post.slug!,
        postedOn: post.postedOn!,
      }));

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while searching posts by tag');
    }
  }
}
