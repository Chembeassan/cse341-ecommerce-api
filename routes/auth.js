// routes/auth.js
const express = require('express');
const router = express.Router();
const { passport } = require('../config/oauth');

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to home or profile page
 */
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/failure',
    successRedirect: '/auth/success'
  })
);

/**
 * @swagger
 * /auth/success:
 *   get:
 *     summary: Authentication success
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication successful
 */
router.get('/success', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/failure');
  }
  
  res.json({
    message: 'Authentication successful!',
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails[0].value
    },
    authenticated: true
  });
});

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: Authentication failure
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Authentication failed
 */
router.get('/failure', (req, res) => {
  res.status(401).json({ 
    error: 'Authentication failed',
    authenticated: false
  });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ 
      message: 'Logged out successfully',
      authenticated: false
    });
  });
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Not authenticated',
      authenticated: false
    });
  }
  
  res.json({
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails[0].value
    },
    authenticated: true
  });
});

module.exports = router;