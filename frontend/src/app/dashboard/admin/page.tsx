import AllInfo from "@/components/AllInfo"
import ClientsChart from "@/components/ClientsChart"
import Cominfo from "@/components/Cominfo"
import FinancialChart from "@/components/FinancialChart"

import ProductivityChart from "@/components/ProductivityChart"
import ProjectProgress from "@/components/ProjectProgress"
import TopCalendar from "@/components/TopCalendar"


const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/*lewy-panel*/}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
       {/*Informacje ogólne*/}
       <div className='flex gap-4 justify-between flex-wrap'>
        <Cominfo/>
       </div>
       {/*WYKRESY NA ŚRODKU*/}
       <div className='flex gap-4 flex-col lg:flex-row'>
        {/*ZYSKI WYKRES NA ŚRODKU*/}
        <div className='w-full gl:w-1/3 h-[450px]'> 
        <FinancialChart/>
        </div>
        {/*PRODUKTYWNOŚĆ NA ŚRODKU*/}
        <div className='w-full gl:w-2/3 h-[450px]'> <ProductivityChart/> </div>
       </div>
       {/*WYKRESY POD*/}
       <div className="w-full h-[500px]">
        <ClientsChart/>
        <ProjectProgress/>
       </div>
      </div>
      {/*prawy-panel*/}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <TopCalendar/>
      <AllInfo/>
     
      </div>

    </div>
  )
}

export default AdminPage