Cypress.on("uncaught:exception", () => false);

describe("Career Growth Options", () => {

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
    cy.visit("/career-growth-options");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "career-growth-options");   
  });  
  
const SELECTORS = {
    // Selector tìm nút bấm dựa trên class màu đỏ đặc trưng
    getecomepublisherBtn: 'a.bg-\\[\\#0CAF60\\]', 
    freePlanSection: 'div:contains("Become publisher")',
    getbecomesellerBtn: 'a.bg-\\[\\#2F8CF9\\]'
};


   it("TC_01 - Kiểm tra nút Become publisher điều hướng chính xác", () => {
    // 1. Cuộn tới nút bấm
    cy.get(SELECTORS. getecomepublisherBtn)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain', 'Become publisher')
        .and('have.attr', 'href', '/become-publisher');
        cy.wait(1000);

    cy.get(SELECTORS. getecomepublisherBtn).click({ force: true });

    cy.url({ timeout: 20000 }).should("include", "/become-publisher"); 
        cy.contains('Become an Affiliate Partner').should('be.visible');
});


   it("TC_02 - Kiểm tra nút Become seller điều hướng chính xác", () => {
    // 1. Cuộn tới nút bấm
    cy.get(SELECTORS. getbecomesellerBtn)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain', 'Become seller')
        .and('have.attr', 'href', '/become-seller');

    cy.get(SELECTORS. getbecomesellerBtn).click({ force: true });

    cy.url({ timeout: 20000 }).should("include", "/become-seller"); 
     cy.contains('Earn income by providing your services').should('be.visible');
});
});

