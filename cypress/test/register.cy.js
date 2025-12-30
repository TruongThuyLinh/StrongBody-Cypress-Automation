Cypress.on("uncaught:exception", () => false);

describe("SIGN UP PAGE — FULL TESTING (NO OTP)", () => {


  const emailInput   = "input[name='email']:visible";
  const passInput    = "input[name='password']:visible";
  const acceptTerms  = 'input[name="acceptTerms"]';
  const signUpBtn    = 'button[type="submit"]';
  const googleBtn    = 'button[aria-label="Continue with Google"]';
  const facebookBtn  = 'button[aria-label="Continue with Facebook"]';
  const signInLink   = 'a[href="/login"]';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://strongbody-web.vercel.app/signup");
  });

  const tickTerms = () => cy.get(acceptTerms).check({ force: true });

  it("TC_01 - Hiển thị đầy đủ UI", () => {
    cy.get('button[aria-label="Translate page"]').click();
// Tìm nút có chứa chữ "United States of America" và click
cy.contains('button', 'United States of America').click();
    cy.get(emailInput).should("be.visible");
    cy.get(passInput).should("be.visible");
    cy.get(acceptTerms).should("be.visible");
    cy.get(signUpBtn).should("be.visible").and("be.disabled");

    cy.get(googleBtn).should("be.visible");
    cy.get(facebookBtn).should("be.visible");
    cy.get(signInLink).should("be.visible");
  });

  it("TC_02 - Email trống → button disabled", () => {
     cy.get(passInput).type("abc123"); tickTerms(); 
     cy.get(signUpBtn).should("be.disabled"); 
    });
it("TC_03 - Email chỉ nhập khoảng trắng → button disabled", () => {

  cy.get(emailInput).type("     "); // 5 dấu cách

  cy.get(passInput).type("abc12345");

  tickTerms();
  cy.get(emailInput)
    .invoke("val")
    .should("equal", "");

  cy.get(signUpBtn).should("be.disabled");
});



  it("TC_04 - Email sai định dạng → button disabled", () => {
    cy.get(emailInput).type("abc123");
    cy.get(passInput).type("abc12345");
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });
 it("TC_05 - Nhập email rồi xoá → hiện lỗi & nút disabled", () => {

  cy.get(passInput).type("abc12345");

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(emailInput).clear();

  cy.contains(/email is required|invalid email/i).should("be.visible");

  cy.get(signUpBtn).should("be.disabled");
});


  it("TC_06- Password trống → button disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });

  it("TC_07 - Password < 3 ký tự → disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("a1");
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });

  it("TC_08- Password > 40 ký tự → disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("a1".repeat(30));
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });

  it("TC_09-Password Không có chữ cái → disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("12345678");
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });

  it("TC_10-Password Không có số → disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abcdefghi");
    tickTerms();
    cy.get(signUpBtn).should("be.disabled");
  });
  it("TC_11- Nhập mật khẩu rồi xoá → hiện lỗi & nút disable", () => {
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("abc12345"); // hợp lệ ban đầu  
  cy.get(passInput).clear(); // xoá hết

  cy.contains(/password is required/i).should("be.visible");
  cy.get(signUpBtn).should("be.disabled");
});
it("TC_12 - Password chỉ nhập khoảng trắng → hiển thị lỗi & nút disable", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("         "); 
  cy.get(signUpBtn).should("be.disabled");
  
});


it("TC_13 - Password hợp lệ rồi xoá để mất chữ → hiện lỗi & nút disabled", () => {
  cy.get("input[name='email']:visible").type("linh@gmail.com");
  tickTerms(); 
  cy.get("input[name='password']:visible").type("12345890bc");

  cy.get("input[name='password']:visible").type("{backspace}{backspace}{backspace}{backspace}");

 cy.get('span.text-red-500') 
  .filter(':visible')       
  .should('contain', 'Min 8 characters');
  cy.get(signUpBtn).should("be.disabled");
});

