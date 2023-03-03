import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state";
import SinglePostWidget from "./SinglePostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    //user posts
    const getUserPosts = async () => {
      const response = await fetch(
        `https://idanlsocialapi.onrender.com/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      data.reverse();
      dispatch(setPosts({ posts: data }));
    };

    //homepage posts
    const getPosts = async () => {
      const response = await fetch(
        "https://idanlsocialapi.onrender.com/posts",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
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
