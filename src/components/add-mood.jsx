import { Input } from "@/components/ui/input";
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

export const AddMood = ({ indexX, indexY, addMood, open = false, setOpen }) => {
  const {isMobile} = useDeviceDetect()
  const handleSubmit = (e) => {
    //obtiene la data del formulario
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const body = Object.fromEntries(dataForm.entries());
    console.log(body);
    const date = new Date(2024, indexX, indexY).toISOString().slice(0, 10);
    const data = { color: "#09f09f", date, details: "harcoded" };

    //simula cargar a la base de datos
    addMood(data);
  };

  const PortalDialog = isMobile ? Drawer : Dialog
  const PortalDialogHeader = isMobile ? DrawerHeader : DialogHeader
  const PortalDialogClose = isMobile ? DrawerClose : DialogClose
  const PortalDialogContent = isMobile ? DrawerContent : DialogContent


  return (
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
              <Label htmlFor="width">Emocion</Label>
              <Input
                required
                name="emosion"
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Detalles</Label>
              <Textarea
                name="detalles"
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button type="submit">Cargar Dia</Button>
        </form>
      </PortalDialogContent>
    </PortalDialog>
  );
};
export default AddMood;
