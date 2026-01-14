Cypress.on("uncaught:exception", () => false);

describe("Home", () => {

    const login = () => {
  cy.visit("/login");
  
  // cy.contains('button', 'English', { timeout: 10000 })
  //   .should('be.visible')
  //   .click();

  // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  //cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
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
      // Kiểm tra xem có bất kỳ cookie nào chứa 'session-token' không
      cy.getCookies().then((cookies) => {
        const hasSession = cookies.some(c => c.name.includes('session-token'));
        if (!hasSession) {
          throw new Error("Session không tồn tại hoặc đã hết hạn");
        }
      });
    },
  });
    cy.visit("/home");
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
  cy.contains('a', 'Build Provider Shop')
    .filter(':visible')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true }); 
  cy.url().should('include', '/become-seller');
 // cy.contains('Become a Seller', { timeout: 10000 }).should('be.visible');
});
it("TC_07  - Duyệt và kiểm tra tất cả các thẻ dịch vụ trong mục Suggest For You", () => {
  // 1. Lấy tổng số lượng thẻ dịch vụ có trong grid
  cy.get('div.grid a[href*="/service/"]').then(($links) => {
    const itemCount = $links.length;
    cy.log(`Tổng số dịch vụ tìm thấy: ${itemCount}`);
    for (let i = 0; i < itemCount; i++) {
      // 2. TRUY VẤN LẠI phần tử ở mỗi vòng lặp để tránh lỗi "stale element"
      cy.get('div.grid a[href*="/service/"]')
        .eq(i)
        .scrollIntoView({ duration: 300, offset: { top: -100, left: 0 } })
        .should("be.visible")
        .click({ force: true });
        cy.wait(4000); 
      // 3. Kiểm tra URL đã chuyển hướng đúng định dạng /service/...
      cy.url().should("include", "/service/");
    
      cy.get('body').should('not.be.empty'); 
      cy.go("back");
      cy.get('div.grid', { timeout: 15000 }).should('be.visible');
      cy.wait(1000); 
    }
  });
});
const SELECTORS = {
    nextPageBtn: 'button[aria-label="Next page"]',
    // Giả sử bạn có một danh sách sản phẩm hoặc số trang để kiểm tra sau khi click
    productItem: '.product-card', 
    pageActiveNumber: '.active-page-class' 
};
// it("TC_03 - Kiểm tra nút Next Page chuyển sang trang tiếp theo thành công", () => {
//     cy.get(SELECTORS.nextPageBtn)
//         .scrollIntoView()
//         .should('be.visible')
//         .and('not.be.disabled'); 

  
//     cy.get(SELECTORS.nextPageBtn).click();

   
//     cy.url().should('include', 'page=');

//    // cy.get(SELECTORS.productItem, { timeout: 10000 }).should('be.visible');

   
// });
});