import { RootState } from "@/store";
import { removeSelectedProomo, setNewPrice, setSelectedPromo, useApplyPromoMutation, useGetPromoQuery } from "@/store/actions/slices/promoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { GiTicket } from "react-icons/gi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IPromo } from "@/interface/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BsPatchCheckFill } from "react-icons/bs";

const Coupan = () => {
  const dispatch = useAppDispatch()
  const { totalPrice, selectedGroundId, selectedSlots } = useAppSelector((state: RootState) => state.slots);
  const getPromo = useGetPromoQuery({ ground: selectedGroundId });
  const [applyPromo] = useApplyPromoMutation(); // Initialize the mutation hook
  const selectedPromo = useAppSelector((state: RootState) => state.promocode.selectedPromo)

  useEffect(() => {
    getPromo.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroundId]);



  const handleApply = (promo: IPromo) => {
    dispatch(setSelectedPromo({ promo: promo }));
    applyPromo({ id: promo.id, ground: selectedGroundId, amount: totalPrice })
      .then(response => {
        dispatch(setNewPrice({ data: response.data?.data }))
      })
      .catch(error => {
        console.error("Failed to apply promo", error);
      });
  };

  const handleRemove = () => {
    dispatch(removeSelectedProomo());
  }
  const handleDisable = (id: string) => {
    if (selectedSlots.length <= 0) {
      return true;
    }
    else {
      if (selectedPromo && (selectedPromo?.id == id)) {
        return true;
      }
      else {
        return false;
      }
    }

  }
  const { newPrice } = useAppSelector((state: RootState) => state.promocode);
  return (

    <div className='w-[100%] bg-white rounded-lg'>
      <Accordion type="single" collapsible className="w-full border rounded-md">
        <AccordionItem value="item-1" className='border-b-0 p-0'>
          <AccordionTrigger className='no-underline flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4' state={"open"}>
            <GiTicket size={24} />
            <div className="flex flex-col me-auto">
              <span className="inline-block text-[16px] text-[#000000] font-semibold">Apply Coupon</span>
              <span className="inline-block text-xs text-gray-400">Get Discount by Applying Coupon</span>
            </div>

          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 p-0">
            {selectedPromo !== null && <div className="flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4">
              <div className="flex flex-col me-auto">
                <span className="inline-block text-[16px] text-[#ccc] font-semibold">Coupan Code</span>
                <span className="inline-block text-[16px] text-[#ccc] font-semibold">{selectedPromo?.code}</span>
              </div>
              <Button className="w-[60px] h-[24px] bg-[#C83232] text-[12px] flex items-center hover:bg-[#C83232] " onClick={() => handleRemove()}>Remove</Button>
            </div>}

            {getPromo.data != undefined && getPromo.data?.data.map((item: IPromo, index: number) => {
              return (

                <div key={index} className="flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4">
                  <GiTicket color='#53A53F' size={24} />
                  <div className="flex flex-col me-auto">
                    <span className="inline-block text-[16px] text-[#53A53F] font-semibold">{item.code}</span>
                    <span className="inline-block text-xs text-gray-400"> valid till {item.valid_upto}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-[60px] h-[24px] bg-[#53A53F] text-[12px] flex items-center hover:bg-[#53A53F] p-1" disabled={handleDisable(item.id)} onClick={() => handleApply(item)}>{selectedPromo && (selectedPromo?.id == item.id) ? 'Applied' : 'Apply'}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader className=" flex flex-col items-center ">
                        <DialogTitle><BsPatchCheckFill size={36} color="#53A53F" /></DialogTitle>
                        <DialogDescription className="text-[24px]">
                          ₹{newPrice.discount} saved with {item.code}!
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-center">
                        <span className="inline-block text-[16px] text-[#53A53F]">Awesome!!</span>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                </div>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Coupan