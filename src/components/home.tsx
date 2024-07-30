import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

import Divider from '@mui/material/Divider';
import { items,cards,arr,dummy, API_URL, Ttask } from './constants';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

const TASK_URL = "/api/v1/tasks?id=";
export default function HomeComponent(){

    const [open, setOpen] = useState(false);
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [priority, setpriority] = useState("");
    const [status, setstatus] = useState("");
    const [deadline, setdeadline] = useState("");
    const [element, setElement] = useState({} as Ttask);
    const [showMsg, setShowMsg] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");

    let defaultData:{[key:string]:Ttask[]} = {
        "To Do":[],
        "In Progress":[],
        "Under Review":[],
        "Finished":[],
    }
    const [data,setData] = useState(defaultData)
   
    const [name] = useState(sessionStorage.getItem('name') || "");
    const [firstName] = useState(name?.split(" ")?.[0] || "");
    const navigate = useNavigate();
    let userId = sessionStorage.getItem('userId')

    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if(!token || token.length < 15) {
            snackbar("Please Login to Proceed")
            navigate('/')
        }
        getTasks();
        console.log('rendered')
    },[])

    function getTasks() {

        axios.get(API_URL + TASK_URL + userId).then(res => {

            let arr: any[] = res.data.data;
            let response: { [key: string]: Ttask[] } = { "To Do": [], "In Progress": [], "Under Review": [], "Finished": [] }
            arr.forEach(val => {

                let newItem: Ttask = {
                    header: val.Title || "",
                    content: val.Content || "",
                    ago: timeAgo(new Date(val.CreatedAt)) || "",
                    date: val.DeadLine || "",
                    label: val.Priority || "",
                    id: val._id
                }
            
                response[val.Status].push(newItem);
            })
            setData(response);
            setOpen(false)
        }).catch(_ => {
            setData(dummy)
        })
    }

    function snackbar(message:string){
        setDisplayMessage(message);
        setShowMsg(true);
    }
    function addtask(){
        if(!title || !status || !priority){
            console.log('mandatory not present');
            return;
        }

        let payload = {
            "Title":title,
            "Content":content,
            "Status":status,
            "Priority":priority,
            "DeadLine":deadline,
            "CreatedBy":userId
        }

        axios.post(API_URL+TASK_URL,payload).then(_ => {
            getTasks();
            settitle("");
            setcontent("");
            setstatus("");
            setpriority("");
            setdeadline("");
            snackbar("Task Created Successfully");
        }).catch(_ => {

        })

    }

    function updateTask(obj:{TaskId:string,Status:string}){
        axios.patch(API_URL+TASK_URL,obj).then(() => {
            getTasks();
            snackbar("Task Status Updated")
        }).catch(() => {

        })
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        navigate('/')
    }

    const handleDrop = (_:any,val:string) => {
        console.log("dropped at ",val);
        element.id
        let payload = {
            TaskId:element.id,
            Status:val
        }
        updateTask(payload)
        setElement({} as Ttask)
    }
    const handleDragOver = (e:any) => {
        e.preventDefault();
    }
    const handleDrag = (_:any,val:Ttask) => {
        console.log(val,"dragged");
        setElement(val);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowMsg(false);
    }

    const handleDrawerClick = (e:any) => e.stopPropagation()
    
    return (<>
        <div className="min-h-screen bg-gray-200 flex">
            <div className="bg-white w-1/5 fixed min-h-screen max-h-screen flex flex-col justify-between">
                <div>

                <div className="flex mt-3 justify-start items-center">
                    <img src="images.png" className="w-10 mx-2 h-10 rounded-full flex justify-center items-center" />
                    <p>{name}</p>
                </div>
                <div className="flex mt-2 justify-between items-center">
                    <div id="icons" className='flex gap-2 mx-2 cursor-pointer'>
                        <NotificationAddOutlinedIcon></NotificationAddOutlinedIcon>
                        <RotateRightOutlinedIcon></RotateRightOutlinedIcon>
                        <StartOutlinedIcon></StartOutlinedIcon>
                    </div>
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md bg-gray-200 mx-2 text-l">Logout</button>
                </div>
                <div className="flex mt-2 flex-col mx-3 cursor-pointer">
                    <div className="bg-gray-200 w-full p-2 flex justify-start gap-2 items-center "> <HomeOutlinedIcon /> <p>Home</p> </div>
                    <div className=" w-full p-2 flex justify-start gap-2 items-center"> <AssignmentOutlinedIcon/>  <p>Boards</p></div>
                    <div className=" w-full p-2 flex justify-start gap-2 items-center"> <SettingsOutlinedIcon/>  <p>Settings</p></div>
                    <div className=" w-full p-2 flex justify-start gap-2 items-center"> <GroupOutlinedIcon/>  <p>Teams</p></div>
                    <div className=" w-full p-2 flex justify-start gap-2 items-center"> <QueryStatsOutlinedIcon/>  <p>Analytics</p></div>
                </div>
                <div className="flex mt-2 mx-3">
                    <button onClick={toggleDrawer(true)} className="bg-violet-900 w-full text-white py-3 rounded-lg flex justify-center gap-2 items-center">
                        <p>Create new task</p>
                        <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
                    </button>
                </div>
                </div>
                <div className="flex mx-3">
                    <div className="flex w-full bg-gray-200 my-3 p-2 rounded-md cursor-pointer justify-evenly items-center">
                       
                        <FileDownloadOutlinedIcon fontSize='large'></FileDownloadOutlinedIcon>
                        
                        <div className="flex flex-col">
                            <p className="text-xl" >Download The App</p>
                            <p className="text-sm">Get Full Experience</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{"marginLeft":'20%'}} className="right w-4/5 flex flex-col">
                <div className="flex justify-between mt-2">
                    <p className="px-8 mt-3 font-mono text-4xl"> Good Morning, {firstName}! </p> 
                    <p className="px-3 mt-5 font mono flex justify-center items-center">
                        <p>Help & FeedBack</p>
                        <HelpOutlineOutlinedIcon></HelpOutlineOutlinedIcon>
                    </p>
                </div>
                <div className="mt-2 flex gap-2 mx-3">
                    {
                        cards.map((val,i:number) =>
                            <div key={i} className="card p-4 w-full bg-white rounded-md flex justify-center gap-3 items-center cursor-pointer">
                                { val.icon }
                                <div className="flex flex-col">
                                    <p className='text-lg'>{val.heading}</p>
                                    <p className='text-sm'>{val.content}</p>
                                </div>
                            </div>
                        )

                    }
                    
                </div>
                <div className="mt-2">
                    <div className="flex justify-between">
                        <div className="flex justify-center items-center">
                            <input type="text" placeholder='Search' className="bg-white w-32 mx-3 px-3 py-1 rounded-md" />
                            <SearchOutlinedIcon></SearchOutlinedIcon>
                        </div>
                        <div className="flex cursor-pointer">
                            {
                                items.map((val,i:number) => 
                                    <div key={i} className="flex justify-center items-center mx-2">
                                        <p className='mx-2'>{val.name}</p>
                                        {val.icon}
                                    </div>
                                )
                            }
                            <button onClick={toggleDrawer(true)} className="bg-violet-900 px-2 mx-2 text-white py-3 rounded-lg flex justify-center gap-2 items-center">
                                <p>Create new task</p>
                                <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
                            </button>
                        </div>
                        
                    </div>
                </div>

                <div className="flex mx-3 bg-white py-4 mt-2">
                    {
                        arr.map(
                            (x,i) =>
                                <>
                                <div key={i} className="flex flex-col gap-2 w-full" id={x} >
                                <div className="w-full flex flex-col" onDrop={(e) => handleDrop(e,x)} onDragOver={handleDragOver}>

                                    <div className="flex justify-between mx-3 ">
                                        <p className='mx-3'>{x}</p>
                                        <MenuOutlinedIcon></MenuOutlinedIcon>
                                    </div>

                                    { data[x].map((val,i) =>
                                        <div key={i} draggable onDrag={(e) => handleDrag(e,val)} className="mx-3 bg-gray-200 border-b-2 flex flex-col gap-2 p-3 rounded-md mt-2">
                                        <p className='text-xl'>{val.header}</p>
                                        <p className='text-sm'>{val.content}</p>
                                        {/* <span className='bg-red-300 w-16 px-2 rounded-md text-sm'>{val.label}</span> */}
                                        <span className={
                                        val.label == 'Urgent' ? "bg-red-500 w-16 px-2 rounded-md text-sm text-white"
                                        : val.label == 'Low' ? "bg-green-500 w-16 px-2 rounded-md text-sm text-white"
                                        : "bg-orange-500 w-16 px-2 rounded-md text-sm text-white"

                                        }>{val.label}</span>
                                        <p className='flex justify-start gap-2'>
                                            <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
                                            <p>{val.date}</p>
                                        </p>
                                        <p >{val.ago}</p>
                                    </div>
                                    ) 
                                    }
                                </div>

                                <button onClick={toggleDrawer(true)} className='px-3 py-1 bg-black text-white mx-3 rounded-md'>
                                    <div className="flex justify-between">
                                        <p>Add new</p> 
                                        <AddOutlinedIcon></AddOutlinedIcon>
                                    </div>
                                </button>
                                </div>
                                </>
                        )
                    }
                </div>
            </div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>

            <Box sx={{ width: "50vw" }} role="presentation" onClick={toggleDrawer(false)}>
                    <div className="flex justify-between mx-3 mt-4 items-center" onClick={handleDrawerClick}>
                        <div className="flex gap-3">
                            <CloseOutlinedIcon className='cursor-pointer' onClick={() => setOpen(false)}></CloseOutlinedIcon>
                            <HeightOutlinedIcon className='cursor-pointer'></HeightOutlinedIcon>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={addtask} className='bg-violet-900 text-white p-3 flex justify-center items-center rounded-md gap-2'>
                                <p>Create</p>
                                <EditNoteOutlinedIcon></EditNoteOutlinedIcon>
                            </button>
                            <button className='bg-gray-200 p-3 flex justify-center items-center rounded-md gap-2'>
                                <p>Share</p>
                                <ShareOutlinedIcon></ShareOutlinedIcon>
                            </button>
                            <button className='bg-gray-200 p-3 flex justify-center items-center rounded-md gap-2'>
                                <p>Favorite</p>
                                <GradeOutlinedIcon></GradeOutlinedIcon>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start gap-5" onClick={handleDrawerClick}>
                        <input value={title} onInput={(e) => settitle((e.target as HTMLInputElement).value)} type="text" className=" mt-5 mx-2 text-3xl p-4 placeholder:p-4" placeholder='Title' />
                        <div className="flex justify-start items-center gap-3 mx-3">
                            <AutorenewOutlinedIcon></AutorenewOutlinedIcon>
                            <p>Status :</p>
                            <select value={status} onChange={(e) => setstatus(e.target.value)} name="status" id="status" className='p-2 border-b-2 border-black mx-3 w-32'>
                                <option value="" selected>Select</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Finished">Finished</option>
                            </select>
                        </div>
                        <div className="flex justify-start items-center gap-3 mx-3">
                            <PriorityHighOutlinedIcon></PriorityHighOutlinedIcon>
                            <p>Priority :</p>
                            <select value={priority} onChange={(e) => setpriority(e.target.value)} name="priority" id="priority" className='p-2 border-b-2 border-black mx-3 w-32'>
                                <option value="" selected>Select</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Urgent">Urgent</option>
                            
                            </select>
                        </div>
                        <div className="flex justify-start items-center gap-3 mx-3 mt-3">
                            <EventBusyOutlinedIcon></EventBusyOutlinedIcon>
                            <p>Deadline :</p>
                            <input value={deadline} onInput={(e) => setdeadline((e.target as HTMLInputElement).value)} type="date" />
                        </div>
                        <div className="flex justify-start items-center gap-3 mx-3 mt-3">
                            <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
                            <p>Descryption:</p>
                            <input value={content} onInput={(e) => setcontent((e.target as HTMLInputElement).value)} type="text" className='p-3 w-full' />
                        </div>

                        <div className="flex mt-4 justify-start items-center gap-5 mx-2 mb-3">
                            <AddOutlinedIcon></AddOutlinedIcon>
                            <p>Add Custom Property</p>
                        </div>
                        <Divider variant="middle" />
                        <p className='text-sm text-gray-500 mx-5'>Start Writing or Drag your Files Here</p>
                    </div>
            </Box>
        </Drawer>
        <Snackbar
        open={showMsg}
        autoHideDuration={6000}
        onClose={handleClose}
        message={displayMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>)
}

function timeAgo(date:Date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? " ago" : "s ago");
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? " ago" : "s ago");
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? " ago" : "s ago");
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? " ago" : "s ago");
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? " ago" : "s ago");
    }

    return Math.floor(seconds) + " second" + (seconds === 1 ? " ago" : "s ago");
}