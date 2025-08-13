"use client";

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const QRCode = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 150,
      height: 150,
      data: "https://www.clearedadvisor.com",
      image: "/images/ca-logo.svg",
      dotsOptions: {
        color: "#0B1B3F",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
      cornersSquareOptions: {
        color: "#0B1B3F",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#0B1B3F",
        type: "dot",
      },
    });

    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <a href="https://www.clearedadvisor.com" target="_blank" rel="noopener noreferrer">
        <div ref={ref} className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg"></div>
      </a>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Scan to Learn More</p>
    </div>
  );
};

export default QRCode;
