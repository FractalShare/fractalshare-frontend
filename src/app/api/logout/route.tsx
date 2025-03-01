/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { deleteTokens } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    deleteTokens()
    return NextResponse.json({"hello": "world"}, {status: 200})
}