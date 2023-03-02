import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const [ad, setAd] = useState(undefined);
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const ads = [
      {
        image: "info1.jpeg",
        title: "Mickey's Diner",
        website: "mickeysdiner.com",
        adCopy: "Come for the food, stay for the good times!",
      },
      {
        image: "info2.jpeg",
        title: "KFC Baby!",
        website: "kfc.com",
        adCopy: "Want some nuggets?",
      },
      {
        image: "info3.jpeg",
        title: "Nicky's Beauty Parlor",
        website: "nickysbeauty.com",
        adCopy: "Look good, feel good!",
      },
      {
        image: "info4.jpeg",
        title: "Mika Cosmetics",
        website: "mikacosmetics.com",
        adCopy: "Your pathway to stunning immaculate beauty - Exfoliation!",
      },
    ];
    const randomAdIndex = Math.floor(Math.random() * ads.length);
    setAd({
      image: ads[randomAdIndex].image,
      title: ads[randomAdIndex].title,
      website: ads[randomAdIndex].website,
      adCopy: ads[randomAdIndex].adCopy,
    });
  }, []);

  return (
    <WidgetWrapper>
      {ad && (
        <>
          <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
              Sponsored
            </Typography>
            <Typography color={medium}>Create Ad</Typography>
          </FlexBetween>
          <img
            width="100%"
            height="auto"
            alt="advert"
            src={`https://idanlsocialapi.onrender.com/assets/${ad.image}`}
            style={{
              borderRadius: "0.75rem",
              margin: "0.75rem 0",
            }}
          />
          <FlexBetween>
            <Typography color={main}>{ad.title}</Typography>
            <Typography color={medium}>{ad.website}</Typography>
          </FlexBetween>
          <Typography color={medium} m="0.5rem 0">
            {ad.adCopy}
          </Typography>
        </>
      )}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
