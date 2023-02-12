import * as React from "react";
import { useState } from "react";
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
import { AuthStepEnum } from "../../store/atoms/authAtoms";

const theme = createTheme();
const customLabel: any = {
  US: { primary: "US", secondary: "+1" },
  VN: { primary: "VN", secondary: "+84" },
};
const GetAccessToken = () => {
  const [selected, setSelected] = useState<any>("US");
  const { createNewAccessCode } = useAuthFlow();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phoneNumber = data.get("phoneNumber")?.toString();
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneNumber && phoneRegex.test(phoneNumber)) {
      createNewAccessCode(customLabel[selected].secondary + phoneNumber);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="subtitle1">
        Step 1: Get Verify Code
      </Typography>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        customLabels={customLabel}
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
  const { verifyAccessCode } = useAuthFlow();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = data.get("code")?.toString();
    if (code && code.length === 6) {
      verifyAccessCode(code);
    }
  };
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
  const { step } = useAuthFlow();
  const InputComponent = () => {
    if (step === AuthStepEnum.GetAccessCode) {
      return <GetAccessToken />;
    } else {
      return <VerifyCode />;
    }
  };
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
          <InputComponent />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
