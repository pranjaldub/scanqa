import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
export default function TextAreaComponent({ rows, label, set }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label={label}
          multiline
          maxRows={rows}
          defaultValue=""
          onChange={set}
        />
      </div>
    </Box>
  );
}
