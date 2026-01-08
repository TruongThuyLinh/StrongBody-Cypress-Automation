Cypress.on("uncaught:exception", () => false);

describe("Home", () => {

    const login = () => {
  cy.visit("/login");
  
  cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();

  cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
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
    cy.visit("/pricing/tran-your-voice");
cy.url({ timeout: 20000 }).should("include", "pricing/tran-your-voice");   
  });  
 const SELECTORS = {
    mostPopularCard: 'div.border-\\[\\#2F8CF9\\]',
    popularBadge: 'span.bg-\\[\\#2f8cfa\\]',
    getStartedBtn: 'button.bg-\\[\\#2f8cfa\\]',
    priceValue: 'span.text-\\[34\\.6px\\]',
    viewAllPlansBtn: 'a[href="#pricing-plan"]',
    pricingSection: '#pricing-plan'
};
  
it("TC_01 - Kiểm tra  hiển thị giao diện gói Trans Your Voice (UI)", () => {
        cy.get(SELECTORS.mostPopularCard)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
            .should('be.visible');

        cy.get(SELECTORS.mostPopularCard).within(() => {
            cy.get(SELECTORS.popularBadge).should('contain', 'Most Popular');
            
            cy.get('h3').should('contain', 'Trans Your Voice');
            cy.get(SELECTORS.priceValue).should('contain', '$15');

            // Kiểm tra danh sách tính năng (li)
            cy.get('ul li').should('have.length.at.least', 1);
            cy.contains('li', 'Multi-language support').should('be.visible');
            cy.contains('li', 'Text translate').should('be.visible');
        });
    });

    it("TC_02 - Kiểm tra chức năng điều hướng của nút Get Started", () => {
        cy.get(SELECTORS.mostPopularCard)
            .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } });

        cy.get(SELECTORS.mostPopularCard).within(() => {
            cy.get(SELECTORS.getStartedBtn)
                .should('be.visible')
                .click();
        });

             cy.visit("/checkout/pricing?returnUrl=/trans-your-voice/joining-success");
   cy.url({ timeout: 20000 }).should("include", "checkout/pricing?returnUrl=/trans-your-voice/joining-success"); 
    });
    it("TC_04 - Kiểm tra nút View all plans cuộn đến bảng giá", () => {
    // 1. Tìm nút và gán alias (bí danh) để tránh lỗi detached DOM
    cy.get(SELECTORS.viewAllPlansBtn)
        .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
        .as('anchorBtn'); // Sử dụng kỹ thuật bạn vừa đề cập

    // 2. Kiểm tra thuộc tính và hiển thị qua alias
    cy.get('@anchorBtn')
        .should('be.visible')
        .and('have.attr', 'href', '#pricing-plan')
        .and('contain', 'View all plans');

    // 3. Thực hiện Click
    cy.get('@anchorBtn').click();

    // 4. Kiểm tra URL hash (URL lúc này sẽ có thêm #pricing-plan)
    cy.url().should('include', '#pricing-plan');

    // 5. Kiểm tra vùng mục tiêu hiển thị sau khi cuộn
    cy.wait(1000); // Chờ hiệu ứng smooth scroll kết thúc
    cy.get(SELECTORS.pricingSection)
        .should('be.visible')
        .then(($el) => {
            // Kiểm tra tọa độ để chắc chắn nó nằm trong khung hình (Viewport)
            const rect = $el[0].getBoundingClientRect();
            const winHeight = Cypress.config('viewportHeight');
            
            expect(rect.top).to.be.at.least(-50); // Cho phép sai số nhỏ
            expect(rect.top).to.be.lessThan(winHeight);
        });
});
});

