import { useQuery } from "@tanstack/react-query"
import api from "../lib/Api/ApiClient";
import { FolderArchive, Loader } from "lucide-react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement,
  PointElement,  Title, Filler} from 'chart.js';

import { Line ,  Doughnut  } from "react-chartjs-2";
import {Empty,EmptyContent,EmptyDescription, EmptyHeader,EmptyMedia,EmptyTitle} from "@/components/ui/empty"
import {Button } from '@/components/ui/button';

import useThemeStore from "../lib/Store/ThemeStore";
import { useNavigate } from "react-router";



ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels, LineElement,
  PointElement,  Title, Filler);


    



const ReportPage = () => {

    const navigate = useNavigate()

    const { theme }= useThemeStore()
 
     const {data , error , isLoading }= useQuery({
       queryKey : ['trans'],
       queryFn : async () => {
           const response = await api.get('/transactions');
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
               <Empty className='h-3/4  flex justify-center items-center'>
                 <EmptyHeader>
                   <EmptyMedia variant="icon">
                     <FolderArchive />
                   </EmptyMedia>
                   <EmptyTitle>📊 No data Available.</EmptyTitle>
                   <EmptyDescription>
                     You haven&apos;t created any Transaction yet. Get started by
                     creating your first Expense.
                   </EmptyDescription>
                 </EmptyHeader>
                 <EmptyContent>
                   <div className="flex gap-2">
                     <Button onClick={()=> navigate('/dashboard/transactions')}>Add Expense</Button>
                   </div>
                 </EmptyContent>
               </Empty>
             );
       }


     const Expenses = data?.filter((item)=> item.type === 'expense');
     const Income = data?.filter((item)=> item.type === 'income');
    //  Total income 
      const totalExpense = Expenses?.reduce((sum, e) => sum + e.amount, 0);
      const totalIncome = Income?.reduce((sum, e) => sum + e.amount, 0);
      const totalBalance = totalIncome - totalExpense
        
       



      // Doughnut chart info 
      const Data = {
        labels: Expenses.map((e) => e.category),
        datasets: [
          {
            data: Expenses.map((e) => e.amount),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56" , "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"

            ], // customize colors
            borderRadius: 10, // rounded edges
            spacing: 2,       // space between segments

          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%", // controls thickness of doughnut
        plugins: {
          legend: {
            position: "right", // move labels to the left side
            labels: {
              usePointStyle: true,
              boxWidth: 20,
              pointStyle: "circle",
              padding: 15,
              color: `${theme == 'light' ? "#333" : "#fff"}`,
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          datalabels: {
            color: "#fff",
            formatter: (value) => {
              const percentage = ((value / totalExpense ) * 100).toFixed(1) + "%";
              return percentage;
            },
            font: {
              weight: "bold",
              size: 12,
            },
          },
        },
      };

      // Line Chart 
      // const FakeDays = ["Day-1", "Day-2", "Day-3", "Day-4" , "Day-5","Day-6", "Day-7", "Day-8"];
      const labelData = data.map((i, idx) => `Day-${idx+1}`);

      const DataLine = {
        labels: labelData,
        datasets: [
          {
            label: "Income",
            data: Income.map((i) => i.amount),
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            fill: true,
            pointBorderWidth: 2,
            pointBackgroundColor: "rgba(0,255,0,0.6)",
            tension: 0.4,
            pointRadius: 4,
            yAxisID: "yIncome", // ✅
          },
          {
            label: "Expense",
            data: Expenses.map((e) => e.amount),
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            yAxisID: "yExpense", // ✅
          },
        ],
      };
     // Line chart options s
         const lineOptions = {
           responsive: true,
           maintainAspectRatio: false,
           plugins: {
             legend: {
               position: "top",
               labels: {
                 color: "#333",
                 font: { size: 14, weight: "bold" },
               },
             },
             tooltip: {
               enabled: true,
               backgroundColor: "#222",
               titleColor: "#fff",
               bodyColor: "#fff",
             },
             datalabels: {
              display: false, // ✅ hides numbers on dots
             },
           },
           scales: {
             x: {
               grid: {
                 display: false,
               },
               ticks: {
                 color: "#666",
               },
             },

             // 🔹 Income Axis (LEFT)
             yIncome: {
               type: "linear",
               position: "left",
               beginAtZero: true,
               grid: {
                 color: "rgba(200,200,200,0.2)",
               },
               ticks: {
                 color: "green",
               },
             },

             // 🔹 Expense Axis (RIGHT)
             yExpense: {
               type: "linear",
               position: "right",
               beginAtZero: true,
               grid: {
                 drawOnChartArea: false, // ✅ prevents messy grid
               },
               ticks: {
                 color: "red",
               },
             },
           },
         };

   





  return (
    <div className="bg-card h-min-screen p-6 ">
      <h1 className="text-2xl font-medium py-2">Reports & insights</h1>
      <p className="font-medium">
        Understand your Spending patterns and Financial trends
      </p>
      {/* expense category */}
      {Expenses.length === 0 ? (
         <Empty >
                 <EmptyHeader>
                   <EmptyMedia variant="icon">
                     <FolderArchive />
                   </EmptyMedia>
                   <EmptyTitle>📉No Expense data Available.</EmptyTitle>
                   <EmptyDescription>
                     You haven&apos;t made any Expense yet. when you spend it it will appear here
                   </EmptyDescription>
                 </EmptyHeader>
               </Empty>
      ) : (
        <div className="border my-2">
          <h1 className="text-2xl  font-medium p-2 border-b ">
            Spending by category
          </h1>
          <div className="bg-card p-2 w-full max-w-xl  h-80  m-auto">
            <Doughnut data={Data} options={options} />
          </div>
          <div className="border-t p-2 flex justify-around items-center">
            <div className="flex flex-col">
              <span className="text-lg font-bold ">${totalBalance}</span>
              <span>Balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-red-500">
                ${totalExpense}
              </span>
              <span>Expense</span>
            </div>
          </div>
        </div>
      )}
      {/* Income vs Expense */}
      <div className="border my-3">
        <h1 className="text-2xl font-medium p-2 border-b ">
          Income vs Expense
        </h1>
        <div className="bg-card p-2 w-full max-w-xl  h-90 m-auto">
          <Line data={DataLine} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}

export default ReportPage