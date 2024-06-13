interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      {params.id}
    </div>
  )
}

function generateRandomIDs(count: number) {
  const ids: string[] = []
  for (let i = 1; i <= count; i++) {
    ids.push(String(i))
  }
  return ids
}

async function fetchDynamicIDs() {
  return generateRandomIDs(10000)
}

export async function generateStaticParams() {
  const id = await fetchDynamicIDs()
  return id.map(id => ({
    id
  }))
}