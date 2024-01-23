"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
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
          src="/assets/images/ehlogo.svg"
          width={30}
          height={30}
          className="rounded-full"
          alt="logo"
        />
        <p className="logo_text">EasyHire</p>
      </Link>
      {/* Desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {" "}
            <Link href="/create-jobpost" className="blue_btn">
              Post a Job
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={35}
                height={35}
                className="rounded-full"
                alt="profile picture"
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
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              onClick={() => {
                setDropDown((prev) => !prev);
              }}
              alt="profile picture"
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
                    router.push("/");
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
