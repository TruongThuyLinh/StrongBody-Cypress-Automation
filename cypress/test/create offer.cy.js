Cypress.on("uncaught:exception", () => false);

describe("CREATE HEA SERVICE — FULL TESTING", () => {


 
  const login = () => {
  cy.visit("/login");
  
 
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email").focus().clear().type("liveb58966@m3player.com", { delay: 100 });

  cy.get("input[name='password']").focus().clear().type("1234567l");
  
  cy.get("button[type='submit']").should('be.enabled').click();

  cy.url().should('not.include', '/login');
  //cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
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
cy.visit("/seller/create-offer");
    cy.url({ timeout: 20000 }).should("include", "seller/create-offer");

    cy.wait(1000);
   
  });
 const customerEmailInput = "input#email";
 const projectTitleInput = "input#title";
 const fileUploadInput = "input#file-upload";
 const descriptionInput = "textarea#description";
 const createOfferBtn = "button";
 const priceInput = "input#price";
 it('TC_01:  Email để trống', () => {
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(priceInput).type("2500");
     cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Nội dung mô tả chi tiết dự án...");
    cy.contains('button', 'Create Offer').click({ force: true });
        cy.contains("Please enter at least one email").should('be.visible');

  });
it('TC_02: email sai định dạng', () => {
    cy.get(customerEmailInput).type("test-email-no-at-sign.com");
    cy.get(projectTitleInput).type("Dịch vụ Marketing");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(priceInput).type("500");
     cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
      cy.contains('button', 'Create Offer').click({ force: true });
       cy.contains("Please enter at least one email").should('be.visible');

  });
  it('TC_03:  Để trống Title', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(priceInput).type("1000");
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
     cy.contains('button', 'Create Offer').click({ force: true });
     cy.contains("Please enter offer title").should('be.visible');
  });
  it('TC_04: Nhập chỉ khoảng trắng (space) vào Title', () => {
    cy.get(customerEmailInput).type("customer@gmail.comƠ{enter}");
    cy.get(projectTitleInput).type("        "); 
    cy.get(priceInput).type("1000");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });

    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.contains('button', 'Create Offer').click({ force: true });
     cy.contains("Please enter offer title").should('be.visible');
});
it('TC_05:  Để trống Description', () => {
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");

    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(priceInput).type("1000");
   
  cy.contains('button', 'Create Offer').click({ force: true });
     cy.contains("Please enter offer description").should('be.visible');
  });
it('TC_06: Nhập chỉ khoảng trắng (space) vào Description', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(priceInput).type("1000");
    cy.get(descriptionInput).type("        ");

    cy.contains('button', 'Create Offer').click({ force: true });
     cy.contains("Please enter offer description").should('be.visible');
    });
    it('TC_07:  Để trống Price', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");

    cy.contains('button', 'Create Offer').click({ force: true });
     cy.contains("Please enter price").should('be.visible');
    });
     it('TC_08: Nhập chỉ khoảng trắng (space) vào Price', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("   ");
    cy.contains('button', 'Create Offer').click({ force: true });
    cy.contains("Please enter price").should('be.visible');
    });
    it('TC_09: Nhập số âm vào Price', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("-1000");
    cy.contains('button', 'Create Offer').click({ force: true });
    cy.get(priceInput).should('have.value', '1000');
    cy.url({ timeout: 20000 }).should("include", "/seller/offer");

    });
  it('TC_10: Nhập số chữ vào Price', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("lkjabc");
   cy.contains('button', 'Create Offer').click({ force: true });
    cy.contains("Please enter price").should('be.visible');
    });
     it('TC_11: Nhập  kí tự đăc biệt vào Price', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("-+,");
    cy.contains('button', 'Create Offer').click({ force: true });
    cy.contains("Please enter price").should('be.visible');
    });
    //  it('TC_12: up ảnh không đúng định dạng', () => {
    // cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    // cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    // cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    //   cy.get(fileUploadInput).selectFile('cypress/fixtures/fake-image.txt', { force: true });
    // cy.get(priceInput).type("1000");
    // cy.get(createOfferBtn).should('be.disabled');
    // cy.get(createOfferBtn).should('have.class', 'cursor-not-allowed');
    // });
     it('TC_13: bỏ trông check out', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("100");

    cy.get('span[role="checkbox"]').click();
    cy.get('span[role="checkbox"]').should('have.attr', 'aria-checked', 'false');  

    cy.contains('button', 'Create Offer').click({ force: true });
    cy.contains("You must accept the service commitment").should('be.visible');
  
    });
     it('TC_14: Tao offer thành công', () => {
    cy.get(customerEmailInput).type("customer@gmail.com{enter}");
    cy.get(projectTitleInput).type("Dịch vụ tư vấn giải pháp AI");
    cy.get(fileUploadInput).selectFile('cypress/fixtures/3.jpg', { force: true });
    cy.get(descriptionInput).type("Dịch vụ tư vấn chuyên nghiệp.");
    cy.get(priceInput).type("100");
    cy.wait(2000);
    cy.contains('button', 'Create Offer').click({ force: true });
    
     cy.url({ timeout: 20000 }).should("include", "/seller/offer");

    });

  });