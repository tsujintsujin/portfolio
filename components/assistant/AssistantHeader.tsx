import { Close, Sparkle } from "@/components/ui/icons";

export default function AssistantHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3.5 sm:px-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0066cc] text-white">
        <Sparkle className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-tight">Justin&apos;s assistant</p>
        <p className="flex items-center gap-1.5 text-[13px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" aria-hidden="true" />
          AI agent, online now
        </p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="focus-ring grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <Close className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
