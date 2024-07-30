import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export const cards = [
    {
        heading:'Introducing Tags',
        content:'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and effcient.',
        icon: <BookmarkIcon fontSize='large'></BookmarkIcon>
    },
    {
        heading:'Share Notes Instantly',
        content:'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.',
        icon: <SendAndArchiveIcon fontSize='large'></SendAndArchiveIcon>
    },
    {
        heading:'Access anywhere',
        content:'Sync your notes across all devices.Stay productive whether you are on your phone,tablet or computer',
        icon: <SettingsAccessibilityIcon fontSize='large'></SettingsAccessibilityIcon>
    },
]

export const items = [
    {
        name:'Calender view',
        icon:<CalendarTodayOutlinedIcon></CalendarTodayOutlinedIcon>
    },
    {
        name:'Automation',
        icon:<AutoAwesomeOutlinedIcon></AutoAwesomeOutlinedIcon>
    },
    {
        name:'Filter',
        icon:<FilterAltOutlinedIcon></FilterAltOutlinedIcon>
    },
    {
        name:'Share',
        icon:<ShareOutlinedIcon></ShareOutlinedIcon>
    },
]
export const arr = ["To Do","In Progress","Under Review","Finished"];

export const dummy:{[key:string]:Ttask[]} = {
    "To Do":[
        {
            header:"Implement user authentication system",
            content:"Develop and integrate user authentication using email & password",
            label:'Urgent',
            date:"2024-08-15",
            ago:"1 day ago",
            id:"1"
        }
    ],
    "In Progress":[
        {
            header:"Design Homepage UI",
            content:"Develop and integrate user authentication using email & password & develop UI for homepage",
            label:'Medium',
            date:"2024-08-15",
            ago:"1 day ago",
            id:'2'
        },
        {
            header:"Conduct User feedback",
            content:"Develop and integrate user authentication using email & password & develop UI for homepage",
            label:'Low',
            date:"2024-08-15",
            ago:"1 day ago",
            id:'3'
        },
    ],
    "Under Review":[
        {
            header:"Integrate Cloud Storage",
            content:"Enable cloud storage for note backup and synchronization",
            label:'Urgent',
            date:"2024-08-15",
            ago:"1 day ago",
            id:'4'
        }
    ],
    "Finished":[
        {
            header:"test cross browser compatibility",
            content:"Ensure the app works seaminglessly in across all different web browsers",
            label:'Medium' ,
            date:"2024-08-15",
            ago:"1 day ago",
            id:"3"
        },
    
    ]
}

export const API_URL = "https://bug-tracker-apis.onrender.com"

export type Ttask = {
    header:string,
    content:string,
    label:'Urgent' | 'Medium' | 'Low',
    date:string,
    ago:string,
    id:string
}