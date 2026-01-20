 Cypress.on("uncaught:exception", () => false);

describe("Register Become Publisher", () => {

const emailInput = "#email";
const passInput = "input[name='password']:visible";
  
  const publishBtn  = 'button[type="submit"]:visible';
  const countryInput = 'input[placeholder="Select country"]';
  const phoneInput = 'input[name="phoneNumber"]';
  const referrerInput = '#referrer';
  beforeEach(() => {
  cy.visit("/become-publisher");
  cy.wait(1000);
  
cy.contains("Join This Campaign")
  .should("be.visible")
  .click();
  });
    it('TC_01:  Để trống trường Email->báo lỗi', () => {
    
    cy.get(emailInput).clear();

    cy.get(passInput).type('Password123!', { delay: 50 });
    
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Email is required')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
it('TC_02: Kiểm tra lỗi khi chỉ nhập khoảng trắng vào trường Email', () => {
    cy.get(emailInput).clear().type('   ');
    cy.get(passInput).type('Password123!', { delay: 50 });
    cy.get(countryInput).type('Vietnam{enter}');
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains(/Email is required|Invalid email format/i) 
      .should('be.visible')
      .and('have.class', 'text-red-500'); 

});
const invalidEmailData = [
    { email: 'plainaddress', reason: 'Không có @ và domain' },
    { email: '#@%^%#$@#$@#.com', reason: 'Chỉ chứa ký tự đặc biệt' },
    { email: '@example.com', reason: 'Thiếu phần tên người dùng' },
    { email: 'Joe Smith <email@example.com>', reason: 'Chứa khoảng trắng và ký tự lạ' },
    { email: 'email.example.com', reason: 'Thiếu ký tự @' },
    { email: 'email@example@example.com', reason: 'Dư ký tự @' }
];

invalidEmailData.forEach((data, index) => {
    it(`TC_${index + 3}: Báo lỗi Email - ${data.reason} [${data.email}]`, () => {
        // 1. Nhập email lỗi từ danh sách
        cy.get(emailInput)
          .clear()
          .type(data.email);

        // 2. Điền các trường còn lại để đảm bảo lỗi chỉ do Email
        cy.get(passInput).type('Password123!', { delay: 20 });
        cy.get(countryInput).type('Vietnam{enter}');
        cy.get(phoneInput).type('0912345678');
        
        // Nhập mã giới thiệu (nếu có)
        cy.get(referrerInput).type('REF123');

        // 3. Nhấn Submit
        cy.get(publishBtn).click();

        // 4. Kiểm tra thông báo lỗi xuất hiện
        // Sử dụng Regex để bắt cả 2 trường hợp câu chữ thường gặp
        cy.contains(/Invalid email|Please enter a valid email/i)
          .should('be.visible')
          .and('have.class', 'text-red-500'); // Kiểm tra class màu đỏ của Tailwind

        // 5. Đảm bảo vẫn ở lại trang đăng ký, không bị chuyển hướng
        cy.url().should('include', '/become-publisher');
    });
});
it("TC_09 - Nhập email rồi xoá → báo lỗi", () => {
  cy.get(passInput).type("abc12345");
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(emailInput).clear();
  cy.get(passInput).type('1234567l');
    cy.get(countryInput).type('Vietnam{enter}');
    cy.get(phoneInput).type('0912345678');
  cy.get(publishBtn).click();
  cy.contains(/email is required|invalid email/i).should("be.visible");

  //cy.get(signUpBtn).should("be.disabled");
});
it('TC_10: Tài khoản đã tồn tại -> Hiển thị Modal thông báo', () => {
    // 1. Nhập thông tin
    const existingEmail = 'truongthuylinh2004tb@gmail.com';
    cy.get(emailInput).clear().type(existingEmail);
    cy.get(passInput).type('1234567l');
    cy.get(countryInput).type('Vietnam{enter}');
    cy.get(phoneInput).type('0912345678');

    // 2. Nhấn Submit
    cy.get(publishBtn).click();

    // 3. KIỂM TRA MODAL (Sử dụng selector đặc hiệu hơn)
    // Thay vì get h2 chung chung, ta tìm h2 bên trong div có role="dialog"
    cy.get('div[role="dialog"]').within(() => {
        // Kiểm tra tiêu đề bên trong Modal
        cy.contains('h2', 'Email Already Registered').should('be.visible');

        // Kiểm tra nội dung tin nhắn
        cy.contains('p', 'This email is already associated with an account.').should('be.visible');

        // Kiểm tra 2 nút bấm
        cy.contains('button', 'Cancel').should('be.visible');
        cy.contains('button', 'Go to Sign In')
          .should('be.visible')
          // Nếu lỗi màu sắc (oklch) lại xuất hiện, bạn có thể bỏ dòng CSS color này
          .and('have.css', 'background-color', 'rgb(28, 144, 108)'); 
    });

    // 4. THỬ NGHIỆM ĐIỀU HƯỚNG
    cy.contains('button', 'Go to Sign In').click();
    cy.url().should('include', '/login');
});
  it('TC_11: Để trống trường password->báo lỗi', () => {
    
    cy.get(passInput).clear();

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Password is required')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
it('TC_12: Chỉ nhập Space vào  trường password->báo lỗi', () => {
    
    cy.get(passInput).clear().type('     ');

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Password must not contain whitespace')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
 it("TC_13 - Password < 8 ký tự → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("a1");
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Password must be at least 8 characters')
      .should('be.visible')
      .and('have.class', 'text-red-500');
  
  });

  it("TC_14- Password > 64 ký tự → báo lối", () => {
    cy.wait(2000);
    cy.get(emailInput).should('be.visible').clear();
    cy.get(emailInput).type("linh@gmail.com"  , { delay: 100 });
    cy.get(passInput).should('be.visible').clear();
    cy.get(passInput).type("a1".repeat(65), { delay: 100 });
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains(/Password must not exceed 64 characters/i).should("be.visible");

  });

  it("TC_15-Password Không có chữ cái → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("12345678");
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

     cy.contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
  });

  it("TC_16-Password Không có số → báo lỗi", () => {
    cy.get(emailInput).type("linh@gmail.com");
    cy.get(passInput).type("abcdefghi");
    cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

      cy.contains(/Password must contain at least 1 number/i)
      .should('be.visible');
  });
  it("TC_17- Nhập mật khẩu rồi xoá → báo lỗi", () => {
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");
  cy.get(passInput).type("abc12345"); // hợp lệ ban đầu  
  cy.get(passInput).clear(); // xoá hết
  cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

  cy.contains(/password is required/i).should("be.visible");

});



it("TC_18- Password hợp lệ rồi xoá để mất chữ →báo lỗi", () => {
  cy.get(emailInput).type("linh@gmail.com");

  cy.get(passInput).type("12345890bc");
  cy.get(passInput).type("{backspace}{backspace}");
 cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();
        
    cy.contains(/Password must contain at least 1 letter/i)
      .should('be.visible');
});

it("TC_19- Password hợp lệ rồi xoá để mất số → báo lỗi", () => {
  cy.wait(2000);

  cy.get(emailInput).type("linh@gmail.com");
   

  cy.get(passInput)
    .type("abcjkllk123");
 
  cy.get(passInput)
    .type("{backspace}{backspace}{backspace}");
cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();
      cy.contains(/Password must contain at least 1 number/i)
      .should('be.visible');  

});

it("TC_20- Password  có khoản trắng ở giữa", () => {
    cy.wait(2000);
  cy.get(emailInput).type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput).type("123  456  7l"); // 8 dấu cách chẳng hạn
  cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

  cy.wait(500);
  cy.contains("Password must not contain whitespace").should("be.visible"); 
    

});
  

it("TC_21-Password nhập khoảng trắng ở đầu cuối ", () => {
  cy.wait(2000);
  cy.get(emailInput)
    .type("truongthuylinh2004tb@gmail.com");

  cy.get(passInput)
    .type(" 1234567l   ");

cy.get(countryInput).type('Vietnam{enter}');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

 cy.contains("Password must not contain whitespace").should("be.visible");
   //cy.get(signUpBtn).should("be.disabled");
});
 it('TC_22: Để trống trường Country->báo lỗi', () => {
    
    cy.get(countryInput).clear();

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(passInput).type('1234567l');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Country is required')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
it('TC_23: Chỉ nhập Space vào  trường country->báo lỗi', () => {
    
    cy.get(countryInput).clear().type('     ');
    
   cy.get('body').click(0, 0, { force: true });  

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(passInput).type('1234567l');
    
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();

    cy.contains('Country is required')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});

it('TC_24: Để trống trường Phone->báo lỗi', () => {
    
    cy.get(phoneInput).clear();

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(passInput).type('1234567l');
    
   cy.get(countryInput).type('Vietnam{enter}');

    cy.get(publishBtn).click();

    cy.contains('Phone number is required')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
it('TC_25: Chỉ nhập Space vào  trường phone->báo lỗi', () => {
    
    cy.get(phoneInput).clear().type('        ');

    cy.get(emailInput).type('thuylinh@gmail.com', { delay: 50 });
    
    cy.get(passInput).type('1234567l');
    
    cy.get(countryInput).type('Vietnam{enter}');

    cy.get(publishBtn).click();

    cy.contains('Invalid phone number format')
      .should('be.visible')
      .and('have.class', 'text-red-500');
});
it("TC_26- Click icon eye để hiện mật khẩu", () => {
    cy.get(passInput).type("abc12345");
    cy.get(passInput).should("have.attr", "type", "password");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");
  });
  

  it("TC_27- Click icon eye-off để ẩn mật khẩu", () => {
    cy.get(passInput).type("abc12345");

    cy.get("svg.lucide-eye:visible").click();
    cy.get(passInput).should("have.attr", "type", "text");

    cy.get("svg.lucide-eye-off:visible").click();
    cy.get(passInput).should("have.attr", "type", "password");
  });
  it("TC_28- Data hợp lệ ", () => {
    cy.wait(2000);
    const randomEmail = `linh${Date.now()}@gmail.com`;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");

     cy.get(phoneInput).type('0912345678');
    
    cy.get(countryInput).type('Vietnam{enter}');

    cy.get(publishBtn).click();

    cy.get('div[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
        cy.contains('Complete Your Profile').should('be.visible');

        // cy.get('input[placeholder="Enter your Fullname"]')
        //     .should('be.visible')
        //     .type(fullName);

        // cy.contains('button', 'Complete').click();
    });
    
  });
  it("TC_29- Data hợp lệ → nhập space đầu cuối email", () => {
     cy.wait(2000);
    const randomEmail = `    linh${Date.now()}@gmail.com   `;

    cy.get(emailInput).type(randomEmail);
    cy.get(passInput).type("abc12345");
  
    cy.get(countryInput).type('Vietnam{enter}');
    cy.get(phoneInput).type('0912345678');

    cy.get(publishBtn).click();
    cy.get('div[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
        cy.contains('Complete Your Profile').should('be.visible');

        // cy.get('input[placeholder="Enter your Fullname"]')
        //     .should('be.visible')
        //     .type(fullName);

        // cy.contains('button', 'Complete').click();
    });
 });
  
   it("TC_30- Password đúng 64 ký tự → button enabled", () => {
    cy.wait(2000);
    cy.get(emailInput).type(`linh${Date.now()}@gmail.com`);
    const password64 = "a1".repeat(32);
    cy.get(passInput).type(password64);
    cy.get(countryInput).type('Vietnam{enter}');
    cy.get(phoneInput).type('0912345678');
    cy.get(publishBtn).click();
     cy.get('div[role="dialog"]', { timeout: 10000 }).should('be.visible').within(() => {
        cy.contains('Complete Your Profile').should('be.visible');

        // cy.get('input[placeholder="Enter your Fullname"]')
        //     .should('be.visible')
        //     .type(fullName);

        // cy.contains('button', 'Complete').click();
    });
});
   });
