Cypress.on("uncaught:exception", () => false);

describe("SIGN UP PAGE — FULL TESTING (NO OTP)", () => {


const emailInput = "input[name='email']:visible";
const passInput = "input[name='password']:visible";
  const acceptTerms  = 'input[name="acceptTerms"]';
  const signUpBtn = 'button[type="submit"]:visible';
  const googleBtn    = 'button[aria-label="Continue with Google"]';
  const facebookBtn  = 'button[aria-label="Continue with Facebook"]';
  const signInLink   = 'a[href="/login"]';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signup");
     // cy.contains('button', 'English').click();
     

  });

  const tickTerms = () => cy.get(acceptTerms).check({ force: true });

  it("TC_01 - Hiển thị đầy đủ UI", () => {
  cy.get(emailInput).should("be.visible");

  cy.get(passInput).should("be.visible");

  cy.get(acceptTerms).should("be.visible");

  cy.get(signUpBtn).should("be.visible")
    .and("not.be.disabled")
    .and("have.css", "background-color", "rgb(0, 162, 240)");

  cy.get(googleBtn).should("be.visible");
  cy.get(facebookBtn).should("be.visible");

  cy.get(signInLink).should("be.visible");
  });

 it("TC_02 - Email trống → báo lỗi", () => {
    cy.get(emailInput).type("a"); 
    cy.get(emailInput).clear(); 
    cy.get(emailInput).blur(); 

    cy.get(passInput).type("abc123456"); 
   
    tickTerms();
    cy.get('button:visible').contains('Free Sign up').click();
  
    cy.get('span.text-red-500:visible')
      .contains(/email is required/i)
      .should('be.visible');
});
it("TC_03 - Email chỉ nhập khoảng trắng → báo lỗi", () => {

  cy.get(emailInput).type("     "); // 5 dấu cách

  cy.get(passInput).type("abc12345");
  tickTerms();
   cy.get('button:visible').contains('Free Sign up').click();
  cy.get('span.text-red-500:visible')
      .contains(/email is required/i)
      .should('be.visible');
});

  it("TC_04 - Email sai định dạng → báo lỗi", () => {
    cy.get(emailInput).type("abc123");
    cy.get(passInput).type("abc12345");
    tickTerms();
     cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Invalid email format/i)
      .should('be.visible');
});

 it("TC_05 - Nhập email rồi xoá → báo lỗi", () => {
  cy.get(passInput).type("abc12345");
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  tickTerms();
  cy.get(emailInput).clear();
  cy.get('button:visible').contains('Free Sign up').click();

  cy.contains(/email is required|invalid email/i).should("be.visible");

  //cy.get(signUpBtn).should("be.disabled");
});


  it("TC_06- Password trống → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    tickTerms();
    cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password is required/i)
      .should('be.visible');
    
  });

  it("TC_07 - Password < 8 ký tự → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("a1");
    tickTerms();
    cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must be at least 8 characters/i)
      .should('be.visible');
  
  });

  it("TC_08- Password > 64 ký tự → báo lối", () => {
    cy.wait(2000);
    cy.get(emailInput).should('be.visible').clear();
    cy.get(emailInput).type("linh@gmail.com"  , { delay: 100 });
    cy.get(passInput).should('be.visible').clear();
    cy.get(passInput).type("a1".repeat(65), { delay: 100 });
    tickTerms();
    cy.contains(/Password must not exceed 64 characters/i).should("be.visible");

  });

  it("TC_09-Password Không có chữ cái → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("12345678");
    tickTerms();
   cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
  });

  it("TC_10-Password Không có số → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abcdefghi");
    tickTerms();
    cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 number/i)
      .should('be.visible');
  });
  it("TC_11- Nhập mật khẩu rồi xoá → báo lỗi", () => {
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("abc12345"); // hợp lệ ban đầu  
  cy.get(passInput).clear(); // xoá hết
  cy.contains(/password is required/i).should("be.visible");

});
it("TC_12 - Password chỉ nhập khoảng trắng → báo lỗi", () => {

  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("         "); 
  tickTerms();
  cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must not contain whitespace/i)
      .should('be.visible');  
});


it("TC_13 - Password hợp lệ rồi xoá để mất chữ →báo lỗi", () => {
  cy.get("input[name='email']:visible").type("linh@gmail.com");
  tickTerms(); 
  cy.get("input[name='password']:visible").type("12345890bc");
  cy.get("input[name='password']:visible").type("{backspace}{backspace}");
 cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
});

