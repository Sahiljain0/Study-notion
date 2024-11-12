
# StudyNotion - EdTech Platform
website : [Link to website][(https://study-notion-woad-six.vercel.app/)] 


![Main Page](images/mainpage.png).


StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

![Database Schema](images/schema.png)

### Architecture Diagram

Below is a high-level diagram that illustrates the architecture of the StudyNotion EdTech platform:

![Architecture](images/architecture.png)

For detailed API documentation and endpoints, refer to the [API Documentation](/api-docs).

## Installation

1. Clone the repository: `git clone https://github.com/Sahiljain0/CoursePlatfrom.git`
2. Navigate to the project directory: `cd StudyNotion`
3. Install dependencies: `npm install`

## Configuration

1. Set up a MongoDB database and obtain the connection URL.
2. Create a `.env` file in the root directory with the following environment variables:
   ```
   MONGODB_URI=<your-mongodb-connection-url>
   JWT_SECRET=<your-jwt-secret-key>
   ```

## Usage

1. Start the server: `npm start`
2. Open a new terminal and navigate to the `client` directory: `cd client`
3. Start the React development server: `npm start`

Access the application in your browser at `http://localhost:3000`.



StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.
# Screenshots
![Screenshot 1](https://res.cloudinary.com/dxzniberu/image/upload/v1731425665/Code/akpxxgscqphgjh6irasj.png)



![Screenshot 2](https://res.cloudinary.com/dxzniberu/image/upload/v1731425665/Code/vo7qhsyvm35cxcj4kwhy.png)



![Screenshot 3](https://res.cloudinary.com/dxzniberu/image/upload/v1731425665/Code/tjjenae2yrpuqofofxnx.png)



![Screenshot 4](https://res.cloudinary.com/dxzniberu/image/upload/v1731425665/Code/yjkcvt3ccjtm8s8lqoon.png)




## Table of Contents

- Introduction
- System Architecture
- API Design
- Installation
- Configuration
- Usage
- Preview
- Dependencies
- Folder Structure
- Contributing
- Contact

## Introduction

StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

## System Architecture

The StudyNotion EdTech platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

### Front-end

The front end of StudyNotion has all the necessary pages that an ed-tech platform should have. Some of these pages are:

#### For Students:

- **Homepage**: This page will have a brief introduction to the platform, as well as links to the course list and user details.
- **Course List**: This page will have a list of all the courses available on the platform, along with their descriptions and ratings.
- **Wishlist**: This page will display all the courses that a student has added to their wishlist.
- **Cart Checkout**: This page will allow the user to complete the course purchase.
- **Course Content**: This page will have the course content for a particular course, including videos, and other related material.
- **User Details**: This page will have details about the student's account, including their name, email, and other relevant information.
- **User Edit Details**: This page will allow the student to edit their account details.

#### For Instructors:

- **Dashboard**: This page will have an overview of the instructor's courses, as well as the ratings and feedback for each course.
- **Insights**: This page will have detailed insights into the instructor's courses, including the number of views, clicks, and other relevant metrics.
- **Course Management Pages**: These pages will allow the instructor to create, update, and delete courses, as well as manage the course content and pricing.
- **View and Edit Profile Details**: These pages will allow the instructor to view and edit their account details.

#### For Admin (Future Scope):

- **Dashboard**: This page will have an overview of the platform's courses, instructors, and students.
- **Insights**: This page will have detailed insights into the platform's metrics, including the number of registered users, courses, and revenue.
- **Instructor Management**: This page will allow the admin to manage the platform's instructors, including their account details, courses, and ratings.
- **Other Relevant Pages**: The admin will also have access to other relevant pages, such as user management and course management pages.

### Back-end

The back end of StudyNotion provides a range of features and functionalities, including:

- **User authentication and authorization**: Students and instructors can sign up and log in to the platform using their email addresses and password. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Course management**: Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- **Payment Integration**: Students will purchase and enrol on courses by completing the checkout flow that is followed by Razorpay integration for payment handling.
- **Cloud-based media management**: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- **Markdown formatting**: Course content in document format is stored in Markdown format, which allows for easier display and rendering on the front end.

### API Design

The StudyNotion platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.

## Configuration

- Set up a MongoDB database and obtain the connection URL.
- Get up the Mail pass and Mail Port from Gmail.
- Set up a Razorpay account and obtain the key ,secret.
- Get jwt secret
- Set up a cloudinary account and obtain cloud name,api key and api secret.
- Create a `.env` file in the `Server` directory with the following environment variables:
  - `MONGODB_URL=<your-mongodb-connection-url>`
  - `JWT_SECRET=<your-jwt-secret-key>`
  - `MAIL_HOST=smtp.gmail.com`
  - `MAIL_PORT=<your-mail-port>`
  - `MAIL_USER=<your-mail-id>`
  - `JWT-SECRET=<your-jwt-secret>`
  - `RAZORPAY_KEY=<your-razorpay-key>`
  - `RAZORPAY_SECRET=<your-razorpay-secret>`
  - `CLOUD_NAME=<your-cloud-name-on-cloudinary>`
  - `API_KEY=<your-cloudinary-api-key>`
  - `API_SECRET=<your-cloudinary-api-secret>`
- Create a `.env` file in the root folder and add the `REACT_APP_BASE_URL:<your-backend-url-or-your-localhost>`
- Also change the cors allow origin in index.js inside Server to the localhost or backend url you are using.

## Usage

- Open a new terminal 
- Run the dev script: `npm run dev`
- Access the application in your browser at `http://localhost:3000`

## Dependencies

The StudyNotion platform relies on the following dependencies:

- ReactJS
- NodeJS
- MongoDB
- ExpressJS
- Tailwind CSS
- Redux
- Cloudinary
- Razorpay
- SwiperJs
- NodeMailer
- React-icons
- And a Lot More...
  
## Folder Structure

The repository follows a structured folder organization:

- `Server`: Contains the Node.js backend code.
  - `Server/`: Main source folder.
    - `routes/`: Contains route definitions.
    - `controllers/`: Controllers for handling business logic.
    - `models/`: Database models.
    - `utils/`: Utility functions.
    - `config/`: Configuration files.
    - `middleware/`: Middleware functions.
    - `services/`: Additional services (e.g., email service).
    - `tests/`: Test files.

- `src`: Contains the React front-end code.
  - `src/`: Main source folder.
    - `components/`: Reusable UI components.
    - `pages/`: Individual page components.
    - `utils/`: Utility functions.
    - `assets/`: Static assets like images, fonts, etc.
    - `services/`: Frontend services (e.g., API integration).
    - `styles/`: CSS or SCSS files.

- `public`: Public assets and files for the front end.
- `README.md`: Project documentation.
- `.env`: Environment variables configuration file.
- `package.json`: Dependency and script configuration for Node.js.

## Contributing

Contributions are welcome If you have any suggestions or find any issues, please feel free to open an issue or a pull request.

## Contact

- Email: [jainsahil760@gmail.com](mailto:jainsahil760@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/sahil-jain-28433022a](https://www.linkedin.com/in/sahil-jain-28433022a)
- Website: [Sahil jain](https://tricrafters.in/)
-Portfolio : [sahil jain](https://www.jainsahil.me/)


## Thank you for visiting study notion 