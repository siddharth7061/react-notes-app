import logo from "../../assets/note-app-logo.png";

export const Navbar = () => {
  return (
    <header className="flex items-start gap-3 pl-0 pb-2 px-0 border-b-2 border-gray-300 ">
      <div className="w-12 h-12">
        <img className="w-full h-full" src={logo} alt="logo_image"></img>
      </div>
      <h1 className="text-indigo-800 text-4xl font-bold">Note It bruh</h1>
    </header>
  );
};
