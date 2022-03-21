const dev = process.env.NODE_ENV !== "production";

export const SERVER_URL = dev
  ? "http://localhost:3000"
  : "https://react-express-1990.herokuapp.com";
