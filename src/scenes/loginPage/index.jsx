import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Idan's SocialApp
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
          fontWeight="500"
          fontSize="1.2rem"
          variant="h5"
          sx={{ mb: "1.5rem" }}
        >
          This is a social app built by Idan Liberman.
        </Typography>
        <Typography
          fontWeight="500"
          fontSize="1.2rem"
          variant="h5"
          sx={{ mb: "1.5rem" }}
        >
          Log in to see what his friends say about him.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
