interface PageProps {
  params: { page: string }
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      Olá
    </div>
  )
}

export async function generateStaticParams() {
  const pages = ['overview', 'details']
  return pages.map(page => ([
    page
  ]))
}