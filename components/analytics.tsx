"use client";

import React, { useEffect } from "react";
import PostWebVisit from "../data/analytic";
import { makeid } from "../utils/random-id";
import { usePathname, useSearchParams } from "next/navigation";

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window === "undefined") return;

    let path = window.location.href;
    let title = document.title;
    let browser = navigator.userAgent;
    let window_identity = window.localStorage.getItem("identity");
    let identity = window_identity || makeid(30);

    if (window_identity == null) {
      window.localStorage.setItem("identity", identity);
    }

    let device = navigator.platform;
    let ip = "";

    let location = {
      latitude: 0,
      longitude: 0,
    };

    const postAnalytic = async () => {
      try {
        await PostWebVisit({
          siteName: title,
          siteUrl: path,
          clientIp: ip,
          latitude: location.latitude,
          longitude: location.longitude,
          clientBrowser: browser,
          device: device,
          identity: identity,
        });
      } catch (error) {
        console.error("Error posting analytics:", error);
      }
    };

    postAnalytic();
  }, [pathname, searchParams]); // Triggers whenever the route or search params change

  return <></>;
};

export default Analytics;
