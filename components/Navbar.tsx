import { ThemeButton } from "./ThemeButton"

export const Navbar = () => {
    return (
        <div className="hidden 2xl:block h-16 shadow-md">
            <div className="h-full container flex justify-end items-center">
                <ThemeButton />
            </div>
        </div>
    )
}