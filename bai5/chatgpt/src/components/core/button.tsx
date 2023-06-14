type Props = {
  className?: string;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      className={`bg-green h-full w-auto aspect-square rounded-full text-white hover:text-black ${
        props.className || ""
      }`}
      onClick={props.onClick}
    >
      +
    </button>
  );
};

export default Button;
