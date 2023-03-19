import { Box } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const UserImage = ({ image, size = "60px" }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddszkagqm",
    },
  });

  const userImg = cld.image(`friends-of-idan-app/${image}`);

  return (
    <Box width={size} height={size}>
      <AdvancedImage
        cldImg={userImg}
        width={size}
        height={size}
        alt="user"
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
    </Box>
  );
};

export default UserImage;
