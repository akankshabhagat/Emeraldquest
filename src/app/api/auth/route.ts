
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
