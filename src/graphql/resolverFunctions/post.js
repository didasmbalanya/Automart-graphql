import { savePost } from '../../models/post';
import { getFromTwoModels } from '../../models';

export const createPost = async ({ postInput }, req) => {
  if (!req.isAuth) {
    const error = new Error('Not Authenticated');
    error.code = 401;
    throw error;
  }
  let { title, content, imageUrl } = postInput;
  if (!title || !content) {
    const error = new Error('Missing title or conent');
    error.code = 422;
    throw error;
  }
  const { user } = req;
  const creator = user.id;

  title = title.trim();
  content = content.trim();
  imageUrl = imageUrl ? imageUrl.trim() : 'none';

  const values = [creator, title, content, imageUrl];
  const newPost = await savePost(values);
  return {
    ...newPost,
    creator: user,
    created_on: newPost.created_on.toString(),
  };
};

// eslint-disable-next-line no-unused-vars
export const getUserPosts = async (args, req) => {
  const posts = await getFromTwoModels('users', 'posts', 'id', 'owner');
  return { posts: posts.data, totalposts: posts.count };
};
