<template>
  <main>

    <VaModal v-model="showModal">
      <h3 class="va-h3">
        Create Task
      </h3>
      <div>
        <Form class="flex flex-col gap-2" @submit.prevent="onSubmit">
          <VaInput name="title" v-model="title" type="email" label="Title" />
          <span class="text-red-400">{{ errors.username }}</span>

          <VaInput name="description" v-model="description"  label="Description" />
          <span class="text-red-400">{{ errors.password }}</span>

          <VaButton @click="onSubmit" :loading="isTaskPending">Create Task</VaButton>

        </Form>
      </div>
    </VaModal>

    <div class="flex justify-end ">
      <VaButton @click="showModal = !showModal">Create Task</VaButton>
    </div>

    <section v-if="isTasksLoading" >
      <h1 class="text-2xl font-bold text-center" >Loading 🔃</h1>
    </section>
    <section v-for="task in tasksList.tasks" :key="task.id" class="!mt-5" >
      <div class="flex gap-2 justify-center">
        <h2 class="text-xl font-bold">{{ task.title }}
          <VaBadge :text="task.status" color="success" class="mr-2" /> -
        </h2>
        <VaButton class="mr-2" color="info">Edit</VaButton>
        <VaButton class="" color="warning">Delete</VaButton>
        <br>
        <br>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useToast } from "vuestic-ui";
import { z } from "zod";
import { useCreateTask } from '../queries/tasks.query';
import api from '@/api/axios';

const showModal = ref<boolean>(false);

const taskSchema = z.object({
  title: z.string().min(5, { message: 'title is required' }),
  description: z.string().min(5, { message: 'title is required' }),

});

enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

const validationSchema = toTypedSchema(taskSchema);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const toast = useToast();

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');

const { data: createTaskData, mutateAsync: createTaskAsync, isPending: isTaskPending } = useCreateTask();

const { data: tasksList, isLoading: isTasksLoading, error: isTasksError } = useQuery<Task[]>({
  queryKey: ['tasks'],
  queryFn: async () => {
  const response = await api.get('/tasks');
  return response.data;
}
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await createTaskAsync({title:values.title!, description: values.description!});
    toast.notify({
      title: 'Success',
      message: 'Created Task',
    });
    showModal.value = false;


  } catch (error) {
    toast.notify({
      title: 'Error',
      message: error.message,
    });
    console.error(error);
  }
});

</script>