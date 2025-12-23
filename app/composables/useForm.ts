// app/composables/useForm.ts
export function useForm() {
  const name = ref('');
  const email = ref('');
  const message = ref('');
  const loading = ref(false);
  const success = ref(false);
  const error = ref('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!name.value.trim()) {
      error.value = 'Name is required';
      return false;
    }
    if (!email.value.trim()) {
      error.value = 'Email is required';
      return false;
    }
    if (!emailRegex.test(email.value)) {
      error.value = 'Please enter a valid email address';
      return false;
    }
    if (!message.value.trim()) {
      error.value = 'Message is required';
      return false;
    }
    error.value = '';
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    loading.value = true;
    success.value = false;
    error.value = '';

    try {
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: name.value,
          email: email.value,
          message: message.value
        }
      });

      if (response.ok) {
        success.value = true;
        name.value = '';
        email.value = '';
        message.value = '';
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          success.value = false;
        }, 5000);
      } else {
        error.value = response.message || 'Failed to send message. Please try again.';
      }
    } catch (err) {
      error.value = 'Failed to send message. Please try again.';
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    name.value = '';
    email.value = '';
    message.value = '';
    loading.value = false;
    success.value = false;
    error.value = '';
  };

  return {
    name,
    email,
    message,
    loading,
    success,
    error,
    submit,
    reset
  };
}
