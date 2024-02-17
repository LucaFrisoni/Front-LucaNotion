import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/Free_Sample_By_Wix.jpg";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

interface HeaderProps {
  children: React.ReactNode;
}
const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});
const Header = async ({ children }: HeaderProps) => {
  const user = await currentUser();
  return (
    <div className="h-full">
      <div className=" w-full h-[58px] bg-white border-b-2  flex justify-between">
    
          <Link href={"/"} className="pl-[15%]">
            <div className="h-full flex items-center justify-center hover:bg-neutral-500/10 rounded-full transition p-2">
              <Image src={logo} alt="logo" className="w-10 h-10 rounded-md " />
              <p
                className={cn(
                  "pl-2 text-lg text-neutral-700 ",
                  headingFont.className
                )}
              >
                LucaNotion
              </p>
            </div>
          </Link>
        
        <div className="h-full flex items-center justify-center pr-[15%]">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/dashboard">
              <Button size="lg">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
export default Header;
