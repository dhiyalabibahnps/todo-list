import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";
import { Tab } from "./components/Tab";
import { Task } from "./components/Task";

function App() {
  const [tabCurrent, setTabCurrent] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTask] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  const tabs = useMemo(
    () => [
      {
        status: "all",
        label: "Semua",
        count: tasks?.length ?? 0,
      },
      {
        status: "open",
        label: "Belum Selesai",
        count: tasks?.filter?.((v) => v.completed === false).length ?? 0,
      },
      {
        status: "closed",
        label: "Selesai",
        count: tasks?.filter?.((v) => v.completed === true).length ?? 0,
      },
    ],
    [tasks]
  );

  function addTask(e) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("task");
    const task = input.value;
    const newTasks = [...tasks, { title: task, completed: false }];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    input.value = "";
  }

  function toggleTask(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  function deleteTask(index) {
    const taskDeleted = tasks.filter((task, i) => i !== index);
    localStorage.setItem("tasks", JSON.stringify(taskDeleted));
    setTasks(taskDeleted);
  }

  useEffect(() => {
    if (
      localStorage.getItem("tasks") &&
      localStorage.getItem("tasks")?.length > 0
    ) {
      setTasks(JSON.parse(localStorage.getItem("tasks")) ?? []);
    }
  }, [localStorage.getItem("tasks")]);

  useEffect(() => {
    switch (tabCurrent) {
      case "all":
        setFilteredTask(tasks);
        break;
      case "open":
        setFilteredTask(tasks?.filter((v, i) => v.completed === false));
        break;
      case "closed":
        setFilteredTask(tasks?.filter((v, i) => v.completed === true));
      default:
        break;
    }
  }, [tabCurrent, tasks]);

  return (
    <main className="font-mono px-4">
      <div className="max-w-5xl mx-auto pb-6">
        <nav className="sticky top-0 pt-8 mb-8 bg-pink-100">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2 text-center">
              Daftar Tugas Saya
            </h1>
            <p className="mb-4 font-semibold text-center md:text-left">
              {formatDateTime(currentTime)}
            </p>
          </div>

          <form className="flex flex-row" onSubmit={addTask}>
            <input
              name="task"
              className="flex-grow p-2 text-lg border-4 border-r-0 border-black focus:outline-none placeholder:italic"
              placeholder="Tambahkan tugas..."
            />
            <Button>
              <Plus size={24} />
            </Button>
          </form>
        </nav>

        <div className="flex space-x-2 transition-all duration-100 overflow-y-scroll no-scrollbar md:justify-center">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              {...tab}
              tabs={tabs}
              tabCurrent={tabCurrent}
              onClick={(e) => setTabCurrent(tab.status)}
            />
          ))}
        </div>
        <div className="bg-white border-4 border-black transition-all duration-100">
          <div className="grid grid-cols-1 divide-y">
            {filteredTasks?.length > 0 ? (
              filteredTasks?.map((task, index) => (
                <Task
                  key={index}
                  {...task}
                  toggle={() => toggleTask(index)}
                  deleteTask={() => deleteTask(index)}
                />
              ))
            ) : (
              <>
                <p className="italic text-gray-500 text-center text-sm py-4">
                  Tidak ada tugas
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mb-6">
        <p className="text-center">
          Dibuat oleh{" "}
          <a
            href="https://github.com/dhiyalabibahnps"
            className="no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            dhiyalabibahnps
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
