export interface LiveProjectButtonProps {
  onClick?: () => void;
  projectName: string;
}

export function LiveProjectButton({ onClick, projectName }: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${projectName} төслийн дэлгэрэнгүй`}
      className="rounded-full border border-[#ad7e95] bg-[#f6e6ef] px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-[#653550] transition-colors hover:bg-[#efd8e6] focus-visible:ring-2 focus-visible:ring-[#713b63] focus-visible:ring-offset-2 sm:px-5 cursor-pointer"
    >
      Дэлгэрэнгүй
    </button>
  );
}
