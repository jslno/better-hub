"use client";

import { useState, useCallback } from "react";
import { Ghost } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/github-utils";
import { useGlobalChat, type InlineContext } from "@/components/shared/global-chat-provider";

export function MarkdownBlobView({
  rawView,
  previewView,
  fileSize,
  lineCount,
  language,
  content,
  filePath,
  filename,
}: {
  rawView: React.ReactNode;
  previewView: React.ReactNode;
  fileSize?: number;
  lineCount: number;
  language: string;
  content: string;
  filePath: string;
  filename: string;
}) {
  const [mode, setMode] = useState<"preview" | "raw">("preview");
  const { addCodeContext } = useGlobalChat();

  const displayName = filePath || filename;

  const handleAddFileToGhost = useCallback(() => {
    const ctx: InlineContext = {
      filename: displayName,
      startLine: 1,
      endLine: lineCount,
      selectedCode: content,
      side: "RIGHT",
    };
    addCodeContext(ctx);
  }, [displayName, lineCount, content, addCodeContext]);

  return (
    <div>
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm flex items-center gap-3 px-1 py-1.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode("raw")}
            className={cn(
              "text-[11px] font-mono transition-colors cursor-pointer",
              mode === "raw"
                ? "text-muted-foreground underline underline-offset-4"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            )}
          >
            Raw
          </button>
          <span className="text-muted-foreground/25 text-[11px]">/</span>
          <button
            onClick={() => setMode("preview")}
            className={cn(
              "text-[11px] font-mono transition-colors cursor-pointer",
              mode === "preview"
                ? "text-muted-foreground underline underline-offset-4"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            )}
          >
            Preview
          </button>
        </div>
        {fileSize != null && (
          <span className="text-[11px] font-mono text-muted-foreground/60">
            {formatBytes(fileSize)}
          </span>
        )}
        <span className="text-[11px] font-mono text-muted-foreground/60">
          {lineCount} lines
        </span>
        <span className="text-[11px] font-mono text-muted-foreground/60">
          {language}
        </span>
        <div className="flex-1" />
        <button
          onClick={handleAddFileToGhost}
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer rounded-md hover:bg-muted/60"
          title="Add entire file to Ghost"
        >
          <Ghost className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className={mode === "raw" ? "block" : "hidden"}>{rawView}</div>
      <div className={mode === "preview" ? "block" : "hidden"}>{previewView}</div>
    </div>
  );
}
