const { instance } = require("../config/razorpay"); //npm i razorpay //
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");

//capture the payment and initiate the razorpay order //
exports.capturePayment = async (req, res) => {
  //get courseId and userid //
  const { course_id } = req.body;
  const { userId } = req.user.id;
  //validation //
  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provdie valid course id ...",
    });
  }
  // valid courseid //
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Course details not found...",
      });
    }

    //user already pay for the same course  user already enrolled to ni h //
    // abhi hmre pass user ki id string form me h or db me objectId ke form me h
    // to string ko object id me convert kreg pehlw //
    const uid = new mongoose.Types.ObjectId(userId);

    // validating if user alreadu enrolled //
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled ...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // order created //
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id, // here we passed courseId and userId as jb signature
      userId, // match honge or razor pay se verified request ayegi
      // tb hme userif or cousreif ki jrurat pdegi to ye notes se hme access krenge //
    },
  };

  try {
    //initiate the payment using razorpay //
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    // return response //
    return res.status(200).json({
      success: ture,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not iniate order...",
    });
  }
};

// ===========================================
// handler function to verify signature // verify payment details

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345"; // this is the secret key of server //
  const signature = req.heaaders["x-razorpay-signature"]; // razorpay signature secret which razorpay povides /

  // Hmac is a hashing function which makes ths password encrypted and that can not be decrypted again //
  //Hac require two paramenter first algorithm , second jisko hash krna h //
  const shasum = crypto.createHmac("sha256", webhookSecret);

  // convert to string format //
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  // the output of the shasum algorithm is called digest which is generally in a hexadecimal format //

  // matching the signature and digest //
  if (signature === digest) {
    console.log("Payment is Authorized....");

    // accessing courseif and userid from req from razorpay//
    //testing krni h iski //
    const { userId, courseId } = req.body.payload.payment.entity.notes;

    try {
      // action after payment authorization //

      //find the course and enroll the student in it //
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(501).json({
          success: false,
          message: "Course not found...",
        });
      }

      // find studenta and add the course in the list of enrolled courses //
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      // confirmation wala mail send krdo //
      // abhi normal behja h template se attach krna h //

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from codehelp",
        "You are onboarder into a new course..."
      );

      console.log(emailResponse);
      //return response//
      return res.status(200).json({
        success: true,
        message: "Signature verified and course added...",
      });
    } catch (error) { 
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "Invalid request...",
    });
  }
};
