import { Box, Button, TextField, Typography } from "@mui/material";

const PasswordResetPage = () => {
  return (
    <>
      <Typography component="h1" variant="h5" textAlign={"center"}>
        Zapomenuté heslo
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => event.preventDefault()}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Emailová adresa"
          type="email"
          id="email"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="success"
        >
          Poslat kód na email
        </Button>
      </Box>
    </>
  );
};

export default PasswordResetPage;
