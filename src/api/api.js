const baseUrl = `https://idanlsocialapi.onrender.com`;

export const api = {
  patchFriend: async (_id, friendId, token) => {
    const response = await fetch(`${baseUrl}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  },
  registerUser: async (formData) => {
    const savedUserResponse = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: formData,
    });
    return await savedUserResponse.json();
  },
  loginUser: async (values) => {
    const loggedInResponse = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    return await loggedInResponse.json();
  },
  getUser: async (profileId, token) => {
    const response = await fetch(`${baseUrl}/users/${profileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  getFriends: async (userId, token) => {
    const response = await fetch(`${baseUrl}/users/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  handlePost: async (token, formData) => {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return await response.json();
  },
  getUserPosts: async (userId, token) => {
    const response = await fetch(`${baseUrl}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  },
  getPosts: async (token) => {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  },
  deletePost: async (postId, token) => {
    const response = await fetch(`${baseUrl}/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  },
  patchLike: async (postId, loggedInUserId, token) => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    return await response.json();
  },
  submitComment: async (postId, comment, token) => {
    const response = await fetch(`${baseUrl}/posts/${postId}/addcomment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    });

    return await response.json();
  },
  delComment: async (postId, index, token) => {
    const response = await fetch(`${baseUrl}/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ indexToDel: index }),
    });

    return await response.json();
  },
  updateSocialHandle: async (user, reqBody, token) => {
    const response = await fetch(
      `https://idanlsocialapi.onrender.com/users/${user._id}/updatesocial`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    return await response.json();
  },
};
