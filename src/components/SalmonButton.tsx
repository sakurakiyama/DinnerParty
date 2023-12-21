interface SalmonButtonProps {
  display: string;
  handleClick: (operation?: string) => void;
  operation?: string;
  disabled: boolean;
}

function SalmonButton({
  display,
  handleClick,
  operation,
  disabled,
}: SalmonButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => handleClick(operation)}
      className={`rounded-full p-2 pl-8 pr-8 text-white ${
        disabled ? 'bg-gray-300' : 'bg-[var(--salmon)]'
      } `}
    >
      {display}
    </button>
  );
}

export default SalmonButton;
