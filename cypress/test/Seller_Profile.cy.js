Cypress.on("uncaught:exception", () => false);

describe("ADD PRODUCT", () => {

  // -----------------------------
  // GLOBAL SELECTORS
  // -----------------------------
  const thumbInput = "input#product-cover-upload";//id
const nameInput = "input#name"; 

  
  const descInput = 'textarea, div[data-field="description"] textarea';
 

const galleryEmptyUploads = "input[type='file'][accept^='image']";

  const createBtn = "button:contains('Create Your Product')";
  const cancelBtn = "button:contains('Cancel')";
const imgSlot1 = "#product-images-upload-0";          // Ảnh review đầu tiên
const imgSlot2 = "#product-images-upload-1"; 
const imgSlot3 = "#product-images-upload-2";         // Upload nhiều ảnh
const countryInput='input[placeholder="Select country"]';
  // -----------------------------
  // BEFORE + LOGIN SETUP
  // -----------------------------
 

  before(() => {
  cy.session("login", () => {
    cy.visit("https://strongbody-web.vercel.app/login");

    cy.get("input[name='email']").type("honganhtran.1805@gmail.com");
    cy.get("input[name='password']").type("Anh@1234");
    cy.get("button[type='submit']").click();

    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  });
});

beforeEach(() => {
  cy.session("login", () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("honganhtran.1805@gmail.com");
    cy.get("input[name='password']").type("Anh@1234");
    cy.get("button[type='submit']").click();

    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  });

cy.visit("https://strongbody-web.vercel.app/become-seller");
//cy.get("span.flex.items-center.gap-1") .filter(":visible") .contains("Marketplace") .click({ force: true });  cy.contains("Open Shop").click();
 cy.contains("Set Up Your Care Provider Shop").click();
  cy.contains("My profile").click();

  cy.url().should("include", "/seller/profile");
});
});