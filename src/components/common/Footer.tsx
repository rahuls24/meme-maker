import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from '@mui/material';
function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				mt: 'auto',
				backgroundColor: theme =>
					theme.palette.mode === 'light'
						? theme.palette.grey[200]
						: theme.palette.grey[800],
			}}
		>
			<Container
				maxWidth='sm'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<List
					sx={{
						width: '100%',
						maxWidth: 'xs',
						bgcolor: 'inherit',
					}}
					component='nav'
					aria-labelledby='nested-list-subheader'
					subheader={
						<>
							<ListSubheader
								component='div'
								id='nested-list-subheader'
								sx={{ bgcolor: 'inherit' }}
							>
								Credits:-
							</ListSubheader>
							<Divider />
						</>
					}
				>
					<ListItemButton>
						<Link
							color='inherit'
							href='https://www.flaticon.com/free-icons/laugh'
							title='survey icons'
							target={'_blank'}
						>
							Survey icons created by Freepik - Flaticon
						</Link>
					</ListItemButton>
				</List>
				<Link
					color='inherit'
					href='https://node-down.web.app/'
					target={'_blank'}
				>
					Buy a cup of coffee for developer
				</Link>
				<Copyright />
			</Container>
		</Box>
	);
}

export default Footer;

function Copyright() {
	return (
		<>
			<Box sx={{ display: 'flex', gap: '16px' }}>
				<Typography variant='body2' color='text.secondary'>
					{'Copyright © '}
					<Link
						color='inherit'
						href='https://funny-meme-maker.web.app/'
						target={'_blank'}
					>
						Meme Maker
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					<Link
						color='inherit'
						href='https://funny-meme-maker.web.app/'
						target={'_blank'}
					>
						Feedback
					</Link>
				</Typography>
			</Box>
		</>
	);
}
