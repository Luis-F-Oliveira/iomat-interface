import { chromium } from 'playwright'
import { NextRequest } from 'next/server'
import { api } from '@/lib/axios'
import { IData, IServants } from '@/context/scrapping'

function removeAccents(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function processText(text: string) {
  return removeAccents(text)
    .toUpperCase()
}

export async function POST(req: NextRequest) {
  try {
    const savedData: IData[] = []
    const token = req.cookies.get('auth-token')?.value
    const date = new Date()
    const formattedDate = date.toLocaleDateString('pt-BR')

    const response = await api.get('servants', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const servants: IServants[] = response.data

    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.iomat.mt.gov.br/legislacao/diario_oficial/1153/2024/')

    await page.locator('xpath=/html/body/div[2]/div[2]/div/div/div/div[4]/ul/li[1]/a[1]').click()

    while (true) {
      const a = page.locator('xpath=/html/body/div[2]/div[1]/div/div[1]/a')
      const aText = await a.innerText()
      if (aText.includes(formattedDate)) {
        await a.click()
        await page.waitForTimeout(3000)
        const matter: string[] = []
        const text = await page.locator('xpath=/html/body/div[2]/div[3]/div/div/div/div').innerText()
        const textProcessed = processText(text)
        matter.push(textProcessed)

        const foundServants = servants.filter((servant: IServants) =>
          matter.some((name: string) => name.toLowerCase().includes(servant.name.toLowerCase()))
        )

        const order = await page.locator('xpath=/html/body/div[2]/div[1]/div/div[2]/h4').innerText()
        const url = page.url()

        savedData.push({
          order: order,
          url: url,
          servants: foundServants
        })
      } else {
        break
      }
    }

    await page.waitForTimeout(3000)
    await browser.close()

    return Response.json({ data: savedData })
  } catch (error) {
    return Response.json({ error: error })
  }
}