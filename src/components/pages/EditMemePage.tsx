import React from "react";
import MemeEditForm from "../MemeEditForm";
import MemePreview from "../MemePreview";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppHeader from "../common/AppHeader";
import { useParams } from "react-router-dom";
import { makeMeme } from "../../services/memesRelatedService";
import { MemeCaptionPayload } from "../../interfaces/memesRelated";
import OfflineHeader from "../common/OfflineHeader";
function EditMemePage() {
  let params = useParams();
  const [currentSelectedMemeId = "", currentSelectedBoxCount = ""] =
    params.memeId?.split("-") ?? ["1", "2"];

  const [previewImageURL, setPreviewImageURL] = React.useState("");
  const [isImageLoading, setImageLoading] = React.useState(false);

  const getCurrentSelectedMemeSampleImage = React.useCallback(async () => {
    setImageLoading(true);
    const payload: MemeCaptionPayload = {
      templedId: currentSelectedMemeId,
      captionList: Array.from({
        length: Number(currentSelectedBoxCount),
      }).map((_: unknown, index: number): string => {
        return `Text ${index+1}`;
      }),
      textFontSize: 50,
      textColor: "#000000",
      outlineTextColor: "#ffffff",
    };
    try {
      const response = await makeMeme(payload);
      if (response) setPreviewImageURL(response?.data?.url);
      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
    }
  }, [currentSelectedMemeId, currentSelectedBoxCount]);
  React.useEffect(() => {
    getCurrentSelectedMemeSampleImage();
  }, [getCurrentSelectedMemeSampleImage]);
  return (
    <>
      {!navigator.onLine && <OfflineHeader />}
      <AppHeader />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid
            item
            xs={4}
            sm={3}
            md={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <MemePreview
              previewImageURL={previewImageURL}
              isImageLoading={isImageLoading}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={8}>
            <MemeEditForm
              setPreviewImageURL={setPreviewImageURL}
              currentSelectedBoxCount={Number(currentSelectedBoxCount)}
              currentSelectedMemeId={currentSelectedMemeId}
              setImageLoading={setImageLoading}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sm={3}
            md={4}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MemePreview
              previewImageURL={previewImageURL}
              isImageLoading={isImageLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default EditMemePage;
