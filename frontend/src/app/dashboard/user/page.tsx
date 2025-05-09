import AllInfo from "@/components/AllInfo"
import BigCalendar from "@/components/BigCalendar"
import TopCalendar from "@/components/TopCalendar"

const UserPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-sm">
        <h1 className="text-xl font-semibold">

        </h1>
        <BigCalendar/>
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
      <TopCalendar/>
      <AllInfo/>
      </div>
    </div>
  )
}

export default UserPage