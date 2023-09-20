import { Route, Routes } from "react-router-dom";
import Table from "./Table";
import Add from "./Home";

export default function AllRoute(){
    return  <Routes>
        <Route path='/' element={<Add />}></Route>
        <Route path='/table' element={<Table />}></Route>
    </Routes>
}