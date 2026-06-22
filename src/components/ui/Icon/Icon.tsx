import styles from './Icon.module.scss';
import { getImageUrl } from '../../../services/getImageUrl.ts';

type IconName =
  | 'home'
  | 'search'
  | 'cart'
  | 'heart'
  | 'heart-filled'
  | 'minus'
  | 'plus'
  | 'close'
  | 'arrow-left'
  | 'arrow-left-dark'
  | 'arrow-right'
  | 'arrow-right-dark'
  | 'arrow-down'
  | 'arrow-up'
  | 'arrow-up-dark'
  | 'burger'
  | 'truck'
  | 'headphones';

type Props = {
  name: IconName;
  size?: number;
  colored?: boolean;
};

export const Icon = ({ name, size = 16, colored = false }: Props) => {
  return (
    <img
      src={getImageUrl(`icons/${name}.svg`)}
      className={`${styles.icon} ${colored ? styles.icon__colored : ''}`}
      alt={name}
      height={size}
    />
  );
};
