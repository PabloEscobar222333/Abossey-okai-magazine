import app from "../server/index.js";

export default function handler(req, res) {
  // Normalize URL if rewritten by Vercel
  const xMatched = req.headers["x-matched-path"];
  if (xMatched && xMatched.startsWith("/api") && !req.url.startsWith("/api")) {
    req.url = xMatched;
  }
  return app(req, res);
}
