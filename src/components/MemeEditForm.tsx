import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useFormik } from 'formik';
import AdditionalFormInputs from './AdditionalFormInputs';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {
	MemeCaptionPayload,
	MemeEditFormProps,
	StringKeyObjectValue,
} from '../interfaces/memesRelated';
import { makeMeme } from '../services/memesRelatedService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps,AlertColor } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
export default function MemeEditForm(props: MemeEditFormProps) {
	const {
		setImageLoading,
		setPreviewImageURL,
		currentSelectedBoxCount,
		currentSelectedMemeId,
	} = props;
	const [textColor, setTextColor] = React.useState('#000000');
	const [outlineTextColor, setOutlineTextColor] = React.useState('#ffffff');
	const [textFontSize, setTextFontSize] = React.useState(50);
	const [shouldShowInputErrorMsg, setShowInputErrorMsg] = React.useState({
		shouldShow: false,
		msg: '',
		severity: 'error' as AlertColor
	});
	const formik = useFormik({
		initialValues: generateInitialValuesForFrom(currentSelectedBoxCount),

		onSubmit: async values => {
			let flag = 0;
			const payload: MemeCaptionPayload = {
				templedId: currentSelectedMemeId,
				captionList: [],
				textFontSize,
				textColor,
				outlineTextColor,
			};
			for (const key in values) {
				if (Object.prototype.hasOwnProperty.call(values, key)) {
					const element: string = values[key].toString();
					if (element === '') payload.captionList.push(' ');
					if (element !== '') {
						flag = 1;
						payload.captionList.push(element);
					}
				}
			}
			if (flag === 0) {
				setShowInputErrorMsg({
					shouldShow: true,
					msg: 'Please fill at least 1 box caption',
					severity: 'error'
				});
			} else {
				setImageLoading(true);
				try {
					const response = await makeMeme(payload);
					if (response) setPreviewImageURL(response?.data?.url);
					setImageLoading(false);
					setShowInputErrorMsg({
						shouldShow: true,
						msg: 'Meme is created successfully',
						severity: 'success'
					});

				} catch (error) {
					if (navigator.onLine)
						setShowInputErrorMsg({
							shouldShow: true,
							msg: 'Something went wrong. Please try again',
							severity: 'error'
						});
					else
						setShowInputErrorMsg({
							shouldShow: true,
							msg: 'You are offline. Please check you internet connection',
							severity: 'error'
						});
					setImageLoading(false);
				}
			}
		},
	});

	return (
		<Card>
			<Grid
				container
				component='main'
				sx={{
					height: { sm: '85vh' },
					overflowY: { sm: 'auto' },
				}}
			>
				<CssBaseline />
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					component={Paper}
					elevation={6}
					square
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<EmojiEmotionsIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Make your own Meme
						</Typography>
						<Box
							component={'div'}
							sx={{ mt: 1, width: { xs: '100%', sm: '80%' } }}
						>
							{Array.from({
								length: currentSelectedBoxCount,
							}).map((_, index) => {
								return (
									<TextField
										margin='normal'
										key={index}
										fullWidth
										id={`box${index + 1}text`}
										label={`Box ${index + 1} Text`}
										name={`box${index + 1}text`}
										autoComplete={`box${index + 1}text`}
										autoFocus={index === 0 ? true : false}
										value={
											formik.values[`box${index + 1}text`]
										}
										onChange={formik.handleChange}
										error={
											formik.touched[
												`box${index + 1}text`
											] &&
											Boolean(
												formik.errors[
													`box${index + 1}text`
												],
											)
										}
									/>
								);
							})}
							<AdditionalFormInputs
								textColor={textColor}
								setTextColor={setTextColor}
								outlineTextColor={outlineTextColor}
								setOutlineTextColor={setOutlineTextColor}
								setTextFontSize={setTextFontSize}
							/>
							<Button
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								onClick={() => formik.handleSubmit()}
								
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Snackbar
				open={shouldShowInputErrorMsg.shouldShow}
				autoHideDuration={6000}
				onClose={() =>
					setShowInputErrorMsg({ shouldShow: false, msg: '',severity: 'error' })
				}
				anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
			>
				<Alert
					severity={shouldShowInputErrorMsg.severity}
					sx={{ width: '100%' }}
					onClose={() =>
						setShowInputErrorMsg({ shouldShow: false, msg: '',severity: 'error' })
					}
				>
					{shouldShowInputErrorMsg.msg}
				</Alert>
			</Snackbar>
		</Card>
	);
}

function generateInitialValuesForFrom(boxCount: number) {
	const initialValuesForFrom: StringKeyObjectValue = {};
	Array.from({ length: boxCount }).forEach((_, index) => {
		initialValuesForFrom[`box${index + 1}text`] = '';
	});
	return initialValuesForFrom;
}
