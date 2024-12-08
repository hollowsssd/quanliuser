import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import TableData from "../components/tabledata";
import { Suspense } from "react";
import { Spinner } from "../components/spinner";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div>
      <Header />
    <div className="w-screen py-20 flex justify-center flex-col items-center">
    <div className="flex items-center justify-between gap-1 mb-5">
      <h1 className="text-4xl font-bold">Create Read Update and Delete Users</h1>
    </div>    
      <div className="overflow-x-auto">
        <div className="mb-2 w-full text-right">
          <Link
            href="/create"
            className="btn btn-primary">
            Create NewUser
          </Link>
        </div>
        <Suspense fallback={<Spinner />}>
          <TableData/>
        </Suspense>
    </div>  
  </div>
  </div>
    
  );
}
