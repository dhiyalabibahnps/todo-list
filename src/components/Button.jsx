export function Button({ onClick, children, type }) {
  const btnColor = (() => {
    let color = "";
    switch (type) {
      case "error":
        color = "bg-red-300 hover:bg-red-400 text-black";
        break;
      case "success":
        color = "bg-green-100 hover:bg-green-200 text-black";
        break;
      default:
        color = "bg-purple-100 hover:bg-purple-200 text-black";
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
