import { Button } from '@mui/material';
import { Heart, Heart as HeartFilled } from 'lucide-react';
import styles from './LikeButton.module.scss';

type Props = {
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  colored?: boolean;
};

export const LikeButton = ({
  onClick,
  isSelected = false,
  colored = false,
}: Props) => {
  return (
    <Button
      className={`${styles.button} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      disableRipple
    >
      {isSelected ?
        <HeartFilled
          size={20}
          fill={colored ? 'currentColor' : 'none'}
        />
      : <Heart size={20} />}
    </Button>
  );
};
