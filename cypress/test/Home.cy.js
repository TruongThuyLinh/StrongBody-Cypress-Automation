Cypress.on("uncaught:exception", () => false);

describe("Home", () => {

    const login = () => {
  cy.visit("https://strongbody.ai/login");
  
  cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
  
  cy.get("input[name='email']").focus().clear().type("bibise1388@crsay.com", { delay: 100 });

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
    cy.visit("https://strongbody.ai/home");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "home");   
  });  
   it("TC_01- Click vào Show more->", () => {
    cy.contains('Show more').click();
    cy.url().should('include', '/buyer/offer')
    cy.get('h1').should('be.visible');

    }); 
    it("TC_02 Click button Invite now->chuyển sang affiliate ", () => {
   cy.contains('a', 'Invite now').click();
    cy.url().should('include', '/affiliate/overview')
    cy.get('h2').should('be.visible');

    }); 

    it('TC_03 Click button Apply Now ->chuyển sang become seller ', () => {
    cy.contains('a', 'Apply Now')
  .click({ force: true });
  cy.url().should('include', '/become-seller');
  cy.get('h3').should('be.visible');
  });
   it('TC_04 Click button Apply Now ->chuyển sang affiliate ', () => {
    cy.contains('a', 'Invite friends')
  .click({ force: true });
  cy.url().should('include', '/affiliate/overview');
  cy.get('h3').should('be.visible');
  });
   it('TC_05  Click button How Lion Point works->chuyển sang affiliate ', () => {
    cy.contains('a', 'How Lion Point works')
  .click({ force: true });
  cy.url().should('include', '/buyer/lion-point');
  cy.contains('Lion Point', { timeout: 10000 }).should('be.visible');
  });
  it('TC_06: Click link Visit Provider Page->chuyển hướng sang become-seller', () => {
  cy.contains('a', 'Visit Provider Page')
    .filter(':visible')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true }); 
  cy.url().should('include', '/become-seller');
 // cy.contains('Become a Seller', { timeout: 10000 }).should('be.visible');
});
it('TC_07: Click vào dịch vụ Orthodontics và kiểm tra chuyển hướng', () => {

  cy.get('a[aria-label="Orthodontics & Smile Aesthetics Clinic"]')
    .should('exist')
    .should('have.attr', 'href', '/service/orthodontics-smile-aesthetics-clinic/sb14882')
    .click({ force: true });

  cy.url().should('include', '/service/orthodontics-smile-aesthetics-clinic/sb14882');

  cy.contains( 'Orthodontics', { timeout: 10000 }).should('be.visible');
});

});