import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('task updated !!!');
    } else {
      await createTask(data);
      toast.success('task created <3');
    }

    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue('title', data.title);
        setValue('description', data.description);
      }
    }

    loadTask();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='title'
          {...register('title', { required: true })}
        />
        {errors.title && <span>the title is required</span>}
        <textarea
          rows='3'
          placholder='description'
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>the description is required</span>}
        <button>save</button>
      </form>
      {params && (
        <button
          onClick={async () => {
            const accepted = window.confirm('are u sure ma luv ?');
            if (accepted) {
              await deleteTask(params.id);
              navigate('/tasks');
            }
          }}
        >
          delete
        </button>
      )}
    </div>
  );
}
