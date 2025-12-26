Cypress.on("uncaught:exception", () => false);

describe("Post Request", () => {

  const descriptionInput = 'textarea#description';
const CategoryDropdown = '#categoryId';
  const fileInput = 'input#file-upload';
  const agreeInput = 'input[name="agree"]';

  const login = () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("truongthuylinh2004tb@gmail.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };

  // ---------------------------
  // BEFORE EACH TEST
  // ---------------------------
  beforeEach(() => {
   
  cy.session("login", () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();

    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  });

    cy.visit("https://strongbody-web.vercel.app/create-request");

  });

  // ------------------------unhappy----------------------- 

it('TC_01: để trống Mô tả (Description), các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: ĐỂ TRỐNG MÔ TẢ ---
    // Không nên viết liền .clear().should(...). Hãy tách ra để Cypress truy vấn lại (re-query)
    cy.get(descriptionInput).clear(); 
    cy.get(descriptionInput).should('have.value', ''); 

    // --- BƯỚC 2: ĐIỀN HỢP LỆ CÁC TRƯỜNG CÒN LẠI ---
    
    // 2.1. Chọn Category
    // Tách click và type để tránh lỗi khi dropdown render lại
    cy.get(CategoryDropdown).click();
    cy.get(CategoryDropdown).type('MedSupport{enter}'); 
    cy.get('body').click(0, 0, { force: true });  
    // 2.2. Upload File
    cy.get(fileInput).selectFile('cypress/fixtures/photo1.png', { force: true });

    // 2.3. Check vào điều khoản
    cy.get(agreeInput).check({ force: true });
    // Tách dòng kiểm tra check
    cy.get(agreeInput).should('be.checked');

    // --- BƯỚC 3: CLICK NÚT SUBMIT ---
    // Nên dùng force: true nếu nút bị che khuất bởi các thành phần render chậm
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ ---
    
    // Đảm bảo URL thay đổi hoặc giữ nguyên đúng kỳ vọng
    cy.url().should('include', '/create-request');

    // Quan trọng: Đợi thông báo lỗi xuất hiện
    // Nếu trang load lại, lệnh cy.contains sẽ tự động tìm lại trong DOM mới
    //cy.contains('Description is required', { timeout: 10000 }).should('be.visible'); 
});
  it('TC_02:  chỉ nhập space  Mô tả (Description), các trường khác hợp lệ', () => {
    
   // --- BƯỚC 1: NHẬP SPACE VÀO MÔ TẢ ---
  // Tách riêng clear và type để Cypress lấy lại element mới sau khi re-render
  cy.get(descriptionInput).clear();
  
  // Lấy lại element một lần nữa trước khi type
  cy.get(descriptionInput).type('           ', { delay: 50 });
    // 2.1. Chọn Category hợp lệ (Ví dụ: Yoga)
     cy.get(CategoryDropdown)
      .click()
      .type('MedSupport{enter}'); // Nhập và Enter để chọn
      cy.get('body').click(0, 0, { force: true });  

    // 2.3. Check vào điều khoản
    cy.get(agreeInput)
      .check()
      .should('be.checked');

    // --- BƯỚC 3: CLICK NÚT SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });


    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    
    // 4.1. Form KHÔNG được gửi thành công (Vẫn ở trang hiện tại)
    cy.url().should('include', '/create-request');
     
     cy.contains('Description is required').should('be.visible'); 
  });
  it('TC_03: nhập Mô tả 9 ký tự (nhỏ hơn Minlength)', () => {
    
    const invalidText = '123456789'; 
    cy.get('#description').clear();
    cy.get('#description')
      .type(invalidText)
      .blur(); 
    cy.get('#categoryId').click();
    cy.get('#categoryId').type('MedSupport{enter}'); 
    cy.get('body').click(0, 0, { force: true });
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    cy.url().should('include', '/create-request');
    cy.contains('Description must be at least 10 characters', { timeout: 10000 })
      .should('be.visible'); 
});
 it('TC_04: Kiểm tra khi nhập mô tả  quá 5000 ký tự ', () => {
    
    const maxLength = 5000;
    const overLimitText = 'a'.repeat(maxLength + 1); 
    cy.get(descriptionInput)
      .clear()
      .type(overLimitText, { delay: 0 }); 
     
     cy.get(CategoryDropdown)
      .click()
      .type('MedSupport{enter}'); // Nhập và Enter để chọn
      cy.get('body').click(0, 0, { force: true });
    cy.contains('button', 'Find My Team & Get Quotes').click();
    cy.url().should('include', '/create-request');

    // - (Tùy chọn) Kiểm tra text lỗi
    cy.contains('Description must be at most 5000 characters').should('be.visible');

  });
 it('TC_05: bỏ trống Danh mục (Category), các trường khác hợp lệ', () => {
    
    cy.get('#description').clear();
    cy.get('#description').type('Tôi muốn tìm lớp học boxing tại Hà Nội.', { delay: 30 });
    cy.get('#categoryId')
      .should('be.visible')
      .and('contain', 'Select your focus area'); // Kiểm tra chữ mặc định khi chưa chọn
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('input[type="checkbox"]').should('be.checked');
-
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });
        cy.url().should('include', '/create-request');
    
});

  it('TC_06: Chỉ nhập khoảng trắng vào Category', () => {
    
    cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    cy.get('#categoryId')
      .click()
      .type('     ', { delay: 0 }); // Nhập khoảng trắng
        cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    cy.url().should('include', '/create-request');

    cy.contains('Category is required', { timeout: 10000 }).should('be.visible');
});
it('TC_07: bỏ trống checkbox agree', () => {
    
  cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
    cy.get('body').click(0, 0, { force: true });  

    cy.get('input[type="checkbox"]')
      .as('termsCheckbox') // Đặt bí danh để dễ truy vấn lại
      .should('be.checked') // Xác nhận trạng thái mặc định (nếu có)
      .uncheck({ force: true }) // Bỏ chọn
      .should('not.be.checked'); // Xác nhận đã bỏ chọn thành công
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });
    cy.url().should('include', '/create-request');
    cy.contains('You must agree to the terms', { timeout: 10000 })
      .should('be.visible');
});
  // ------------------------happy case----------------------- 

  it('TC_08: Gửi thành công khi nhập đúng 5000 ký tự (Max Length)', () => {
    const maxLength = 5000;
    const validMaxText = 'a'.repeat(maxLength);
    cy.get('#description').clear();
        cy.get('#description')
      .type(validMaxText, { delay: 0, parseSpecialCharSequences: false });

    cy.get('#categoryId').click();
    cy.contains('MedSupport').click();
     cy.get('body').click(0, 0, { force: true });  
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    cy.url({ timeout: 20000 }).should('include', '/create-request/success');

    // 4.2. Kiểm tra các thông báo thành công hiển thị
   // cy.contains('Submission successful!', { timeout: 10000 }).should('be.visible');
   // cy.contains('Request posted successfully').should('be.visible');

    // 4.3. Kiểm tra nút điều hướng (Lưu ý: Bạn hãy kiểm tra lại chữ 'Manager' hay 'Manage')
    //cy.contains('Manage requests').should('be.visible'); 
});

  it('TC_09: 10 < Gửi yêu cầu thành công < 5000 và các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM do React re-render
    cy.get('#description').clear(); // Sử dụng ID chuẩn
    cy.get('#description')
      .type('Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.', { delay: 20 });

    // --- BƯỚC 2: CHỌN CATEGORY ---
    // #categoryId là một button, nên click rồi chọn nội dung thay vì dùng .type()
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
   
   cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    cy.get('input[type="checkbox"]').check({ force: true }); // Dùng force: true để vượt qua các lớp phủ

    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // 6.2. Kiểm tra Thông báo Toast
   // cy.contains('Request posted successfully', { timeout: 10000 })
      //.should('be.visible');

    // 6.3. Kiểm tra Tiêu đề chính
   // cy.contains('Submission successful!')
     // .should('be.visible');
      
    // 6.4. Kiểm tra nội dung phụ
    //cy.contains('Congratulations! Your request has been submitted successfully')
     // .should('be.visible');
});
  it('TC_10: Gửi yêu cầu thành công khi nhập đúng 10 ký tự (Min Length)', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ (VỪA ĐỦ 10 KÝ TỰ) ---
    // Tách clear() và type() để tránh lỗi Detached DOM
    cy.get('#description').clear();
    cy.get('#description')
      .type('Tôi muốn t', { delay: 20 }); // "Tôi muốn t" đúng 10 ký tự
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
    cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    cy.contains('Submission successful!').should('be.visible');
});
it('TC_11: Nhập space đầu và cuối cho dữ liệu hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ CÓ KHOẢNG TRẮNG ---
    cy.get('#description').clear();
    cy.get('#description')
      .type('   Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.   ', { delay: 0 });

    // --- BƯỚC 2: CHỌN CATEGORY ---
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
     cy.get('body').click(0, 0, { force: true });  

    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 3: CLICK SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA MÀN HÌNH SUCCESS ---
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // Kiểm tra các thông báo thành công
   // cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
    //cy.contains('Submission successful!').should('be.visible');
    //cy.contains('Congratulations! Your request has been submitted successfully').should('be.visible');
});
});
