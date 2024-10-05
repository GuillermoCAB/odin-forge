"use client";
import React from "react";
import { navigate } from "@/app/actions";
import { FaFile, FaStopwatch, FaTicket } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

interface NavItem {
  label: string;
  icon: JSX.Element;
  routeName: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <FaHome />,
    routeName: "/home",
  },
  {
    label: "Tickets",
    icon: <FaTicket />,
    routeName: "/tickets",
  },
  {
    label: "Histórico",
    icon: <FaStopwatch />,
    routeName: "/historic",
  },
  {
    label: "T&C",
    icon: <FaFile />,
    routeName: "/t&c",
  },
];

export const BottomNavBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg p-4 block lg:hidden">
      <nav className="flex justify-between">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center w-full ${
              window?.location.pathname === item.routeName
                ? "text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => navigate(item.routeName)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