it("TC_14- Password hợp lệ rồi xoá để mất số → hiện lỗi & nút disabled", () => {

  cy.get("input[name='email']:visible")
    .type("linh@gmail.com");

  cy.get("input[name='password']:visible")
    .type("abc12345");
 tickTerms();
  cy.get("input[name='password']:visible")
    .type("{backspace}{backspace}{backspace}{backspace}{backspace}");
cy.get('span.text-red-500') // Tìm chính xác thẻ màu đỏ
  .filter(':visible')       
  .should('contain', 'Min 8 characters');
  // Kiểm tra nút Submit
  cy.get(signUpBtn).should("be.disabled");

});

  it("TC_15- Không tick Accept Terms → disabled", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abc12345");
    cy.get(signUpBtn).should("be.disabled");
  });

  it("TC_16- Tick rồi bỏ tick → lỗi & nút disabled", () => {

  const randomEmail = `linh${Date.now()}@gmail.com`;

  cy.intercept("POST", "/api/verify-email-domain").as("verifyEmail");

  cy.get(emailInput).type(randomEmail);
  cy.wait("@verifyEmail");

  cy.get(passInput).type("abc12345");

  cy.get('label:has(input[name="acceptTerms"])')
    .filter(":visible")
    .click({ force: true });

  cy.get('label:has(input[name="acceptTerms"])')
    .filter(":visible")
    .click({ force: true });
  cy.wait(300);
  // Nút disabled lại
  cy.get(signUpBtn).should("be.disabled");
  // Lỗi phải hiển thị
  cy.contains("You must agree before signing up").should("be.visible");
});
  // 5️⃣ EYE ICON
  it("TC_17- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });

  it("TC_18- Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  });

  it("TC_19 - Click Sign in → chuyển sang Login", () => {
    cy.get('a[href="/login"]:visible').click(); cy.url().should("include", "/login");
  });

 it("TC_20- Facebook button hoạt động", () => { 
    cy.get('button[aria-label="Continue with Facebook"]:visible').click(); 
    cy.url().should("include", "facebook.com"); });

    it("TC_21- Google button hoạt động", () => {

  cy.intercept("GET", "**/o/oauth2/**").as("googleAuth");

  cy.get('button[aria-label="Continue with Google"]:visible').click();

  cy.wait("@googleAuth").its("response.statusCode").should("eq", 302);
});

// it("TC_22- Provider điều hướng đúng", () => {
//  cy.visit("/signup?role=user");

//   // 1. Accept cookies (bắt buộc)
//   cy.contains("Accept").click({ force: true });

//   // 2. Click provider desktop
//   cy.get('a[href="/signup?role=expert"]')
//     .filter(":visible")
//     .click({ force: true });

//   // 3. Verify URL
//   cy.url().should("include", "/signup?role=expert");
// });


  it("TC_22 Data hợp lệ → button enabled", () => {
    const randomEmail = `linh${Date.now()}@gmail.com`;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    tickTerms();

    cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional
  });
  it("TC_23- Data hợp lệ →nhập space đầu cuối email", () => {
    const randomEmail = `  linh${Date.now()}@gmail.com  `;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    tickTerms();

    cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional
  });
  it("TC_24- Password  có khoản trắng ở giữa", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("123  456  7l"); // 8 dấu cách chẳng hạn
  tickTerms();
  cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)");
});
  

it("TC_25-Password nhập khoảng trắng ở đầu cuối ", () => {
  cy.get("input[name='email']:visible")
    .type("truongthuylinh2004tb@gmail.com");

  cy.get("input[name='password']:visible")
    .type(" 1234567l   ");

 tickTerms();
     cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)");

});
  it("TC_26- Password đúng 40 ký tự → button enabled", () => {
    cy.get(emailInput).type(`linh${Date.now()}@gmail.com`);
    const valid40 = "abc123abc123abc123abc123abc123abc123ab";
    cy.get(passInput).type(valid40);
    tickTerms();

    cy.wait(500);
   cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional
  });

});
