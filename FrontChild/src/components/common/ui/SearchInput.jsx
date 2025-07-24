import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ value, onChange, label , placeholder}) => (
    <TextField
        label={label}
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        placeholder={placeholder || "Buscar..."}
        sx={{ mb: 3 }}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
    />
);

export default SearchInput;
