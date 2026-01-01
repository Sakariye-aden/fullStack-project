import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { FolderArchive, Loader } from 'lucide-react';
import { useState } from 'react';
import api from '../lib/Api/ApiClient';
import useAuthstore from '../lib/Store/AuthStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Empty,EmptyContent,EmptyDescription, EmptyHeader,EmptyMedia,EmptyTitle} from "@/components/ui/empty"

import {Button } from '@/components/ui/button';
import { useNavigate } from 'react-router'

// income category 
const incomeCatag = ["food & drink", "Housing", "Transport","Shoping","Health","Education","Entertainment","Bills & utility"]
//  expense category 
const expenseCatg= ["Salary", "Freelance", "Business","Investiment","Refound","other income"]

function getCategoryIcon(categoryName) {
  switch (categoryName) {
    // Income categories
    case "food & drink":
      return "🍔";       // 
    case "housing":
      return "🏠";           // 
    case "transport":
      return "🚗";            // 
    case "shoping":
      return "🛍️";    // 🛒
    case "health":
      return "❤️";      // 
    case "education":
      return "🎓";  // 
    case "entertainment":
      return "🎬";           // 
    case "bills & utility":
      return "💡";           // 

    // Expense categories
    case "salary":
      return "💵";  // 
    case "freelance":
      return "💻";     // 
    case "business":
      return "📈";      // 
    case "investiment":
      return "📊";      // 
    case "refound":
      return "🔄";           // 
    case "other income":
      return "🌐";          // 

    // Default fallback
    default:
      return "❓"; // 
  }
}


function formatShortDate(dateInput) {
  // Ensure we have a Date object
  const date = new Date(dateInput);
  // Options for short month, numeric day, and year
  const options = { month: "short", day: "numeric", year: "numeric" };
  // Use Intl.DateTimeFormat for proper localization
  return new Intl.DateTimeFormat("en-US", options).format(date);
}






