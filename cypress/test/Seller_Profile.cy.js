Cypress.on("uncaught:exception", () => false);

describe("Seller Profile", () => {
  
  const selectors = {
    shopName: "input#shop_name",
    firstName: "input#first_name",
    lastName: "input#last_name",
    profession: "input#professions",
    country: "#country_id",
    yearsExperience: "input#years_of_experience",
    customersServed: "input#served_customers", 
    about: "textarea#about",
    uploadCV: "input[type='file']",
    saveBtn: "button:contains('Save')",
    editBtn: "button:contains('Edit')" 
  };
  
   const login = () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("liveb58966@m3player.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };

  beforeEach(() => {
  
 cy.session("login", login);
    
    
    //cy.visit("https://strongbody-web.vercel.app/buyer/dashboard");
    //cy.contains("Switch to Seller", { timeout: 20000 }).click({ force: true });
    cy.wait(1000);
   // cy.visit("https://strongbody-web.vercel.app/seller/read-me");
    //cy.contains("button", "Update your profile").should("be.visible").click({ force: true });   
    cy.visit("https://strongbody-web.vercel.app/seller/profile");  
    //cy.url().should("include", "seller/profile");
  });

  it("TC_01: Để trống Shop Name - Các trường khác hợp lệ (English)", () => {
  
cy.contains('button', 'Edit').should('be.visible').click();
    cy.get(selectors.shopName).clear();

    cy.get(selectors.firstName).clear().type('John');
    cy.get(selectors.lastName).clear().type('Doe');

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });


    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type(
      'I am a professional software engineer with a passion for building scalable web applications and ensuring high-quality user experiences.'
    );

    //cy.get(selectors.uploadCV).selectFile('cypress/fixtures/Homework 22.pptx', { force: true });

    // 6. Nhấn Save
    cy.get(selectors.saveBtn).click();

  
    cy.contains('Shop name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  
  });
  it("TC_02: Nhập chỉ khoảng trắng vào Shop Name - Các trường khác hợp lệ", () => {
  
    cy.contains('button', 'Edit').should('be.visible').click();

    cy.get(selectors.shopName).as('shopInput');
    cy.get('@shopInput').clear();
    cy.get('@shopInput').type('   '); // Nhập 3 khoảng trắng
    cy.get('@shopInput').blur();      // Rời khỏi ô để kích hoạt validation
    cy.get(selectors.firstName).clear();
    cy.get(selectors.firstName).type('John');
    
    cy.get(selectors.lastName).clear();
    cy.get(selectors.lastName).type('Doe');

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Singapore');
    cy.contains('Singapore', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing whitespace validation for shop name field.');


    //cy.get(selectors.uploadCV).last().selectFile('cypress/fixtures/Homework 22.pptx', { force: true });
    cy.get(selectors.saveBtn).click();
    cy.contains('Shop name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
  it("TC_03: Để trống Last Name - Các trường khác hợp lệ", () => {
    cy.contains('button', 'Edit').should('be.visible').click();
    cy.get(selectors.shopName).type('StrongBody Seller');
      cy.get(selectors.firstName).type('John');

    cy.get(selectors.lastName).clear();
    cy.get(selectors.lastName).blur(); 

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing Last Name validation.');

    //cy.get(selectors.uploadCV).last().selectFile('cypress/fixtures/Homework 22.pptx', { force: true });
    cy.get(selectors.saveBtn).click();

    cy.contains('Last name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
  it("TC_04: Chỉ nhập khoảng trắng vào Last Name - Các trường khác hợp lệ", () => {
    cy.contains('button', 'Edit').should('be.visible').click();
    
    
    cy.get(selectors.shopName).clear().type('StrongBody Seller');
    cy.get(selectors.firstName).clear().type('John');


    cy.get(selectors.lastName).clear().type('   '); // Nhập 3 khoảng trắng
    cy.get(selectors.lastName).blur(); 

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing whitespace validation.');
    cy.get(selectors.saveBtn).click();

    cy.contains('Last name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
  it("TC_05: Để trống First Name - Các trường khác hợp lệ", () => {
    cy.contains('button', 'Edit').should('be.visible').click();

   
    cy.get(selectors.firstName).clear();
    cy.get(selectors.firstName).blur(); 

   
    cy.get(selectors.shopName).clear().type('StrongBody Seller');
    cy.get(selectors.lastName).clear().type('Doe');

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing First Name validation.');

    
    cy.get(selectors.saveBtn).click();

  
    cy.contains('First name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
  it("TC_06: Chỉ nhập khoảng trắng vào First Name - Các trường khác hợp lệ", () => {
    cy.contains('button', 'Edit').should('be.visible').click();
    
    cy.get(selectors.firstName).clear().type('     '); 
    cy.get(selectors.firstName).blur(); 
    cy.get(selectors.shopName).clear().type('StrongBody Seller');
    cy.get(selectors.lastName).clear().type('Doe');

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing whitespace validation for First Name.');

    cy.get(selectors.saveBtn).click();
    cy.contains('First name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
  it("TC_07: Để trống Profession - Các trường khác hợp lệ", () => {
    cy.contains('button', 'Edit').should('be.visible').click();
    cy.get(selectors.shopName).clear().type('StrongBody Seller');
    cy.get(selectors.firstName).clear().type('John');
    cy.get(selectors.lastName).clear().type('Doe');

    cy.get(selectors.profession).clear();
   
    cy.get(selectors.profession).blur(); 
    
    cy.get('body').click(0, 0, { force: true });

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type('Testing Profession validation.');

    cy.get(selectors.saveBtn).click();

    cy.contains('Profession is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
  });
});