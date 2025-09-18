import { SVGProps } from "react";

export default function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9 18l-6-6 6-6" stroke="currentColor" />
      <path d="M15 6l6 6-6 6" stroke="currentColor" />
    </svg>
  );
}
