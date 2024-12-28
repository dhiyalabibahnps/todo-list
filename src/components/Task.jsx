import { Check, Trash2 } from "lucide-react";
import { Button } from "./Button";

export function Task({ title, completed, toggle, deleteTask }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-center p-2 md:p-4 lg:p-6">
      <h1 className="flex-1">
        <p
          className={`text-left font-extrabold text-xl ${completed && "line-through"} break-all`}
        >
          {title}
        </p>
      </h1>
      <div className="flex space-x-2 self-end md:space-x-4">
        <Button type={completed ? "" : "success"} onClick={toggle}>
          <span className="mr-1 md:mr-2">
            <Check className="w-4 md:w-6" />
          </span>
          {completed ? "Belum Selesai" : "Selesai"}
        </Button>
        <Button type="error" onClick={deleteTask}>
          <span className="mr-1 md:mr-2">
            <Trash2 className="w-4 md:w-6" />
          </span>
          Hapus
        </Button>
      </div>
    </div>
  );
}
