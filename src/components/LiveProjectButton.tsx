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
      className="cursor-pointer whitespace-nowrap rounded-full border border-[#cba5ab] bg-[#f2e1e3] px-4 py-2.5 text-sm font-semibold text-[#4e252d] transition-colors hover:bg-[#ead1d6] focus-visible:ring-2 focus-visible:ring-[#743b46] focus-visible:ring-offset-2 sm:px-5"
    >
      Дэлгэрэнгүй
    </button>
  );
}
