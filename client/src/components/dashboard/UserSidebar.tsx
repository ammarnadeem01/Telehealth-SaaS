// src/components/dashboard/UserSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  //   RiStethoscopeLine,
  RiChatSmile3Line,
  RiUser3Line,
  //   RiHistoryLine,
} from "react-icons/ri";
import { FaRegCalendarAlt, FaVideo, FaFileMedical } from "react-icons/fa";
import { MdPayment, MdSettings } from "react-icons/md";
import { AiOutlineDashboard, AiOutlineRobot } from "react-icons/ai";

interface SidebarProps {
  onNavigate?: () => void;
}

const UserSidebar = ({ onNavigate }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Health Services",
      items: [
        {
          name: "Dashboard",
          path: "/user",
          icon: <AiOutlineDashboard className="w-5 h-5" />,
        },
        {
          name: "Appointments",
          path: "/user/appointments",
          icon: <FaRegCalendarAlt className="w-5 h-5" />,
          badge: 2,
        },
        {
          name: "AI Symptom Check",
          path: "/user/symptom-check",
          icon: <AiOutlineRobot className="w-5 h-5" />,
        },
        {
          name: "Medical History",
          path: "/user/medical-history",
          icon: <FaFileMedical className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          name: "Video Consult",
          path: "/user/video-consults",
          icon: <FaVideo className="w-5 h-5" />,
        },
        {
          name: "Messages",
          path: "/user/messages",
          icon: <RiChatSmile3Line className="w-5 h-5" />,
          badge: 1,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Profile",
          path: "/user/profile",
          icon: <RiUser3Line className="w-5 h-5" />,
        },
        {
          name: "Billing",
          path: "/user/billing",
          icon: <MdPayment className="w-5 h-5" />,
        },
        {
          name: "Settings",
          path: "/user/settings",
          icon: <MdSettings className="w-5 h-5" />,
        },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">HealthConnect</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-8">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="/user-avatar.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">John Carter</p>
            <button className="text-xs text-gray-500 hover:text-gray-700">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
