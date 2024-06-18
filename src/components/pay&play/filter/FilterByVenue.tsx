import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { RootState } from "@/store"
import { setParams } from "@/store/actions/slices/groundSlice"
import { setSelectedVenue, useGetVenueQuery } from "@/store/actions/slices/venueSlice"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"

const FilterByVenue = () => {
   
    const dispatch = useDispatch()
    useGetVenueQuery({})
    const venue = useAppSelector((state: RootState) => state.venue.venues)
    const selectedVenue = useAppSelector((state: RootState) => state.venue.selectedVenue);
    const handleCheckboxChange = (venueId: string) => {
      dispatch(setSelectedVenue({ venueId: venueId }));
  
      const updatedIds = selectedVenue.includes(venueId)
        ? selectedVenue.filter((id) => id !== venueId)
        : [...selectedVenue, venueId];
      dispatch(setParams({ key: 'venue', data: updatedIds }));
    };
  
    return (
        <div className='w-[100%] bg-white rounded-lg'>
            <Accordion type="single" collapsible className="w-full border rounded-md px-6" defaultValue="item-1">
                <AccordionItem value="item-1" className='border-b-0 p-0'>
                    <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' state={"open"}>Select Venue</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        {venue?.map((item: {
                            id: string,
                            name: string
                        }, index: number) => {
                            return (
                                <div key={index} className="items-top flex space-x-2">
                                    <Checkbox id={item.id} checked={selectedVenue.includes(item.id)} onCheckedChange={() => {
                                        handleCheckboxChange(item.id)

                                    }} />
                                    <label
                                        htmlFor={item.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item?.name}
                                    </label>
                                </div>
                            )
                        })}

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FilterByVenue