import express from 'express';
import { OTP_SERVICE_URL, OTP_CLIENT_ID, otpRequest } from '../lib/otpClient.js';

const router = express.Router();

router.get('/me', async (req, res) => {
  if (!OTP_CLIENT_ID) {
    return res.status(500).json({ error: 'Server misconfiguration: OTP_CLIENT_ID is not set' });
  }
  try {
    const { status, body } = await otpRequest(`/api/users/${OTP_CLIENT_ID}`, { auth: true });
    if (status !== 200) {
      return res.status(status).json(body);
    }
    const user = body.data || body;
    res.json({ blocked: !!user.blocked, blockedModel: user.blockedModel || null });
  } catch {
    res.status(502).json({ error: 'User service unavailable' });
  }
});

export default router;
