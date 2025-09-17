import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // articles 폴더의 파일명을 slug로 변환
  const articlesDir = path.join(process.cwd(), "src", "constants", "articles");
  // const filePath = path.join(
  //   process.cwd(),
  //   "src",
  //   "constants",
  //   "articles",
  //   "cypress-e2e-process.md",
  // );
  const files = fs.readdirSync(articlesDir);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default function ArticlePage({ params }: Props) {
  const filePath = path.join(process.cwd(), "src", "constants", "articles", `${params.slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="prose prose-invert mx-auto max-w-[800px] px-4 py-10">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
    </div>
  );
}
