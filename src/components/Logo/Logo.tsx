import logo from '/icons/logo.jpg';

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <img
      src={logo}
      className={className}
      alt="Books and Vibe"
      style={{ background: 'transparent' }}
    />
  );
};
