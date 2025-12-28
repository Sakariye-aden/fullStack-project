import React, { useState } from 'react'
import {Button} from'@/components/ui/button'
import { useQuery } from '@tanstack/react-query';
import api from '../lib/Api/ApiClient';
import {  Loader, Pencil, Trash } from 'lucide-react';
import {
  Dialog, DialogClose,DialogContent,DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select,SelectContent,
  SelectItem,SelectTrigger,SelectValue,
} from "@/components/ui/select"





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

const incomeCatag = ["food & drink", "Housing", "Transport","Shoping","Health","Education","Entertainment","Bills & utility"]
//  expense category 
const expenseCatg= ["Salary", "Freelance", "Business","Investiment","Refound","other income"]








 const TransactionPage = () => {

      const [isEdit , setisEdit ] = useState(null)
      const [isOpen, setIsOpen]= useState(false)

   
       const HandleOpen = ()=>{
         setIsOpen(false)
         setisEdit(null)
       }
       
       const handleEdit = (item)=>{
        //  setIsOpen(true)
           setisEdit(item)
       }


       

             //  transactionQuery
      const {data , error, isLoading } = useQuery({
        queryKey: ['trans'],
        queryFn : async () => {
           const response = await api.get('/transactions');
            console.log('response trans :', response);
 
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
   



  return (
    <div className="bg-card h-screen p-6 ">
      <h1 className="text-2xl font-medium py-2">Transactions</h1>
      <div className="flex justify-between items-center my-2">
        <p className="font-medium">
          View and Manage all your income and expense you've added to your
          account
        </p>
        <Button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          Add Transaction
        </Button>
      </div>

      {/* summary card  */}
      <div className="flex space-x-3 md:space-x-6 p-3  md:p-6">
        <div className="bg-blue-500 w-full p-2 flex flex-col  rounded-md shadow-xl">
          <span className="font-medium text-lg">Transactions</span>
          <span>{30}</span>
        </div>
        <div className="bg-green-500 w-full p-2 flex flex-col rounded-md shadow-xl">
          <span className="font-medium text-lg">Income</span>
          <span>{30}</span>
        </div>
        <div className="bg-red-500 w-full p-2 flex flex-col  rounded-md shadow-xl">
          <span className="font-medium text-lg">Expense</span>
          <span>{30}</span>
        </div>
      </div>

      {/* Transaction Table  */}
      <div>
        <h2 className="text-xl font-medium py-2">
          Recent Transaction History{" "}
        </h2>
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg shadow-md">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md ">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Icon
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2">
                    {getCategoryIcon(item.category)}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{item.title}</td>
                  <td className="px-4 py-2 text-gray-600">{item.category}</td>
                  <td className="py-2 text-gray-500">
                    {formatShortDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-2 font-medium text-green-600">
                    ${item.amount}
                  </td>
                  <td className="px-4 py-2 flex ">
                    <button
                      className="p-1  text-sm  rounded cursor-pointer "
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>
                    <button className="p-1 text-sm rounded cursor-pointer">
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Dialog */}
      <Dialog open={isOpen || !!isEdit} onOpenChange={HandleOpen}>
        <form>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Editing Transaction " : "Adding Transaction"}
              </DialogTitle>
              <DialogDescription>
                {isEdit ? "Make changes to your " : "Adding "}
                Transaction here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="@peduarte"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="type">category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">income</SelectItem>
                    <SelectItem value="expense">expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  min={1}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">income</SelectItem>
                    <SelectItem value="expense">expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default TransactionPage