Cypress.on("uncaught:exception", () => false);

describe("Home", () => {

    const login = () => {
  cy.visit("/login");
  
  cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();

  cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
  
  cy.get("input[name='email']").focus().clear().type("truongthuylinh2004tb@gmail.com", { delay: 100 });

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
    // Selector tìm nút bấm dựa trên class màu đỏ đặc trưng
    getStartedBtn: 'button.bg-\\[\\#DA1F27\\]', 
    freePlanSection: 'div:contains("Get Started Free")' 
};


    it("TC_01 - Kiểm tra nút Get Started Free điều hướng chính xác", () => {
        // 2. Cuộn tới nút bấm
        // Vì nút có class bg-[#DA1F27], ta dùng selector đó
        cy.get(SELECTORS.getStartedBtn)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Get Started Free');

      
        cy.get(SELECTORS.getStartedBtn).click();

        cy.url({ timeout: 20000 }).should("include", "/home"); 
        cy.contains('Welcome').should('be.visible');
    });

});

