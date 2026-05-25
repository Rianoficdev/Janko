import { NextResponse } from "next/server";

const DEV_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

function getAllowedOrigins() {
  const configured = process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origins = [...(configured ?? []), ...(siteUrl ? [siteUrl] : [])];

  if (process.env.NODE_ENV !== "production") {
    origins.push(...DEV_ORIGINS);
  }

  return Array.from(new Set(origins));
}

function getOrigin(request: Request) {
  return request.headers.get("origin");
}

export function isAllowedOrigin(request: Request) {
  const origin = getOrigin(request);
  if (!origin) return true;
  return getAllowedOrigins().includes(origin);
}

export function forbiddenCorsResponse() {
  return NextResponse.json(
    { error: "Origem nao autorizada para acessar esta API." },
    { status: 403 },
  );
}

export function corsHeaders(request: Request, methods: string[]) {
  const origin = getOrigin(request);
  const headers = new Headers();

  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", methods.join(", "));
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");

  if (origin && isAllowedOrigin(request)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
}

export function preflightResponse(request: Request, methods: string[]) {
  if (!isAllowedOrigin(request)) {
    return forbiddenCorsResponse();
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request, methods),
  });
}

export function secureJson(request: Request, body: unknown, methods: string[], init?: ResponseInit) {
  if (!isAllowedOrigin(request)) {
    return forbiddenCorsResponse();
  }

  const response = NextResponse.json(body, init);
  const headers = corsHeaders(request, methods);

  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}
