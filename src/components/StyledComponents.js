import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Select,
  Box,
  Paper,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export const ChartSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  alignItems: "center",
  flexDirection: "column",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export const ChartFlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(3),
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ChartWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flex: 1,
  minWidth: 0,
}));

export const CompletionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

// Task List

export const TaskScrollContainer = styled("div")(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.up("md")]: {
    height: 635,
  },
  [theme.breakpoints.up("lg")]: {
    height: 635,
  },
  overflowY: "auto",
  paddingRight: theme.spacing(1),
}));

export const StyledTaskContainer = styled("div")(
  ({ theme, isDragging, completed }) => ({
    borderLeft: `6px solid ${
      completed
        ? theme.palette.success.main
        : theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700]
    }`,
    backgroundColor: isDragging
      ? theme.palette.action.hover
      : theme.palette.background.paper,
    boxShadow: isDragging ? theme.shadows[4] : theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.8),
    display: "flex",
    alignItems: "center",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      boxShadow: theme.shadows[3],
      transform: "translateY(-2px)",
    },
  })
);

export const DragHandle = styled("div")(({ theme }) => ({
  cursor: "grab",
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  "&:active": {
    cursor: "grabbing",
  },
}));

export const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginInline: theme.spacing(3),
  textAlign: "center",
}));

// Dashboard

export const DashboardContainer = styled("div")(({ theme }) => ({
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  margin: 10,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export const HeaderSection = styled(SectionPaper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export const ContentRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const LeftColumn = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "0 0 33%",
    maxWidth: "33%",
  },
}));

export const RightColumn = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const TaskListContainer = styled("div")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "0 0 100%",
    maxWidth: "100%",
  },
}));

// Common button styling
export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

// Tasks

export const StyledCard = styled(Paper)(({ theme, completed }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[0.1],
  backgroundColor: completed
    ? theme.palette.action.selected
    : theme.palette.background.paper,
}));

export const StyledActionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2.5), // marginBottom of 20px (2.5 * 8px)
}));

export const StyledIconGroup = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.25), // gap between icons (10px)
}));

//Task form

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export const FormButton = styled(Button)(({ theme, isMobile }) => ({
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  fontSize: isMobile ? "0.875rem" : "1rem",
}));

// Filters

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    padding: theme.spacing(1),
    border: "none",
    borderRadius: theme.shape.borderRadius,
  })
);

export const StyledToggleButton = styled(ToggleButton)(
  ({ theme, selected }) => ({
    flex: 1,
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.background.default,
    color: selected ? theme.palette.primary.main : theme.palette.action.active,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
    },
  })
);
