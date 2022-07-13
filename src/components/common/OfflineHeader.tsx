import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Logo from "../../assets/no-signal.png";
import Icon from "@mui/material/Icon";
import AlertTitle from "@mui/material/AlertTitle";
export default function OfflineHeader() {
  return (
    <Box sx={{ width: "100%", position: "sticky", top: 0 }}>
      <Alert
        severity="error"
        icon={
          <Icon>
            <img src={Logo} alt="Logo" height={25} width={25} />
          </Icon>
        }
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <AlertTitle>No Internet Avaliable</AlertTitle>
        Please check your internet connection.
      </Alert>
    </Box>
  );
}
