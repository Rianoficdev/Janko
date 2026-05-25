import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JANKO - Modern Tech Lifestyle",
    template: "%s | JANKO",
  },
  description:
    "Tecnologia premium para o dia a dia moderno: design, inovacao, praticidade e experiencia futurista.",
  keywords: ["lifestyle tech", "gadgets premium", "tecnologia premium", "design futurista", "smart home"],
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
  openGraph: {
    title: "JANKO",
    description: "Modern Tech Lifestyle para quem exige mais da experiencia diaria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('janko-theme');
                  var shouldUseLight = savedTheme === 'light';
                  document.documentElement.classList.toggle('light', shouldUseLight);
                  document.documentElement.dataset.theme = shouldUseLight ? 'light' : 'dark';
                  document.documentElement.style.colorScheme = shouldUseLight ? 'light' : 'dark';
                  document.body.classList.toggle('light', shouldUseLight);
                  document.body.dataset.theme = shouldUseLight ? 'light' : 'dark';
                  if (shouldUseLight) {
                    document.body.style.background = '#f7f4ec';
                    document.body.style.color = '#111111';
                  }
                } catch (error) {}
              })();
            `,
          }}
        />
        <Providers>
          <div className="noise" />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
