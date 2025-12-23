module.exports = {
  signup: {
    emailInput: "#email",                 // Sửa theo HTML bạn gửi
    passwordInput: "#password",           // Bạn sẽ gửi HTML password để mình thay đúng
    submitBtn: "button[type='submit']",   // Bạn gửi nút signup để mình sửa chính xác
  },

  otp: {
    otpInput: "input[placeholder='Enter verification code']", 
    verifyBtn: "button:contains('Verify')",
  }
}
