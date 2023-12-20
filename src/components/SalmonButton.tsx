interface SalmonButtonProps {
  display: string;
  handleClick: (operation?: string) => void;
  operation?: string;
}

function SalmonButton({ display, handleClick, operation }: SalmonButtonProps) {
  return (
    <button
      onClick={() => handleClick(operation)}
      className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
    >
      {display}
    </button>
  );
}

export default SalmonButton;
