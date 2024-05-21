import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TVShow } from '../types/ShowTypes';
import { useEffect, useState } from 'react';
import { getContenteasonEpisodes } from '../api/requests';
import { Episodes } from './Episodes';
import { SelectedTVShow } from '../types/ShowEpisodesTypes';


interface ContentInfoProps {
    data: TVShow;
    id: string
  }

export const TvShowContent: React.FC<ContentInfoProps>=({data, id})=>{
    const [value, setValue] = React.useState(0)
    const [episodesData, setEpisodesData] = useState<SelectedTVShow | null>(null)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.target
        setValue(newValue);
    };
    useEffect(() => {
        const currentId = Number(localStorage.getItem('directedPageID')) as number
        getContenteasonEpisodes(currentId, value).then(response=> setEpisodesData(response))
    }, [value, id])
    
    return (<>
        <Box sx={{ maxWidth: { xs: 320, sm: 800 }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {data && data.seasons.map((season)=>(
                    <Tab key={season.id} label={season.name} />
                ))}
            </Tabs>
        </Box>
        {episodesData && <Episodes episodesData={episodesData} />}
    </>
    );
}
