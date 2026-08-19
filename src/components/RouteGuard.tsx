"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

/**
 * Route enablement is a pure lookup against the config, so it is resolved during
 * render rather than in an effect. That matters: an effect never runs on the
 * server, so gating the whole tree behind one would reduce every page's
 * server-rendered HTML to a spinner and leave the real content to client-side
 * hydration - bad for SEO, LCP, and assistive tech.
 */
function isRouteEnabled(pathname: string): boolean {
  if (!pathname) return false;
  if (pathname in routes) return routes[pathname as keyof typeof routes];

  const dynamicRoutes = ["/blog", "/work"] as const;
  return dynamicRoutes.some((route) => pathname.startsWith(route) && routes[route]);
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname() ?? "";

  const routeEnabled = isRouteEnabled(pathname);
  const requiresPassword = Boolean(protectedRoutes[pathname as keyof typeof protectedRoutes]);

  // Only password-protected routes need an async round trip, so only they get
  // a loading state. Every other route renders its children immediately.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(requiresPassword);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!requiresPassword) {
      setCheckingAuth(false);
      return;
    }

    let cancelled = false;
    setCheckingAuth(true);
    setIsAuthenticated(false);

    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled && response.ok) setIsAuthenticated(true);
      })
      .catch(() => {
        /* treat a failed check as unauthenticated */
      })
      .finally(() => {
        if (!cancelled) setCheckingAuth(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, requiresPassword]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (requiresPassword && !isAuthenticated) {
    if (checkingAuth) {
      return (
        <Flex fillWidth paddingY="128" horizontal="center">
          <Spinner />
        </Flex>
      );
    }

    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading as="h1" align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
