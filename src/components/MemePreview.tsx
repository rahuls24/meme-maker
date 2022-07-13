import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { MemePreviewProps } from '../interfaces/memesRelated';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
function MemePreview(props: MemePreviewProps) {
	const { previewImageURL, isImageLoading } = props;
	return (
		<Card
			sx={{
				height: { sm: '85vh' },
			}}
			className={'scroll preview-card-grid'}
		>
			{!isImageLoading && (
				<>
					<Box
						component={'div'}
						sx={{ overflowY: 'auto' }}
						className='scroll'
					>
						<img
							src={previewImageURL}
							alt='meme'
							style={{ width: '100%', objectFit: 'cover' }}
						/>
						{previewImageURL?.length > 0 ? null : (
							<>
								<Alert severity='error'>
									<AlertTitle>
										{navigator.onLine
											? 'Something went wrong'
											: 'Your device is Offline'}
									</AlertTitle>
									{navigator.onLine ? (
										<>
											<Box
												component={'div'}
												sx={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'column',
												}}
											>
												<Button
													variant='outlined'
													color='success'
													onClick={() => window.location.reload()}
												>
													Reload
												</Button>
											</Box>
										</>
									) : (
										<Typography
											variant='body1'
											gutterBottom
											sx={{ mt: 2 }}
										>
											Please Check your internet
											connection
										</Typography>
									)}
								</Alert>
							</>
						)}
					</Box>
					<Box
						component={'div'}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Fab
							color='primary'
							aria-label='download'
							onClick={() =>
								saveAs(
									previewImageURL,
									`meme-${new Date().getUTCMilliseconds()}`,
								)
							}
							disabled={
								previewImageURL?.length > 0 ? false : true
							}
						>
							<FileDownloadIcon />
						</Fab>
					</Box>
				</>
			)}
			{isImageLoading && (
				<Box
					component={'div'}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					className='scroll'
				>
					<CircularProgress color='secondary' />
				</Box>
			)}
		</Card>
	);
}

export default MemePreview; 
