import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Review My MP",description:"Constituent experiences with local MPs, focused on service rather than political agreement."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body>{children}</body></html>}
