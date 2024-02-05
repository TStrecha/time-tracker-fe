import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import { green } from "@mui/material/colors";

const schema = z
  .object({
    accountType: z.enum(["PERSON", "COMPANY"]),
    email: z.string().email({ message: "Neplatná emailová adresa." }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    companyName: z.string().optional(),
    password: z
      .string()
      .regex(/.*\d.*/, {
        message: "Heslo musí obsahovat alespoň jednu číslici.",
      })
      .min(8, { message: "Heslo musí obsahovat alespoň 8 znaků." }),
    agreement: z.literal<boolean>(true, {
      errorMap: () => ({
        message:
          "Pro registraci musíte souhlasit se zpracováním osobních údajů.",
      }),
    }),
  })
  .superRefine((data, context) => {
    if (data.accountType === "COMPANY" && !data.companyName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Vyplňte prosím název firmy",
      });
    }
    if (data.accountType === "PERSON" && !data.firstName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstName"],
        message: "Vyplňte prosím křestní jméno",
      });
    }
    if (data.accountType === "PERSON" && !data.lastName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["lastName"],
        message: "Vyplňte prosím příjmení",
      });
    }
  });

type ExpenseFormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const [type, setType] = useState<"PERSON" | "COMPANY">("PERSON");
  const { mutate: register, isPending } = useRegister();

  const {
    register: zodRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Typography component="h1" variant="h5" textAlign={"center"}>
        Vytvoření nového účtu
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => register(data))}
        noValidate
        sx={{ mt: 1 }}
        paddingTop={2}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Typ účtu</InputLabel>
          <Select
            {...zodRegister("accountType")}
            error={!!errors.accountType}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Typ účtu"
            onChange={(value) =>
              setType(value.target.value as "PERSON" | "COMPANY")
            }
          >
            <MenuItem value={"PERSON"}>Osobní</MenuItem>
            <MenuItem value={"COMPANY"}>Firemní</MenuItem>
          </Select>
        </FormControl>
        {type == "PERSON" && (
          <>
            <TextField
              {...zodRegister("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="Křestní jméno"
              type="text"
              id="firstName"
            />
            <TextField
              {...zodRegister("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Příjmení"
              type="lastName"
              id="lastName"
            />
          </>
        )}
        {type == "COMPANY" && (
          <TextField
            {...zodRegister("companyName")}
            error={!!errors.companyName}
            helperText={errors.companyName ? errors.companyName.message : ""}
            margin="normal"
            required
            fullWidth
            name="companyName"
            label="Název firmy"
            type="text"
            id="companyName"
          />
        )}
        <TextField
          {...zodRegister("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          margin="normal"
          required
          fullWidth
          name="email"
          label="Emailová adresa"
          type="email"
          id="email"
        />
        <TextField
          {...zodRegister("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Heslo"
          type="password"
          id="password"
        />
        <FormControl>
          <FormControlLabel
            control={<Checkbox {...zodRegister("agreement")} />}
            label="Souhlasím se zpracováním osobních údajů"
          />
          {errors.agreement && (
            <FormHelperText error>{errors.agreement.message}</FormHelperText>
          )}
        </FormControl>
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
            "Vytvořit účet"
          )}
        </Button>
      </Box>
    </>
  );
};

export default RegisterPage;
