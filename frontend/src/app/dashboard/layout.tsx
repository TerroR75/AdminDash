import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  <div className="h-screen flex">
    <div className='w-[14%] md:w-[8%] lg:w-[14%] xl:w-[14%]'>
        <Link href="/" className="flex justify-center py-6"> 
        <Image src="/logo.png" alt="" width={100} height={100}/>
        <span className="hidden lg:block font-bold"></span>
        </Link>
        <Menu/>
    </div>
    <div className='w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll'>
        <Navbar/>
        {children}
    </div>
  </div>
}
