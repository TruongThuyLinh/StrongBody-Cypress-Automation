Cypress.on("uncaught:exception", () => false);

describe("LOGIN PAGE TESTING — OPTIMIZED", () => {

const emailInput = "#email";
  const passInput = "#password  ";
  const signInBtn = "button[type='submit']";
 
  

  beforeEach(() => {
  //   cy.visit("/signup");
  //   cy.contains('a', 'For Provider').click();
  //  cy.wait(1000);
  cy.visit("/become-seller ");
  cy.wait(1000);
  
cy.contains("Start Selling Now — From $15/month")
  .should("be.visible")
  .click();
  cy.wait(1000);
   cy.contains('span', 'Sign in')
    .should('be.visible')
    .click();

  });
  it("TC_01 - Checkbox Remember me hoạt động đúng", () => {

  cy.contains("Remember me").click({ force: true });

  // Kiểm tra UI active qua class màu đỏ
  cy.get("input[type='checkbox']")
    .should("have.class", "text-[#DA1F27]");
});


    it("TC_02 - Click Forgot Password → Điều hướng đúng trang", () => {
  
    cy.get('a[href="/forgot-password"]:visible').first().click();
   cy.wait(1000);
  cy.url().should("include", "/forgot-password");
});

    it("TC_03- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });

  it("TC_04- Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  
  it("TC_05- Chỉ một icon hiển thị tại một thời điểm (eye hoặc eye-off)", () => {
  cy.get("svg.lucide-eye-off").should("be.visible");
  cy.get("svg.lucide-eye").should("not.exist");
  // 2. Click → eye xuất hiện và eye-off biến mất
  cy.get(toggleBtn).click();
  cy.get("svg.lucide-eye").should("be.visible");
  cy.get("svg.lucide-eye-off").should("not.exist");
  // 3. Click lần nữa → eye-off xuất hiện lại và eye biến mất
  cy.get(toggleBtn).click();
  cy.get("svg.lucide-eye-off").should("be.visible");
  cy.get("svg.lucide-eye").should("not.exist");
});
it("TC_06 - Facebook button hoạt động", () => { 
    cy.get('button[aria-label="Continue with Facebook"]:visible').click(); 
    cy.url().should("include", "facebook.com"); });

it("TC_07- Google button hoạt động", () => {
  // 1. Sử dụng pattern rộng hơn để bắt request
  cy.intercept({
    url: /.*oauth2.*/, 
  }).as("googleAuth");

  // 2. Đảm bảo không mở tab mới
  cy.get('button[aria-label="Continue with Google"]:visible')
    .should('be.visible')
    .invoke('removeAttr', 'target') 
    .click();

    cy.wait(1000);
  // 3. Đợi và kiểm tra
  cy.wait("@googleAuth", { timeout: 10000 }).then((interception) => {
    assert.isNotNull(interception.response, "Đã bắt được request thành công");
    expect(interception.response.statusCode).to.be.oneOf([200, 302]);
  });
});
});

  describe(" EMAIL VALIDATION", () => {
it("TC_08- Email trống ", () => {

  cy.get(passInput).type("1234567l");
  cy.get(signInBtn).click();
  cy.contains(/email is required/i).should("be.visible");

});
it("TC_09- Email toàn khoảng trắng → coi như rỗng", () => {
  cy.get(emailInput).type("     "); // toàn space
  cy.get(passInput).type("1234567l");

  cy.get(emailInput)
    .invoke("val")
    .should("equal", "");

  cy.get(signInBtn).click();
  cy.contains(/email is required/i).should("be.visible");
});

it("TC_10- Nhập Email rồi xoá → hiện lỗi ", () => {

  cy.get(passInput).type("1234567l");

  // Nhập email rồi xoá
  cy.get(emailInput)
    .type("truongthuylinh2004tb@gmail.com")
    .clear();
    cy.get(signInBtn).click();

  cy.contains(/email is required/i).should("be.visible");

});

    it("TC_11- Email sai định dạng (thiếu @)", () => {
      cy.get(emailInput).type("abcgmail.com");
      cy.get(passInput).type("1234567l");
      cy.get(signInBtn).click();

      cy.contains(/invalid email/i).should("be.visible");
    });

    it("TC_12 - Email thiếu .com", () => {
      cy.get(emailInput).type("abc@gmail");
      cy.get(passInput).type("1234567l");
  cy.get(signInBtn).click();

      cy.contains(/invalid email/i).should("be.visible");
    });

it("TC_13 - Kiểm tra lỗi Email không tồn tại", () => {
 
  cy.wait(2000); 

  cy.get(emailInput).should('be.visible').clear();
  cy.get(emailInput).type("linnhcc@gmail.com", { delay: 100 });

  cy.get(passInput).should('be.visible').clear();
  cy.get(passInput).type("1234567l", { delay: 100 });

  cy.get(signInBtn).should('not.be.disabled').click({ force: true });

  cy.contains("Email does not exist", { timeout: 15000 })
    .should('exist')
    .and('be.visible');
});
  });

  describe("PASSWORD VALIDATION", () => {

    it("TC_14- Password trống->báo lỗi", () => {
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
      cy.get(signInBtn).click();

      cy.contains(/password is required/i).should("be.visible");

    });
 
it("TC_15- Password chỉ toàn khoảng trắng → báo lỗi", () => {
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("          "); // Nhập toàn khoảng trắng

  cy.get(signInBtn).click();

  cy.contains("Password must not contain whitespace").should("be.visible");
});

  it("TC_16- Nhập mật khẩu rồi xoá → hiện lỗi ", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput)
    .type("1234567l")
    .clear();

  cy.contains(/password is required/i).should("be.visible");

});

    it("TC_17- Password > 64 ký tự", () => {
      const longPass = "a1".repeat(33); // 50 ký tự
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
      cy.get(passInput).type(longPass);
      cy.get(signInBtn).click();

      cy.contains(/password/i).should("exist");
    });

   it("TC_18-Password sai", () => {
        cy.get(emailInput).type("honganhtran.1805@gmail.com");
        cy.get(passInput).type("saiMatKhau1");
        cy.get(signInBtn).click();
        cy.contains("Wrong password").should("be.visible");
    });
    it("TC_19- Password có khoảng trắng → báo lỗi", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("123 456 7l");
  cy.get(signInBtn).click();
   cy.contains(/Password must not contain whitespace/i).should("be.visible");
  
});

    it("TC_20- Password có khoảng trắng đầu/cuối → login thất bại", () => {
  
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("   1234567l   ");
 cy.get(signInBtn).click();
  cy.contains(/Password must not contain whitespace/i).should("be.visible");

});

  });
 
  describe(" LOGIN SUCCESS", () => {

    it("TC_21- Đăng nhập thành công( rolle=buyer)", () => {
      cy.get(emailInput).type("thuylinh1020tb@gmail.com");
      cy.get(passInput).type("1234567l");
      cy.get(signInBtn).click();
       cy.url().should("include", "become-seller-steps"); 
    });
    // it("TC_24 -login tài khoản peeding", () => {
    //   cy.get(emailInput).type("basami1492@eubonus.com");
    //   cy.get(passInput).type("abc12345");
    //   cy.get(signInBtn).click();
    //   cy.contains("Enter Verification Code", { timeout: 10000 }).should("be.visible");
    //   cy.contains("basami1492@eubonus.com").should("be.visible");
      
    // });
     it("TC_22- Đăng nhập thành công( rolle=seller)", () => {
      cy.get(emailInput).type("thuylinh1010@gmail.com");
      cy.get(passInput).type("1234567l");
      cy.get(signInBtn).click();
      cy.wait(2000);
       cy.url().should("include", "seller/read-me"); 
    });
    it("TC_23- Email có khoảng trắng đầu/cuối → hệ thống auto trim", () => {

  cy.get(emailInput).type("   thuylinh1020tb@gmail.com   ");

  cy.get(passInput).type("1234567l");

  cy.get(signInBtn).click();

 cy.url().should("include", "become-seller-steps"); 
});
});
});