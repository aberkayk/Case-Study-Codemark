import { Table } from "@tanstack/react-table";
import { useAppDispatch } from "../../redux/app/hooks";
import { deleteTodo } from "../../redux/features/todo/todo-service";
import { Todo } from "../../types";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useState } from "react";
import AlertModal from "../modals/alert-modal";

interface Props {
  ids: number[];
  table: Table<Todo>;
}

const DeleteTodoByIdsButton = ({ ids, table }: Props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function onClick() {
    setOpen(true);
  }

  const onConfirm = async () => {
    setLoading(true);
    try {
      const promises = ids.map((id) =>
        dispatch(deleteTodo.initiate(Number(id)))
      );
      await Promise.all(promises);

      table.resetRowSelection();
      toast.success(`(${ids.length}) Todo deleted`);
    } catch (err) {
      toast.error(`Something went wrong!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button variant="outline" className="text-red-400" onClick={onClick}>
        <Trash className="mr-2 h-4 w-4" />
        {`(${ids.length}) Todo`}
      </Button>
    </>
  );
};

export default DeleteTodoByIdsButton;
