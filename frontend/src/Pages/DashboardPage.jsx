import { ArrowRightLeft,ChartColumn, LayoutDashboard, LogOut,Menu, Moon, Sun, UserStar, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link, Outlet, useNavigate } from "react-router";
import useAuthstore from "../lib/Store/AuthStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Sheet,
   SheetContent,
   SheetClose,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useThemeStore from "../lib/Store/ThemeStore";
import { useQueryClient } from "@tanstack/react-query";








const DashboardPage = () => {
   const { setTheme } = useThemeStore()
   const { user, clearAuth } = useAuthstore();
   const [isOpen, setisOpen] = useState(true);

    const navigate = useNavigate();
    const queryclient = useQueryClient()  


    const handleLogout = ()=>{
        clearAuth();
        queryclient.clear();
        navigate('/login', {replace : true })
    }







   return (
     <div className="min-h-screen">
       {/* labtop designn */}
       <div className="hidden md:flex  min-h-screen">
         {/* left bar */}
         <div className="border-r bg-card ">
           {/* nav */}
           <div className="bg-card border-b  p-2 sticky top-0">
             <span className="font-medium text-2xl text-chart-4 ">Finance</span>
             {isOpen && <span className="pl-2 text-xl ">Tracker</span>}
           </div>

           <div className="h-110 flex flex-col gap-6 px-2 py-6 border-b sticky top-15">
             <Link to="/dashboard" className="flex items-center space-x-2">
               <LayoutDashboard className="w-6 h-6" />
               {isOpen && <span>Dashboard</span>}
             </Link>
             <Link
               to="/dashboard/transactions"
               className="flex items-center space-x-2"
             >
               <ArrowRightLeft />
               {isOpen && <span>Transactions</span>}
             </Link>
             <Link
               to="/dashboard/report"
               className="flex items-center space-x-2"
             >
               <ChartColumn />
               {isOpen && <span>Reports</span>}
             </Link>
             {user.role == "admin" && (
               <Link
                 to="/dashboard/admin"
                 className="flex items-center space-x-2"
               >
                 <UserStar />
                 {isOpen && <span>Admin</span>}
               </Link>
             )}
           </div>
           <div className="fixed bottom-0 ">
             <div className="flex p-2">
               <Avatar className="h-10 w-10 ">
                 <AvatarImage src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg" />
                 <AvatarFallback>CN</AvatarFallback>
               </Avatar>
               <div className="flex flex-col overflow-hidden ">
                 {isOpen && (
                   <span className="font-medium text-lg">{user.name}</span>
                 )}
                 {isOpen && <span>{user.email}</span>}
               </div>
             </div>
             <div className="p-2 ">
               <Button onClick={handleLogout}>
                 <LogOut />
                 Logout
               </Button>
             </div>
           </div>
         </div>
         {/* right bar  */}
         <div className="flex-1">
           <div className="bg-card flex items-center justify-between p-1 border-b sticky top-0">
             <div className="flex space-x-2">
               <Menu onClick={() => setisOpen(!isOpen)} />
               {/* <h1>Dashboard</h1> */}
             </div>
             <div className="flex items-center space-x-4 mr-5">
               <div>
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon">
                       <Sun className="h-4 w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                       <Moon className="absolute h-4 w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                       <span className="sr-only">Toggle theme</span>
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={() => setTheme("light")}>
                       <Sun /> Light
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTheme("dark")}>
                       <Moon /> Dark
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTheme("system")}>
                       🖥️ System
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               </div>
               <Avatar className="h-10 w-10">
                 <AvatarImage src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg" />
                 <AvatarFallback>CN</AvatarFallback>
               </Avatar>
             </div>
           </div>
           {/* main component */}
           <div className="bg-card min-h-screen">
             <Outlet />
           </div>
         </div>
       </div>

       {/* mobile  design  */}
       <div className="md:hidden">
         <div className="bg-card py-2 px-4 border-b  flex  items-center justify-between sticky top-0">
           <Sheet>
             <SheetTrigger asChild>
               <Menu />
             </SheetTrigger>
             <SheetContent>
               <SheetHeader>
                 <SheetTitle>
                   <div className="bg-card border-b  p-2">
                     <span className="font-medium text-2xl text-chart-1">
                       Finance
                     </span>
                     <span className="pl-2 text-xl">Tracker</span>
                   </div>
                 </SheetTitle>

                 <div className="h-100 flex  flex-col gap-6 px-2 py-6 border-b">
                   <Link to="/dashboard">
                     <SheetClose className="flex items-center space-x-2 cursor-pointer">
                       <LayoutDashboard className="w-6 h-6" />
                       <span>Dashboard</span>
                     </SheetClose>
                   </Link>
                   <Link to="/dashboard/transactions">
                     <SheetClose className="flex items-center space-x-2 cursor-pointer">
                       <ArrowRightLeft />
                       <span>Transactions</span>
                     </SheetClose>
                   </Link>
                   <Link to="/dashboard/report">
                     <SheetClose className="flex items-center space-x-2 cursor-pointer">
                       <ChartColumn />
                       <span>Reports</span>
                     </SheetClose>
                   </Link>
                   {user.role == "admin" && (
                     <Link to="/dashboard/admin">
                       <SheetClose className="flex items-center space-x-2 cursor-pointer">
                         <UserStar />
                         <span>Admin</span>
                       </SheetClose>
                     </Link>
                   )}
                 </div>

                 <div className="flex p-2">
                   <Avatar className="h-10 w-10">
                     <AvatarImage src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg" />
                     <AvatarFallback>CN</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col overflow-hidden">
                     <span className="font-medium text-lg">{user.name}</span>
                     <span>{user.email}</span>
                   </div>
                 </div>
                 <div className="p-2 ">
                   <Button onClick={handleLogout}>
                     <LogOut />
                     Logout
                   </Button>
                 </div>
               </SheetHeader>
             </SheetContent>
           </Sheet>
           <div className="flex items-center space-x-4 mr-5">
             <div>
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="outline" size="icon">
                     <Sun className="h-4 w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                     <Moon className="absolute h-4 w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                     <span className="sr-only">Toggle theme</span>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                   <DropdownMenuItem onClick={() => setTheme("light")}>
                     <Sun /> Light
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setTheme("dark")}>
                     <Moon /> Dark
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setTheme("system")}>
                     🖥️ System
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             </div>
             <Avatar className="h-10 w-10">
               <AvatarImage src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg" />
               <AvatarFallback>CN</AvatarFallback>
             </Avatar>
           </div>
         </div>

         {/* main component */}

         <div className="bg-card">
           <Outlet />
         </div>
       </div>
     </div>
   );
};

export default DashboardPage;
