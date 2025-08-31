// ******* ================== Imports ================== ********

import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';
import { requestResetToken } from '../services/auth.js';
import { resetPassword } from '../services/auth.js';

// ******* ================== Controller ================== ********
// ------------------- Valentyna Melnyk: Register + login ---------------------

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: ' User registered successfully',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  try {
    console.log("Login request body:", req.body);
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
      status: 200,
      message: 'User logged in successfully',
      data: {
        accessToken: session.accessToken,
        user: session.user,
      },
    });
  } catch (error) {
    console.error("Error in loginUserController:", error);
    next(error);
  }
};




// ------------------- Maksym: Logout ---------------------

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// ------------------- Arina: Reset email/password + Session ---------------------

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

// ------------------- Andriy: Current user info ---------------------

export const getCurrentUserController = async (req, res) => {
  const { _id, name, email, avatar, followers, following } = req.user;

  res.json({
    status: 200,
    message: 'Current user info',
    data: { _id, name, email, avatar, followers, following },
  });
};