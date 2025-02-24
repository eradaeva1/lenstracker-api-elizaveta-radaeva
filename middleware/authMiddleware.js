// import jwt from "jsonwebtoken";

// export function authMiddleware(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

// import jwt from "jsonwebtoken";

// export default function authMiddleware(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await db("users").where({ id: decoded.id }).first();
    req.user = decoded; 
    // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;