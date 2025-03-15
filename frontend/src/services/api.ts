// src/services/api.ts
const BASE_URL = "http://localhost:5000"; // Backend URL (adjust if different)

// Function to handle login
export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

// Function to handle signup
export const signup = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
};

// Function to upload image
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response.json();
};

// Function to analyze image (could use ChatGPT API on the backend)
export const analyzeImage = async (imageId: string) => {
  const response = await fetch(`${BASE_URL}/api/analyze/${imageId}`);
  if (!response.ok) {
    throw new Error("Image analysis failed");
  }
  return response.json();
};
