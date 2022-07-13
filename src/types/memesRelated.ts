export type MemeObject = {
	id: string;
	name: string;
	url: string;
	width: number;
	height: number;
	box_count: number;
};

export type MemesGridPropsType = {
	memes: MemeObject[];
};

export type MemesGetResponse =
	| {
			success: boolean;
			data: {
				memes: MemeObject[];
			};
	  }
	| undefined;
