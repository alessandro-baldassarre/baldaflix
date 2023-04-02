import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import ContentWrapper from "../contentWrapper/ContentWrapper"

import "./style.scss"
import logo from "../../assets/movix-logo.svg"

const Header = () => {
    const [show, setShow] = useState("top")
    const [lastScrollY, setLastScroolY] = useState(0)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [showSearch, setShowSearch] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const navbarScroll = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScroolY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", navbarScroll)

        return () => {
            window.removeEventListener("scroll", navbarScroll)
        }

    }, [lastScrollY])

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setShowSearch(false)
        setMobileMenu(true)
    }

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie")
        } else {
            navigate("/explore/tv")
        }

        setMobileMenu(false)

    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="" onClick={() => navigate("/")} />
                </div>

                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Show</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </ContentWrapper>

            {showSearch &&
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput" >
                            <input type="text" placeholder="Search for a movie or TV show..." onChange={(ev) => setSearchInput(ev.target.value)} />
                            <VscChromeClose onClick={() => { setShowSearch(false) }} />
                        </div>
                    </ContentWrapper>
                </div>
            }

        </header>
    )
}

export default Header
