Cypress.on("uncaught:exception", () => false);

describe("write blog", () => {
 

    const categoryInput = 'button[role="combobox"]' ;
 const titleInput = 'input[name="title"]';
    const submitBtn = 'button[type="submit"]';
    const editor = 'div[contenteditable="true"][role="textbox"]';
    const publishBtn = 'button';
 const login = () => {
  cy.visit("/login");
  
  // cy.contains('button', 'English', { timeout: 10000 })
  //   .should('be.visible')
  //   .click();

  // // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  // cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email").focus().clear().type("liveb58966@m3player.com", { delay: 100 });

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
  cy.visit("/seller/write-blog");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
    cy.url({ timeout: 20000 }).should("include", "seller/write-blog");
    
    cy.wait(1000);
  });

  it('TC_01: Không cho phép nhập quá 120 ký tự vào ô Title', () => {
   
    
    const string120Chars = 'a'.repeat(120); // Chuỗi đúng 120 ký tự
    const stringOverLimit = 'a'.repeat(121); // Chuỗi 121 ký tự

    cy.get(titleInput)
      .clear()
      .type(string120Chars);

    cy.get(titleInput)
      .should('have.value', string120Chars);
    
   
    cy.contains('120/120').should('be.visible');

    cy.get(titleInput)
      .clear()
      .type(stringOverLimit); // Cố tình nhập 121 ký tự

    
    cy.get(titleInput)
      .should('have.value', string120Chars); 
  });
  

 it('TC_02:  Title bị bỏ trống', () => {
  
    cy.intercept('GET', '**/all-categories*').as('getCategories');

    cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();

    cy.get(titleInput).clear();
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');

  });
  
 it('TC_03:  Nhập Title hợp lệ rồi xóa', () => {
  
    cy.intercept('GET', '**/all-categories*').as('getCategories');

    cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();
   
    cy.get(titleInput).type('Tiêu đề kiểm thử hợp lệ');
    cy.wait(500); 
    cy.get(submitBtn).should('not.be.disabled');

    cy.get(titleInput).clear();
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');

  });



  it('TC_04: Title chỉ chứa khoảng trắng (Space)', () => {
    cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/review1.png', { force: true });

     cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();
    

    cy.get(titleInput).clear().type('     ');
    cy.get(titleInput).blur(); 
    cy.get(submitBtn).should('be.disabled'); 

    cy.get(titleInput).clear().type('Tiêu đề hợp lệ');
    cy.get(submitBtn).should('not.be.disabled');

    cy.get(titleInput).clear().type('   '); 
    cy.wait(500);
    cy.get(submitBtn).should('be.disabled');
});

  it('TC_05: không Upload ảnh ', () => {
       
    cy.get(titleInput).type('Tiêu đề này hợp lệ nhưng chưa có ảnh');

     cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();
    cy.wait(500);
    

    // kiểm tra nút Submit có bị disable
    cy.get(submitBtn).should('be.disabled');
    
   
  });
it('TC_06:  Upload file sai định dạng (.txt)', () => {
    
    cy.get(titleInput).type('Tiêu đề cho test case sai định dạng ảnh');

    

    const invalidFileName = 'cypress/fixtures/fake-image.txt';
    cy.writeFile(invalidFileName, 'Đây là nội dung text, không phải ảnh');
    // Cố tình upload file .txt vàoô input nhận ảnh
    cy.get('#blog-thumbnail-input').selectFile(invalidFileName, { force: true });
    //  Hệ thống chặn ngay, nút Submit vẫn tối (Disabled)
    cy.get(submitBtn).should('be.disabled');

    
});
  it('TC_07: Kiểm tra chức năng nút Close (Hủy tạo bài viết)', () => {
    
  
    cy.contains('a', 'Close')
      .should('be.visible') // Đảm bảo nút đã hiện
      .click();
    // Ta kiểm tra xem URL hiện tại có chuyển về trang
    cy.url().should('include', '/seller/my-blog');

   

  });
  it('TC_08 Happy Case: Nhập dữ liệu,Upload ảnhvà Publish thành công', () => {
    
    cy.get('input[placeholder="Title"]')
      .should('be.visible')
      .clear()
      .type('Hướng dẫn sức khỏe cho người cao tuổi'); // Điền trực tiếp title

      cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/2.jpg', { force: true });

     cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();
    

    // --- 4. BẤM CONTINUE ---
    cy.contains('button', 'Continue')
      .should('not.be.disabled')
      .click();
      cy.get('div[contenteditable="true"][role="textbox"]')
      .should('be.visible')
      .click()
      .type('Đây là nội dung bài viết test chức năng Publish.{enter}Dòng thứ 2...');

cy.get('body').click(0, 0, { force: true });

    cy.contains('button', 'Publish')
      .should('be.visible')      // Đảm bảo nút đã hiện
      .should('not.be.disabled') // Đợi cho nút hết mờ (hết disabled)
      .click();
     

  });
  it('TC_09: Nút Publish phải bị disable nếu Nội dung (Description) chỉ chứa khoảng trắng', () => {
   
    cy.get('input[placeholder="Title"]').type("With a reputation like yours, not having a StrongBody-AI shop is a real oversight. If you're interested, visit my profile to grab the voucher and get started");
    
 cy.get(categoryInput).should('be.visible').first().click();
    
    cy.contains('[role="option"]', 'Senior Health').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/photo1.png', { force: true });

    cy.contains('button', 'Continue').click();

    cy.get(editor)
      .should('be.visible')
      .click()
      .type('     '); // Nhập 5 dấu cách
    
cy.get('body').click(0, 0, { force: true });

    cy.contains(publishBtn, 'Publish').should('be.disabled');

    cy.get(editor).click().type('Nội dung chuẩn chỉnh.');
cy.get('body').click(0, 0, { force: true });
    cy.contains(publishBtn, 'Publish').should('not.be.disabled');


    cy.get(editor).click().type('{selectall}{backspace}'); // Xóa sạch
    cy.get(editor).type('   '); // Nhập lại space
    cy.get('body').click(0, 0, { force: true }); // Trigger validate
    
    // Kết quả: Phải Disabled trở lại
    cy.contains(publishBtn, 'Publish').should('be.disabled');
});
  it('TC_10 Happy Case: Điền nội dung và Lưu nháp (Save Draft)', () => {
    
    // 1. Nhập Title
    cy.get('input[placeholder="Title"]')
      .should('be.visible')
      .clear()
      .type('Bài viết nháp về dinh dưỡng');

    // 2. Chọn Category (Headless UI)
     cy.get(categoryInput)
      .should('be.visible')
      .first()
      .click()
      .clear() // Xóa text cũ (nếu có) cho chắc ăn
      .type("Senior Health{enter}"); // {enter} thay thế cho việc tìm li rồi click

    cy.get(categoryInput)
      .should('have.value', 'Senior Health');

    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/photo1.png', { force: true });

    // 4. Bấm Continue sang màn soạn thảo
    cy.contains('button', 'Continue')
      .should('not.be.disabled')
      .click();

    cy.get('div[contenteditable="true"][role="textbox"]')
      .should('be.visible')
      .click()
      .type('Đây là nội dung bản nháp đang viết dở...');

    cy.get('body').click(0, 0, { force: true });


   
    cy.contains('button', 'Save Draft')
      .should('be.visible')       // Nút phải hiện ra
      .should('not.be.disabled')  // Quan trọng: Đợi nút hết mờ (disabled) mới click
      .click();

  });
 

  });


