import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { NeighborhoodForm } from "../form/neighborhood-form";

export default function NeighborhoodModal() {
  return (
    <Dialog>
      <Button>
        <DialogTrigger>Criar Novo Bairro +</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Criar novo bairro</DialogTitle>
          <NeighborhoodForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
