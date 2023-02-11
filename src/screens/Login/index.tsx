import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthFlow } from "../../hooks/useAuthFlow";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";

const theme = createTheme();

const GetAccessToken = () => {
  const [selected, setSelected] = useState("US");
  const { createNewAccessCode } = useAuthFlow();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phoneNumber = data.get("phoneNumber");
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneNumber && reg.test(phoneNumber.toString())) {
    }
  };
  console.log(selected);
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="subtitle1">
        Step 1: Get Verify Code
      </Typography>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        customLabels={{
          US: { primary: "US", secondary: "+1" },
          VN: { primary: "VN", secondary: "+84" },
        }}
        countries={["US", "VN"]}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="phoneNumber"
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Send code
      </Button>
    </Box>
  );
};

const VerifyCode = () => {
  const handleSubmit = () => {};
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="subtitle1">
        Step 2: Input Verify Code
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="code"
        label="Verify Code"
        name="code"
        autoComplete="code"
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Verify
      </Button>
    </Box>
  );
};
export const Login = () => {
  const { createNewAccessCode } = useAuthFlow();

  React.useEffect(() => {
    createNewAccessCode();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <GetAccessToken />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
