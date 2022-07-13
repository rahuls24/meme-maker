import React from "react";
import useFetch from "../../custom/hooks/useFetch";
import AppHeader from "../common/AppHeader";
import MemesGrid from "../MemesGrid";
import { MemesGetResponse } from "../../types/memesRelated";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../common/Footer";
import somethingWentWrong from "../../assets/something-went-wrong.png";
import noSignal from "../../assets/no-signal.png";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OfflineHeader from "../common/OfflineHeader";
import { AppContext } from "../../App";
function HomePage() {
  const { isOnline } = React.useContext(AppContext);
  const {
    data: memesResponse,
    isLoading,
    error,
  } = useFetch<MemesGetResponse>("https://api.imgflip.com/get_memes", {
    method: "GET",
  });
  const [errorMsg, setErrorMsg] = React.useState({ online: true, msg: "" });
  React.useEffect(() => {
    if (error instanceof Error) {
      if (navigator.onLine) {
        setErrorMsg({
          online: true,
          msg: "Something went wrong. Please try to reload.",
        });
      } else {
        setErrorMsg({
          online: false,
          msg: "You are offline. Please check your internet connection",
        });
      }
    }
  }, [error]);
  return (
    <>
      <AppHeader />
      {!isOnline && <OfflineHeader />}

      {memesResponse?.data && (
        <>
          <MemesGrid memes={memesResponse.data.memes} />
          <Footer />
        </>
      )}
      {isLoading && (
        <>
          <Box
            component={"div"}
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="scroll"
          >
            <CircularProgress color="secondary" />
          </Box>
          <Box
            component={"div"}
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            <Footer />
          </Box>
        </>
      )}
      {errorMsg.msg !== "" && (
        <>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Card>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: 12,
                }}
              >
                <img
                  alt="meme"
                  src={errorMsg.online === true ? somethingWentWrong : noSignal}
                />
                {errorMsg.online && (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      sx={{ mt: 8 }}
                    >
                      Something went wrong
                    </Typography>
                    <Button onClick={() => window.location.reload()}>
                      Reload the page
                    </Button>
                  </>
                )}
                {!errorMsg.online && (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      sx={{ mt: 8 }}
                    >
                      Something went wrong
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                      Please Check your internet connection
                    </Typography>
                  </>
                )}
              </Box>
            </Card>
          </Box>
          <Box
            component={"div"}
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            <Footer />
          </Box>
        </>
      )}
    </>
  );
}

export default HomePage;
