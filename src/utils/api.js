// Sign up API
export const signUp = async (formdata) => {
  return await fetch("/api/auth/v1/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });
};

// Sign in API
export const signIn = async (formdata) => {
  return await fetch("/api/auth/v1/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });
};

// Sign out API
export const signOut = async () => {
  return await fetch("/api/auth/v1/sign-out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Create review API
export const createReview = async (review) => {
  return await fetch("/api/review/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
};

// Get reviews API
export const getReviews = async (query) => {
  return await fetch(
    `/api/review/getReviews?sortField=${query.sortField}&&sortDirection=${query.sortDirection}&&startIndex=${query.startIndex}&&pageSize=${query.pageSize}&&userId=${query.userId}&&title=${query.title}&&author=${query.author}&&searchTerm=${query.searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// Delete review API
export const deleteReview = async (r_id) => {
  return await fetch(`/api/review/delete/${r_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Update review API
export const updateReview = async (r_id, review) => {
  return await fetch(`/api/review/update/${r_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
};
