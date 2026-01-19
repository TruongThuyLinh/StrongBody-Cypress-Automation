Cypress.on("uncaught:exception", () => false);

describe("Become Publisher", () => {

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
    cy.visit("/become-publisher");
cy.url({ timeout: 20000 }).should("include", "become-publisher");   
  });  
  
const SELECTORS = {
    // Sử dụng selector ngắn gọn và chính xác hơn
    becomePublisherBtn: 'button.bg-\\[\\#DA1F27\\]',
    attractSellersSection: 'div[role="button"]'
};

it("TC_01 - Kiểm tra nút Become A Publisher cuộn đến vùng Attract Sellers", () => {
    // 1. Tìm nút bằng Text để đảm bảo độ chính xác cao nhất
    cy.contains('button', /Become A Publisher/i)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // 2. Chờ section mục tiêu xuất hiện
    cy.get(SELECTORS.attractSellersSection, { timeout: 10000 })
      .should('be.visible');

    // 3. Kiểm tra xem trang có thực sự cuộn xuống không
    cy.window().then((win) => {
        expect(win.scrollY).to.be.greaterThan(0);
    });
});
});


