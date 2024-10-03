const express = require("express");
const app = express();

// ********************************************************************
                // defininga all the routes //
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");

const courseRoutes = require("./routes/Course");
const sectionRoutes = require("./routes/Section");
const subsectionRoutes = require("./routes/SubSection");
const categoryRoutes = require("./routes/Category");
const ratingandreviewRoutes = require("./routes/RatingAndReviews");

// *******************************************************************
const database = require("./config/database");
const cookieParaser = require("cookie-parser");

// cors is used to integrate frontend with backend or front end
//  request are entertained by backend with the help of cors
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect //
database.connect();

//middlewares//
app.use(express.json());
app.use(cookieParaser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection //
cloudinaryConnect();

// *********************************************************************
                            //routes mounting //
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/section",sectionRoutes);
app.use("/api/v1/subsection",subsectionRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/ratingandreview",ratingandreviewRoutes);

// *************************************************************************
// default route//
app.get("/",(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Your server is up and running....",
    });
});

// listen port //
app.listen(PORT, () => {
    console.log(`App is running at : ${PORT} `);
});

