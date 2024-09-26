import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [value,setvalue]=useState("");
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.get(`https://payto-app-1.onrender.com/api/v1/user/users?find=${value}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            console.log(response.data.users); // response.data.users is an array
            setUsers(response.data.users);
        }).catch(error => {
            console.error("There was an error fetching the users!", error);
        });
    }, [value]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Search users to send money
        </div>
        <div className="my-2">
            <input onChange={function(e){
                setvalue(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(function(user){
                return (<User user={user}></User>)
            })}
        </div>
    </>
}

function User({user}) {
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={function(){
                navigate("/send?id="+user._id+"&name="+user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}