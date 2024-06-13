import { cookies } from 'next/headers';
import { CreateUserProvider } from '@/context/createuser';
import { Email, Roles, Singin } from '@/partials/create-users';

export default function Page() {
  const token = cookies().get('auth-token')?.value

  return (
    <CreateUserProvider>
      <div className="grid grid-cols-2 gap-4 mb-14">
        <section className="space-y-5">
          {token ? (
            <>
              <Singin token={token} />
              <Roles token={token} />
              <Email />
            </>
          ) : null}
        </section>
      </div>
    </CreateUserProvider>
  )
}
