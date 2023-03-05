import { useTheme, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/state";
import { api } from "@/api/api.js";

const AddComment = ({ postId, setIsComments }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState("");

  const { palette } = useTheme();

  //Update post with new comment
  const submitComment = async () => {
    const updatedPost = await api.submitComment(postId, comment, token);
    dispatch(setPost({ post: updatedPost }));
    setComment("");
    setIsComments(true);
  };

  return (
    <>
      <InputBase
        placeholder="Add a comment. Press Enter to submit."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitComment();
          }
        }}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          margin: "1rem 0",
          padding: "0.75rem 2rem",
        }}
      />
    </>
  );
};

export default AddComment;
