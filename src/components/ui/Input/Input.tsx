import { InputAdornment, TextField } from '@mui/material';
import styles from './Input.module.scss';
import { Icon } from '../Icon';

type Props = {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const Input = ({ value, placeholder, onChange }: Props) => {
  return (
    <TextField
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={styles.input}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '40px',
          padding: '0 16px',
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="search"
                size={20}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
