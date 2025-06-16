import { FieldValues, useForm,  } from "react-hook-form";
import { Button, Stack, TextInput, Title } from "@mantine/core";
import { supabase } from "../lib/supabaseClient";
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

const RegisterPage = () => {
    type RegisterValues = {
        email: string;
        password: string;
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<RegisterValues>(
        {
            mode: 'onChange',
        }
    );

    const onSubmit = async (data : FieldValues) => {
    
        const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
        });

        if (error) {
            notifications.show({
                color: "red", 
                title: "Sign up error:", 
                message: error.message})
        } else {
            notifications.show({
                color: "green", 
                title: "Success!", 
                message: "Check your email to confirm your account."})
            reset();
        }
    };

  return (
    <Stack w='80%' mx='auto'>
      <Title order={1} ta="center">Register</Title>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w='40%' mx='auto' gap={20}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          error={errors.email?.message}
          {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"  
                }
            }
          )}
        />

        <TextInput
          label="Password"
          placeholder="Your password"
          required
          type="password"
          error={errors.password?.message}
          {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Must be at least 8 characters"
                },
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "Must contain at least one letter and one number"
                }
            })}
        />

        <Button type="submit">Register</Button>
        </Stack>
      </form>
      
    </Stack>
  );
};

export default RegisterPage;