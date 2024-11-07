//ye middle ware use hua hai to logout user
// uske liye user ka token delete karna hoga
// lekin uska access kaha se milega?
// wo idher se milega



import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;
    console.log("Token received:", token); // Log the token received

    if (!token) {
      console.log("No token found");
      throw new ApiError(401, "Unauthorized Login");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken); // Log the decoded token

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    console.log("User found:", user); // Log the user found

    if (!user) {
      console.log("No user found with this token");
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyJWT middleware:", error); // Detailed logging
    throw new ApiError(401, "Invalid access token");
  }
});
