
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="text-3xl md:text-4xl font-extrabold text-richblack-50 mb-8">Enrolled Courses</div>
      
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-300 text-lg">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-50">
          {/* Headings */}
          <div className="hidden md:flex rounded-t-lg bg-richblack-500 px-5 py-3">
            <p className="w-[45%] font-semibold text-lg">Course Name</p>
            <p className="w-1/4 font-semibold text-lg">Duration</p>
            <p className="flex-1 font-semibold text-lg">Progress</p>
          </div>

          {/* Course Cards */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col md:flex-row items-start md:items-center border border-richblack-700 transition-all duration-300 hover:shadow-lg hover:bg-richblack-800 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              } md:p-5 px-2 py-2 gap-4 md:gap-6 mb-6`}
              key={i}
            >
              <div
                className="flex w-full md:w-[45%] cursor-pointer items-start md:items-center gap-4"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-[100px] w-22 md:h-16 md:w-16 rounded-lg object-cover border border-richblack-500"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-lg md:text-base text-richblack-50 leading-snug">
                    {course.courseName}
                  </p>
                  <p className="text-sm md:text-xs text-richblack-300 leading-tight">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>

                  {/* Duration shown on small screens */}
                  <p className="block md:hidden text-sm text-richblack-200 leading-snug">
                    Duration: <span className="font-medium">{course?.totalDuration || "N/A"}</span>
                  </p>
                </div>
              </div>

              {/* Duration hidden on small screens */}
              <div className="hidden md:flex md:w-1/4 flex-col gap-1">
                <p className="text-sm md:text-base text-richblack-200 leading-snug">
                  Duration: <span className="font-medium">{course?.totalDuration || "N/A"}</span>
                </p>
              </div>

              <div className="w-full md:w-1/5 flex flex-col gap-2">
                <p className="text-sm md:text-base text-richblack-200 leading-snug">
                  Progress: <span className="font-medium">{course.progressPercentage || 0}%</span>
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  baseBgColor="#1f2937"
                  bgColor="#4caf50"
                  transitionDuration="0.5s"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
