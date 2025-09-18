import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // src/constants/articles 폴더의 파일명을 slug로 변환
  const articlesDir = path.join(process.cwd(), "src", "constants", "articles");
  const files = fs.readdirSync(articlesDir);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

async function loadMarkdown(slug: string) {
  const filePath = path.join(process.cwd(), "src", "constants", "articles", `${slug}.md`);
  try {
    const raw = await fs.readFileSync(filePath, "utf-8");
    return raw;
  } catch (err: any) {
    if (err?.code === "ENOENT") return null;
    throw err;
  }
}

export default async function ArticlePage({ params }: Props) {
  const contents = await loadMarkdown(params.slug);
  if (!contents) notFound();

  return (
    <div className="prose prose-invert mx-auto max-w-[800px] px-4 py-10">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{contents}</ReactMarkdown>
    </div>
  );
}
