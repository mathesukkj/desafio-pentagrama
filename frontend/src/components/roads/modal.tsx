import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { RoadForm } from "../form/road-form";

export default function RoadModal() {
  return (
    <Dialog>
      <Button>
        <DialogTrigger>Criar Nova Rua +</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Criar nova rua</DialogTitle>
          <RoadForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
