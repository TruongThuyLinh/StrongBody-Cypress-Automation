Cypress.on("uncaught:exception", () => false);

describe("LOGIN PAGE TESTING — OPTIMIZED", () => {

  const emailInput = "input[name='email']";
  const passInput = "input[name='password']";
  const signInBtn = "button[type='submit']";
   const googleBtn    = 'button[aria-label="Continue with Google"]';
  const facebookBtn  = 'button[aria-label="Continue with Facebook"]';
    const toggleBtn = "button:has(svg.lucide-eye, svg.lucide-eye-off)";


  beforeEach(() => {
    cy.visit("/login");
      //  cy.contains('button', 'English').click();

  });

 
  describe("GUI COMPONENT CHECK", () => {

    
    it("TC_01 - Kiểm tra giao diện Login đầy đủ", () => {
      
      cy.contains("Email").should("exist"); 
      cy.contains("Password").should("exist");
      cy.contains("Sign in").should("exist");
      cy.contains("Forgot Password").should("exist");
      cy.contains("Remember me").should("exist");
    });

    it("TC_02 - Placeholder Email hiển thị đúng", () => {
      cy.get(emailInput).should("have.attr", "placeholder", "Email");
    });

    it("TC_03 - Placeholder Password hiển thị đúng", () => {
      cy.get(passInput).should("have.attr", "placeholder", "Password");
    });
it("TC_04 - Checkbox Remember me hoạt động đúng", () => {

  cy.contains("Remember me").click({ force: true });

  // Kiểm tra UI active qua class màu đỏ
  cy.get("input[type='checkbox']")
    .should("have.class", "text-[#DA1F27]");
});


    it("TC_05 - Click Forgot Password → Điều hướng đúng trang", () => {
  cy.get('a[href="/forgot-password"]')
    .should("be.visible")
    .click();
cy.wait(1000);
  cy.url().should("include", "/forgot-password");
});

    it("TC_06- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });

  it("TC_07- Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  
  it("TC_08- Chỉ một icon hiển thị tại một thời điểm (eye hoặc eye-off)", () => {
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
});

  });

  describe(" EMAIL VALIDATION", () => {
it("TC_9- Email trống ", () => {

  cy.get(passInput).type("1234567l");
  cy.get(signInBtn).click();
  cy.contains(/email is required/i).should("be.visible");


});
it("TC_11 - Email toàn khoảng trắng → coi như rỗng", () => {
  cy.get(emailInput).type("     "); // toàn space
  cy.get(passInput).type("1234567l");

  cy.get(emailInput)
    .invoke("val")
    .should("equal", "");

  cy.get(signInBtn).click();
  cy.contains(/email is required/i).should("be.visible");
});

it("TC_12- Nhập Email rồi xoá → hiện lỗi ", () => {

  cy.get(passInput).type("1234567l");

  // Nhập email rồi xoá
  cy.get(emailInput)
    .type("truongthuylinh2004tb@gmail.com")
    .clear();

  cy.contains(/email is required/i).should("be.visible");

});

    it("TC_13- Email sai định dạng (thiếu @)", () => {
      cy.get(emailInput).type("abcgmail.com");
      cy.get(passInput).type("1234567l");
      cy.get(signInBtn).click();

      cy.contains(/invalid email/i).should("be.visible");
    });

    it("TC_14 - Email thiếu .com", () => {
      cy.get(emailInput).type("abc@gmail");
      cy.get(passInput).type("1234567l");
  cy.get(signInBtn).click();

      cy.contains(/invalid email/i).should("be.visible");
    });

it("TC_15 - Kiểm tra lỗi Email không tồn tại", () => {
 
  cy.wait(2000); 

  cy.get(emailInput).should('be.visible').clear();
  cy.get(emailInput).type("linnhc@gmail.com", { delay: 100 });

  cy.get(passInput).should('be.visible').clear();
  cy.get(passInput).type("1234567l", { delay: 100 });

  cy.get(signInBtn).should('not.be.disabled').click({ force: true });

  cy.contains("Email does not exist", { timeout: 15000 })
    .should('exist')
    .and('be.visible');
});
  });

  describe("PASSWORD VALIDATION", () => {

    it("TC_16 - Password trống->báo lỗi", () => {
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
      cy.get(signInBtn).click();

      cy.contains(/password is required/i).should("be.visible");

    });
 
it("TC_17 - Password chỉ toàn khoảng trắng → báo lỗi", () => {
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("          "); // Nhập toàn khoảng trắng

  cy.get(signInBtn).click();

  cy.contains("Password must not contain whitespace").should("be.visible");
});

    it("TC_18- Nhập mật khẩu rồi xoá → hiện lỗi ", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput)
    .type("1234567l")
    .clear();

  cy.contains(/password is required/i).should("be.visible");

});

    it("TC_19- Password > 40 ký tự", () => {
      const longPass = "a1".repeat(25); // 50 ký tự
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
      cy.get(passInput).type(longPass);
      cy.get(signInBtn).click();

      cy.contains(/password/i).should("exist");
    });

   it("TC_20-Password sai", () => {
        cy.get(emailInput).type("honganhtran.1805@gmail.com");
        cy.get(passInput).type("saiMatKhau1");
        cy.get(signInBtn).click();
        cy.contains("Wrong password").should("be.visible");
    });
    it("TC_21 - Password có khoảng trắng → báo lỗi", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("123 456 7l");
  cy.get(signInBtn).click();
   cy.contains(/Password must not contain whitespace/i).should("be.visible");
  // // Không được chuyển trang
  // cy.url().should("include", "/login");;
});

    it("TC_22 - Password có khoảng trắng đầu/cuối → login thất bại", () => {
  
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("   1234567l   ");
 cy.get(signInBtn).click();
  cy.contains(/Password must not contain whitespace/i).should("be.visible");
  // Không được chuyển trang
  cy.url().should("include", "/login");
});

  });
 
  describe(" LOGIN SUCCESS", () => {

    it("TC_23 - Đăng nhập thành công", () => {
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
      cy.get(passInput).type("1234567l");
      cy.get(signInBtn).click();
      cy.url().should("not.include", "/login");
    });
    it("TC_24 -login tài khoản peeding", () => {
      cy.get(emailInput).type("basami1492@eubonus.com");
      cy.get(passInput).type("abc12345");
      cy.get(signInBtn).click();
      cy.contains("Enter Verification Code", { timeout: 10000 }).should("be.visible");
      cy.contains("basami1492@eubonus.com").should("be.visible");
      
    });
    it("TC_24 - Email có khoảng trắng đầu/cuối → hệ thống auto trim", () => {

  cy.get(emailInput).type("   truongthuylinh2004tb@gmail.com   ");

  cy.get(passInput).type("1234567l");

  cy.get(signInBtn).click();

  // Kiểm tra login thành công
  cy.url().should("not.include", "/login");

});
it("TC_25 - Facebook button hoạt động", () => { 
    cy.get('button[aria-label="Continue with Facebook"]:visible').click(); 
    cy.url().should("include", "facebook.com"); });

it("TC_26 - Google button hoạt động", () => {
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
});