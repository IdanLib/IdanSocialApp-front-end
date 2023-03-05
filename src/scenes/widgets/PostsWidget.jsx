import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state";
import SinglePostWidget from "./SinglePostWidget";
import { api } from "@/api/api.js";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    //user posts
    const getUserPosts = async () => {
      const data = await api.getUserPosts(userId, token);
      data.reverse();
      dispatch(setPosts({ posts: data }));
    };

    //homepage posts
    const getPosts = async () => {
      const data = await api.getPosts(token);
      data.reverse();
      dispatch(setPosts({ posts: data }));
    };

    isProfile ? getUserPosts() : getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <SinglePostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          ></SinglePostWidget>
        )
      )}
    </>
  );
};

export default PostsWidget;
