import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { GenresResponse, Genre } from '../types/types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, genreName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      genreName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectChip {
  genresTypes: GenresResponse;
}

const MultipleSelectChip: React.FC<MultipleSelectChip> = ({ genresTypes }) => {
  const genres = genresTypes && genresTypes.genres.map((genre: Genre) => genre.name);
  const theme = useTheme();
  const [genreName, setGenreName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof genreName>) => {
    const {
      target: { value },
    } = event;
    setGenreName(
      typeof value === 'string' ? value.split(',') : value,
    );
    localStorage.setItem('selectedGenres', JSON.stringify(genreName))
  };
  localStorage.setItem('selectedGenres', JSON.stringify(genreName))
  return (
    <div className='flex md:flex-row flex-col items-center'>
      <FormControl sx={{ m: 1, width: 300, border: "1px, solid, black" }}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={genreName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select...</em>;
            }
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
          displayEmpty
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          {genres && genres.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
              style={getStyles(genre, genreName, theme)}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button onClick={() => setGenreName([])} className=' md:ml-4 px-4 text-white h-10 text-nowrap bg-red-500 rounded-lg transition duration-200'>Clear Genres</button>
    </div>
  );
}

export default MultipleSelectChip;
