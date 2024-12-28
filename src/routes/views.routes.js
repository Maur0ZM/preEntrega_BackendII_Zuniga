import { Router } from "express";

const router = Router();

// Registro
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registro'
    });
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Inicio de session'
    });
})

export default router;
