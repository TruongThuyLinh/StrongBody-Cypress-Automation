Cypress.on("uncaught:exception", () => false);

describe("CARE ECOSYSTEM", () => {


  const thumbInput = "input#product-cover-upload";

const nameInput = "input#name"; 

  
 
    const login = () => {
  cy.visit("/login");
  
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email")
  .focus()
  .clear()
  .type("liveb58966@m3player.com", { delay: 50 }); // Giảm delay một chút để test chạy nhanh hơn
  cy.get("input[name='password']").focus().clear().type("1234567l");
  
  cy.get("button[type='submit']").should('be.enabled').click();

  cy.url().should('not.include', '/login');
 // cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
};
  
beforeEach(() => {
  cy.session("login", login, {
    validate() {
      cy.getCookies().then((cookies) => {
        const hasSession = cookies.some(c => c.name.includes('session-token'));
        if (!hasSession) {
          throw new Error("Session không tồn tại hoặc đã hết hạn");
        }
      });
    },
  });
    cy.visit("/care-ecosystem");
cy.url({ timeout: 20000 }).should("include", "care-ecosystem");   
  });
  it("TC_01 - click button Start Building Your Team-> điều hướng đúng ", () => {
  cy.get('button:visible').contains('Start Building Your Team').click();
  cy.url().should("include", "choose-your-companions"); 
       
  });
   it("TC_02- click button Get Started Free-> điều hướng đúng ", () => {
  cy.get('button:visible').contains('Get Started Free').click();
  cy.url().should("include", "choose-your-companions"); 
       
  });
  
});