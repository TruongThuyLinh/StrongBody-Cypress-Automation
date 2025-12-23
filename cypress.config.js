const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    chromeWebSecurity: false,

    // --- 1. DÒNG QUAN TRỌNG NHẤT (Chống sập trình duyệt) ---
    numTestsKeptInMemory: 0, 

    // --- 2. Tăng kích thước màn hình & Thời gian chờ ---
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000, // Tăng lên 15s để đỡ bị lỗi timeout

    setupNodeEvents(on, config) {
      // CHẶN POPUP CHO EDGE + CHROMIUM + CHROME
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (
          browser.family === 'chromium' ||
          browser.name === 'edge' ||
          browser.name === 'msedge'
        ) {
          launchOptions.args.push('--disable-notifications');//Chặn popup
          launchOptions.args.push('--disable-popup-blocking');//Chặn thông báo kiểu “Allow notification”
          launchOptions.args.push('--disable-infobars');//Chặn thanh “Chrome is controlled by automated test software”
          //=>Giúp test chạy ổn định – không bị cản bởi popup.
        }
        return launchOptions;
      });
    },
// đọc các file trong thư mục cypress/test/ và kết thúc bằngcy.js

    specPattern: "cypress/test/**/*.cy.js",
    baseUrl: "https://strongbody.ai"
  },
});
