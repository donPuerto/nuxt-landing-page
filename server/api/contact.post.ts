// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  try {
    // Parse request body
    const body = await readBody(event);
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return {
        ok: false,
        message: 'Name is required'
      };
    }

    if (!email || !email.trim()) {
      return {
        ok: false,
        message: 'Email is required'
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        ok: false,
        message: 'Please provide a valid email address'
      };
    }

    if (!message || !message.trim()) {
      return {
        ok: false,
        message: 'Message is required'
      };
    }

    // Get n8n webhook URL from environment
    const config = useRuntimeConfig();
    const webhookUrl = config.N8N_WEBHOOK_URL;
    const webhookSecret = config.N8N_WEBHOOK_SECRET;

    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured');
      return {
        ok: false,
        message: 'Contact form is not properly configured. Please try again later.'
      };
    }

    // Forward to n8n webhook and capture its response
    const n8nResponse: any = await $fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret && { 'x-webhook-secret': webhookSecret })
      },
      body: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
      }
    });

    // Relay n8n's message when available
    const ok = typeof n8nResponse?.ok === 'boolean' ? n8nResponse.ok : true;
    const message = n8nResponse?.message || 'Message sent successfully';
    return { ok, message };
  } catch (error) {
    console.error('Error forwarding contact form to n8n:', error);
    return {
      ok: false,
      message: 'Failed to send message. Please try again later.'
    };
  }
});
