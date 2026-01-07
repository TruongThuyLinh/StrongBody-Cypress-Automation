    Cypress.on("uncaught:exception", () => false);

Cypress.on("uncaught:exception", () => false);

describe("Home", () => {

    const login = () => {
  cy.visit("/login");
  
  cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
  
  cy.get("input[name='email']").focus().clear().type("bibise1388@crsay.com", { delay: 100 });

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
 it('TC_01: Kiểm tra tất cả các link trong footer không bị lỗi 404', () => {
    // Lấy tất cả các thẻ <a> trong footer
    cy.get('footer a').each(($el) => {
      const linkText = $el.text();
      const href = $el.prop('href');

      // Bỏ qua các link trống hoặc link '#'
      if (href && !href.includes('#')) {
        cy.request(href).its('status').should('eq', 200); // Kiểm tra link còn sống (Status 200)
        cy.log(`Link "${linkText}" hoạt động tốt: ${href}`);
      }
    });
  });
//   it('TC_02: Nên chuyển hướng đến trang All Categories khi click từ Footer', () => {

//   // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
//   cy.scrollTo('bottom');
//   cy.get('footer a[href="/all-categories"]')
//     .filter(':visible')
//     .should('contain', 'Categories')
//     .click({ force: true }); // Dùng force nếu có element overlay che khuất
//   cy.url().should('include', '/all-categories');

//   // 5. Kiểm tra tiêu đề trang mới để xác nhận đã load xong
//   cy.contains('All Categorie', { timeout: 10000 }).should('be.visible');
// });
});