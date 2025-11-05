# SMS Invite Code Setup Guide

This guide will walk you through setting up SMS invite code delivery using Supabase and Twilio.

## Overview

The system allows users to send invite codes to friends via SMS. When a user creates an invite code, they can send it to a phone number, and the recipient will receive an SMS with the code and a message to join TinyPlanet.

## Architecture

1. **Database**: `invite_codes` table stores invite codes and tracks their status
2. **Edge Function**: `send-invite-sms` handles SMS delivery via Twilio API
3. **Hook**: `useInviteCodes` provides `sendInviteCode()` method for the app

## Prerequisites

- Active Supabase project
- Twilio account with SMS capability
- Supabase CLI installed (optional, for local development)

---

## Step 1: Twilio Setup

### 1.1 Create Twilio Account

1. Go to [https://www.twilio.com/](https://www.twilio.com/)
2. Sign up for a free account or log in
3. Complete phone number verification

### 1.2 Get Twilio Credentials

1. Navigate to the [Twilio Console](https://console.twilio.com/)
2. From the dashboard, copy your:
   - **Account SID**
   - **Auth Token** (click "Show" to reveal)

### 1.3 Create Messaging Service

1. Go to **Messaging** → **Services** in the Twilio Console
2. Click **Create Messaging Service**
3. Give it a name (e.g., "TinyPlanet Invites")
4. Select **Notify my users** as the use case
5. Click **Create Messaging Service**
6. Add a phone number:
   - Click **Add Senders**
   - Buy a phone number or use an existing one
   - Add it to the messaging service
7. Copy the **Messaging Service SID** from the service details page

### 1.4 Set Up Environment Variables

Add the following to your `.env` file (uncomment and fill in the values):

```bash
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_sid_here
```

**Important**: Never commit these credentials to version control!

---

## Step 2: Supabase Setup

### 2.1 Deploy Edge Function

The Edge Function `send-invite-sms` handles SMS delivery.

**Using Supabase CLI:**

```bash
# Login to Supabase (if not already logged in)
supabase login

# Link to your project
supabase link --project-ref bkarkzwzbvfiqbtpjkvh

# Deploy the function
supabase functions deploy send-invite-sms

# Set environment variables in Supabase (secrets)
supabase secrets set TWILIO_ACCOUNT_SID=your_account_sid_here
supabase secrets set TWILIO_AUTH_TOKEN=your_auth_token_here
supabase secrets set TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_sid_here
```

**Using Supabase Dashboard:**

1. Go to **Edge Functions** in your Supabase dashboard
2. Click **Deploy a new function**
3. Name it `send-invite-sms`
4. Copy the contents of `supabase/functions/send-invite-sms/index.ts`
5. Paste and deploy
6. Go to **Settings** → **Edge Functions**
7. Add the Twilio environment variables as secrets:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_MESSAGING_SERVICE_SID`

### 2.2 Configure Phone Authentication (Optional)

If you also want to use Twilio for Supabase Auth OTP:

1. Go to **Authentication** → **Providers** → **Phone**
2. Enable the Phone provider
3. Select **Twilio** as the SMS provider
4. Enter your Twilio credentials:
   - Account SID
   - Messaging Service SID
   - Auth Token
5. Customize the SMS template if desired
6. Save

---

## Step 3: Testing

### 3.1 Test the Edge Function Directly

You can test the Edge Function using `curl`:

```bash
# Get your auth token from Supabase (from an authenticated session)
curl -i --location --request POST 'https://bkarkzwzbvfiqbtpjkvh.supabase.co/functions/v1/send-invite-sms' \
  --header 'Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "phone_number": "+1234567890",
    "invite_code": "TEST123",
    "inviter_name": "John Doe"
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Invite code sent successfully",
  "messageSid": "SMxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "queued"
}
```

### 3.2 Test from the App

Use the `useInviteCodes` hook in your React Native app:

```typescript
import { useInviteCodes } from '../hooks/useInviteCodes';

const MyComponent = () => {
  const { createInviteCode, sendInviteCode } = useInviteCodes();

  const sendInvite = async () => {
    try {
      // 1. Create an invite code
      const { data: inviteCode } = await createInviteCode({
        code: 'FRIEND2024',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      // 2. Send the invite code via SMS
      const result = await sendInviteCode({
        phone_number: '+1234567890',
        invite_code: inviteCode.code,
        inviter_name: 'Your Name', // Optional - defaults to profile.full_name
      });

      console.log('Invite sent!', result);
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
  };

  return (
    // Your UI here
  );
};
```

---

## Troubleshooting

### SMS Not Sending

1. **Check Twilio credentials**: Ensure all environment variables are set correctly
2. **Check Twilio account status**: Free accounts may have restrictions
3. **Verify phone number format**: Must be in E.164 format (e.g., `+1234567890`)
4. **Check Edge Function logs**:
   ```bash
   supabase functions logs send-invite-sms
   ```
5. **Check Twilio logs**: Go to Twilio Console → Monitor → Logs → Messaging

### Edge Function Errors

1. **"Twilio credentials not configured"**: Environment variables not set in Supabase
2. **"Unauthorized"**: User not authenticated or session expired
3. **"Invalid phone number format"**: Phone must be in E.164 format

### Database Errors

1. **"phone_number column doesn't exist"**: Run the migration
2. **"violates foreign key constraint"**: inviter_id references a non-existent profile

---

## Cost Considerations

### Twilio Pricing

- **SMS (US)**: ~$0.0075 per message
- **SMS (International)**: Varies by country
- **Free Trial**: $15.50 credit for testing

See [Twilio Pricing](https://www.twilio.com/sms/pricing) for details.

### Supabase Pricing

- **Edge Functions**: Free tier includes 500K function invocations/month
- See [Supabase Pricing](https://supabase.com/pricing) for details.

---

## Security Best Practices

1. **Never commit credentials**: Keep `.env` in `.gitignore`
2. **Use environment variables**: Store secrets in Supabase dashboard
3. **Validate phone numbers**: The Edge Function validates E.164 format
4. **Rate limiting**: Consider implementing rate limits to prevent abuse
5. **Monitor usage**: Check Twilio and Supabase usage regularly

---

## Next Steps

1. **Create UI**: Build a screen for users to send invites
2. **Add rate limiting**: Prevent spam by limiting invites per user
3. **Track delivery**: Store SMS delivery status in the database
4. **Customize message**: Update the SMS template in the Edge Function
5. **Add analytics**: Track invite conversion rates

---

## Support

- **Twilio Support**: [https://support.twilio.com](https://support.twilio.com)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Edge Functions Docs**: [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)

---

## File References

- **Migration**: `supabase/migrations/20251103235000_add_phone_and_inviter_to_profiles.sql`
- **Edge Function**: `supabase/functions/send-invite-sms/index.ts`
- **Hook**: `hooks/useInviteCodes.ts:108-148` (sendInviteCode method)
- **Environment Variables**: `.env` and `.env.example`
