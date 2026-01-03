Cypress.on("uncaught:exception", () => false);

describe("Post Request", () => {
  const descriptionInput = 'textarea[name="description"]';
  const CategoryDropdown = 'input[placeholder="Select categories"]';
  const fileInput = 'input#file-upload';
  const agreeInput = 'input[name="agree"]';

  

  const login = () => {
  cy.visit("https://strongbody-web.vercel.app/login");
  
  cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("input[name='email']", { timeout: 15000 }).should('be.visible');
  
  cy.get("input[name='email']").focus().clear().type("liveb58966@m3player.com", { delay: 100 });

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
    cy.visit("https://strongbody-web.vercel.app/products");
  
    cy.wait(1000);

  });

it('TC_01: để trống Mô tả (Description), các trường khác hợp lệ', () => {
    
    
    cy.get(descriptionInput).clear();
    cy.get(descriptionInput).should('have.value', '');

     cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
    cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

   
    cy.get('input[type="checkbox"]').check({ force: true });

    
    cy.contains('button', 'Post request').click({ force: true });

    cy.url().should('include', '/products');
     

});
 it('TC_02: chỉ nhập space Mô tả (Description), các trường khác hợp lệ', () => {
    cy.get(descriptionInput)
      .clear()
      .type('       ') 
      .should('have.value', '       '); 

    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
    cy.get('body').click(0, 0, { force: true });  
    
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });
    
    cy.contains('Description is required', { timeout: 10000 }).should('be.visible'); 
});

  it('TC_03: nhập Mô tả 9 ký tự (nhỏ hơn Minlength)', () => {
    

    const invalidText = '123456789'; 

    cy.get(descriptionInput).clear();
    
   
    cy.get(descriptionInput)
      .type(invalidText)
      .blur(); // Tab ra ngoài để kích hoạt validation

   
    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 

       cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });

    cy.url().should('include', '/products');
    cy.contains('Description must be at least 10 characters', { timeout: 10000 })
      .should('be.visible'); 
});
  it('TC_04: Kiểm tra khi nhập mô tả quá 5000 ký tự', () => {
    
    const maxLength = 5000;
    const overLimitText = 'a'.repeat(maxLength + 1); // 5001 ký tự

  
    cy.get(descriptionInput).clear();
        cy.get(descriptionInput)
      .type(overLimitText, { delay: 0, parseSpecialCharSequences: false }); 
      cy.get(CategoryDropdown).click();
      cy.contains('Career Mentoring & Guidance').click();

        cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });

    cy.url().should('include', '/products');

    cy.contains('Description must be at most 5000 characters', { timeout: 10000 })
      .should('be.visible');
});
  it('TC_05:  bỏ trống Danh mục (Category), các trường khác hợp lệ', () => {
    
    cy.get(descriptionInput)
      .type('Tôi muốn tìm lớp học boxing tại Hà Nội.');

    cy.get(CategoryDropdown)
      .should('have.value', ''); 
    cy.get('body').click(0, 0, { force: true });  

  
    cy.get(agreeInput)
      .check()
      .should('be.checked');

    cy.contains('button', 'Post request').click();

    cy.url().should('include', '/products')
     
     //cy.contains('Category is required').should('be.visible');
    
  });

  it('TC_06: Chỉ nhập khoảng trắng vào Category', () => {
    
    cy.get(descriptionInput).clear();
    cy.get(descriptionInput).type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });
    cy.get(CategoryDropdown)
      .click()
      .type('     '); // Nhập 5 dấu cách

       cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });

    cy.url().should('include', '/products');
    
    //cy.contains('Category is required', { timeout: 10000 }).should('be.visible');
});
 it('TC_07: bỏ trống checkbox agree', () => {
 
    cy.get(descriptionInput).clear();
    cy.get(descriptionInput).type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

     cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 

        cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]')
      .should('be.checked')      // Đảm bảo trạng thái mặc định (nếu có)
      .uncheck({ force: true })  // Thao tác BỎ CHỌN
      .should('not.be.checked'); // Xác nhận đã bỏ chọn thành công

    cy.contains('button', 'Post request').click({ force: true });

    cy.url().should('include', '/products');

    cy.contains('You must agree to the terms', { timeout: 10000 }).should('be.visible');
});
  // ------------------------happy case----------------------- 

  it('TC_08: Gửi thành công khi nhập đúng 5000 ký tự (Max Length)', () => {
    const maxLength = 5000;
    const validMaxText = 'a'.repeat(maxLength);

    cy.get(descriptionInput).clear();
        cy.get(descriptionInput)
      .type(validMaxText, { delay: 0, parseSpecialCharSequences: false });

    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
        
       cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]').check({ force: true });

    
    cy.contains('button', 'Post request').click({ force: true });

   
    cy.url({ timeout: 20000 }).should('include', '/create-request/success');

    
    cy.contains('Submission successful!', { timeout: 10000 }).should('be.visible');
    cy.contains('Request posted successfully').should('be.visible');

    
    cy.contains('Manage requests').should('be.visible'); 
});
  it('TC_09: 10 < Gửi yêu cầu thành công < 5000 và các trường khác hợp lệ', () => {


    cy.get(descriptionInput).clear(); // Sử dụng ID chuẩn từ Inspect
    cy.get(descriptionInput).type('Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.', { delay: 20 });

    
    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
   
       cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });


    
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    
    cy.contains('Request posted successfully', { timeout: 10000 }) 
      .should('be.visible');

   
    cy.contains('Submission successful!') 
      .should('be.visible');
      
    
    cy.contains('Congratulations! Your request has been submitted successfully')
      .should('be.visible');
});
  it('TC_10: Gửi yêu cầu thành công khi nhập đúng 10 ký tự (Min Length)', () => {
    
    cy.get(descriptionInput).clear(); 
    
  
    cy.get(descriptionInput)
      .type('Tôi muốn t', { delay: 20 }); // "Tôi muốn t" là đúng 10 ký tự

    
    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
       cy.get('body').click(0, 0, { force: true });  
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Post request').click({ force: true });

    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

  
    cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
    cy.contains('Submission successful!').should('be.visible');
      
    // 4.3. Kiểm tra nội dung phụ
    cy.contains('Congratulations! Your request has been submitted successfully').should('be.visible');
});
  it('TC_11: Nhập space đầu và cuối cho dữ liệu hợp lệ', () => {
    
   
    cy.get(descriptionInput).clear();
    cy.get(descriptionInput)
      .type('   Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.   ', { delay: 0 });

   
    cy.get(CategoryDropdown).click();
    cy.contains('Career Mentoring & Guidance').click(); 
       cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

  
    cy.get('input[type="checkbox"]').check({ force: true });

   
    cy.contains('button', 'Post request').click({ force: true });

    
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
    cy.contains('Submission successful!').should('be.visible');
    cy.contains('Congratulations! Your request has been submitted successfully').should('be.visible');
});
});
