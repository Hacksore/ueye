import { Box, Typography } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";

function formatNumber(num) {
  let formatted = 0;
  if (num > 999 && num < 1000000) {
    formatted = Math.floor((num / 1000).toFixed(1)) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    formatted = Math.floor((num / 1000000).toFixed(1)) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    formatted = Math.floor(num); // if value < 1000, nothing to do
  } else {
    formatted = Math.floor(num);
  }

  return formatted;
}

const Framework = ({ data, name, iconPath }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => darken(theme.palette.background.paper, 0.1),
        border: (theme) =>
          `1px solid ${lighten(theme.palette.background.paper, 0.03)}`,
        borderRadius: 2,
        my: 4,
        p: 1,
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: (theme) =>
            darken(theme.palette.background.paper, 0.3),
        },
      }}
    >
      <img style={{ width: 128 }} src={iconPath} alt="Framwork icon" />
      <Typography sx={{ mt: 4 }} color="text.primary" variant="h4">
        {name}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Typography sx={{}} color="text.primary" variant="body2">
          {formatNumber(data?.stars)} stars
        </Typography>
        <Typography sx={{}} color="text.primary" variant="body2">
          <img style={{ width: 32 }} src="/img/npm.svg" alt="npm icon" />{" "}
          {formatNumber(data?.npm?.downloads)}/week
        </Typography>
        <Typography sx={{}} color="text.primary" variant="body2">
          {formatNumber(data?.issues)} issues | {formatNumber(data?.forks)} forks
        </Typography>
      </Box>
    </Box>
  );
};

export default Framework;
