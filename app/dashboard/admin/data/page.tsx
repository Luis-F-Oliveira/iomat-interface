import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CollectionByDate, CollectionByName, CurrentDayCollection } from '@/partials/scrapping';

export default function Page() {
  const menus = [
    {
      title: "coleta dia atual",
      description: "Coleta todas as informações dos dias atuais e salva no banco de dados.",
      body: <CurrentDayCollection />
    },
    {
      title: "coleta por nome",
      description: "Busca informações de um usuário especifico a partir de uma data e seu nome.",
      body: <CollectionByName />
    },
    {
      title: "coleta por data",
      description: "Escolhe um tempo especifico para a busca de informações.",
      body: <CollectionByDate />
    },
  ]

  return (
    <div className='grid grid-cols-3 gap-3'>
      {menus.map((items, index) => (
        <Card className='h-auto' key={index}>
          <CardHeader>
            <CardTitle className='uppercase'>
              {items.title}
            </CardTitle>
            <CardDescription>{items.description}</CardDescription>
          </CardHeader>
          {items.body}
        </Card>
      ))}
    </div>
  )
}
