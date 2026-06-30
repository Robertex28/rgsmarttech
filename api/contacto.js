const ALLOWED_SERVICIOS = new Set([
  'Reparación PC/Laptop',
  'Redes y WiFi',
  'Cámaras CCTV',
  'Ensamblaje de equipos',
  'Página Web',
  'Automatización con IA',
  'Soporte remoto',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nombre, email, servicio, mensaje, telefono } = req.body ?? {};

  if (!nombre || !email || !servicio || !mensaje) {
    return res.status(400).json({ error: 'Campos requeridos incompletos' });
  }
  if (typeof nombre !== 'string' || nombre.length < 2 || nombre.length > 100) {
    return res.status(400).json({ error: 'Nombre inválido' });
  }
  if (!EMAIL_RE.test(email) || email.length > 150) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!ALLOWED_SERVICIOS.has(servicio)) {
    return res.status(400).json({ error: 'Servicio inválido' });
  }
  if (typeof mensaje !== 'string' || mensaje.length < 10 || mensaje.length > 1000) {
    return res.status(400).json({ error: 'Mensaje inválido' });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('MAKE_WEBHOOK_URL no configurada');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  const payload = { nombre, email, servicio, mensaje };
  if (telefono && typeof telefono === 'string' && telefono.length <= 16) {
    payload.telefono = telefono;
  }

  const upstream = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.status(upstream.ok ? 200 : 502).json({ ok: upstream.ok });
};
