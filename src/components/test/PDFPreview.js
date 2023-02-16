import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";


function PDFPreview(props) {
  const [file, setFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);
  const [open, setOpen] = useState(false);
  const [proppedFile, setProppedFile] = useState();
  useEffect(() => {
      const getFile = async () => {
        const res = await axios.get("https://ursacapi.000webhostapp.com/api/getThisFiles.php")
        const pdfUint8Array = new Uint8Array(atob(res.data).split('').map(char => char.charCodeAt(0)));
        setProppedFile(pdfUint8Array)
      }
      getFile();

  }, []);
  
  const pdfFileType = "application/pdf";
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && pdfFileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        const link =
          "https://ursacapi.000webhostapp.com/api/files/958945-refelctionn.pdf";
        async function getBlobFromURL(url) {
          const response = await fetch(url);
          return response.blob();
        }
        getBlobFromURL(link).then((blob) => {
          console.log(blob);
        });
        reader.readAsDataURL(selectedFile);
        console.log(selectedFile);
        reader.onload = (e) => {
          setFile(e.target.result);
        };
      } else {
        setFile(null);
      }
    } else {
      console.log("Select a file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setViewPDF(proppedFile)
      setOpen(true);


    // if (file !== null) {
    //   setViewPDF(file);
    //   setOpen(true);
    //   console.log("coming from here true");
    // } else {
    //   setViewPDF(null);
    //   setOpen(false);
    //   console.log("coming from here false");
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newPlugin = defaultLayoutPlugin();

    const dialogStyle = {
      width: '100%',
      height: '750px',
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="textName"></InputLabel>
          <Input
            id="textName"
            type="file"
            onChange={handleChange}
            aria-describedby="helperText"
          />
          <FormHelperText id="helperText">
            This is a helper text.
          </FormHelperText>
          <Button variant="contained" color="secondary" type="submit">
            View
          </Button>
        </FormControl>
      </form>

      <Dialog PaperProps={{ style: dialogStyle }} maxWidth="md" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <Box className="pdfPreview">
            <Box
              className="pdfContainer"
              
            >
              {viewPDF && (
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Viewer
                    fileUrl={viewPDF}
                    defaultScale={SpecialZoomLevel.PageFit}
                    plugins={[newPlugin]}
                  />
                </div>
              )}
              {!viewPDF && (
                <div
                  style={{
                    alignItems: "center",
                    border: "2px dashed rgba(0, 0, 0, .3)",
                    display: "flex",
                    fontSize: "2rem",
                    height: "100%",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  NO PDF
                </div>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PDFPreview;
