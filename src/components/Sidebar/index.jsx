import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const getSltyles = ({ isActive }) => {
    const styles =
      "flex items-center gap-2 px-2 py-1 rounded-tr-full rounded-br-full";

    return isActive
      ? `${styles}  bg-indigo-600 text-slate-50 `
      : `${styles} hover:bg-indigo-600 hover:text-slate-50 text-slate-800`;
  };
  return (
    <aside>
      <div className="text-left gap-3 flex flex-col border-r-2 border-gray-300 w-[120px] h-screen py-2">
        <NavLink to="/" className={getSltyles}>
          <span class="material-symbols-outlined ">home</span>
          Home
        </NavLink>
        <NavLink to="/archive" className={getSltyles}>
          <span class="material-symbols-outlined">archive</span>Archive
        </NavLink>
        <NavLink to="/important" className={getSltyles}>
          <span class="material-symbols-outlined">label_important</span>
          Important
        </NavLink>
        <NavLink to="/bin" className={getSltyles}>
          <span class="material-symbols-outlined">delete</span>
          Bin
        </NavLink>
      </div>
    </aside>
  );
};
