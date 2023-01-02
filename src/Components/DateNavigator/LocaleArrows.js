import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { IconButton } from "@mui/material";

const LocaleArrow = (props) => {
  const { type, onClick } = props;

  let Arrow = NavigateNextRoundedIcon;

  if (type === "prev") {
    Arrow = NavigateBeforeRoundedIcon;
  } else if (type === "next") {
    Arrow = NavigateNextRoundedIcon;
  }

  return (
    <IconButton
      style={{ padding: 2 }}
      onClick={onClick}
      onDragOver={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      <Arrow />
    </IconButton>
  );
};

export { LocaleArrow };
