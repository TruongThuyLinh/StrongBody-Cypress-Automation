Cypress.on("uncaught:exception", () => false);

describe("Profile publisher", () => {

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
    cy.visit("/buyer/dashboard");
cy.url({ timeout: 20000 }).should("include", "buyer/dashboard");   
  });  

  const menu = {
    myProfile: 'span.font-medium:contains("My profile")',
    myOrderProducts: 'span.font-medium:contains("My Order Products")',
    ManageOrderHea: 'span.font-medium:contains("Manage Order Hea")',
   ManageRequests: 'span.font-medium:contains("Manage requests")',
   ReceivedOffers: 'span.font-medium:contains("Received offers")',
   LionPoints: 'span.font-medium:contains("Lion point")',
   Settings: 'span.font-medium:contains("Settings")'

  };
    it("TC_01- Click vào My profile ->", () => {
    cy.get(menu.myProfile).click();
   
   cy.url({ timeout: 20000 }).should("include", "buyer/dashboard"); 
    
    });
     it("TC_02- Click vào My Order Products->", () => {
     cy.get(menu.myOrderProducts)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'My Order Products');

    cy.get(menu.myOrderProducts).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/order-product"); 
     cy.contains('My Product Orders', { timeout: 10000 }).should('be.visible');

    });
     it("TC_03- Click vào Manage Order Hea->", () => {
    cy.get(menu.ManageOrderHea)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Manage Order Hea');
    cy.get(menu.ManageOrderHea).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/order-offer"); 
     cy.contains('My Service Orders', { timeout: 10000 }).should('be.visible');
    });
  it("TC_04- Click vào Manage requests->", () => {
    cy.get(menu.ManageRequests)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Manage requests');
    cy.get(menu.ManageRequests).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/request/management"); 
     cy.contains('Manage Requests', { timeout: 10000 }).should('be.visible');
    });
     it("TC_05- Click vào Received offers->", () => {
    cy.get(menu.ReceivedOffers)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Received offers');
    cy.get(menu.ReceivedOffers).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/offer"); 
     cy.contains('Manage your Offers', { timeout: 10000 }).should('be.visible');
    });
     it("TC_06- Click vào Lion point->", () => {
    cy.get(menu.LionPoints)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Lion point');
    cy.get(menu.LionPoints).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/lion-point"); 
        cy.contains('Lion Point', { timeout: 10000 }).should('be.visible');
    });
    it("TC_07- Click vào Settings->", () => { 
    cy.get(menu.Settings)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible')
            .and('contain', 'Settings');      
    cy.get(menu.Settings).click();
   cy.url({ timeout: 20000 }).should("include", "buyer/dashboard/setting"); 
        cy.contains('Edit profile', { timeout: 10000 }).should('be.visible');
    });
     it("TC_08 - Click vào Edit your dream team → Điều hướng đúng trang", () => { 
    const editLinkSelector = 'a[href="/choose-your-companions"]';

    cy.get(editLinkSelector)
        .filter(':visible') 
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain', 'Edit your dream team')
        .click();

    cy.url({ timeout: 20000 }).should("include", "choose-your-companions"); 
    cy.contains('Your StrongBody.AI team', { timeout: 10000 }).should('be.visible');
});

});