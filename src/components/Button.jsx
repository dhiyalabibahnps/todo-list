export function Button({ onClick, children, type }) {
  const btnColor = (() => {
    let color = "";
    switch (type) {
      case "error":
        color = "bg-red-400 hover:bg-red-500 text-white";
        break;
      case "success":
        color = "bg-green-400 hover:bg-green-500 text-black";
        break;
      default:
        color = "bg-amber-400 hover:bg-amber-500 text-black";
        break;
    }
    return color;
  })();
  return (
    <button
      className={`text-black font-bold py-1 px-2 md:py-2 md:px-4 border-4 border-black ${btnColor} transition-colors duration-200 inline-flex items-center text-xs md:text-base`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// className="bg-yellow-400 text-black font-bold py-2 px-4 border-4 border-black hover:bg-yellow-500 "
