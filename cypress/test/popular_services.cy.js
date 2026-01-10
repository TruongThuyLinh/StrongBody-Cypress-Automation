Cypress.on("uncaught:exception", () => false);

describe("Popular Services", () => {

    const login = () => {
  cy.visit("/login");
  
  // cy.contains('button', 'English', { timeout: 10000 })
  //   .should('be.visible')
  //   .click();

  // cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
  
  cy.get("input[name='email']").focus().clear().type("truongthuylinh2004tb@gmail.com", { delay: 100 });

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
    cy.visit("/popular-services");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "popular-services");   
  });  
  it("TC_01 - Click vào tất cả các sản phẩm trong Popular Services", () => {
  cy.get('div.grid a[href*="/service/"]').then(($links) => {
    const itemCount = $links.length;

    for (let i = 0; i < itemCount; i++) {
      cy.get('div.grid a[href*="/service/"]')
        .eq(i)
        // 3️⃣ Cuộn đến đúng vị trí sản phẩm này
        .scrollIntoView({ duration: 500 }) // Thêm duration để thấy hiệu ứng cuộn mượt
        .should("be.visible")
        .click({ force: true });

      cy.wait(5000); 
      cy.url().should("include", "/service/");

      cy.go("back");
      
      // Quan trọng: Sau khi quay lại, chờ danh sách render lại rồi mới tiếp tục loop
      cy.wait(2000); 
    }
  });
});
});
