import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import api from '../lib/Api/ApiClient';
import useAuthstore from '../lib/Store/AuthStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";









const HomeDashboard = () => {


      const { user } = useAuthstore()
     const [result , setResult ] = useState([])
  
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

    console.log("All:",Alltrans.All);
    console.log("income", Alltrans.Income);
    console.log('expense', Alltrans.expense);

    console.log('Totatl Income', TotalIncome);
    console.log('Totatl Expense', TotalExpense);
    console.log('Total Balence :', TotalBalance);


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
        <div className='py-3'>
          <Tabs defaultValue="All" className="w-full">
            <TabsList className='w-full my-1'>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Income">Income</TabsTrigger>
              <TabsTrigger value="Expense">Expense</TabsTrigger>
            </TabsList>
             <hr />
            <TabsContent value="All">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="Income">
               Income Values
            </TabsContent>
            <TabsContent value="Expense">
              Expense value
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard