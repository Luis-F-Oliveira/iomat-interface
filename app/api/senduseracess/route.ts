import nodemail from 'nodemailer'
import { NextRequest } from 'next/server'
import type { IUser } from '@/app/dashboard/admin/users/columns'

const transporter = nodemail.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

export async function POST(req: NextRequest) {
  const data: IUser = await req.json()

  const body = `
    <div>
      <p>Prezado(a) Sr(a). ${data.name},</p>
      <p>
        Segue abaixo o seu código de acesso:
        <br /><br />
        <strong>
          ${data.entry_code}
        </strong>
      </p>
      <br />
      <p>Clique no link a seguir para realizar o download:</p>
      <a target="_blank" href="https://www.google.com">Download</a>
    </div>
  `
  try {
    await transporter.sendMail({
      from: 'luisfelipe505141@gmail.com',
      to: data.email,
      subject: 'Cadastro Facilita Diário',
      html: body
    })

    return Response.json({ message: 'success' })
  } catch {
    console.error('Erro ao enviar e-mail')
  }
}