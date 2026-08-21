function Footer() {
    return (
        <footer className="bg-base-100 border-t border-base-300 text-base-content">
            {/* Top content */}
            <div className="max-w-7xl mx-auto px-8 py-2 grid gap-2 grid-cols-1 ">

                {/* Contact */}
                <div className="w-full text-center text-center">
                    <h3 className="font-semibold text-md">Contact Developer</h3>
                    <a
                        href="mailto:chaudharyrajan947@gmail.com"
                        className="link link-hover text-sm text-underline-none"
                    >
                        chaudharyrajan947@gmail.com
                    </a>
                </div>



                {/* Team */}
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h3 className="font-semibold text-md mb-1">Meet the Mind</h3>
                        <ul className=" text-sm">
                            <li>  
                                <span className="font-medium text-primary">Rajan Chaudhary </span>
                                <span className="text-base-content/70">Software Developer</span>
                            </li>

                        </ul>
                    </div>

                    {/* Portfolio */}
                    <div>
                        <h3 className="font-semibold text-md mb-1 text-center">Portfolio</h3>
                        <a
                            href="https://rajanchaudhary947.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-hover text-sm text-center block"
                        >
                            Visit Portfolio
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-base-300 text-center pb-5 pt-2 text-sm text-base-content/70">
                © {new Date().getFullYear()} dotConnect. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
