export function Tab({ status, label, count, tabCurrent, onClick, key, tabs }) {
  const currentTab = (() => {
    if (tabCurrent === status) {
      return "bg-fuchsia-300 text-black";
    } else {
      return "bg-gray-300 text-black hover:bg-gray-400";
    }
  })();
  return (
    <button
      className={`
        py-2 px-4 text-xs md:text-lg font-bold transition-all duration-100 
        whitespace-nowrap
        ${currentTab} 
        ${key === 0 ? "rounded-tl-lg" : ""} 
        ${key === tabs.length - 1 ? "rounded-tr-lg" : ""} 
        border-4 border-black border-b-0
      `}
      onClick={(e) => onClick(e)}
    >
      <div className="flex space-x-2 items-center">
        <div>{label}</div>
        <div className="rounded-full py-0.5 px-2 bg-red-500 text-xs md:text-sm text-white">
          {count}
        </div>
      </div>
    </button>
  );
}
