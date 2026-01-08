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
  it('TC_02:  Chuyển hướng đến trang All Categories khi click Hea Category trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/all-categories"]')
    .filter(':visible')
    .should('contain', 'Categories')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/all-categories');

});
it('TC_03: Chuyển hướng đến trang Request Product khi click từ Product Collections trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/products"]')
    .filter(':visible')
    .should('contain', 'Product Collections')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/products');

});
it('TC_04: Chuyển hướng đến trang multimeappt khi click  StrongBody & Multime AI trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/multimeapp"]')
    .filter(':visible')
    .should('contain', 'StrongBody & Multime AI')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/multimeapp');

});
it('TC_05: Chuyển hướng đến trang Trans Your Voice khi click Trans Your Voice trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/trans-your-voice"]')
    .filter(':visible')
    .should('contain', 'Trans Your Voice')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/trans-your-voice');

});
it('TC_06: Chuyển hướng đến trang popular ervices khi click  Popular Hea trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/popular-services"]')
    .filter(':visible')
    .should('contain', 'Popular Hea')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/popular-services');

});
it('TC_07: Chuyển hướng đến trang Expert directory khi click Expert directory trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/featured-experts"]')
    .filter(':visible')
    .should('contain', 'Expert directory')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/featured-experts');

});
it('TC_08: Chuyển hướng đến trang Success Stories khi click Success Stories trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/success-stories"]')
    .filter(':visible')
    .should('contain', 'Success Stories')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/success-stories');

});
it('TC_09: Chuyển hướng đến trang How it works khi click How it works trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/how-it-work"]')
    .filter(':visible')
    .should('contain', 'How it works')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/how-it-work');

});
it('TC_10: Chuyển hướng đến trang Solutions for Buyerkhi click Solutions for Buyer trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/solutions-for-buyer"]')
    .filter(':visible')
    .should('contain', 'Solutions for Buyer')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/solutions-for-buyer');

});
it('TC_11: Chuyển hướng đến trang Trust & Safety khi click Trust & Safety trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/articles/trust-safety"]')
    .filter(':visible')
    .should('contain', 'Trust & Safety')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/articles/trust-safety');

});
it('TC_12: Chuyển hướng đến trang Verification Guide khi click Verification Guide trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/articles/verification-guide"]')
    .filter(':visible')
    .should('contain', 'Verification Guide')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/articles/verification-guide');

});
it('TC_13: Chuyển hướng đến trang Payment Protection khi click Payment Protection trong footer', () => {

  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  cy.get('footer a[href="/secure-payment-protect"]')
    .filter(':visible')
    .should('contain', 'Payment Protection')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/secure-payment-protect');

});
it('TC_14: Chuyển hướng đến trang Help center khi click Help center trong footer', () => {
  // Cuộn xuống footer để các phần tử hiển thị (tránh lỗi lazy load)
  cy.scrollTo('bottom');
  
  // Tìm thẻ 'a' trong footer có chứa chữ 'Help center'
  cy.get('footer').contains('a', 'Help center').click();

  cy.url().should('include', '/contact');
});
it('TC_15: Chuyển hướng đến trang Become Publisher khi click Become Publisher trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/become-publisher"]')
    .filter(':visible')
    .should('contain', 'Become Publisher')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/become-publisher');
});
it('TC_16: Chuyển hướng đến trang Become a Provider khi click Become a Provider trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/become-seller"]')
    .filter(':visible')
    .should('contain', 'Become a Provider')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/become-seller');
});
it('TC_17: Chuyển hướng đến trang Affiliate Dashboard khi click Affiliate Dashboard trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/affiliate/introduction"]')
    .filter(':visible')
    .should('contain', 'Affiliate Dashboard')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/affiliate/introduction');
});
it('TC_18: Chuyển hướng đến trang What is Hea khi click What is Hea trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/what-is-hea"]')
    .filter(':visible')
    .should('contain', 'What is Hea')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/what-is-hea');
});
it('TC_19: Chuyển hướng đến trang About Us khi click About Us trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/about-us"]')
    .filter(':visible')
    .should('contain', 'About Us')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/about-us');
});
it('TC_20: Chuyển hướng đến trang Get Inspired khi click Get Inspired trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/well-ness-global-get-inspired-hea"]')
    .filter(':visible')
    .should('contain', 'Get Inspired')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/well-ness-global-get-inspired-hea');
});
it('TC_21: Chuyển hướng đến trang Blog & News khi click Blog & News trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/blogs"]')
    .filter(':visible')
    .should('contain', 'Blog & News')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/blogs');
});
it('TC_22: Chuyển hướng đến trang Terms of Service  khi click Terms of Service trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/articles/terms-and-conditions"]')
    .filter(':visible')
    .should('contain', 'Terms of Service')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/articles/terms-and-conditions');
});
it('TC_23: Chuyển hướng đến trang Terms of Service  khi click Terms of Service  trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/articles/terms-and-conditions"]')
    .filter(':visible')
    .should('contain', 'Terms of Service')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/articles/terms-and-conditions');
});
it('TC_24: Chuyển hướng đến trang Privacy Policy khi click Privacy Policy trong footer', () => {
  cy.scrollTo('bottom');
  cy.get('footer a[href="/articles/privacy-policy"]')
    .filter(':visible')
    .should('contain', 'Privacy Policy')
    .click({ force: true }); // Dùng force nếu có element overlay che khuất
  cy.url().should('include', '/articles/privacy-policy');
});
it('TC_25: Chuyển hướng đến trang Contact us khi click Contact us trong footer', () => {
  cy.scrollTo('bottom');

  // Tìm trong footer, lấy thẻ 'a' có nội dung là 'Contact us'
  cy.get('footer').contains('a', 'Contact us').click({ force: true });

  cy.url().should('include', '/contact');
});
});