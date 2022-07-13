import React from "react";
export interface SimpleAccordionProps {
	textColor: string;
	setTextColor: React.Dispatch<React.SetStateAction<string>>;
	outlineTextColor: string;
	setOutlineTextColor: React.Dispatch<React.SetStateAction<string>>;
	setTextFontSize: React.Dispatch<React.SetStateAction<number>>;
}
export interface StringKeyObjectValue {
	[key: string]: Object;
}
export interface MemeCaptionPayload {
	templedId: string;
	captionList: string[];
	textFontSize: number;
	textColor: string;
	outlineTextColor: string;
}
export interface MemeEditFormProps {
	setPreviewImageURL:React.Dispatch<React.SetStateAction<string>>;
	currentSelectedBoxCount:number;
	currentSelectedMemeId:string,
	setImageLoading : React.Dispatch<React.SetStateAction<boolean>>


}
export interface MemePreviewProps{
	isImageLoading:boolean,
	previewImageURL:string,
}