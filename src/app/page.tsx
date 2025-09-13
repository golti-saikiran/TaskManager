"use client";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCheckSquare, FiClock, FiTrendingUp } from "react-icons/fi";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-[calc(100vh-64px)] pt-16 flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const features = [
    {
      icon: <FiCheckSquare className="w-6 h-6 text-blue-500" />,
      title: "Task Organization",
      description: "Keep your tasks organized with our intuitive interface"
    },
    {
      icon: <FiClock className="w-6 h-6 text-blue-500" />,
      title: "Due Dates & Reminders",
      description: "Never miss a deadline with built-in due dates and priority settings"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-blue-500" />,
      title: "Progress Tracking",
      description: "Monitor your productivity with visual progress indicators"
    }
  ];

  if (isSignedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] pt-16 bg-gradient-to-b from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome back, {user.firstName || 'User'}!</h1>
            <p className="text-xl text-gray-600 mb-8">Ready to be productive today?</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
              Manage Your Tasks with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stay organized, focused, and in control with our powerful task management platform.
              Transform the way you work and boost your productivity.
            </p>
            <div className="flex flex-wrap gap-4">
              <SignInButton>
                <button
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Get Started
                </button>
              </SignInButton>

              <SignUpButton>
                <button
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium bg-white text-blue-500 hover:bg-gray-50 border border-blue-500 transition-colors duration-200 shadow-lg cursor-pointer"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative w-full pt-[75%]">
              <Image
                src="/task-hero.svg"
                alt="Task Management Illustration"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="absolute top-0 left-0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
