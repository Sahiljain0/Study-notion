"use client";

import { useState, useEffect, useCallback } from "react";
import { AiFillStar } from "react-icons/ai";

const testimonials = [
  {
    id: 1,
    name: "Ethan Miller",
    role: "Student",
    image:
      "https://img.freepik.com/free-photo/3d-illustration-business-man-with-glasses-grey-background-clipping-path_1142-58140.jpg?size=626&ext=jpg",
    rating: 5,
    text: "This platform made studying so convenient. The notes are well-organized and easy to understand.",
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Student",
    image:
      "https://img.freepik.com/premium-psd/lego-figure-with-yellow-shirt-green-glasses_1217673-202541.jpg?size=626&ext=jpg",
    rating: 5,
    text: "I love the variety of courses available. It’s helped me prepare for my exams with confidence.",
  },
  {
    id: 3,
    name: "Olivia Carter",
    role: "Student",
    image:
      "https://img.freepik.com/premium-psd/male-pilot-3d-avatar-isolated-transparent-background-3d-rendering-illustration_986479-579.jpg?size=626&ext=jpg",
    rating: 5,
    text: "The support team is amazing! They helped me navigate the platform easily.",
  },
  {
    id: 4,
    name: "Wyatt Turner",
    role: "Student",
    image:
      "https://img.freepik.com/premium-photo/art-3d-girl-modeling_1263741-33870.jpg?size=626&ext=jpg",
    rating: 5,
    text: "The platform is super user-friendly. It’s my go-to for all my course materials.",
  },
  {
    id: 5,
    name: "Sophie Lee",
    role: "Student",
    image:
      "https://img.freepik.com/premium-photo/art-3d-girl-modeling_1263741-33606.jpg?size=626&ext=jpg",
    rating: 5,
    text: "Thanks to the detailed notes, my grades have improved significantly. Highly recommend!",
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "Student",
    image:
      "https://img.freepik.com/premium-photo/art-3d-girl-modeling_1263741-33856.jpg?size=626&ext=jpg",
    rating: 5,
    text: "The study resources and past papers helped me prepare thoroughly for my exams.",
  },
];

export default function ReviewSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const updateSlidesToShow = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setSlidesToShow(3);
    } else if (window.innerWidth >= 768) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  }, []);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [updateSlidesToShow]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + slidesToShow) % testimonials.length
    );
  }, [slidesToShow]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - slidesToShow + testimonials.length) % testimonials.length
    );
  }, [slidesToShow]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className=" w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <h2 className="hidden md:flex text-3xl font-bold text-center mb-8">
          We care about our customers&apos; experience too
        </h2>
        <h2 className="md:hidden text-3xl font-bold text-center mb-4">
          Reviews
        </h2>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`w-full flex-shrink-0 px-2 ${
                  slidesToShow === 3
                    ? "lg:w-1/3"
                    : slidesToShow === 2
                    ? "md:w-1/2"
                    : ""
                }`}
              >
                <div className="bg-white text-black rounded-lg shadow-lg p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <AiFillStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    {testimonial.text.slice(0, 40) + "..."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index >= currentIndex && index < currentIndex + slidesToShow
                ? "bg-primary"
                : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
