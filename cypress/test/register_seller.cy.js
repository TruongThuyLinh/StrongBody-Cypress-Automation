    Cypress.on("uncaught:exception", () => false);

describe("LOGIN PAGE TESTING — OPTIMIZED", () => {

const emailInput = 'input[name="email"]:visible';
const passInput = "input[name='password']:visible";
  
  const signUpBtn = 'button[type="submit"]:visible';

  beforeEach(() => {
  
  cy.visit("/signup?role=expert");
  cy.wait(1000);


  });


  it("TC_01 - Hiển thị đầy đủ UI", () => {
    cy.wait(2000);
  cy.get(emailInput).should("be.visible");

  cy.get(passInput).should("be.visible");
  cy.wait(500);

  //  cy.contains(/Sign up/i) 
  //     .should("be.visible")
  //     .and("not.be.disabled")
  //     .and("have.css", "background-color", "rgb(28, 144, 108)");
  
  });

 it("TC_02 - Email trống → báo lỗi", () => {
    cy.get(emailInput).type("a"); 
    cy.get(emailInput).clear(); 
    cy.get(emailInput).blur(); 

    cy.get(passInput).type("abc123456"); 
   
    cy.get(signUpBtn).contains('Sign up').click();
  
    cy.get('span.text-red-500:visible')
      .contains(/email is required/i)
      .should('be.visible');
});
it("TC_03 - Email chỉ nhập khoảng trắng → báo lỗi", () => {

  cy.get(emailInput).type("     "); // 5 dấu cách

  cy.get(passInput).type("abc12345");
 
   cy.get(signUpBtn).contains('Sign up').click();
  cy.get('span.text-red-500:visible')
      .contains(/email is required/i)
      .should('be.visible');
});

  it("TC_04 - Email sai định dạng → báo lỗi", () => {
    cy.get(emailInput).type("abc123");
    cy.get(passInput).type("abc12345");
    
     cy.get(signUpBtn).contains('Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Invalid email format/i)
      .should('be.visible');
});

 it("TC_05 - Nhập email rồi xoá → báo lỗi", () => {
  cy.get(passInput).type("abc12345");
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(emailInput).clear();
  cy.get(signUpBtn).contains('Sign up').click();

  cy.contains(/email is required|invalid email/i).should("be.visible");

  //cy.get(signUpBtn).should("be.disabled");
});


  it("TC_06- Password trống → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(signUpBtn).contains('Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password is required/i)
      .should('be.visible');
    
  });

  it("TC_07 - Password < 8 ký tự → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("a1");
    cy.get(signUpBtn).contains('Sign up').click();
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
    cy.contains(/Password must not exceed 64 characters/i).should("be.visible");

  });

  it("TC_09-Password Không có chữ cái → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("12345678");
    cy.get(signUpBtn).contains('Sign up').click();
   cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
  });

  it("TC_10-Password Không có số → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abcdefghi");
    cy.get(signUpBtn).contains('Sign up').click();
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
  cy.get(signUpBtn).contains('Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must not contain whitespace/i)
      .should('be.visible');  
});


