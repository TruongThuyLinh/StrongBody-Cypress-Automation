Cypress.on("uncaught:exception", () => false);

describe("Seller Profile", () => {
  
  const selectors = {
    shopName: "input#shop_name",
    firstName: "input#first_name",
    lastName: "input#last_name",
    profession: "input#professions",
    country: 'input[placeholder="Select country"]',
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
    cy.visit("https://strongbody-web.vercel.app/seller/read-me");
    cy.contains("button", "Update your profile").should("be.visible").click({ force: true });     
    cy.url().should("include", "seller/profile");
  });

  it("TC_01: Để trống Shop Name - Các trường khác hợp lệ (English)", () => {
  
    cy.contains("span", "Edit").parent().click({ force: true });

    cy.get(selectors.shopName).clear();

    cy.get(selectors.firstName).clear().type('John');
    cy.get(selectors.lastName).clear().type('Doe');

    cy.get(selectors.profession).clear().type('Child Care Educator{enter}');

    cy.get(selectors.country).clear().type('Vietnam');
    cy.contains('Vietnam', { timeout: 5000 }).click(); 

    cy.get(selectors.yearsExperience).clear().type('5');
    cy.get(selectors.customersServed).clear().type('150');

    cy.get(selectors.about).clear().type(
      'I am a professional software engineer with a passion for building scalable web applications and ensuring high-quality user experiences.'
    );

    cy.get(selectors.uploadCV).selectFile('cypress/fixtures/Homework22.pptx', { force: true });

    // 6. Nhấn Save
    cy.get(selectors.saveBtn).click();

    // 7. Kiểm tra thông báo lỗi (Assertion)
    // Bạn cần bật đoạn này lên và sửa text đúng với thực tế web báo lỗi
    /*
    cy.contains('Shop name is required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(239, 68, 68)'); 
    */
  });
});