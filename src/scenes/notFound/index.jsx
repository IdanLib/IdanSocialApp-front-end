import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [imagePath, setImagePath] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;

  useEffect(() => {
    setImagePath(`../assets/404.png`);
  }, []);

  return (
    <>
      <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Friends of Idan
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
        textAlign="center"
      >
        <Typography
          fontWeight="700"
          fontSize="1.5rem"
          variant="h5"
          color={dark}
        >
          Oops, nothing here!
        </Typography>
        <img
          width="65%"
          height="auto"
          alt="not found"
          src={imagePath}
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />
        <Typography fontWeight="500" fontSize="1rem" variant="h5" color={dark}>
          Click to get back home.
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
