
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar open/close
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Check if screen size is small
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Update small screen state
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleSectionClick = (courseId) => {
    setActiveStatus((prev) => (prev === courseId ? "" : courseId));
  };

  const toggleSidebar = () => {
    if (isSmallScreen) {
      setIsSidebarOpen((prev) => !prev); // Toggle sidebar state for small screens
    } else {
      navigate(-1); // Navigate back for medium and larger screens
    }
  };

  const handleBackArrowClick = () => {
    if (isSmallScreen) {
      setIsSidebarOpen(false); // Close the sidebar
    } else {
      navigate(-1); // Navigate back for medium and larger screens
    }
  };

  const handleOpenArrowClick = () => {
    setIsSidebarOpen(true); // Open the sidebar
  };

  return (
    <div>
      {isSmallScreen && !isSidebarOpen ? (
        <div
          onClick={handleOpenArrowClick}
          className="flex h-[35px] mt-6 ml-4  w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
          title="Open Sidebar"
        >
          <IoIosArrowBack size={30}  />
        </div>
      ) : (
        <div
        className={`flex h-[calc(100vh-3.5rem)] transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'w-[320px] opacity-100' : 'w-[50px] opacity-0'
        } max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 overflow-hidden`}
      >
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex w-full items-center justify-between">
              <div
                onClick={handleBackArrowClick} // Toggle the sidebar instead of navigating
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
                title={isSmallScreen ? (isSidebarOpen ? "Close Sidebar" : "Open Sidebar") : "Go Back"} // Update title for clarity
              >
                <IoIosArrowBack size={30}  />
              </div>
              <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
              />
            </div>
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>

          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData.map((course, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                key={index}
              >
                <div
                  className="flex flex-row justify-between bg-richblack-600 px-5 py-4"
                  onClick={() => handleSectionClick(course?._id)} // Toggle on click
                >
                  <div className="w-[70%] font-semibold">
                    {course?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        activeStatus === course?._id
                          ? "rotate-0"
                          : "rotate-180"
                      } transition-all ease-out duration-300`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>

                <div
                  className={`transition-max-height duration-500 ease-out overflow-hidden ${
                    activeStatus === course?._id ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  {activeStatus === course?._id &&
                    course.subSection.map((topic, i) => (
                      <div
                        className={`flex gap-3 px-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        }`}
                        key={i}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        {topic.title}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
