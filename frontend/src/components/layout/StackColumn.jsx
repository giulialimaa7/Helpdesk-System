import { Stack } from "@mui/material";

export function StackColumn({ children, spacing=0 }) {
  return (
    <Stack spacing={spacing}>
      {children}
    </Stack>
  );
}