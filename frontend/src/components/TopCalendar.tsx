"use client"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const events = [
    {
        id: 1,
        title:"Lorem ipsum dolor",
        time:"12:00 - 14:00",
        description:"Lorem ipsum dolor",
    }
]

const TopCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className='bg-white p-4 rounded-md'> 
        <Calendar onChange={onChange} value={value} />
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold my-4'>Wydarzenia</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}/>
        </div>
        <div className='flex flex-col gap-4'>
            {events.map(event=>(<div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-red-400 event:border-t-red-400' key={event.id}>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold text-black-400'>{event.title}</h1>
                    <span className='text-gray-300 text-xs'>{event.time}</span>
                </div>
                <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
            </div>))}
        </div>
        </div>
    )
}

export default TopCalendar