Cypress.on("uncaught:exception", () => false);




const SELECTORS = {
    sidebarLinks: '.sticky a[href^="#"]',
    categorySections: 'div[id].scroll-mt-\\[30vh\\]',
    subLinks: 'a[href*="/category/"]',
    loginEmail: "#email",   
    loginPass: "input[name='password']",
    loginBtn: "button[type='submit']",
    userAvatar: "span.flex.items-center.gap-1",
    breadcrumbHome: 'a[data-slot="breadcrumb-link"]' 
};

const CATEGORIES_DATA = [
    { id: 'wellness-daily', name: 'WELLNESS & DAILY' },
    { id: 'advanced-specialized-health', name: 'ADVANCED & SPECIALIZED HEALTH' },
    { id: 'longevity-health-optimization', name: 'LONGEVITY & HEALTH OPTIMIZATION' },
    { id: 'life-soft-skills', name: 'LIFE & SOFT SKILLS' },
    { id: 'body-movement', name: 'BODY & MOVEMENT' },
    { id: 'general-medicine-specializations', name: 'GENERAL MEDICINE & SPECIALIZATIONS' },
//    { id: 'weight-loss-method-review-consulting', name: 'Weight Loss Method Review & Consulting' },
    //{ id: 'coachspecialist', name: 'Coach/Specialist' },
    { id: 'beauty-skincare', name: 'BEAUTY & SKINCARE' },
    { id: 'cosmetic-aesthetic-medical', name: 'COSMETIC & AESTHETIC MEDICAL' },
    { id: 'specialized-medical-support-pharmacy', name: 'SPECIALIZED MEDICAL SUPPORT & PHARMACY' },
    { id: 'therapy-support', name: 'THERAPY & SUPPORT' },
    { id: 'pharmacy-consultant-support', name: 'PHARMACY CONSULTANT & SUPPORT' }
];

describe("StrongBody - Home & Categories Optimization", () => {
    
    const login = () => {
        cy.visit("/login");
        cy.wait(1000); 

        cy.get(SELECTORS.loginEmail).should('be.visible').type('truongthuylinh2004tb@gmail.com');
        cy.get(SELECTORS.loginPass).type('1234567l');
        cy.get(SELECTORS.loginBtn).should('be.enabled').click();

        cy.url().should('not.include', '/login');
        cy.get(SELECTORS.userAvatar, { timeout: 20000 }).should("be.visible");
    };

    beforeEach(() => {
        cy.session("login", login);
        cy.visit('/all-categories');
        cy.url().should("include", "all-categories"); 
    });

    // TỰ ĐỘNG CHỤP ẢNH KHI CÓ LỖI (Link con lỗi cũng chụp)
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            const name = this.currentTest.title.replace(/\s+/g, '_');
            cy.screenshot(`FAILED_${name}`);
        }
    });

    it('TC_01: Kiểm tra Sidebar - Cuộn và Active State', () => {
        cy.get(SELECTORS.sidebarLinks).each(($el) => {
            const href = $el.attr('href');
            const categoryName = $el.text().trim().toUpperCase();

            cy.wrap($el).click({ force: true });
            cy.url().should('include', href);
            
            cy.wrap($el).should('have.class', 'bg-[#FFEAEE]');
            cy.get(href).should('be.visible').invoke('text').then((text) => {
                expect(text.toUpperCase()).to.include(categoryName);
            });
        });
    });

    // --- TEST CASE 02 ĐÃ ĐƯỢC CHỈNH LẠI ---
    it('TC_02: Kiểm tra Breadcrumb - Điều hướng về trang Home', () => {
        cy.get(SELECTORS.breadcrumbHome)
            .contains('Home')
            .should('be.visible')
            .and('have.attr', 'href', '/');

        // Click để quay về trang chủ
        cy.get(SELECTORS.breadcrumbHome).contains('Home').click();

         cy.url().should("include", "home"); 
    });

    // --- CÁC DANH MỤC BẮT ĐẦU TỪ TC_03 ---
    CATEGORIES_DATA.forEach((cat, index) => {
        it(`TC_${index + 3}: Deep Test danh mục ${cat.name}`, () => {
            const sectionId = `#${cat.id}`;
            
            cy.get(sectionId)
                .scrollIntoView({ duration: 500, offset: { top: -100, left: 0 } })
                .should('be.visible');

            cy.get(sectionId).find(SELECTORS.subLinks).then(($links) => {
                const linkCount = $links.length;
                for (let i = 0; i < linkCount; i++) {
                    cy.get(sectionId)
                        .find(SELECTORS.subLinks)
                        .filter(':visible')
                        .eq(i)
                        .scrollIntoView({ offset: { top: -150, left: 0 } })
                        .then(($link) => {
                            const targetHref = $link.attr('href');
                            cy.wrap($link).click({ force: true });
                            cy.wait(1500); 
                            
                            cy.url().should('include', targetHref);
                            cy.go('back');
                            
                            cy.get(sectionId, { timeout: 10000 }).should('be.visible');
                        });
                }
            });

            // Click tiêu đề danh mục
            cy.get(`a[href="/category/${cat.id}"]`)
                .filter(':visible')
                .first()
                .click();

            cy.url().should('include', `/category/${cat.id}`);
            cy.get('h1, h2').invoke('text').then((text) => {
                expect(text.toUpperCase()).to.include(cat.name.toUpperCase());
            });
        });
    });
});