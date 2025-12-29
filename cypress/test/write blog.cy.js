Cypress.on("uncaught:exception", () => false);

describe("write blog", () => {
 
const login = () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("liveb58966@m3player.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };
    const categoryInput = 'input[placeholder="Select category"]';
 const titleInput = 'input[name="title"]';
    const submitBtn = 'button[type="submit"]';
    const editor = 'div[contenteditable="true"][role="textbox"]';
    const publishBtn = 'button';
  // ---------------------------
  // LOGIN ONE TIME
  // ---------------------------
beforeEach(() => {
    cy.session("login", login);


    cy.url().then((url) => {
        if (!url.includes("seller/read-me")) {
            cy.log("⚠️ Không vào thẳng được Dashboard -> Phải đi từ Become Seller");
            //cy.visit("https://strongbody-web.vercel.app/become-seller");
            cy.visit("https://strongbody-web.vercel.app/buyer/dashboard");
          cy.wait(1000);
            cy.contains("Switch to Seller", { timeout: 20000 }).click({ force: true });
        }
    });

    cy.get("body", { timeout: 15000 }).should("contain", "Write a blog");
    cy.wait(500); 

    cy.contains("span", "Write a blog")
      .should("be.visible")
      .parent() // Click vào thẻ cha
      .click({ force: true });

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

    // 2. UPLOAD ẢNH (Giữ nguyên)
    cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/review1.png', { force: true });

    // Click và gõ chữ "a" để bắt buộc hệ thống tìm kiếm/tải danh mục
    cy.get(categoryInput)
      .should('be.visible')
      .first()
      .click()
      .clear() // Xóa text cũ (nếu có) cho chắc ăn
      .type("Senior Health{enter}"); // {enter} thay thế cho việc tìm li rồi click

    // (Tùy chọn) Kiểm tra xem giá trị đã được điền đúng chưa để yên tâm
    cy.get(categoryInput)
      .should('have.value', 'Senior Health');
    // A. Xóa Title -> Disabled
    cy.get(titleInput).clear();
    cy.get(submitBtn).should('be.disabled');

    // B. Nhập Title -> Enabled
    cy.get(titleInput).type('Tiêu đề kiểm thử hợp lệ');
    cy.wait(500); 
    cy.get(submitBtn).should('not.be.disabled');

    // C. Xóa Title -> Disabled
    cy.get(titleInput).clear();
    cy.get(submitBtn).should('be.disabled');
  });
  it('TC_03: Title chỉ chứa khoảng trắng (Space)', () => {
    cy.intercept('GET', '**/all-categories*').as('getCategories');

   

    cy.get('#blog-thumbnail-input').selectFile('cypress/fixtures/review1.png', { force: true });

    cy.get(categoryInput)
      .should('be.visible')
      .first()
      .click()
      .clear()
      .type("Senior Health{enter}");
    
    cy.get(categoryInput).should('have.value', 'Senior Health');

    // 3. --- KIỂM TRA LOGIC SPACE (KHOẢNG TRẮNG) ---

    // Kịch bản 1: Nhập trực tiếp khoảng trắng vào ô đang rỗng
    cy.get(titleInput).clear().type('     '); // Nhập 5 dấu cách
    cy.get(titleInput).blur(); // (Quan trọng) Click ra ngoài để kích hoạt validate nếu cần
    cy.get(submitBtn).should('be.disabled'); // Mong đợi: Vẫn bị disable

    // Kịch bản 2: Nhập đúng rồi sửa lại thành khoảng trắng (Kiểm tra tính nhất quán)
    // Bước A: Nhập đúng -> Button sáng lên
    cy.get(titleInput).clear().type('Tiêu đề hợp lệ');
    cy.get(submitBtn).should('not.be.disabled');

    // Bước B: Xóa đi và thay bằng khoảng trắng -> Button phải tối lại
    cy.get(titleInput).clear().type('   '); 
    cy.get(submitBtn).should('be.disabled');
});

  it('TC_04: không Upload ảnh ', () => {
       
    cy.get(titleInput).type('Tiêu đề này hợp lệ nhưng chưa có ảnh');

    // --- BƯỚC 2: Kiểm tra trạng thái không có ảnh ---
    cy.get('#blog-thumbnail-input').should('have.value', '');

    // kiểm tra nút Submit có bị disable
    cy.get(submitBtn).should('be.disabled');
    
   
  });
it('TC_05:  Upload file sai định dạng (.txt)', () => {
    
    cy.get(titleInput).type('Tiêu đề cho test case sai định dạng ảnh');

    cy.get(categoryInput).click().type("Senior Health{enter}");
    cy.get('body').click(0, 0); 

    const invalidFileName = 'cypress/fixtures/fake-image.txt';
    cy.writeFile(invalidFileName, 'Đây là nội dung text, không phải ảnh');
    // Cố tình upload file .txt vào ô input nhận ảnh
    cy.get('#blog-thumbnail-input').selectFile(invalidFileName, { force: true });
    //  Hệ thống chặn ngay, nút Submit vẫn tối (Disabled)
    cy.get(submitBtn).should('be.disabled');

    
});
  it('TC_06: Kiểm tra chức năng nút Close (Hủy tạo bài viết)', () => {
    
  
    cy.contains('a', 'Close')
      .should('be.visible') // Đảm bảo nút đã hiện
      .click();
    // Ta kiểm tra xem URL hiện tại có chuyển về trang
    cy.url().should('include', '/seller/my-blog');

   

  });
  it('TC_07 Happy Case: Nhập dữ liệu,Upload ảnhvà Publish thành công', () => {
    
    cy.get('input[placeholder="Title"]')
      .should('be.visible')
      .clear()
      .type('Hướng dẫn sức khỏe cho người cao tuổi'); // Điền trực tiếp title

     cy.get(categoryInput)
      .should('be.visible')
      .first()
      .click()
      .clear() // Xóa text cũ (nếu có) cho chắc ăn
      .type("Senior Health{enter}"); 

    cy.get(categoryInput)
      .should('have.value', 'Senior Health');

    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/photo1.png', { force: true }); 


    // --- 4. BẤM CONTINUE ---
    cy.contains('button', 'Continue')
      .should('not.be.disabled')
      .click();
      cy.get('div[contenteditable="true"][role="textbox"]')
      .should('be.visible')
      .click()
      .type('Đây là nội dung bài viết test chức năng Publish.{enter}Dòng thứ 2...');

    cy.get('body').click(0, 0);

    cy.contains('button', 'Publish')
      .should('be.visible')      // Đảm bảo nút đã hiện
      .should('not.be.disabled') // Đợi cho nút hết mờ (hết disabled)
      .click();
     

  });
  it('TC_08: Nút Publish phải bị disable nếu Nội dung (Description) chỉ chứa khoảng trắng', () => {
   
    cy.get('input[placeholder="Title"]').type('Tiêu đề hợp lệ cho test Space');
    
    cy.get(categoryInput).first().click().type("Senior Health{enter}");

    cy.get('input[type="file"]').selectFile('cypress/fixtures/photo1.png', { force: true });

    // 2. Bấm Continue để sang màn hình soạn thảo
    cy.contains('button', 'Continue').click();

    // Kịch bản A: Nhập toàn dấu cách vào Editor
    cy.get(editor)
      .should('be.visible')
      .click()
      .type('     '); // Nhập 5 dấu cách
    
    cy.get('body').click(0, 0);

    cy.contains(publishBtn, 'Publish').should('be.disabled');

    // A. Nhập nội dung thật -> Nút sáng lên
    cy.get(editor).click().type('Nội dung chuẩn chỉnh.');
    cy.get('body').click(0, 0); // Click ra ngoài
    cy.contains(publishBtn, 'Publish').should('not.be.disabled');


    cy.get(editor).click().type('{selectall}{backspace}'); // Xóa sạch
    cy.get(editor).type('   '); // Nhập lại space
    cy.get('body').click(0, 0); // Trigger validate
    
    // Kết quả: Phải Disabled trở lại
    cy.contains(publishBtn, 'Publish').should('be.disabled');
});
  it('TC_09 Happy Case: Điền nội dung và Lưu nháp (Save Draft)', () => {
    
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

    cy.get('body').click(0, 0);


   
    cy.contains('button', 'Save Draft')
      .should('be.visible')       // Nút phải hiện ra
      .should('not.be.disabled')  // Quan trọng: Đợi nút hết mờ (disabled) mới click
      .click();

  });
 

  });


