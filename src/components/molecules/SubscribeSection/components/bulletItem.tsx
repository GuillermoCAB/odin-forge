"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Bullet } from "@/types";

interface BulletItemProps {
  bullet: Bullet;
}

export const BulletItem = ({ bullet }: BulletItemProps) => {
  return (
    <div className="flex justify-start items-start w-full">
      {bullet.icon && (
        <div className="mt-1 mr-2 w-[14px] h-[14px]">
          <FaCheckCircle color="white" />
        </div>
      )}
      <p
        className={`text-white text-sm ${bullet.highlight ? "font-bold" : ""}`}
      >
        {bullet.label}
      </p>
    </div>
  );
};
