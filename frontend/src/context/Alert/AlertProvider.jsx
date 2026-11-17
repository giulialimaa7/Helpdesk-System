import { useState } from "react";
import { AlertContext } from "./AlertContext.jsx";
import { Backdrop, Snackbar, Alert, AlertTitle } from "@mui/material";

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [showBackdrop, setShowBackdrop] = useState(false);

  const [anchorOrigin, setAnchorOrigin] = useState({vertical: "top", horizontal: "right"});
  
  const showAlert = (msg, sev="info", backdrop=false, position=null) => {
    setOpen(true);
    setMessage(msg);
    setSeverity(sev);
    setShowBackdrop(backdrop);

    if (position) {
      setAnchorOrigin(position);
    } 
    else {
      setAnchorOrigin({
        vertical: "top",
        horizontal: "right",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowBackdrop(false);
  };

  const hideAlert = () => {
    setOpen(false);
    setShowBackdrop(false);
  }

  return (
    <AlertContext.Provider 
      value={{ showAlert, hideAlert }}
    >
      {children}

      <Backdrop
        open={showBackdrop}
        sx={{ zIndex: 1200 }}
      />

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={anchorOrigin}
        sx={{ mt: 11, mr: 2 }}
      >
        <Alert
          variant="filled"
          severity={severity}
          onClose={handleClose}
          sx={{ width: "100%", mt: 8 }}
        >
          <AlertTitle>
            {severity === "error" && "Erro"}
            {severity === "success" && "Sucesso"}
            {severity === "warning" && "Atenção"}
            {severity === "info" && "Informação"}
          </AlertTitle>

          {message}
        </Alert>
      </Snackbar>

    </AlertContext.Provider>
  );
};