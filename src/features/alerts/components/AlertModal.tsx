import React, { useEffect, useRef, useState } from "react";
import AlertButton from "./AlertButton";

export interface Props {
  title?: string;
  content: string;
  buttons: {
    text: string;
    onClick(): void;
    className?: string;
  }[];
  onClose(): void;
}

export default function AlertModal({ title, content, buttons, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [align, setAlign] = useState<"start" | "center">("center");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const updateAlign = () => {
      const contentHeight = contentRef.current?.offsetHeight ?? 0;
      const viewportHeight = window.innerHeight;
      setAlign(contentHeight >= viewportHeight ? "start" : "center");
    };

    const observer = new ResizeObserver(updateAlign);
    if (contentRef.current) observer.observe(contentRef.current);
    updateAlign();

    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <>
      {/* Dimmed background */}
      <div
        className={`bg-background/80 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-0 z-50 flex justify-center ${align === "start" ? "items-start" : "items-center"} overflow-y-auto py-40`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "alertmodal-title" : undefined}
        aria-describedby="alertmodal-desc"
      >
        <div
          ref={contentRef}
          className={`bg-surface text-text border-border relative mx-4 w-full max-w-sm transform rounded-2xl border shadow-lg transition-all duration-200 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"} focus:outline-none`}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Close button */}
          <button
            className="text-subtext hover:text-text focus-visible:ring-border absolute top-2.5 right-2.5 rounded-lg p-1 transition-colors focus:outline-none focus-visible:ring-1"
            onClick={handleClose}
            aria-label="닫기"
            type="button"
          >
            {/* 인라인 SVG (아이콘) */}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="block">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="p-5">
            {title && (
              <h2 id="alertmodal-title" className="text-title text-text mb-2">
                {title}
              </h2>
            )}

            <p id="alertmodal-desc" className="text-description text-subtext whitespace-pre-wrap">
              {content}
            </p>

            <div className="flex flex-wrap justify-end gap-2 pt-5">
              {buttons.map((btn, idx) => (
                <AlertButton
                  key={idx}
                  color={idx === 0 ? "primary" : "secondary"}
                  onClick={() => {
                    setVisible(false);
                    setTimeout(() => btn.onClick(), 200);
                  }}
                  className={btn.className}
                  type="button"
                >
                  {btn.text}
                </AlertButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
