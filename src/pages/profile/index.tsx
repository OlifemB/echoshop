import React from "react";
import { Profile } from "@/components/profile/Profile";

const UserProfilePage: React.FC = () => {

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center container mx-auto">
      <Profile/>
    </div>
  );
};

export default UserProfilePage;