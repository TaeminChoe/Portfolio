import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

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
    <div className="mx-auto w-full px-4 py-8 lg:max-w-[1024px] lg:px-6 lg:py-10">
      <article className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none break-all">
        <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>{contents}</ReactMarkdown>
      </article>
    </div>
  );
}
