import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // src/constants/projects 폴더의 파일명을 slug로 변환
  const projectsDir = path.join(process.cwd(), "src", "constants", "projects");
  const files = fs.readdirSync(projectsDir);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default function ProjectPage({ params }: Props) {
  const filePath = path.join(process.cwd(), "src", "constants", "projects", `${params.slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="prose prose-invert mx-auto max-w-[800px] px-4 py-10">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
    </div>
  );
}
