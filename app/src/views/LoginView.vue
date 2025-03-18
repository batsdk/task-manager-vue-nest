<template>
  <div>
    <VaForm class="flex flex-col justify-center gap-1 min-w-full items-center min-h-full" @submit.prevent="onSubmit">

      <VaInput name="username" v-model="username" type="email" label="username" />
      <span class="text-red-400" >{{ errors.username }}</span>

      <VaInput name="password" v-model="password" type="password" label="password" />
      <span class="text-red-400" >{{ errors.password }}</span>

      <VaButton type="submit" >Submit</VaButton>
    </VaForm>
  </div>
</template>

<script setup lang="ts">

import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(5, { message: 'username is required' }),
  password: z.string().min(1, { message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
});

const validationSchema = toTypedSchema(userSchema);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>
