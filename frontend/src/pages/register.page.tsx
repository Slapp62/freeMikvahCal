import { Controller, useForm,  } from "react-hook-form";
import { Button, Checkbox, Paper, PasswordInput, Select, Stack, TextInput, Title } from "@mantine/core";
import { supabase } from "../lib/supabaseClient";
import '@mantine/notifications/styles.css';
import { notifications } from "@mantine/notifications";

const RegisterPage = () => {
    type RegisterValues = {
        email: string;
        password: string;
        confirmPassword: string;
        ethnicity: string;
        chumrot: {
            onat_ohr_zarua: boolean,
            beinonit_30_31: boolean
        };
    }

    const {register, control, handleSubmit, reset, watch, formState: {errors}} = useForm<RegisterValues>(
        {
            mode: 'onBlur',
        }
    );

    const onSubmit = async (formData : RegisterValues) => {

        // 1: submit email and password and receive user and session data
        const { data ,error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });
        
        // 2: if there is an error signing up, show notification
        if (error) {
            console.error('Sign-up Error:', error);
            notifications.show({
                title: 'Error signing up',
                message: error.message,
                color: 'red',
            });
            return; 
        }

            // 3: if user does not exist, insert rest of data into table
        if (data.user) {
            const { error: insertError } = await supabase.from("user_info").insert({
                id: data.user.id,
                ethnicity: formData.ethnicity,
                chumrot: {
                    onat_ohr_zarua: formData.chumrot.onat_ohr_zarua,
                    beinonit_30_31: formData.chumrot.beinonit_30_31
                }
            });
            
            // 4: if there is an error inserting data, show notification
            if (insertError) {
                console.error('Error inserting profile data:', insertError);
                notifications.show({
                    title: 'Error saving information',
                    message: insertError.message,
                    color: 'red',
                });
                return;
            }

            // 5: if data is inserted successfully, show notification
            console.log(data.user, data.session);
            notifications.show({
                title: 'Sign up successful!',
                message: 'Please check your email to confirm your registration.',
                color: 'green',
            });
            reset();
                
        }
    }


  return (
    <Paper mx='auto' my='xl' shadow="xs" p="lg" radius="md" withBorder w='40%'>
        <Stack w='95%' mx='auto'>
        <Title order={1} ta="center">Register</Title>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack w='100%' mx='auto' gap={20}>
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

            <PasswordInput
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

            <PasswordInput
            label="Confirm Password"
            placeholder="Re-type your password"
            required
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", 
                {
                    validate: (value) => value === watch('password') || "Passwords do not match",
                    required: "Confirmation is required",
                })}
            />

            <Controller
                name = "ethnicity"
                control = {control}
                render={({ field }) => (
                    <Select
                        label="Jewish Ethnicity"
                        placeholder="Pick one"
                        data={[
                            { value: 'ashkenazi', label: 'ashkenazi' },
                            { value: 'sephardi', label: 'Sephardi' },
                            { value: 'teimani', label: 'Teimani' },
                            { value: 'other', label: 'Other' },
                        ]}
                        {...field}
                    /> 
                )}
            />

            <Checkbox label="Onat Ohr Zarua" {...register("chumrot.onat_ohr_zarua")}/>
            <Checkbox label="Onah Beinonit on 30 & 31" {...register("chumrot.beinonit_30_31")}/>

            <Button type="submit">Register</Button>
            </Stack>
        </form>
        
        </Stack>
    </Paper>
  );
};

export default RegisterPage;