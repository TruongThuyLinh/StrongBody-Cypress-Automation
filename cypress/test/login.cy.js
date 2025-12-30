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
    cy.get('button[aria-label="Translate page"]').click();
// Tìm nút có chứa chữ "United States of America" và click
cy.contains('button', 'United States of America').click();
  });

 
  describe("GUI COMPONENT CHECK", () => {

    
    it("TC_01 - Kiểm tra giao diện Login đầy đủ", () => {
      cy.get('button[aria-label="Translate page"]').click();
// Tìm nút có chứa chữ "United States of America" và click
cy.contains('button', 'United States of America').click();
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
      cy.contains("Forgot Password").should("have.attr", "href");
  cy.contains("Forgot Password").click({ force: true });

  // 2️⃣ Kiểm tra URL được điều hướng đúng
  cy.url().should("include", "/forgot-password");
    });

    it("TC_06 - Nút Sign In disable khi chưa nhập đủ dữ liệu", () => {
      cy.get(signInBtn).should("be.disabled");
    });
    it("TC_07- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });

  it("TC_08 - Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  
  it("TC_09 - Chỉ một icon hiển thị tại một thời điểm (eye hoặc eye-off)", () => {

  

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
it("TC_10 - Email trống ", () => {

  cy.get(passInput).type("1234567l");
  cy.get(signInBtn) .should("be.disabled");


});
it("TC_11 - Email toàn khoảng trắng → coi như rỗng", () => {
  cy.get(emailInput).type("     "); // toàn space
  cy.get(passInput).type("1234567l");

  cy.get(emailInput)
    .invoke("val")
    .should("equal", "");

  cy.get(signInBtn).should("be.disabled");
});


it("TC_12- Nhập Email rồi xoá → hiện lỗi & nút Sign In disable", () => {

  cy.get(passInput).type("1234567l");

  // Nhập email rồi xoá
  cy.get(emailInput)
    .type("truongthuylinh2004tb@gmail.com")
    .clear();

  cy.contains(/email is required/i).should("be.visible");

  cy.get(signInBtn).should("be.disabled");

});

    it("TC_13- Email sai định dạng (thiếu @)", () => {
      cy.get(emailInput).type("abcgmail.com");
      cy.get(passInput).type("1234567l");

  cy.get(signInBtn).should("be.disabled");

      cy.contains(/invalid email/i).should("be.visible");
    });

    it("TC_14 - Email thiếu .com", () => {
      cy.get(emailInput).type("abc@gmail");
      cy.get(passInput).type("1234567l");
  cy.get(signInBtn).should("be.disabled");

      cy.contains(/invalid email/i).should("be.visible");
    });


    it("TC_15 - Email không tồn tại → mở popup OTP", () => {

  cy.get(emailInput).type("dfgvhjgh@gmail.com");
  cy.get(passInput).type("1234567l");
  cy.get(signInBtn).click();

  cy.contains("Enter Verification Code").should("be.visible");

  cy.contains("dfgvhjgh@gmail.com").should("be.visible");

  cy.get("input[inputmode='numeric']")
    .should("have.length", 4)
    .and("be.visible");

  cy.contains("Send").should("be.disabled");

  cy.contains("Resend").should("be.visible");
});
  });

  describe("PASSWORD VALIDATION", () => {

    it("TC_16 - Password trống", () => {
      cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(signInBtn).should("be.disabled");

    });
 
it("TC_17 - Password chỉ toàn khoảng trắng → không hợp lệ", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("     ");  // 5 dấu cách

   cy.get(signInBtn).click();
        cy.contains("Wrong password").should("be.visible");
});

    it("TC_18- Nhập mật khẩu rồi xoá → hiện lỗi & nút Sign In disable", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput)
    .type("1234567l")
    .clear();

  cy.contains(/password is required/i).should("be.visible");

  cy.get(signInBtn).should("be.disabled");

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
        cy.get(passInput).type("saiMatKhau");
        cy.get(signInBtn).click();
        cy.contains("Wrong password").should("be.visible");
    });
    it("TC_21 - Password có khoảng trắng → được tính là ký tự hợp lệ", () => {

  

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("123 456 7l");
  cy.get(signInBtn).click();
   cy.contains(/wrong password/i).should("be.visible");
  // Không được chuyển trang
  cy.url().should("include", "/login");;
});

    it("TC_22 - Password có khoảng trắng đầu/cuối → login thất bại", () => {
  
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("   1234567l   ");
  cy.get(signInBtn).click();
  cy.contains(/wrong password/i).should("be.visible");
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

  cy.intercept("GET", "**/o/oauth2/**").as("googleAuth");

  cy.get('button[aria-label="Continue with Google"]:visible').click();

  // Kiểm tra request tới Google OAuth được gọi
  cy.wait("@googleAuth").its("response.statusCode").should("eq", 302);
});
  
  });

});
