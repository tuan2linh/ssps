import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { authService, userService, tokenService } from '../services/index.js';
import User from '../models/user.model.js';

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateVerifyEmailToken(user);
    const data = await authService.sendVerificationEmail(user.email, tokens);
    res.status(httpStatus.CREATED).send({ user, data });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }

  // const tokens = await tokenService.generateAuthTokens(user);
  // res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  if (!user.isEmailVerified) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Email is not verified, plese check your email for verification link' });
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.send({ message: 'Logout successful' });
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.send({ message: 'Verification successful' });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  // find user by email
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }
  if (user.isEmailVerified) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Email is already verified' });
  }
  const tokens = await tokenService.generateVerifyEmailToken(user);
  const data = await authService.sendVerificationEmail(req.body.email, tokens);
  res.send({ data });
});

const changePassword = catchAsync(async (req, res) => {
  try {
    const user = await authService.changePassword(req.user, req.body);
    res.status(httpStatus.OK).send({ message: 'Password changed successfully', user });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await authService.forgotPassword(req.body.email);
  const mailContent = await authService.sendPasswordResetEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.OK).json({
    message: 'Reset password email sent',
    mailContent
  });
});

const resetPassword = catchAsync(async (req, res) => {
  if (req.method === 'GET') {
    // Serve HTML page for password reset form
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
          <style>
              .mainDiv {
                  display: flex;
                  min-height: 100%;
                  align-items: center;
                  justify-content: center;
                  background-color: #f9f9f9;
                  font-family: 'Open Sans', sans-serif;
              }
              .cardStyle {
                  width: 500px;
                  border-color: white;
                  background: #fff;
                  padding: 36px 0;
                  border-radius: 4px;
                  margin: 30px 0;
                  box-shadow: 0px 0 2px 0 rgba(0,0,0,0.25);
              }
              #signupLogo {
                  max-height: 100px;
                  margin: auto;
                  display: flex;
                  flex-direction: column;
              }
              .formTitle {
                  font-weight: 600;
                  margin-top: 20px;
                  color: #2F2D3B;
                  text-align: center;
              }
              .inputLabel {
                  font-size: 12px;
                  color: #555;
                  margin-bottom: 6px;
                  margin-top: 24px;
              }
              .inputDiv {
                  width: 70%;
                  display: flex;
                  flex-direction: column;
                  margin: auto;
              }
              input {
                  height: 40px;
                  font-size: 16px;
                  border-radius: 4px;
                  border: none;
                  border: solid 1px #ccc;
                  padding: 0 11px;
              }
              input:disabled {
                  cursor: not-allowed;
                  border: solid 1px #eee;
              }
              .buttonWrapper {
                  margin-top: 40px;
              }
              .submitButton {
                  width: 70%;
                  height: 40px;
                  margin: auto;
                  display: block;
                  color: #fff;
                  background-color: #065492;
                  border-color: #065492;
                  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
                  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.035);
                  border-radius: 4px;
                  font-size: 14px;
                  cursor: pointer;
              }
              .submitButton:disabled,
              button[disabled] {
                  border: 1px solid #cccccc;
                  background-color: #cccccc;
                  color: #666666;
              }
              #loader {
                  position: absolute;
                  z-index: 1;
                  margin: -2px 0 0 10px;
                  border: 4px solid #f3f3f3;
                  border-radius: 50%;
                  border-top: 4px solid #666666;
                  width: 14px;
                  height: 14px;
                  -webkit-animation: spin 2s linear infinite;
                  animation: spin 2s linear infinite;
              }
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          </style>
      </head>
      <body>
          <div class="mainDiv">
              <div class="cardStyle">
                  <form id="resetPasswordForm">
                      <img src="https://s3-us-west-2.amazonaws.com/shipsy-public-assets/shipsy/SHIPSY_LOGO_BIRD_BLUE.png" id="signupLogo"/>
                      <h2 class="formTitle">Reset Password</h2>
                      <div class="inputDiv">
                          <label class="inputLabel" for="password">New Password</label>
                          <input type="password" id="password" name="password" required>
                      </div>
                      <div class="inputDiv">
                          <label class="inputLabel" for="confirmPassword">Confirm Password</label>
                          <input type="password" id="confirmPassword" name="confirmPassword" required>
                      </div>
                      <div class="buttonWrapper">
                          <button type="submit" id="submitButton" class="submitButton pure-button pure-button-primary">
                              <span>Continue</span>
                              <span id="loader"></span>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
          <script>
              var password = document.getElementById("password"),
                  confirm_password = document.getElementById("confirmPassword");

              function validatePassword() {
                  if (password.value != confirm_password.value) {
                      confirm_password.setCustomValidity("Passwords Don't Match");
                      return false;
                  } else {
                      confirm_password.setCustomValidity('');
                      return true;
                  }
              }

              password.onchange = validatePassword;
              confirm_password.onkeyup = validatePassword;

              document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
                  e.preventDefault();
                  if (!validatePassword()) {
                      return;
                  }
                  const password = document.getElementById('password').value;
                  const token = '${req.query.token}';
                  try {
                      const response = await fetch(\`/v1/auth/reset-password?token=\${token}\`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ password })
                      });

                      const data = await response.json();
                      if (response.ok) {
                          alert('Password reset successful. Please login with your new password.');
                          window.location.href = '/login';
                      } else {
                          throw new Error(data.message || 'Password reset failed');
                      }
                  } catch (error) {
                      alert(error.message);
                  }
              });
          </script>
      </body>
      </html>
    `;
    res.send(html);
  } else {
    // Handle POST request for password reset
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.OK).json({ message: 'Password reset successfully' });
  }
});

export default {
  register,
  login,
  logout,
  verifyEmail,
  refreshTokens,
  sendVerificationEmail,
  changePassword,
  forgotPassword,
  resetPassword
};
