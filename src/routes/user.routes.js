import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import {uploadAvatar} from '../middlewares/multer.middleware.js';
import { verifyJWT } from "../middlewares/auth.middlerware.js"; //for creating protected route
import adminMiddlerware from "../middlewares/admin.middlerware.js"
import { sendPDF } from '../controllers/sendcertificate.controller.js'; // Import the controller function
const router = Router()

router.route('/register').post(
  uploadAvatar.single('avatar'), // Use uploadAvatar middleware for single file upload of 'avatar' field
  registerUser
 
);



    router.route("/login").post(loginUser, adminMiddlerware);

    // Inside adminMiddleware
   
    

// secure Routes
router.route("/logout").post(logoutUser)

router.route('/send-pdf').post(uploadAvatar.single('avatar'), sendPDF);

// Protected route for user profile
router.route("/profile").get(verifyJWT, (req, res) => {
    // Access the authenticated user using req.user
    const user = req.user;
  
    // You can render a React component here, or send JSON data
    res.json({ message: 'Profile page', user });
  });

  
router.route("/refresh-token").post(refreshAccessToken)

export default router