import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CityForm } from "../form/city-form";
import { DatePicker } from "../ui/datepicker";

export default function CityModal() {
  return (
    <Dialog>
      <Button>
        <DialogTrigger>Criar Nova Cidade +</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Criar nova cidade</DialogTitle>
          <CityForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
