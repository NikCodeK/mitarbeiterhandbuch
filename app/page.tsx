import { cookies } from 'next/headers';

import AppLayout from '../components/layout/AppLayout';
import { verify } from '../lib/auth';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;
  const session = sessionCookie ? await verify(sessionCookie) : null;

  return <AppLayout isAdmin={Boolean(session)} />;
}
