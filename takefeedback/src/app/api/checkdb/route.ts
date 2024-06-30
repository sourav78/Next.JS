import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

export async function GET(request:NextRequest) {
    
    return NextResponse.json({
        success: true,
        message: "Successfully fetched."
    },
    {status: 200}
    )
}