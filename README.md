# Server running on port - 4000
# client runnin on port - 3000
# Study Notion

Study Notion is an ED Tech (Education Technology) web application developed using the MERN stack.

## Note

This project is intended as a learning tool and can be used as a sample project for educational or personal projects.

---

## Features

- User Authentication: Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their
  profiles with ease.
- Courses and Lessons: Instructors can create and edit created courses. Students can enroll in courses, access course materials, and track their progress.
- Progress Tracking: Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and
  assignments, and overall course progress.
- Payment Integration: Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services
  using various payment methods supported by Razorpay.
- Search Functionality: Users can easily search for courses, lessons, and resources using the built-in search feature. This makes it convenient to find relevant
  content quickly.
- Instructor Dashboard: Instructors have access to a comprehensive dashboard to view information about their courses, students, and income. The dashboard provides charts and visualizations to present data clearly and intuitively. Instructors can monitor the total number of students enrolled in
  each course, track course performance, and view their income generated from course sales.

---

## Important

- Backend is in the server folder.
- Before uploading courses and anything create the categories e.g. web dev, Python, etc. (without categories courses cannot be added). To create categories create an Admin account and go to dashboard then admin panel.
- To create an Admin account first sign up with a student or instructor account then go to your Database under the users model and change that 'accountType' to 'Admin'.

---

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.
