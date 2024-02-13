import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div
                className="
                    container
                    flex flex-col flex-wrap
                    px-4
                    py-16
                    mx-auto
                    md:items-center
                    lg:items-start
                    md:flex-row md:flex-nowrap
                "
            >
                <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                    <Link to="/" className="text-2xl text-white">
                        My Website
                    </Link>
                    <p className="mt-2 text-xs text-justify">
                        Footer is a valuable resource that complements the main content of
                        the website by providing quick links, legal information, and ways to
                        connect, creating a well-rounded and user-friendly experience for
                        visitors.
                    </p>
                </div>
                <div className="justify-between w-full mt-4 text-center lg:flex">
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center -mt-12">
                <p className="text-center text-white pb-2">
                    @2024 Learnie Tous droits réservés.
                </p>
            </div>
        </footer>
    )
}