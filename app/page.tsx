import AppLayout from '@/components/layout/AppLayout';
import { SectionRouterProvider } from '@/components/logic/SectionRouter.client';

export default function Page() {
  return (
    <SectionRouterProvider>
      <AppLayout />
    </SectionRouterProvider>
  );
}
