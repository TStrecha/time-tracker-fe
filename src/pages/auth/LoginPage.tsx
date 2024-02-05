import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../../hooks/useLogin";
import { Box, CircularProgress, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const schema = z.object({
  email: z.string().email({ message: "Neplatná emailová adresa." }),
  password: z
    .string()
    .min(8, { message: "Heslo musí obsahovat alespoň 8 znaků." }),
});

type ExpenseFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const { mutate: login, isPending } = useLogin();

  return (
    <>
      <Typography component="h1" variant="h5" textAlign={"center"}>
        Přihlásit se do systému
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => login(data))}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Emailová adresa"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Heslo"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="success"
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
              }}
            />
          ) : (
            "Přihlásit se"
          )}
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
