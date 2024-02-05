import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Grid, Link, Paper } from "@mui/material";
import { Navigate, Outlet, Link as RouteLink } from "react-router-dom";
import useAuthStore from "../../components/auth/store";
import {Logo} from "../../components/ui/Logo.tsx";

const AuthPageLayout = () => {
  const accessToken = useAuthStore((store) => store.accessToken);

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{
        height: "100vh",
        marginBottom: "2.5%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingTop: "5%",
        }}
      >
        <Logo size={'l'} />
        <Paper elevation={10}>
          <Box paddingX={10} paddingTop={3} paddingBottom={5}>
            <Outlet />
          </Box>
        </Paper>
        <Box paddingTop={"10px"}></Box>
        <Grid container>
          <Grid item xs>
            <Link
              color={"grey.500"}
              paddingLeft={"2px"}
              component={RouteLink}
              to={"/auth/password-reset"}
            >
              Zapomenuté heslo
            </Link>
          </Grid>
          <Grid item xs>
            <Link
              color={"grey.500"}
              paddingLeft={"2px"}
              component={RouteLink}
              to={"/auth/login"}
            >
              Zpět na přihlášení
            </Link>
          </Grid>
          <Grid item>
            <Link
              color={"grey.500"}
              paddingLeft={"2px"}
              component={RouteLink}
              to={"/auth/register"}
            >
              Vytvořit nový účet
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AuthPageLayout;
