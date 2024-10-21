const express = require("express");
const app = express();

// ********************************************************************
// defininga all the routes //

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

// *******************************************************************
const database = require("./config/database");
const cookieParaser = require("cookie-parser");

// cors is used to integrate frontend with backend or front end
//  request are entertained by backend with the help of cors
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect //
database.connect();

//middlewares//
app.use(express.json());
app.use(cookieParaser());

const whitelist = process.env.CORS_ORIGIN
  ? JSON.parse(process.env.CORS_ORIGIN)
  : ["*"];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinary connection //
cloudinaryConnect();

// *********************************************************************
//routes mounting //
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// *************************************************************************
// default route//
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

// listen port //
app.listen(PORT, () => {
  console.log(`App is running at : ${PORT} `);
});
