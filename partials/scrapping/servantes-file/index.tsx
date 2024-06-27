import { cookies } from "next/headers"
import { Forms } from "./forms"

export const ServantsFile = () => {
  const token = cookies().get('auth-token')?.value
  return <Forms token={token} />
}