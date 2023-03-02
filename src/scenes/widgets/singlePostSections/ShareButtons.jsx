import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import FlexBetween from "@/components/FlexBetween";
import { useTheme } from "@mui/material";

const ShareButtons = ({ description }) => {
  const { palette } = useTheme();
  const shareBg = palette.neutral.medium;

  return (
    <FlexBetween
      sx={{
        justifyContent: "space-between",
        margin: "1rem",
      }}
    >
      <EmailShareButton url={`${description}`}>
        <EmailIcon size={35} round bgStyle={{ fill: shareBg }} />
      </EmailShareButton>
      <TwitterShareButton url={`${description}`}>
        <TwitterIcon size={35} round bgStyle={{ fill: shareBg }} />
      </TwitterShareButton>
      <FacebookShareButton url={`${description}`}>
        <FacebookIcon size={35} round bgStyle={{ fill: shareBg }} />
      </FacebookShareButton>
      <WhatsappShareButton url={`${description}`}>
        <WhatsappIcon size={35} round bgStyle={{ fill: shareBg }} />
      </WhatsappShareButton>
      <InstapaperShareButton url={`${description}`}>
        <InstapaperIcon size={35} round bgStyle={{ fill: shareBg }} />
      </InstapaperShareButton>
      <LinkedinShareButton url={`${description}`}>
        <LinkedinIcon size={35} round bgStyle={{ fill: shareBg }} />
      </LinkedinShareButton>
    </FlexBetween>
  );
};

export default ShareButtons;
