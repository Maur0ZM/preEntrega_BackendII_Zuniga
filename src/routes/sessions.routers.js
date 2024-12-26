import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Ruta para validar al usuario logueado
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  res.status(200).json({ user: req.user });
});

export default router;
