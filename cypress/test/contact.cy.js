Cypress.on("uncaught:exception", () => false);

describe(" CONTACT PAGE TESTING — OPTIMIZED", () => {
  beforeEach(() => {
 
  cy.visit("/contact");
  cy.wait(1000);

  });

const lastnameInput = 'input[name="lastName"]';
const firstnameInput = 'input[name="firstName"]';
const emailInput = 'input[type="email"]';
const inquiryType = 'select[name="inquiryType"]';
const descriptionInput = 'input[name="description"]';
const submitBtn = 'button[type="submit"]';
  it("TC_01 -Để trống Last Name", () => {
    cy.get(firstnameInput).type('Thuy Linh');
    cy.get(emailInput).type('thuylinh@gmail.com');
    //cy.get(inquiryType).click(); 
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);

    cy.get(descriptionInput).type('This is a test message.');
    cy.get(submitBtn).should('be.disabled');
  });
   it("TC_02 -Chỉ nhập space vào  Last Name", () => {
    cy.get(firstnameInput).type('Thuy Linh');
      cy.get(lastnameInput).type('       ');
    cy.get(emailInput).type('thuylinh@gmail.com');
    //cy.get(inquiryType).click(); 
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);

    cy.get(descriptionInput).type('This is a test message.');
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');
  });
    it("TC_03 -Để trống first Name", () => {
    cy.get(lastnameInput).type('Nguyen');
    cy.get(emailInput).type('thuylinh@gmail.com');
   
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);
    cy.get(descriptionInput).type('This is a test message.');
    cy.get(submitBtn).should('be.disabled');
  });
  it("TC_04 -  Chỉ nhập space vào first Name", () => {
    cy.get(lastnameInput).type('Nguyen');
    cy.get(firstnameInput).type('       ');
    cy.get(emailInput).type('thuylinh@gmail.com');
   
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);
    cy.get(descriptionInput).type('This is a test message.');
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');
  });
  it("TC_05 -bỏ trống inquiryType", () => {
  
    cy.get(lastnameInput).type('Nguyen');
    cy.get(firstnameInput).type('thuy Linh');
    cy.get(emailInput).type('thuylinh@gmail.com');
    cy.wait(500);
    cy.get(descriptionInput).type('This is a test message.');
    cy.get(submitBtn).should('be.disabled');
  });
  it("TC_05 -bỏ trống description", () => {
  
    cy.get(lastnameInput).type('Nguyen');
    cy.get(firstnameInput).type('thuy Linh');
    cy.get(emailInput).type('thuylinh@gmail.com');
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);
    
    cy.get(submitBtn).should('be.disabled');
  });
  it("TC_05 Chỉ nhập space vào description", () => {
  
    cy.get(lastnameInput).type('Nguyen');
    cy.get(firstnameInput).type('thuy Linh');
    cy.get(emailInput).type('thuylinh@gmail.com');
    cy.get(inquiryType).select('1. Join as a Buyer');
    cy.wait(500);
    cy.get(descriptionInput).type('       ');
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');
  });
});