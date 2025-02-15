import { NextResponse, NextRequest } from "next/server";
import User from "../model/user"; 
import connectDB from "../utils/database"; 
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const register = async (req: NextRequest) => {
  try {
    await connectDB(); 

    const { name, email, password, collegeApplied } = await req.json();

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    //sign in
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      collegeApplied,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const login = async (req: NextRequest) => {
  try {
    await connectDB(); // Ensure DB connection

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist", success: false },
        { status: 400 }
      );
    }

   
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json(
        { error: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id },"!@#",
      { expiresIn: "1d" } 
    );

    return NextResponse.json(
      { message: `Welcome back ${user.name}`, user,token },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
