import Typography from "@mui/material/Typography";

export const PageHeading = ({children: text}: { children: string }) => {
    return <Typography variant={'h4'} marginBottom={2}>{text}</Typography>
};