it("TC_14- Password hợp lệ rồi xoá để mất số → báo lỗi", () => {
  cy.wait(2000);

  cy.get("input[name='email']:visible")
    .type("linh@gmail.com");

  cy.get("input[name='password']:visible")
    .type("abcjkllk123");
   tickTerms();
  cy.get("input[name='password']:visible")
    .type("{backspace}{backspace}{backspace}");
cy.get('button:visible').contains('Free Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 number/i)
      .should('be.visible');  

});

  it("TC_15- Không tick Accept Terms → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abc12345");
    cy.get('button:visible').contains('Free Sign up').click();
    cy.contains("You must agree before signing up").should("be.visible");
  });

  it("TC_16- Tick rồi bỏ tick → báo lỗi", () => {

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

//   it("TC_19 - Click Sign in → chuyển sang Login", () => {
//   // Thêm :visible để lọc ra duy nhất 1 phần tử đang hiện trên màn hình
//   cy.get('a[href="/login"]:visible').click(); 
//   cy.wait(2000);
  
//   cy.url().should("include", "/login");
// });

it("TC_20- Click Sign in → Điều hướng đúng trang", () => {
  
cy.get('a[href="/login"]:visible').first().click();
    cy.url({ timeout: 10000 }).should("include", "/signup");
    cy.get('input[name="email"]', { timeout: 10000 }).should("be.visible");
    cy.url().should("include", "/signup");
    });

 it("TC_21- Facebook button hoạt động", () => { 
    cy.get('button[aria-label="Continue with Facebook"]:visible').click(); 
    cy.url().should("include", "facebook.com"); });

   
// it("TC_21 - Google button hoạt động và chuyển hướng đúng", () => {
//   // 1. Thiết lập chặn request
//   cy.intercept("GET", "**/o/oauth2/**").as("googleAuth");

//   // 2. Tương tác với nút Google trên StrongBody
//   cy.get('button[aria-label="Continue with Google"]:visible')
//     .should('be.visible')
//     .invoke('removeAttr', 'target') 
//     .click(); // Bỏ force:true nếu không thực sự cần thiết

//   // 3. Đợi tín hiệu gửi đi
//   cy.wait("@googleAuth", { timeout: 15000 });

//   // 4. Xử lý tại trang Google
//   // Lưu ý: Đảm bảo domain này khớp chính xác với trang bạn bị chuyển hướng tới
//   cy.origin('https://accounts.google.com', () => {
//     // Không nên thực hiện quá nhiều logic phức tạp ở đây để tránh crash stack
//     cy.url().should('include', 'oauth2');
    
//     // Sử dụng kiểm tra tồn tại thay vì be.visible nếu trang load chậm
//     cy.contains('Sign in').should('exist');
//   });
// });
  it("TC_22 Data hợp lệ ", () => {
    cy.wait(2000);
    const randomEmail = `linh${Date.now()}@gmail.com`;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    tickTerms();
    cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional
    cy.get('button:visible').contains('Free Sign up').click();
  });
  it("TC_23- Data hợp lệ → nhập space đầu cuối email", () => {
     cy.wait(2000);
    const randomEmail = `    linh${Date.now()}@gmail.com   `;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    tickTerms();

    cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional
});
  it("TC_24- Password  có khoản trắng ở giữa", () => {
    cy.wait(2000);
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("123  456  7l"); // 8 dấu cách chẳng hạn
  tickTerms();
  cy.wait(500);
  cy.contains("Password must not contain whitespace").should("be.visible");
    //cy.get(signUpBtn).should("be.disabled");

});
  

it("TC_25-Password nhập khoảng trắng ở đầu cuối ", () => {
  cy.wait(2000);
  cy.get("input[name='email']:visible")
    .type("truongthuylinh2004tb@gmail.com");

  cy.get("input[name='password']:visible")
    .type(" 1234567l   ");

 tickTerms();
 cy.contains("Password must not contain whitespace").should("be.visible");
   //cy.get(signUpBtn).should("be.disabled");
});

   it("TC_26- Password đúng 64 ký tự → button enabled", () => {
    cy.wait(2000);
    cy.get(emailInput).type(`linh${Date.now()}@gmail.com`);
const password64 = "a1".repeat(32);
    cy.get(passInput).type(password64);
    tickTerms();

     cy.wait(500);
    cy.get('button[type="submit"]:visible') .should("not.be.disabled") .and("have.css", "background-color", "rgb(0, 162, 240)"); // optional

   });

});
