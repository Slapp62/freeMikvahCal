import { useState } from "react";
import { Button, Stack, TextInput, Title } from "@mantine/core";
import { supabase } from "../lib/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error.message);
    } else {
      console.log("Sign up successful, check your email to confirm.");
      // optionally clear form
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Stack>
      <Title>Register</Title>
      <form onSubmit={handleRegister}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <TextInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button type="submit">Register</Button>
      </form>
    </Stack>
  );
};

export default RegisterPage;
