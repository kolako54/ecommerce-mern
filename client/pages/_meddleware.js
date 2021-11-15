import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(NextRequest, NextFetchEvent) {
  console.log('this is middleware!')
}