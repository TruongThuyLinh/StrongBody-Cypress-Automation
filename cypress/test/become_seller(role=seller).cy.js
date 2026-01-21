Cypress.on("uncaught:exception", () => false);

describe("BECOME SELLER(role=seller)", () => {

const thumbInput = "input#cover-upload";//id
const nameInput = "input#title"; 
  //const descInput = 'textarea, div[data-field="description"] textarea';
  const descInput = 'div.ContentEditable__root[data-lexical-editor="true"]';
  const heaInput = 'input.custom-combobox-create-service';
  const priceInput = "input#price, input[name='price'], input[placeholder='Enter price']";
  const galleryEmptyUploads = "input[type='file'][accept^='image']";
  const createBtn = "button:contains('Create Hea')";
  const imgSlot1 = "#service-images-upload-0";          // Ảnh review đầu tiên
  const imgMore = "#service-images-upload-more";        // Upload nhiều ảnh
  const login = () => {
  cy.visit("/login");
 
  
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email").focus().clear().type("liveb58966@m3player.com", { delay: 100 });

  cy.get("input[name='password']").focus().clear().type("1234567l");
  
  cy.get("button[type='submit']").should('be.enabled').click();

  cy.url().should('not.include', '/login');
  cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
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
cy.visit("/become-seller");
    cy.url({ timeout: 20000 }).should("include", "become-seller");
    cy.wait(1000);
   
  });
  const startSellingBtn = 'button:contains("Start Selling Now")';
  const shareProductsBtn = 'button:contains("Share your products")';
  const joinServiceProviderBtn = 'button:contains("Join as a Service Provider")';
  
   it("TC_01 - Kiểm tra nút Start Selling Now — From $15/month điều hướng chính xác", () => {
    // 1. Cuộn tới nút bấm
    cy.get(startSellingBtn)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .should('be.visible')
        .and('contain', 'Start Selling Now — From $15/month');
        cy.wait(1000);

    cy.get(startSellingBtn).click({ force: true });

    cy.url({ timeout: 20000 }).should("include", "seller/read-me"); 
        cy.contains('Welcome to StrongBody, StrongBody Seller!').should('be.visible');
});
//  it("TC_02 - Kiểm tra nút Share your products điều hướng chính xác", () => {
//     // 1. Cuộn tới nút bấm
//     cy.get(shareProductsBtn)
//         .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
//         .should('be.visible')
//         .and('contain', 'Share your products');
//         cy.wait(1000);

//     cy.get(shareProductsBtn).click({ force: true });

//     cy.url({ timeout: 20000 }).should("include", "seller/read-me"); 
//         cy.contains('Welcome to StrongBody, StrongBody Seller!').should('be.visible');
// });
// it("TC_03 - Kiểm tra nút Join as a Service Provider điều hướng chính xác", () => {
//     // 1. Cuộn tới nút bấm
//     cy.get(joinServiceProviderBtn)
//         .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
//         .should('be.visible')
//         .and('contain', 'Join as a Service Provider');
//         cy.wait(1000);

//     cy.get(joinServiceProviderBtn).click({ force: true });

//     cy.url({ timeout: 20000 }).should("include", "seller/read-me"); 
//         cy.contains('Welcome to StrongBody, StrongBody Seller!').should('be.visible');
// });
});