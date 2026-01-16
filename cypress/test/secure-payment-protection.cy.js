Cypress.on("uncaught:exception", () => false);

describe("Secure Payment Protection", () => {

    const login = () => {
  cy.visit("/login");
  
  // cy.contains('button', 'English', { timeout: 10000 })
  //   .should('be.visible')
  //   .click();

  // cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email").focus().clear().type("truongthuylinh2004tb@gmail.com", { delay: 100 });

  cy.get("input[name='password']").focus().clear().type("1234567l");
  
  cy.get("button[type='submit']").should('be.enabled').click();

  cy.url().should('not.include', '/login');
  cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
};
  
beforeEach(() => {
  cy.session("login", login, {
    validate() {
      // Kiểm tra xem có bất kỳ cookie nào chứa 'session-token' không
      cy.getCookies().then((cookies) => {
        const hasSession = cookies.some(c => c.name.includes('session-token'));
        if (!hasSession) {
          throw new Error("Session không tồn tại hoặc đã hết hạn");
        }
      });
    },
  });
    cy.visit("/secure-payment-protect");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "secure-payment-protect");   
  });  
  
const SELECTORS = {
    getStartedBtn: 'button.bg-\\[\\#DA1F27\\]', 
    welcomeMessage: 'Welcome'
};


    it("TC_01 - Kiểm tra nút Get Started Free điều hướng chính xác về trang Home", () => {
    // 1. Tìm nút cụ thể, cuộn tới và kiểm tra
    // Sử dụng .first() nếu bạn muốn tương tác với nút đầu tiên trên trang
    cy.get(SELECTORS.getStartedBtn)
        .filter(':visible') // Chỉ lấy những nút đang hiển thị (phòng trường hợp có nút ẩn)
        .first() 
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain.text', 'Get Started Free');

   cy.get(SELECTORS.getStartedBtn)
        .filter(':visible') // <--- CHỐT CHẶN: Chỉ lấy nút đang hiển thị trên màn hình hiện tại
        .first() 
        .scrollIntoView({ duration: 500, offset: { top: -100 } })
        .click();

    // 3. Kiểm tra kết quả
    cy.url({ timeout: 15000 }).should("include", "/home"); 
    cy.contains(SELECTORS.welcomeMessage, { timeout: 10000 }).should('be.visible');
});

});

