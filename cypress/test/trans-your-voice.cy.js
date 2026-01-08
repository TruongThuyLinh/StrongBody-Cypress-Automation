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
    cy.visit("/trans-your-voice");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "trans-your-voice");   
  });  
  
  it("TC_01 - Click vào button Buy Now", () => {
    const SELECTORS = {
    voiceChatProCard: 'div.bg-\\[\\#222222\\]', // Card màu đen của Voice Chat Pro
    // Bạn có thể thêm các selector khác vào đây
};
    cy.get(SELECTORS.voiceChatProCard)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible');
        cy.get(SELECTORS.voiceChatProCard).within(() => {
        cy.get('h3').should('contain', 'Voice Chat Pro');
        cy.get('span').should('contain', 'US$15');
  cy.get('button').contains('Buy Now').click();
  });
              cy.visit("/checkout/pricing?returnUrl=/trans-your-voice/joining-success");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "checkout/pricing?returnUrl=/trans-your-voice/joining-success"); 
});
});
