Cypress.on("uncaught:exception", () => false);

describe("Request Distribution System", () => {

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
    cy.visit("/request-distribution-system");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "request-distribution-system");   
  });  
  
const SELECTORS = {
    // Selector tìm nút bấm dựa trên class màu đỏ đặc trưng
    getRequestBtn: 'a.bg-\\[\\#0CAF60\\]', 
    freePlanSection: 'div:contains("Post a Request Now")' 
};


   it("TC_01 - Kiểm tra nút Post a Request Now điều hướng chính xác", () => {
    // 1. Cuộn tới nút bấm
    cy.get(SELECTORS.getRequestBtn)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain', 'Post a Request Now')
        .and('have.attr', 'href', '/create-request');

    cy.get(SELECTORS.getRequestBtn).click({ force: true });

    cy.url({ timeout: 20000 }).should("include", "/create-request"); 
        cy.contains('Create a Request').should('be.visible');
});
});

