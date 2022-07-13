import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { HexColorPicker } from 'react-colorful';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import Chip from '@mui/material/Chip';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import fontColorContrast from 'font-color-contrast';
import { SimpleAccordionProps } from '../interfaces/memesRelated';
export default function AdditionalFormInputs(props: SimpleAccordionProps) {
	const {
		textColor,
		setTextColor,
		outlineTextColor,
		setOutlineTextColor,
		setTextFontSize,
	} = props;
	const [shouldShowTextColorPicker, setShouldShowTextColorPicker] =
		React.useState(false);
	const [
		shouldShowOutlineTextColorPicker,
		setShouldShowOutlineTextColorPicker,
	] = React.useState(false);

	return (
		<div>
			<Accordion sx={{mt:4}}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Additional Optional Inputs</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container>
						<Grid item xs={12} sm={2} md={2}>
							<Typography
								variant='button'
								display='block'
								gutterBottom
								sx={{
									textAlign: { xs: 'center', sm: 'inherit' },
								}}
							>
								Font Size
							</Typography>
						</Grid>
						<Grid item xs={12} sm={10} md={10}>
							<Slider
								defaultValue={50}
								aria-label='Default'
								valueLabelDisplay='auto'
								min={50}
								max={100}
								onChange={(event: Event) =>
									setTextFontSize(
										Number(
											(event.target as HTMLInputElement)
												.value,
										),
									)
								}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						sx={{
							mt: 5,
							alignItems: 'center',
						}}
					>
						<Grid item xs={12} sm={2} md={2}>
							<Typography
								variant='button'
								display='block'
								gutterBottom
								sx={{
									textAlign: { xs: 'center', sm: 'inherit' },
								}}
							>
								Text color
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}
							md={3}
							sx={{
								display: { xs: 'flex', sm: 'block' },
								justifyContent: { xs: 'center' },
							}}
						>
							<Box
								onClick={() =>
									setShouldShowTextColorPicker(true)
								}
							>
								<Chip
									icon={<ColorLensOutlinedIcon />}
									label={getColorName(textColor)}
									variant='outlined'
									sx={{
										backgroundColor: `${textColor}`,
										color: fontColorContrast(textColor),
										cursor: 'pointer',
										'&:hover': {
											backgroundColor:
												getHoverColorForColorPicker(
													textColor,
												),
										},
									}}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							{shouldShowTextColorPicker && (
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									spacing={{ xs: 1, sm: 2, md: 4 }}
									sx={{ alignItems: 'center' }}
								>
									<HexColorPicker
										color={textColor}
										onChange={setTextColor}
									/>
									<IconButton
										aria-label='delete'
										onClick={() =>
											setShouldShowTextColorPicker(false)
										}
									>
										<CloseIcon />
									</IconButton>
								</Stack>
							)}
						</Grid>
					</Grid>
					<Grid
						container
						sx={{
							mt: 5,
							alignItems: 'center',
						}}
					>
						<Grid item xs={12} sm={2} md={2}>
							<Typography
								variant='button'
								display='block'
								gutterBottom
								sx={{
									textAlign: { xs: 'center', sm: 'inherit' },
								}}
							>
								Text Outline color
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}
							md={3}
							sx={{
								display: { xs: 'flex', sm: 'block' },
								justifyContent: { xs: 'center' },
							}}
						>
							<Box
								onClick={() =>
									setShouldShowOutlineTextColorPicker(true)
								}
							>
								<Chip
									icon={<ColorLensOutlinedIcon />}
									label={getColorName(outlineTextColor)}
									variant='outlined'
									sx={{
										backgroundColor: `${outlineTextColor}`,
										color: fontColorContrast(
											outlineTextColor,
										),
										'&:hover': {
											backgroundColor:
												getHoverColorForColorPicker(
													outlineTextColor,
												),
										},
										cursor: 'pointer',
									}}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							{shouldShowOutlineTextColorPicker && (
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									spacing={{ xs: 1, sm: 2, md: 4 }}
									sx={{ alignItems: 'center' }}
								>
									<HexColorPicker
										color={outlineTextColor}
										onChange={setOutlineTextColor}
									/>
									<IconButton
										aria-label='delete'
										onClick={() =>
											setShouldShowOutlineTextColorPicker(
												false,
											)
										}
									>
										<CloseIcon />
									</IconButton>
								</Stack>
							)}
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
function getColorName(hexValueOfColor: string) {
	extend([namesPlugin]);
	return colord(hexValueOfColor).toName({ closest: true });
}

function getHoverColorForColorPicker(hexColor: string) {
	return colord(
		colord(colord(hexColor).toRgbString()).alpha(0.8).toRgbString(),
	).toHex();
}