const HomeDashboard = () => {


      const { user } = useAuthstore()
     
  
     const navigate = useNavigate()

    //  transactionQuery
      const {data , error, isLoading } = useQuery({
        queryKey: ['trans'],
        queryFn : async () => {
           const response = await api.get('/transactions');
            // console.log('response trans :', response);
 
            return response.data
         }
      })
     

       if(isLoading){
       return (
          <div className='h-screen flex justify-center items-center'>
             <Loader className='animate-spin text-3xl' />
          </div>
       )
    }
   
     if (data.length === 0) {
       return (
         <Empty>
           <EmptyHeader>
             <EmptyMedia variant="icon">
               <FolderArchive />
             </EmptyMedia>
             <EmptyTitle>No data Yet</EmptyTitle>
             <EmptyDescription>
               You haven&apos;t created any Transaction yet. Get started by
               creating your first project.
             </EmptyDescription>
           </EmptyHeader>
           <EmptyContent>
             <div className="flex gap-2">
               <Button onClick={()=> navigate('/dashboard/transactions')}>Add transaction</Button>
             </div>
           </EmptyContent>
         </Empty>
       );
     }
    
     const getTransAll = ()=>{
        const Alltrans = {
           All : data.map((item)=> item ) ,
           Income : data.filter((item)=> item.type === 'income'),
           expense : data.filter((item)=> item.type === 'expense')
        }

         const TotalIncome = Alltrans.Income.reduce((acc, curr) => acc + curr.amount, 0);
         const TotalExpense = Alltrans.expense.reduce((acc, curr) => acc + curr.amount, 0);
         const TotalBalance = TotalIncome - TotalExpense

        return {  Alltrans, TotalIncome, TotalExpense, TotalBalance}
     }

    const {Alltrans , TotalIncome, TotalExpense, TotalBalance } = getTransAll()



  


  return (
    <div className="bg-card h-min-screen p-4">
      <h1 className="text-2xl font-medium ">Hello, {user.name} 👏</h1>
      {/* cards */}
      <div>
        <div className="my-4">
          <Card className="bg-linear-to-r from-green-500 to-green-600">
            <CardContent className="h-12 flex flex-col text-primary-foreground">
              <span>Total Balance</span>
              <span className="text-2xl font-medium">${TotalBalance}</span>
            </CardContent>
          </Card>
        </div>
        <div className="flex space-x-4 my-3">
          <Card className="w-full bg-linear-to-r from-green-500 to-green-600">
            <CardContent className="h-12 flex flex-col text-primary-foreground">
              <span>Income</span>
              <span className="text-2xl font-medium">${TotalIncome}</span>
            </CardContent>
          </Card>

          <Card className=" w-full bg-linear-to-r from-red-500 to-red-600">
            <CardContent className="h-12 flex flex-col text-primary-foreground">
              <span>Expenses</span>
              <span className="text-2xl font-medium">${TotalExpense}</span>
            </CardContent>
          </Card>
          <Card className=" w-full bg-linear-to-r from-blue-500 to-blue-600">
            <CardContent className="h-12 flex flex-col text-primary-foreground">
              <span>Savings</span>
              <span className="text-2xl font-medium">${12600}</span>
            </CardContent>
          </Card>
        </div>
      </div>
      {/*last transations  */}
      <div className="bg-background p-4 shadow-lg mt-8 rounded-md">
        <h1 className="text-xl font-medium border-b pb-2">
          Recent Transactions
        </h1>
        <div className="py-3">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="w-full my-1">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Income">Income</TabsTrigger>
              <TabsTrigger value="Expense">Expense</TabsTrigger>
            </TabsList>
            <hr />
            <TabsContent value="All">
              <div>
                {Alltrans.All.map((item) => (
                  <div
                    key={item}
                    className="bg-background border-b py-2  flex items-center space-x-2 "
                  >
                    <div className="text-5xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex justify-between items-center flex-1">
                      <div className="flex flex-col">
                        <span className="text-lg font-medium">
                          {item.title}
                        </span>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {item.type === "income" ? (
                            <span className="text-green-400 font-medium">
                              +${item.amount}
                            </span>
                          ) : (
                            <span className="font-medium text-red-500">
                              -${item.amount}
                            </span>
                          )}
                        </span>
                        <span>{formatShortDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="Income">
              {Alltrans.Income.length === 0 ? (
                <Empty className="flex justify-center items-center">
                  <EmptyHeader>
                    <EmptyTitle>No Income yet.</EmptyTitle>
                  </EmptyHeader>
                </Empty>
              ) : (
                Alltrans.Income.map((item) => (
                  <div
                    key={item}
                    className="bg-background border-b py-2  flex items-center space-x-2 "
                  >
                    <div className="text-5xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex justify-between items-center flex-1">
                      <div className="flex flex-col">
                        <span className="text-lg font-medium">
                          {item.title}
                        </span>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {item.type === "income" ? (
                            <span className="text-green-400 font-medium">
                              +${item.amount}
                            </span>
                          ) : (
                            <span className="font-medium">-${item.amount}</span>
                          )}
                        </span>
                        <span>{formatShortDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="Expense">
              {Alltrans.expense.length === 0 ? (
                <Empty className="flex justify-center items-center">
                  <EmptyHeader>
                    <EmptyTitle>No Expense yet.</EmptyTitle>
                  </EmptyHeader>
                </Empty>
              ) : (
                Alltrans.expense.map((item) => (
                  <div
                    key={item}
                    className="bg-background border-b py-2  flex items-center space-x-2 "
                  >
                    <div className="text-5xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex justify-between items-center flex-1">
                      <div className="flex flex-col">
                        <span className="text-lg font-medium">
                          {item.title}
                        </span>
                        <span>{item.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {item.type === "income" ? (
                            <span className="text-green-400 font-medium">
                              +${item.amount}
                            </span>
                          ) : (
                            <span className="font-medium text-red-500">
                              -${item.amount}
                            </span>
                          )}
                        </span>
                        <span>{formatShortDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard