import * as React from 'react';
import { MemesGridPropsType } from '../types/memesRelated';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
const MemesListHeading = styled('div')(({ theme }) => ({
	...theme.typography.button,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(1),
	fontSize: 30,
}));
export default function MemesGrid(props: MemesGridPropsType) {
	let navigate = useNavigate();
	return (
		<Box
			sx={{
				flexGrow: 1,
				marginRight: '20px',
				marginLeft: '20px',
				marginBottom: '10px',
			}}
		>
			<Box
				component={'div'}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 4,
					marginTop:4
				}}
			>
				<MemesListHeading>{'Top 100 Memes'}</MemesListHeading>
			</Box>

			<Grid
				container
				spacing={{ xs: 8, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{props.memes.map(item => (
					<Grid item xs={4} sm={4} md={4} key={item.id}>
						<Card
							sx={{
								maxWidth: 400,
								minHeight: 400,
								maxHeight: 400,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								overflowY: 'auto',
								cursor:'pointer'
							}}
							className={'scroll'}
							onClick={()=>navigate(`make-memes/${item.id}-${item.box_count}`)}
						>
							<CardMedia
								component='img'
								image={item.url}
								alt={item.name}
							
							/>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography
									gutterBottom
									variant='h5'
									component='div'
								>
									{item.name}
								</Typography>
								<Typography
									variant='button'
									display='block'
									gutterBottom
									sx={{ textTransform: 'none' }}
								>
									There are <em>{item.box_count}</em> editable{' '}
									{item.box_count > 1 ? 'boxes' : 'box'}.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
