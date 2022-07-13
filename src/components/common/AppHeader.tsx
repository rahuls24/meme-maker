import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
const AppHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<AppBar position='static' sx={{ marginBottom: '0px'}}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{location.pathname !== '/' && (
						<ArrowBackIcon
							onClick={() => navigate('/')}
							sx={{ cursor: 'pointer', fontSize: 40 }}
						/>
					)}

					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography variant='h6' component='div' gutterBottom>
							{'Memes Maker'}
						</Typography>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default AppHeader;
