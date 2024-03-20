import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,

} from "@/components/ui/drawer"

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import useDeviceDetect from "@/lib/hooks/use-media-query";
import { Select } from "./ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { get_emotions } from "@/services/moods";

export const AddMood = ({ indexX, indexY, addMood, open = false, setOpen }) => {

  const [emotionOptions, setEmotionOptions] = useState([])
  const [selectedDate, setSelectedDate] = useState()

  const {isMobile} = useDeviceDetect()
  const handleSubmit = (e) => {
    //obtiene la data del formulario
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const body = Object.fromEntries(dataForm.entries());
    console.log(body);

    const emotionId = emotionOptions.find((item) => item.name === body.emotion).id
    const data = { emotion_id: emotionId, date: selectedDate, description: body.description};
    
    //simula cargar a la base de datos
    addMood(data);
  };
  
  const PortalDialog = isMobile ? Drawer : Dialog
  const PortalDialogHeader = isMobile ? DrawerHeader : DialogHeader
  const PortalDialogClose = isMobile ? DrawerClose : DialogClose
  const PortalDialogContent = isMobile ? DrawerContent : DialogContent
  
  useEffect(() => {
    const getSelects = async () => {
      const data = await get_emotions()
      setEmotionOptions(data.data)
    }
    getSelects()
  }, [])

useEffect(() => {
  setSelectedDate(new Date(2024, indexX, indexY).toISOString().slice(0, 10))
}, [indexX, indexY])

  return (
    <>
      <>
      <PortalDialog modal onOpenChange={setOpen} open={open}>
          <PortalDialogHeader>
            <PortalDialogClose asChild className="absolute top-0 right-0 m-0">
              <Button variant="icon" size="icon" />
            </PortalDialogClose>
          </PortalDialogHeader>

          <PortalDialogContent className="w-100">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  {new Date(2024, indexX, indexY).toLocaleString("ES-AR", {
                    dateStyle: "medium",
                  })}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Actualiza como te sientes este dia.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor='emotion'>Emotion</Label>
                  <Select className='col-span-2 h-8' name="emotion">
                    <SelectTrigger className="w-[176px]">
                      <SelectValue placeholder='Select a emotion'/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {emotionOptions.map((item, index) => {
                          return <SelectItem key={index} value={item.name}><div style={{color: `${item.color}`}}>{item.name}</div></SelectItem>
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Details</Label>
                  <Textarea
                    name="description"
                    id="maxWidth"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
              <Button type="submit">Cargar Dia</Button>
            </form>
          </PortalDialogContent>
        </PortalDialog>
      </>
    </>
  );
};
export default AddMood;
