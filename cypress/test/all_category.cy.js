Cypress.on("uncaught:exception", () => false);

// Khai báo Constants ở đầu để dùng chung cho các test case
const ALL_SIDEBAR_LINKS = '.sticky a[href^="#"]';
const LOGIN_EMAIL = "bibise1388@crsay.com";
const LOGIN_PW = "1234567l";

describe("StrongBody - Home & Categories", () => {
  const login = () => {
    cy.visit("/login");
    cy.contains('button', 'English', { timeout: 10000 }).should('be.visible').click();
    cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
    cy.wait(2000); 

    cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
    cy.get("input[name='email']").focus().clear().type(LOGIN_EMAIL, { delay: 100 });
    cy.get("input[name='password']").focus().clear().type(LOGIN_PW);
    cy.get("button[type='submit']").should('be.enabled').click();

    cy.url().should('not.include', '/login');
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };

  beforeEach(() => {
    cy.session("login", login, {
      validate() {
        cy.getCookies().then((cookies) => {
          const hasSession = cookies.some(c => c.name.includes('session-token'));
          if (!hasSession) throw new Error("Session không tồn tại");
        });
      },
    });
    cy.visit("/all-categories");
    cy.url({ timeout: 20000 }).should("include", "all-categories"); 
  });

  it('TC_01: Kiểm tra chuyển hướng cuộn trang cho tất cả categories', () => {
    cy.get(ALL_SIDEBAR_LINKS).then(($links) => {
      cy.log(`Tổng số danh mục: ${$links.length}`);

      cy.wrap($links).each(($el, index) => {
        const href = $el.attr('href');
        const categoryName = $el.text().trim().toUpperCase();

        cy.log(`Kiểm tra mục ${index + 1}: ${categoryName}`);
        cy.wrap($el).first().click({ force: true });

        cy.url().should('include', href);
        cy.wrap($el).first()
          .should('have.attr', 'aria-current', 'true')
          .and('have.class', 'bg-[#FFEAEE]'); //

        cy.get(href).should('be.visible').then(($section) => {
          const sectionText = $section.text().toUpperCase();
          expect(sectionText).to.include(categoryName);
        });
        cy.wait(300); 
      });
    }); 
  }); 

  it('TC_02: Chuyển hướng đến trang chi tiết Wellness & Daily khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/wellness-daily"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()  
    .click();

  cy.url().should('include', '/category/wellness-daily');
  cy.get('h1').should('be.visible').and('contain', 'WELLNESS & DAILY');
});
it('TC_03: Chuyển hướng đến trang chi tiết ADVANCED & SPECIALIZED HEALTH khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/advanced-specialized-health"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/advanced-specialized-health');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'ADVANCED & SPECIALIZED HEALTH');
});
it('TC_04: Chuyển hướng đến trang chi tiết LONGEVITY & HEALTH OPTIMIZATION khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/longevity-health-optimization"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/longevity-health-optimization');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'LONGEVITY & HEALTH OPTIMIZATION');


}); 
it('TC_05: Chuyển hướng đến trang chi tiết LIFE & SOFT SKILLS khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/life-soft-skills"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/life-soft-skills');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'LIFE & SOFT SKILLS');
});
it('TC_06: Chuyển hướng đến trang chi tiết BODY & MOVEMENT khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/body-movement"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/body-movement');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'BODY & MOVEMENT');
});
it('TC_07: Chuyển hướng đến trang chi tiết GENERAL MEDICINE & SPECIALIZATIONS khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/general-medicine-specializations"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/general-medicine-specializations');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'GENERAL MEDICINE & SPECIALIZATIONS');
});

it('TC_08: Chuyển hướng đến trang chi tiếtWeight Loss Method Review & Consulting khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/weight-loss-method-review-consulting"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/weight-loss-method-review-consulting');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'Weight Loss Method Review & Consulting');
});
it('TC_09: Chuyển hướng đến trang chi tiết Coach/Specialist khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/coachspecialist"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/coachspecialist');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'Coach/Specialist');
});
it('TC_10: Chuyển hướng đến trang chi tiết COSMETIC & AESTHETIC MEDICAL khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/cosmetic-aesthetic-medical"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/cosmetic-aesthetic-medical');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'COSMETIC & AESTHETIC MEDICAL');
});
it('TC_11: Chuyển hướng đến trang chi tiết SPECIALIZED MEDICAL SUPPORT & PHARMACY khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/specialized-medical-support-pharmacy"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/specialized-medical-support-pharmacy');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'SPECIALIZED MEDICAL SUPPORT & PHARMACY');
});
it('TC_12: Chuyển hướng đến trang chi tiết THERAPY & SUPPORT khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/therapy-support"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/therapy-support');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'THERAPY & SUPPORT');
});
it('TC_13: Chuyển hướng đến trang chi tiết PHARMACY CONSULTANT & SUPPORT khi click vào tiêu đề danh mục', () => {
  cy.get('a[href="/category/pharmacy-consultant-support"]')
    .filter(':visible') 
    .first()
    .scrollIntoView()   
    .click();
  cy.url().should('include', '/category/pharmacy-consultant-support');

  cy.get('h1, h2')
    .filter(':visible')
    .should('contain', 'PHARMACY CONSULTANT & SUPPORT');
});

it('TC_04: Click vào tất cả các link con của từng danh mục', () => {
  const MAIN_SECTIONS = 'div[id].scroll-mt-\\[30vh\\]'; 
  const SUB_LINKS_SELECTOR = 'a[href*="/category/"]';

  // 1. Lấy danh sách các Section
  cy.get(MAIN_SECTIONS).then(($sections) => {
    const sectionCount = $sections.length;

    for (let sIndex = 0; sIndex < sectionCount; sIndex++) {
      // 2. Lấy lại ID của section để truy vấn mới hoàn toàn
      cy.get(MAIN_SECTIONS).eq(sIndex).then(($currSection) => {
        const sectionId = $currSection.attr('id');
        
        // 3. Đếm số lượng link con trong section này
        cy.get(`#${sectionId}`).find(SUB_LINKS_SELECTOR).then(($links) => {
          const linkCount = $links.length;
          cy.log(`Section ${sectionId} có ${linkCount} links`);

          for (let lIndex = 0; lIndex < linkCount; lIndex++) {
            // QUAN TRỌNG: Truy vấn lại từ đầu ở mỗi lần lặp
            cy.get(`#${sectionId}`)
              .find(SUB_LINKS_SELECTOR)
              .filter(':visible') // Tránh click nhầm bản mobile ẩn
              .eq(lIndex)
              .then(($link) => {
                const targetHref = $link.attr('href');
                cy.log(`Đang click link: ${targetHref}`);

                // 4. Thực hiện click
                cy.wrap($link).click({ force: true });

                // 5. Kiểm tra URL và quay lại
                cy.url().should('include', targetHref);
                cy.go('back');

                // 6. Đợi trang chủ ổn định trước khi tiếp tục
                cy.get(`#${sectionId}`, { timeout: 10000 }).should('be.visible');
              });
          }
        });
      });
    }
  });
});
});
