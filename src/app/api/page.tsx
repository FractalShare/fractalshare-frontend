/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

export default async function Page({params, searchParams}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    return <h1>My Page</h1>
  }