"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const getProvider = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    getProvider();
  }, []);
  return (
    <nav className="flex_between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex_center ">
        {" "}
        <Image
          src="/assets/images/EasyHire-Logo.svg"
          width={35}
          height={35}
          className="rounded-full"
        />
        <p className="logo_text">EasyHire</p>
      </Link>
      {/* Desktop */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            {" "}
            <Link href="/create-jobpost" className="blue_btn">
              Create Job Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/EasyHire-Logo.svg"
                width={35}
                height={35}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="blue_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile setup */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/EasyHire-Logo.svg"
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              onClick={() => {
                setDropDown((prev) => !prev);
              }}
            />
            {dropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}>
                  Profile
                </Link>
                <Link
                  href="/create-jobpost"
                  className="dropdown_link"
                  onClick={() => setDropDown(false)}>
                  Post a job
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setDropDown(false);
                    signOut();
                  }}
                  className="blue_btn w-full mt-5">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="blue_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
