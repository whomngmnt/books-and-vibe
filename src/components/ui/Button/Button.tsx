import { Button } from '@mui/material';
import styles from './Button.module.scss';

type Props = {
  variant?: 'primary' | 'selected';
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const AppButton = ({
  variant = 'primary',
  children,
  onClick,
}: Props) => {
  return (
    <Button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disableRipple
    >
      {children}
    </Button>
  );
};
