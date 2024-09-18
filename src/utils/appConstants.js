// export const API_BASE_URL = "http://18.118.84.155";
export const API_BASE_URL = "http://localhost";
export const HEADER_TOKEN = {
  Authorization: `Bearer ${localStorage
    .getItem("token")
    .replace(/^"|"$/g, "")
    .trim()}`,
};
