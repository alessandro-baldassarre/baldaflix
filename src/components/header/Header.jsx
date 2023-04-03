import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import ContentWrapper from "../contentWrapper/ContentWrapper"

import "./style.scss"
import logo from "../../assets/baldaflix-logo.svg"
import useWindowSize from "../../hooks/useWindowSize"

const Header = () => {
    const [show, setShow] = useState("top")
    const [lastScrollY, setLastScroolY] = useState(0)
    const [mobileMenu, setMobileMenu] = useState(false)
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (width > 767) {
            setMobileMenu(false)
        }
    }, [width])

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
                </ul>

                <div className="mobileMenuItems">
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={() => setMobileMenu(true)} />}
                </div>
            </ContentWrapper>


        </header>
    )
}

export default Header
