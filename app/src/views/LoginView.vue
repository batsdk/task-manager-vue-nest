<template>
  <div>
    <Form class="flex flex-col justify-center gap-1 min-w-full items-center min-h-full" @submit.prevent="onSubmit">

      <h1 class="text-2xl font-bold" >Login</h1>
      <RouterLink to="/auth/register">Create an account here!</RouterLink>

      <VaInput name="username" v-model="username" type="email" label="username" />
      <span class="text-red-400" >{{ errors.username }}</span>

      <VaInput name="password" v-model="password" type="password" label="password" />
      <span class="text-red-400" >{{ errors.password }}</span>

      <VaButton @click="onSubmit" :loading="isRegisterPending" >Submit</VaButton>
    </Form>
  </div>
</template>

<script setup lang="ts">

import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useAuthRegister } from '@/queries/auth.query';
import { watch } from 'vue';
import { setCookie } from '@/utils/cookies';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vuestic-ui';
import { useAuthLogin } from '../queries/auth.query';

const router = useRouter();
const toast = useToast();

const userSchema = z.object({
  username: z.string().min(5, { message: 'username is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*])/,
      { message: 'Password is too weak. Include uppercase, lowercase, and numbers or special characters.' }
    )
});

const validationSchema = toTypedSchema(userSchema);

const { handleSubmit, errors } = useForm({
  validationSchema,
});


const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

const { data:loginData, mutateAsync: loginAsync, isPending: isLoginPending } = useAuthLogin();


const onSubmit = handleSubmit(async (values) => {
  try {
    await loginAsync({username: values.username!, password: values.password! });
    console.log("auth done");
    setCookie("auth_token",loginData.value.accessToken,31);
    toast.notify({
      title: 'Success',
      message: 'Logged In successfully',
    });
    router.push('/');

  } catch (error) {
    toast.notify({
      title: 'Error',
      message: error.message,
    });
    console.error(error);
  }
});
</script>
