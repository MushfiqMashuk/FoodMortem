import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FoodMortem", template: "%s · FoodMortem" },
  description: "Honest ratings and reviews of the food you actually eat.",
};

export const viewport: Viewport = {
  themeColor: "#ff9500",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="container">
          {children}
        </main>
        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} FoodMortem · Rate it. Review it. Remember it.
          </p>
        </footer>
      </body>
    </html>
  );
}
