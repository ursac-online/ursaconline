import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

function PDFPreview() {
  const [file, setFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);

  const pdfFileType = "application/pdf";
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && pdfFileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
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

    if (file !== null) {
      setViewPDF(file);
      console.log("coming from here true");
    } else {
      setViewPDF(null);
      console.log("coming from here false");
    }
  };

  //   const newPlugin = defaultLayoutPlugin();

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

      <Box className="pdfPreview">
        <Typography variant="h2">Preview</Typography>
        <Box
          className="pdfContainer"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "auto",
            width: "85%",
            margin: "auto",
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            {viewPDF && (
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "100%",
                }}
              >
                <Viewer
                  fileUrl={viewPDF}
                  defaultScale={SpecialZoomLevel.PageFit}
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
          </Worker>
        </Box>
      </Box>
    </div>
  );
}

export default PDFPreview;
