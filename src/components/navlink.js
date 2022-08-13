import { Component } from "react"
import { NavLink } from "react-router-dom";

const icons = {
    "armchair": <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>armchair</title><g stroke-width="1.5" fill="#9CA38F" stroke="#9CA38F" class="nc-icon-wrapper"><line data-color="color-2" x1="13" y1="25" x2="35" y2="25" fill="none" stroke-linecap="square" stroke-miterlimit="10"></line><line x1="9" y1="45" x2="9" y2="41" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line><line x1="39" y1="45" x2="39" y2="41" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line><path data-color="color-2" d="M40,18V7a4,4,0,0,0-4-4H12A4,4,0,0,0,8,7V18" fill="none" stroke-linecap="square" stroke-miterlimit="10"></path><path d="M40,18a5,5,0,0,0-5,5V33H13V23a5,5,0,1,0-8,3.977V37a4,4,0,0,0,4,4H39a4,4,0,0,0,4-4V26.977A4.985,4.985,0,0,0,40,18Z" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></path></g></svg>,
    "calendar": <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>calendar 2</title><g stroke-width="2" fill="#9CA38F0" stroke="#9CA38F" class="nc-icon-wrapper"><line data-color="color-2" data-cap="butt" x1="31" y1="12" x2="1" y2="12" fill="none" stroke-miterlimit="10"></line><rect x="1" y="4" width="30" height="26" rx="3" ry="3" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></rect><line x1="8" y1="1" x2="8" y2="7" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line><line x1="24" y1="1" x2="24" y2="7" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line></g></svg>,
    "check": <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>check all</title><g stroke-width="2" fill="#9CA38F" stroke="#9CA38F" class="nc-icon-wrapper"><polyline points="2 20 8 25 24 4" fill="none" stroke-linecap="square" stroke-miterlimit="10" data-color="color-2"></polyline> <line x1="31" y1="11" x2="27" y2="11" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line> <line x1="31" y1="18" x2="21" y2="18" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line> <line x1="31" y1="25" x2="16" y2="25" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></line></g></svg>,
    "camera": <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>camera 2</title><g stroke-width="2" fill="#9CA38F" stroke="#9CA38F" class="nc-icon-wrapper"><line data-cap="butt" data-color="color-2" x1="6" y1="7" x2="6" y2="29" fill="none" stroke-miterlimit="10"></line><path d="M4,29H28a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3H25L22,2H14L11,7H4a3,3,0,0,0-3,3V26A3,3,0,0,0,4,29Z" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></path><circle data-color="color-2" cx="18" cy="18" r="7" fill="none" stroke-linecap="square" stroke-miterlimit="10"></circle></g></svg>,
    "restaurant": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 12H12V2.66663H9.33333V12H6.66667V2.66663H4V12C4 14.8266 6.21333 17.12 9 17.2933V29.3333H12.3333V17.2933C15.12 17.12 17.3333 14.8266 17.3333 12V2.66663H14.6667V12ZM21.3333 7.99996V18.6666H24.6667V29.3333H28V2.66663C24.32 2.66663 21.3333 5.65329 21.3333 7.99996Z" fill="#A1A4AE" /></svg>,
    "alarm": <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>alarm</title><g stroke-width="2" fill="#9CA38F" stroke="#9CA38F" class="nc-icon-wrapper"><path data-cap="butt" data-color="color-2" d="M13,28a3,3,0,0,0,6,0" fill="none" stroke-miterlimit="10"></path> <path d="M29,25s-3-5-3-9V11A10,10,0,0,0,6,11v5c0,4-3,9-3,9Z" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></path></g></svg>,
    "logo": <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 32 32"><title>home 3</title><g stroke-width="2" fill="#9CA38F" stroke="#9CA38F" class="nc-icon-wrapper"><polyline data-cap="butt" data-color="color-2" points="1 14 16 2 31 14" fill="none" stroke-miterlimit="10"></polyline> <polyline data-cap="butt" points="13 30 13 22 19 22 19 30" fill="none" stroke="#9CA38F0" stroke-miterlimit="10"></polyline> <polyline points="5 16 5 30 27 30 27 16" fill="none" stroke="#9CA38F0" stroke-linecap="square" stroke-miterlimit="10"></polyline> <rect data-color="color-2" x="14" y="13" width="4" height="4" fill="none" stroke-linecap="square" stroke-miterlimit="10"></rect> <line data-cap="butt" data-color="color-2" x1="7" y1="9.2" x2="7" y2="4" fill="none" stroke-miterlimit="10"></line></g></svg>
}

let activeStyle = {
    color: "black",
    stroke: "purple",
};

class SideBarLink extends Component {
    render() {
        return (
            <li>
                <NavLink to={this.props.href} activeClassName="active">
                    <a href={this.props.href} class="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100">
                        {icons[this.props.icon]}
                        <span class="ml-3">{this.props.title}</span>
                    </a>
                </NavLink>
            </li>
        )
    }
}

export default SideBarLink;