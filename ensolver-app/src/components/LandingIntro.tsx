import { ArrowRight, Copyright, NotebookPen } from "lucide-react";
import React from "react";
import Image from "next/image";
import centralImage from "../../public/Captura de pantalla 2024-01-27 205842.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

const LandingIntro = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-36">
      <div className="flex items-center border shadow-sm uppercase text-blue-600 font-medium bg-blue-100 p-4 rounded-full mb-4">
        <NotebookPen className="h-6 w-6 mr-2" />{" "}
        <span className="mr-1 text-blue-900">LucaNotion</span> is now available!
      </div>
      <h1 className=" text-center max-w-4xl text-7xl font-bold">
        Organize your <span className="text-blue-600">tasks</span> in seconds
      </h1>
      <p className=" mt-4 text-center max-w-xs md:max-w-2xl text-sm md:text-xl text-slate-400">
        Discover LucaNotion, your space to create notes that go further,
        organize everything the way you want and make notes come to life.
      </p>
      <Link href={"/dashboard"}>
        <Button size="lg" variant="primary" className=" mt-6 text-base">
          Get Started <ArrowRight className="ml-2" />
        </Button>
      </Link>

      {/* Imagen y bolas difumindas */}
      <div>
        <div className=" relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          {/* imagen central */}
          <div>
            <div className=" mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src={centralImage}
                    width={1364}
                    height={866}
                    alt="product preview"
                    quality={100}
                    className="rounded-md bg-white  shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Bolas difuminadas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* pasos a seguir */}
      <div className=" mx-auto mb-20 mt-20 max-w-5xl ">
        <div className="mb-12 px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Start organizing yourself in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 ">
              Making notes have never been easier than with LucaNotion.
            </p>
          </div>
        </div>

        {/* steps */}

        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">Step 1</span>
              <span className=" text-xl font-semibold">
                Sing up for the account
              </span>
              <span className="mt-2 text-zinc-700">
                Login with your Google Account
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">Step 2</span>
              <span className=" text-xl font-semibold">
                Create Notes or Categories
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your notes and make it ready for you to
                organize.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">Step 3</span>
              <span className=" text-xl font-semibold">Enjoy the app</span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out LucaNotion today
              </span>
            </div>
          </li>
        </ol>
      </div>
      {/* footer */}
      <Separator />
      <div className="flex mt-5 mb-10">
        <Copyright />
        <p className="pl-2 text-gray-500">
          Copyright Luca Frisoni. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default LandingIntro;
