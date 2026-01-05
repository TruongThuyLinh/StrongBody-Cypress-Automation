const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // 1. CHỈNH SỬA QUAN TRỌNG: Đặt môi trường mặc định là bản TEST.
    // Khi Dev gõ lệnh "npx cypress open", Robot sẽ tự động vào bản này.
    baseUrl: "https://strongbody-web.vercel.app/", 

    scrollBehavior: 'center', 
    chromeWebSecurity: false,

    // Chống sập trình duyệt & Tiết kiệm bộ nhớ
    numTestsKeptInMemory: 0, 

    // Tăng kích thước màn hình chuẩn Desktop
    viewportWidth: 1280,
    viewportHeight: 720,

    // Tăng thời gian chờ lên 15s để tránh lỗi timeout do mạng chậm
    defaultCommandTimeout: 15000, 

    setupNodeEvents(on, config) {
      // CHẶN POPUP CHO EDGE + CHROMIUM + CHROME
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (
          browser.family === 'chromium' ||
          browser.name === 'edge' ||
          browser.name === 'msedge'
        ) {
          launchOptions.args.push('--disable-notifications');
          launchOptions.args.push('--disable-popup-blocking');
          launchOptions.args.push('--disable-infobars');
        }
        return launchOptions;
      });
    },
    
    // Đọc các file test trong thư mục cypress/test/
    specPattern: "cypress/test/**/*.cy.js",
    
    // Video và Screenshots sẽ được lưu tự động nếu cấu hình trong .yml đúng [cite: 1, 23-24]
    video: true,
    screenshotOnRunFailure: true,
  },
});