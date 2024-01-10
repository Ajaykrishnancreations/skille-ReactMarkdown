import Link from "next/link";

export default function Home() {
  return (
    <main className="p-24">
      <Link href="/demo">MarkdownPreviewer</Link>
      <br/>
      <Link href="/certificate">Certificate</Link>
    </main>
  )
}
