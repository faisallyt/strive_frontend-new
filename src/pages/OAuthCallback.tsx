import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { handleOAuthCallback } from "@/Auth/GoogleAuth";
const OAuthCallback = ({setLoader=(t:boolean)=>{}}) => {
  const router = useRouter();

  const handleCallback = async () => {
    const { code } = router.query;

    const res = await handleOAuthCallback(code as string);
    if (res) {
      window.location.href="/"
    }
  };

  useEffect(() => {
    handleCallback();
  }, [router.query]);

  useEffect(() => {
    setLoader(false);
    return () => {
      setLoader(true);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white">Processing...</p>
    </div>
  );
};

export default OAuthCallback;
