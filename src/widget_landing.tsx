import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import WifiIcon from "@mui/icons-material/Wifi";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type SSIDEntry = {
  ssid: string;
  secured: boolean;
};

const WIDTH = 800;
const HEIGHT_TITLE = 70;
const HEIGHT_CONTENT = 450;
const HEIGHT_CONTROLS = 120;

const showHelp = false;

const mockConnected: SSIDEntry = {
  ssid: "Guest",
  secured: true
};

const mockList: SSIDEntry[] = [
  {
    ssid: "Guest",
    secured: true
  },
  {
    ssid: "Synaptics",
    secured: true
  },
  {
    ssid: "Lab",
    secured: true
  },
  {
    ssid: "Pili_Guest",
    secured: false
  },
  {
    ssid: "Pili_Staff",
    secured: true
  },
  {
    ssid: "corsairhq-psk",
    secured: true
  },
  {
    ssid: "corsairhq",
    secured: true
  },
  {
    ssid: "corsair-visitors",
    secured: false
  },
  {
    ssid: "WITS-Project",
    secured: true
  },
  {
    ssid: "WITS-VC",
    secured: true
  }
];

export const Landing = (props: any): JSX.Element => {
  const [connected, setConnected] = useState<SSIDEntry | null>(null);
  const [networkList, setNetworkList] = useState<SSIDEntry[] | null>(null);
  const [selectedSSID, setSelectedSSID] = useState<SSIDEntry | null>(null);
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const makeConnection = () => {
    console.log(password);
  };

  const handleListItemOnClick = (item: SSIDEntry) => {
    setSelectedSSID(item);
    setShowPassword(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setPassword("");
    setOpenDialog(false);
  };

  const handleDialogOkayOnClick = () => {
    makeConnection();
    handleDialogClose();
  };

  const handleDialogCancelOnClick = () => {
    handleDialogClose();
  };

  const handleTextFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleTextFieldOnKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.keyCode === 13) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      makeConnection();
      handleDialogClose();
    }
  };

  const handleShowPasswordOnClick = () => {
    setShowPassword(!showPassword);
  };

  const generateListItems = (): JSX.Element[] => {
    const output: JSX.Element[] = [];
    if (networkList === null) {
      return output;
    }
    networkList.forEach((item: SSIDEntry) => {
      if (connected && connected.ssid === item.ssid) {
        return;
      }
      output.push(
        <ListItem key={item.ssid} divider>
          <ListItemButton
            onClick={() => handleListItemOnClick(item)}
            sx={{ padding: "0px 16px" }}
          >
            <ListItemIcon>
              {item.secured ? <WifiPasswordIcon /> : <WifiIcon />}
            </ListItemIcon>
            <ListItemText primary={item.ssid} />
          </ListItemButton>
        </ListItem>
      );
    });
    return output;
  };

  useEffect(() => {
    setConnected(mockConnected);
    setNetworkList(mockList);
  }, []);

  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            width: WIDTH + "px",
            height: HEIGHT_TITLE + "px",
            position: "relative",
            bgcolor: "section.main"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            Wi-Fi Setup
          </Typography>
          {showHelp && (
            <Button
              variant="text"
              sx={{
                position: "absolute",
                top: "50%",
                left: "16px",
                transform: "translate(0%, -50%)"
              }}
            >
              <Typography variant="body2" sx={{ textDecoration: "underline" }}>
                Help
              </Typography>
            </Button>
          )}
        </Box>
        <Box
          sx={{
            width: WIDTH + "px",
            height: HEIGHT_CONTENT + "px",
            position: "relative",
            bgcolor: "section.main",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {connected && (
            <div
              style={{
                margin: "24px auto 0px auto"
              }}
            >
              <ListItem key={connected.ssid}>
                <ListItemIcon>
                  {connected.secured ? <WifiPasswordIcon /> : <WifiIcon />}
                </ListItemIcon>
                <ListItemText primary={connected.ssid} secondary="Connected" />
              </ListItem>
            </div>
          )}
          <div
            style={{
              margin: connected ? "0px 24px 24px 24px" : "24px",
              overflow: "auto"
            }}
          >
            <List>{generateListItems()}</List>
          </div>
        </Box>
        <Box
          sx={{
            width: WIDTH + "px",
            minHeight: HEIGHT_CONTROLS + "px",
            position: "relative",
            bgcolor: "section.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              margin: "24px"
            }}
          >
            <Button sx={{ width: "150px" }}>Refresh</Button>
          </div>
        </Box>
      </Stack>
      <Dialog fullWidth open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Connect to "{selectedSSID?.ssid}"</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            type={showPassword ? "text" : "password"}
            disabled={selectedSSID?.secured ? false : true}
            onChange={handleTextFieldOnChange}
            onKeyDown={handleTextFieldOnKeyDown}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={selectedSSID?.secured ? false : true}
                    onClick={handleShowPasswordOnClick}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancelOnClick} sx={{ width: "100px" }}>
            Cancel
          </Button>
          <Button onClick={handleDialogOkayOnClick} sx={{ width: "100px" }}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
