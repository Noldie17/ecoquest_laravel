'use client';

import { useEffect, useState } from 'react';

export default function HydrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // During SSR and initial hydration, suppress warnings
  if (!isHydrated) {
    return (
      <div suppressHydrationWarning={true}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}