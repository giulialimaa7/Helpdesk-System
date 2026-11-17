import { Stack } from "@mui/material";

export function StackRow({ children, mt, spacing=2 }) {
  return (
    <Stack
      mt={ mt }
      spacing={ spacing }
      direction={{ xs: "column", sm: "row", md: "row" }}
    >
      { children }
    </Stack>
  );
}