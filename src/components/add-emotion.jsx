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
import ColorPicker from "./ui/color-picker";
import { Input } from "./ui/input";

import useDeviceDetect from "@/lib/hooks/use-media-query";
import { Select } from "./ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AddEmotion = ({ open = false, setOpen, addEmotion }) => {

  const {isMobile} = useDeviceDetect()
  const handleSubmit = (e) => {
    //obtiene la data del formulario
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const body = Object.fromEntries(dataForm.entries());
    console.log(body);

    const data = { color: body.color, name: body.emotion};
    
    //carga a la base de datos
    addEmotion(data);
    Swal.fire({
      title: 'Emotion Added',
      icon: 'success'
    })
  };
  
  const PortalDialog = isMobile ? Drawer : Dialog
  const PortalDialogHeader = isMobile ? DrawerHeader : DialogHeader
  const PortalDialogClose = isMobile ? DrawerClose : DialogClose
  const PortalDialogContent = isMobile ? DrawerContent : DialogContent

  return (
    <>
      <>
      <PortalDialog modal onOpenChange={setOpen} open={open}>
          <PortalDialogHeader>
            <PortalDialogClose asChild className="absolute top-0 right-0 m-0">
              <Button variant="icon" size="icon" />
            </PortalDialogClose>
          </PortalDialogHeader>

          <PortalDialogContent className="w-80">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                    Agrega una nueva emocion!!
                </h4>
                <p className="text-sm text-muted-foreground">
                  Borrar?
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor='emotion'>Emotion</Label>
                  <Input className='col-span-2 h-8' name="emotion"></Input>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Color</Label>
                  <ColorPicker name='color' isDisabled={false}/>
                </div>
              </div>
              <Button type="submit">Cargar Emocion</Button>
            </form>
          </PortalDialogContent>
        </PortalDialog>
      </>
    </>
  );
};
export default AddEmotion;
