"use server";

import { DJANGO_API_ENDPOINT } from "@/config/defaults";
import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`;

interface Params {
  params: { id?: string };
}

export async function GET(request: Request, { params }: Params) {
  const endpoint = params.id ? `${DJANGO_API_WAITLISTS_URL}${params.id}/` : null;

  if (!endpoint) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data, status } = await ApiProxy.get(endpoint, true);
  return NextResponse.json(data, { status });
}

export async function PUT(request: Request, { params }: Params) {
  const endpoint = params.id ? `${DJANGO_API_WAITLISTS_URL}${params.id}/` : null;

  if (!endpoint) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const requestData = await request.json();
  const { data, status } = await ApiProxy.put(endpoint, requestData, true);
  return NextResponse.json(data, { status });
}
