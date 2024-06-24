import { chromium } from 'playwright'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log("Starting browser...");
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    console.log("Navigating to Google...");
    await page.goto('https://www.google.com.br/?hl=pt-BR');

    console.log("Waiting for 3 seconds...");
    await page.waitForTimeout(3000);

    console.log("Closing browser...");
    await browser.close();

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error })
  }
}