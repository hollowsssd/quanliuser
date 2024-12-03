export const Header = () => {
    return (
        <div>
            <header>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl" href="/">User Management</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://i.pinimg.com/736x/f8/16/c9/f816c9a2846546a3b2a70e0bdfdd8e20.jpg" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};