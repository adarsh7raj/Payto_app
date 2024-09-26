import { Appbar } from "../components/AppBar";
import { Balance } from "./Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom";
export const Dashboard=function(){
    const navigate=useNavigate();
    return <div>
        <Appbar></Appbar>
        <div className="m-8">
          <div className="border-solid border-2 bg-sky-500 hover:bg-sky-400 rounded-xl w-[120px] h-[40px]"><button onClick={function(){navigate("/balance")}} className="w-full h-full">Check Balance</button></div>
            <Users></Users>
        </div>
    </div>
}