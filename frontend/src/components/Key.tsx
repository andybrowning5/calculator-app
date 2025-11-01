type KeyProps = {
  label: string;
  onPress: (value: string) => void;
  className?: string;
};

export default function Key({ label, onPress, className }: KeyProps) {
  return (
    <button
      type="button"
      className={`select-none rounded-xl p-3 text-lg font-medium shadow-sm bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition ${className ?? ''}`}
      onClick={() => onPress(label)}
      aria-label={`key ${label}`}
    >
      {label}
    </button>
  );
}