it("TC_13 - Password hợp lệ rồi xoá để mất chữ →báo lỗi", () => {
  cy.get(emailInput).type("linh@gmail.com");
  cy.get(passInput).type("12345890bc");
  cy.get(passInput).type("{backspace}{backspace}");
 cy.get(signUpBtn).contains('Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
});

it("TC_14- Password hợp lệ rồi xoá để mất số → báo lỗi", () => {
  cy.wait(2000);
  cy.get(emailInput).type("linh@gmail.com"); 
  cy.get("input[name='password']:visible")
    .type("abcjkllk123");
  cy.get("input[name='password']:visible")
    .type("{backspace}{backspace}{backspace}");
cy.get(signUpBtn).contains('Sign up').click();
     cy.get('span.text-red-500:visible')
      .contains(/Password must contain at least 1 number/i)
      .should('be.visible');  

});

it("TC_15- Password  có khoản trắng ở giữa", () => {
    cy.wait(2000);
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("123  456  7l"); // 8 dấu cách chẳng hạn
  cy.get(signUpBtn).contains('Sign up').click();
  cy.wait(500);
  cy.contains("Password must not contain whitespace").should("be.visible"); 
    //cy.get(signUpBtn).should("be.disabled");

});
  

it("TC_16-Password nhập khoảng trắng ở đầu cuối ", () => {
  cy.wait(2000);
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  
  cy.get("input[name='password']:visible")
    .type(" 1234567l   ");
  cy.get(signUpBtn).contains('Sign up').click();
  cy.wait(500);
 cy.contains("Password must not contain whitespace").should("be.visible");
   //cy.get(signUpBtn).should("be.disabled");
});

  it("TC_19 - Tài khoản đã tồn tại", () => {
 cy.get(emailInput).type("thuylinh1020tb@gmail.com");
    cy.get(passInput).type("abc12345");
   
    cy.wait(500);
      cy.get(signUpBtn).contains('Sign up').click();
    cy.contains('h3', 'Email already exists')
      .should('be.visible')
      .and('have.class', 'text-primary');
    // Kiểm tra nội dung chi tiết trong Modal
    cy.contains('p', 'An account with this email already exists. Please sign in instead.')
      .should('be.visible');
    // // 5. Kiểm tra nút "Login" màu xanh lá trong Modal
    // cy.get('button').contains('Login')
    //   .should('be.visible')
    //   .and('have.css', 'background-color', 'rgb(0, 135, 75)');
});


  // 5️⃣ EYE ICON
  it("TC_19- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });
  

  it("TC_20- Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  });



it("TC_21- Click Sign in → Điều hướng đúng trang", () => {

  cy.get('a[href="/login"]')
  .first() 
  .click();
  cy.url({ timeout: 10000 }).should("include", "/login");

    });

 
  it("TC_23 Data hợp lệ ", () => {
    cy.wait(2000);
    const randomEmail = `linh${Date.now()}@gmail.com`;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    cy.wait(500);
    cy.get(signUpBtn).contains('Sign up').click();
     cy.url().should("include", "become-seller-steps"); 

    
  });
  it("TC_24- Data hợp lệ → nhập space đầu cuối email", () => {
     cy.wait(2000);
    const randomEmail = `    linh${Date.now()}@gmail.com   `;
    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
    cy.wait(500);
cy.get(signUpBtn).contains('Sign up').click();
     cy.url().should("include", "become-seller-steps"); });
  
   it("TC_25- Password đúng 64 ký tự → button enabled", () => {
    cy.wait(2000);
    cy.get(emailInput).type(`linh${Date.now()}@gmail.com`);
const password64 = "a1".repeat(32);
    cy.get(passInput).type(password64);
     cy.wait(500);
cy.get(signUpBtn).contains('Sign up').click();
     cy.url().should("include", "become-seller-steps"); 
    });
     it("TC_26-Role=seller_>register", () => {
    cy.get(emailInput).type("liveb58966@m3player.com");
    cy.get(passInput).type("1234567l");
    cy.get(signUpBtn).contains('Sign up').click();
    cy.wait(1000);   
     cy.contains('Login').click();
     cy.wait(2000);
    cy.get("#email").type("liveb58966@m3player.com");
    cy.get("#password").type("1234567l");
    cy.get('button[type="submit"]').contains('Sign in').click();
     cy.wait(1000);
     cy.url().should("include", "seller/read-me"); 
    
    });
     it("TC_26-Role=user->register", () => {
        
const randomEmail = `linh${Date.now()}@gmail.com`;
    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("1234567l");
    cy.get(signUpBtn).contains('Sign up').click();
    cy.wait(1000);   
     cy.contains('Login').click();
     cy.wait(2000);
    cy.get("#email").type("hirixim249@gamening.com");
    cy.get("#password").type("1234567l");
    cy.get('button[type="submit"]').contains('Sign in').click();
     cy.wait(1000);
     cy.url().should("include", "become-seller-steps"); 
    
    });


   });