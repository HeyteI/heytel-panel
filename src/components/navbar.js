import { Component } from "react"
import { NavLink } from "react-router-dom"

export class Navbar extends Component {
    toggleSidebarVisibility() {
        var sidebarElem = document.getElementById("sidebar")
        sidebarElem.classList.toggle("hidden")
        console.log(sidebarElem.classList)
    }

    render() {
        return (
            <nav class="bg-white drop-shadow-md">
                <div class="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-20">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            </button>
                        </div>
                        <div class="flex-1 ml-2 justify-center sm:items-stretch sm:justify-start">
                            <div class="flex-shrink-0 flex items-center">
                                <NavLink to="/">
                                    <img class="h-8 w-auto mr-2" src="icons/logo.svg" alt="Heytel" />
                                    <span class="font-sans font-normal text-xl">Heytel</span>
                                </NavLink>
                            </div>
                        </div>
                        <div>
                            <div class="max-w-sm h-auto mx-auto my-20 overflow-hidden flex items-center ">
                                <img class="mr-2 h-10 w-10 rounded-full" src={this.props.profile_picture} alt={this.props.name} />
                                <button id="sidebar-toggle" onClick={this.toggleSidebarVisibility}>
                                    <svg class="w-8 md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>more_vert</title><g fill="none" class="nc-icon-wrapper"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#000000"></path></g></svg>
                                </button>
                                <div class="hidden md:block">
                                    <span>{this.props.name}</span>
                                    <p class="text-slate-500">{this.props.group}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}