"use client"
import Editor from "./components/ResumeEditor";
import   data from "../data.json"
import { useState } from "react";
 
export default function Home() {
   console.log(data);
    const [infoData , setInfoData] = useState(data)
   
  return (
    <Editor data={infoData} setInfoData={setInfoData}/>
  );
}
