import {Box, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAlertStore from "../alert/store.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    currentPassword: z
        .string()
        .min(8, { message: "Heslo musí obsahovat alespoň 8 znaků." }),
    newPassword: z
        .string()
        .regex(/.*\d.*/, {
            message: "Heslo musí obsahovat alespoň jednu číslici.",
        })
        .min(8, { message: "Heslo musí obsahovat alespoň 8 znaků." }),
    confirmNewPassword: z
        .string(),
}).superRefine((data, context) => {
    if (data.newPassword != data.confirmNewPassword) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["confirmNewPassword"],
            message: "Potvrzení hesla musí být stejné jako nové heslo.",
        });
    }});

type ChangePasswordFormData = z.infer<typeof schema>;

export const ChangePasswordSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(schema),
    });

    const {setSuccessAlert} = useAlertStore();

    return (
        <Box mt={6}>
            <Typography variant={'h5'} sx={{fontWeight: 'bold'}}>
                Změna hesla
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(() => setSuccessAlert("Heslo bylo změněno."))}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    {...register("currentPassword")}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword ? errors.currentPassword.message : ""}
                    margin="normal"
                    required
                    fullWidth
                    label="Stávající heslo"
                    type="password"
                    id="password"
                />
                <TextField
                    {...register("newPassword")}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword ? errors.newPassword.message : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="newPassword"
                    label="Nové heslo"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    {...register("confirmNewPassword")}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="confirmNewPassword"
                    label="Potvrzení nového hesla"
                    type="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{color: 'white', mt: 3}}
                    color="secondary"
                >
                    Změnit heslo
                </Button>
            </Box>
        </Box>
    );
};