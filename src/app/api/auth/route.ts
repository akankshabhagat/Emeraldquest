// import connectDB from "@/app/utils/database";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// // export async function GET(req: NextRequest) {
// //   return NextResponse.json({ message: "Welcome to Node.js backend" });
// // }
// //registering route
// import {login,register} from '../../controllers/authController'

// export async function POST(req:NextRequest) {
//     await connectDB();
//     try{

//         //route for signup( http://localhost:3000/api/auth?signup=true)
// const {searchParams}= new URL(req.url);
// if(searchParams.get("signup")){
//     return register(req);
// }
// //route for login( http://localhost:3000/api/auth?login=true)
// if(searchParams.get("login")){
//     return login(req)
// }



// console.log("searchParams = ",searchParams)
// return NextResponse.json({message:"Invalid Api endpoint"})

//     }
//     catch(error){
// return NextResponse.json({error})
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import {login,register} from '../../controllers/authController'

export async function POST(req: NextRequest) {
  await connectDB();
  
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("signup")) {
      return register(req);
    }

    if (searchParams.get("login")) {
      return login(req);
    }
    

    return NextResponse.json({ message: "Invalid API endpoint" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
