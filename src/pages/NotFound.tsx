
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="marketplace-container flex items-center justify-center min-h-[70vh] py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-bold mt-6 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
