import basket from '../../assests/BASKET ICON.png'
import home from '../../assests/HOME ICON.png'
import support from '../../assests/SUPPORT ICON.png'
import price from '../../assests/PRIZES ICON.png'

export const MainMenu = [

    {
        id:"01",
        Name:"Home",
        url:"",
        Badge:false,
        icon:home,
    },
    {
        id:"02",
        Name:"Prizes",
        url:"prizes",
        Badge:false,
        icon:price
    },
    {
        id:"03",
        Name:"Support",
        url:"",
        Badge:false,
        icon:support,
    },
    {
        id:"04",
        Name:"Basket",
        url:"cart",
        Badge:true,
        icon:basket
    },
]

export const settingsMenu = [
    {
        id:"11",
        Name:"Profile",
        url:"profile",
        slider:false,
        Badge:false,
    },
    {
        id:"12",
        Name:"Music",
        url:"",
        slider:true,
        Badge:false,
    },
    {
        id:"13",
        Name:"Sound",
        url:"",
        slider:true,
        Badge:false,
    },
    {
        id:"14",
        Name:"Notifications",
        url:"notifications",
        slider:false,
        Badge:true,
    },
    {
        id:"15",
        Name:"Cashier",
        url:"tickets",
        slider:false,
        Badge:false,
    },
    {
        id:"16",
        Name:"FAQ",
        url:"faq",
        slider:false,
        Badge:false,
    },
    {
        id:"17",
        Name:"Terms of Use",
        url:"",
        slider:false,
        Badge:false,
    },
    {
        id:"18",
        Name:"Privacy Policy",
        url:"",
        slider:false,
        Badge:false,
    },
    {
        id:"19",
        Name:"Logout",
        url:"",
        slider:false,
        Badge:false,
    },
    {
        id:"20",
        Name:"Login/Register",
        url:"login",
        slider:false,
        Badge:false,
    },
]