
# StudyNotion - EdTech Platform
:rocket: [Link to website][]


![Main Page](images/mainpage.png)
StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Table of Contents

- [Introduction](#introduction)
- [System Architecture](#system-architecture)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Database](#database)
  - [Architecture Diagram](#architecture-diagram)
- [API Design](#api-design)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)


## Introduction

StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

In the following sections, we will cover the technical details of the platform, including the system architecture, API design, installation, usage instructions, and potential future enhancements.

## System Architecture

The StudyNotion EdTech platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

### Front-end

The front-end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces, crucial for providing an engaging learning experience to students. The front-end communicates with the back-end using RESTful API calls.

#### Front End Pages

For Students:

- **Homepage:** A brief introduction to the platform with links to the course list and user details.
- **Course List:** A list of all the courses available on the platform, along with their descriptions and ratings.
- **Wishlist:** Displays all the courses that a student has added to their wishlist.
- **Cart Checkout:** Allows the user to complete course purchases.
- **Course Content:** Presents the course content for a particular course, including videos and related material.
- **User Details:** Provides details about the student's account, including their name, email, and other relevant information.
- **User Edit Details:** Allows students to edit their account details.

For Instructors:

- **Dashboard:** Offers an overview of the instructor's courses, along with ratings and feedback for each course.
- **Insights:** Provides detailed insights into the instructor's courses, including the number of views, clicks, and other relevant metrics.
- **Course Management Pages:** Enables instructors to create, update, and delete courses, as well as manage course content and pricing.
- **View and Edit Profile Details:** Allows instructors to view and edit their account details.

#### Front-end Tools and Libraries

To build the front-end, we use frameworks and libraries such as ReactJS, CSS, and Tailwind for styling, and Redux for state management.

### Back-end

The back-end of the platform is built using NodeJS and ExpressJS, providing APIs for the front-end to consume. These APIs include functionalities such as user authentication, course creation, and course consumption. The back-end also handles the logic for processing and storing the course content and user data.

#### Back-end Features

- **User Authentication and Authorization:** Students and instructors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Course Management:** Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- **Payment Integration:** Students will purchase and enroll in courses by completing the checkout flow, followed by Razorpay integration for payment handling.
- **Cloud-based Media Management:** StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- **Markdown Formatting:** Course content in document format is stored in Markdown format, allowing for easier display and rendering on the front-end.

#### Back-end Frameworks, Libraries, and Tools

The back-end of StudyNotion uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

- **Node.js:** Used as the primary framework for the back-end.
- **Express.js:** Used as a web application framework, providing a range of features and tools for building web applications.
- **MongoDB:** Used as the primary database, providing a flexible and scalable data storage solution.
- **JWT (JSON Web Tokens):** Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- **Bcrypt:** Used for password hashing, adding an extra layer of security to user data.
- **Mongoose:** Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.

#### Data Models and Database Schema

The back-end of StudyNotion uses several data models and database schemas to manage data, including:

- **Student Schema:** Includes fields such as name, email, password, and course details for each student.
- **Instructor Schema:** Includes fields such as name, email, password, and course details for each instructor.
- **Course Schema:** Includes fields such as course name, description, instructor details, and media content.

### Database

The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.

![Database Schema](images/schema.png)

### Architecture Diagram

Below is a high-level diagram that illustrates the architecture of the StudyNotion EdTech platform:

![Architecture](images/architecture.png)

## API Design

The StudyNotion platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE.

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


# [StudyNotion - EdTech Platform](https://study-notion-seven-nu.vercel.app/)

StudyNotion is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

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
