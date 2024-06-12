import { UserProvider } from "@/context/user"
import { LoginForm } from "./forms"

export default function Page() {
  return (
    <UserProvider>
      <div className="w-screen h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </UserProvider>
  )
}