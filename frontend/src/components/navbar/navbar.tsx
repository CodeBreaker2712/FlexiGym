"use client";
import { Button } from "@/components/ui/button";
import { INITIAL_LINKS, GYMOWNER_LINKS } from "@/lib/constants";
import Link from "next/link";
import Logo from "../logo/logo";
import { ProfileDropdown } from "../profile-dropdown/profile-dropdown";
import { ThemeToggler } from "../theme-toggler";
import { AuthContext } from "../../../Auth/AuthContext";
import {getProfileData} from '../../../Auth/AuthService'
import React, {useContext, useEffect, useState} from "react";
import MobileNav from "./mobile-nav";

interface LoggedInUser {
  firstName?: string;
  lastName?: string;
  gymName?: string;
  type?: string;
  email?: string;
  id?: string;
}

export default function NavBar() {
  const context = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userProfile = await getProfileData();
        if (userProfile) {
          // @ts-ignore
          setLoggedInUser(userProfile);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);


  // @ts-ignore
  const { isAuthenticated } = context;
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
      <div className="flex items-center gap-2">
        <Link href="/" prefetch={false}>
          <Logo />
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center gap-8">
            {loggedInUser?.type == 'user' && (
                <nav className="hidden md:flex items-center text-sm font-medium">

                    {INITIAL_LINKS.map((link, index) => {
                        return (
                            <Link key={index} href={link.ref} prefetch={false}>
                                <Button variant="link" className="px-2">
                                    {link.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            )}
            {loggedInUser?.type == 'gym' && (
                <nav className="hidden md:flex items-center text-sm font-medium">

                    {GYMOWNER_LINKS.map((link, index) => {
                        return (
                            <Link key={index} href={link.ref} prefetch={false}>
                                <Button variant="link" className="px-2">
                                    {link.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            )}

            <div className="hidden gap-2 md:flex">
                <ProfileDropdown/>
                <ThemeToggler/>
            </div>
            <div className="flex gap-2 md:hidden">
                <MobileNav/>
                <ThemeToggler/>
            </div>
        </div>
      ) : (
          <Link href="/login" prefetch={false}>
              <Button variant="link" className="px-2">
                  Join Now
              </Button>
        </Link>
      )}
    </header>
  );
}
