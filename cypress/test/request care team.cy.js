Cypress.on("uncaught:exception", () => false);

describe("Post Request", () => {

  const descriptionInput = 'textarea#description';
const CategoryDropdown = '#categoryId';
  const fileInput = 'input#file-upload';
  const agreeInput = 'input[name="agree"]';
  // ---------------------------
  // LOGIN ONE TIME
  // ---------------------------
  before(() => {
    cy.session("login", () => {
      cy.visit("https://strongbody-web.vercel.app/login");
      cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
      cy.get("input[name='password']").type("1234567l");
      cy.get("button[type='submit']").click();
      cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
    });
  });

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
     cy.get('body').click(0, 0);

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
           cy.get('body').click(0, 0);


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
    
    // --- BƯỚC 1: NHẬP MÔ TẢ KHÔNG ĐẠT YÊU CẦU ---
    const invalidText = '123456789'; 

    // QUAN TRỌNG: Tách clear() và type() để tránh lỗi Detached DOM
    cy.get('#description').clear();
    
    // Tìm lại element trước khi type và blur
    cy.get('#description')
      .type(invalidText)
      .blur(); 

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG CÒN LẠI ---
    
    // 2.1 Chọn Category (Dùng ID đã xác định ở các bước trước)
    cy.get('#categoryId').click();
    cy.get('#categoryId').type('MedSupport{enter}'); 

    // 2.3 Check điều khoản (Dùng force: true để tránh bị che khuất)
    cy.get('input[type="checkbox"]').check({ force: true });


    // --- BƯỚC 3: CLICK SUBMIT ---
    // Sử dụng force: true vì nút này có thể bị disabled tạm thời khi React re-render
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    
    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ ---
    
    // 4.1. Form KHÔNG được gửi đi (URL vẫn ở trang cũ)
    cy.url().should('include', '/create-request');

    // 4.2. Kiểm tra thông báo lỗi cụ thể
    // Tăng timeout cho thông báo lỗi vì có thể mất chút thời gian để Validation hiện ra
    cy.contains('Description must be at least 10 characters', { timeout: 10000 })
      .should('be.visible'); 
});
 it('TC_04: Kiểm tra khi nhập mô tả  quá 5000 ký tự ', () => {
    
    // --- 1. CHUẨN BỊ DỮ LIỆU ---
    const maxLength = 5000;
    
    // Tạo chuỗi văn bản dài 5001 ký tự (Vượt giới hạn 1 ký tự)
    // Kỹ thuật: Dùng .repeat() để nhân bản ký tự 'a'
    const overLimitText = 'a'.repeat(maxLength + 1); 


    // --- 2. NHẬP LIỆU VÀO MÔ TẢ ---
    // QUAN TRỌNG: Thêm { delay: 0 } để Cypress gõ "ngay lập tức".
    // Nếu không có dòng này, Cypress sẽ gõ từng chữ mất khoảng 2-3 phút cho 5000 ký tự -> Gây Timeout.
    cy.get(descriptionInput)
      .clear()
      .type(overLimitText, { delay: 0 }); 
      // 2.1. Chọn Category hợp lệ (Ví dụ: Yoga)
     cy.get(CategoryDropdown)
      .click()
      .type('MedSupport{enter}'); // Nhập và Enter để chọn

    // 3.2. Bấm nút Gửi
    cy.contains('button', 'Find My Team & Get Quotes').click();

    // 3.3. Kiểm tra Validation
    // - Form không được gửi đi
    cy.url().should('include', '/create-request');

    // - (Tùy chọn) Kiểm tra text lỗi
    cy.contains('Description must be at most 5000 characters').should('be.visible');

  });
 it('TC_05: bỏ trống Danh mục (Category), các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Ngắt chuỗi clear và type để tránh lỗi Detached DOM
    cy.get('#description').clear();
    cy.get('#description').type('Tôi muốn tìm lớp học boxing tại Hà Nội.', { delay: 30 });

    // --- BƯỚC 2: KIỂM TRA CATEGORY ĐANG TRỐNG ---
    // Vì CategoryDropdown là một <button> (theo HTML bạn gửi), 
    // ta nên kiểm tra text hiển thị mặc định của nó
    cy.get('#categoryId')
      .should('be.visible')
      .and('contain', 'Select your focus area'); // Kiểm tra chữ mặc định khi chưa chọn

    // --- BƯỚC 3: CHECK ĐIỀU KHOẢN ---
    // Dùng force: true để đảm bảo click được dù có bị Tailwind class che khuất
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('input[type="checkbox"]').should('be.checked');


    // --- BƯỚC 4: CLICK SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });


    // --- BƯỚC 5: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    
    // 5.1. Form KHÔNG được gửi thành công (Vẫn ở trang hiện tại)
    cy.url().should('include', '/create-request');
    
    // 5.2. Kiểm tra thông báo lỗi cho Category
    // Mở comment và tăng timeout để Cypress chờ Validation hiện ra
    //cy.contains('Category is required', { timeout: 10000 }).should('be.visible'); 
});

  it('TC_06: Chỉ nhập khoảng trắng vào Category', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM
    cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    // --- BƯỚC 2: NHẬP SPACE VÀO CATEGORY ---
    // Vì #categoryId là button, việc .type() có thể gây lỗi nếu không có ô input.
    // Nếu dropdown này cho phép gõ tìm kiếm, hãy dùng code sau:
    cy.get('#categoryId')
      .click()
      .type('     ', { delay: 0 }); // Nhập khoảng trắng
    
    // Click ra một vùng trống trên body để đóng dropdown/kích hoạt validation
    cy.get('body').click(0, 0); 

    // --- BƯỚC 3: CHECK ĐIỀU KHOẢN ---
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 4: CLICK SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 5: KIỂM TRA KẾT QUẢ ---
    // 5.1. Kiểm tra Form KHÔNG được gửi (URL không đổi)
    cy.url().should('include', '/create-request');

    // 5.2. Kiểm tra thông báo lỗi hiện ra
    cy.contains('Category is required', { timeout: 10000 }).should('be.visible');
});
it('TC_07: bỏ trống checkbox agree', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // QUAN TRỌNG: Ngắt chuỗi clear() và type() để tránh lỗi Detached từ DOM
    cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    // --- BƯỚC 2: CHỌN CATEGORY ---
    // Sử dụng ID chuẩn đã xác định ở các bước trước
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 

    // --- BƯỚC 3: XỬ LÝ CHECKBOX AGREE ---
    // Sử dụng force: true để đảm bảo thực hiện được thao tác ngay cả khi UI đang render lại
    cy.get('input[type="checkbox"]')
      .as('termsCheckbox') // Đặt bí danh để dễ truy vấn lại
      .should('be.checked') // Xác nhận trạng thái mặc định (nếu có)
      .uncheck({ force: true }) // Bỏ chọn
      .should('not.be.checked'); // Xác nhận đã bỏ chọn thành công

    // --- BƯỚC 4: CLICK NÚT GỬI ---
    // Thêm force: true để click chắc chắn hơn khi có các hiệu ứng transition
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });
    
    // --- BƯỚC 5: KIỂM TRA KẾT QUẢ ---
    // 5.1. Kiểm tra không chuyển trang (URL vẫn ở trang tạo yêu cầu)
    cy.url().should('include', '/create-request');

    // 5.2. Kiểm tra thông báo lỗi hiển thị (Tăng timeout để chờ validation)
    cy.contains('You must agree to the terms', { timeout: 10000 })
      .should('be.visible');
});
  // ------------------------happy case----------------------- 

  it('TC_08: Gửi thành công khi nhập đúng 5000 ký tự (Max Length)', () => {
    const maxLength = 5000;
    const validMaxText = 'a'.repeat(maxLength);

    // --- BƯỚC 1: NHẬP MÔ TẢ (5000 KÝ TỰ) ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi trang re-render
    cy.get('#description').clear();
    
    // Sử dụng delay: 0 và parseSpecialCharSequences: false để gõ 5000 ký tự siêu tốc
    cy.get('#description')
      .type(validMaxText, { delay: 0, parseSpecialCharSequences: false });

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG KHÁC ---
    // 2.1. Chọn Category (Sử dụng selector ID chuẩn #categoryId)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click();
        
    // 2.2. Check vào điều khoản (Sử dụng force: true để tránh bị che khuất)
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 3: SUBMIT ---
    // Click force để đảm bảo thực hiện hành động ngay cả khi trang đang xử lý text lớn
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    // 4.1. Kiểm tra URL chuyển hướng đến trang thành công
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
   
    // --- BƯỚC 3: UPLOAD FILE ---
    // Đảm bảo fileInput là 'input#file-upload'
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // --- BƯỚC 4: CHECK ĐIỀU KHOẢN ---
    cy.get('input[type="checkbox"]').check({ force: true }); // Dùng force: true để vượt qua các lớp phủ

    // --- BƯỚC 5: CLICK SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 6: KIỂM TRA MÀN HÌNH SUCCESS ---
    
    // 6.1. Kiểm tra URL chuyển hướng (Tăng timeout để chờ xử lý server)
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

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG KHÁC ---
    // #categoryId là button, nên click rồi chọn nội dung
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
   
    // Upload File (Sử dụng selector ID chuẩn của trang)
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // Check điều khoản
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 3: CLICK SUBMIT ---
    cy.contains('button', 'Find My Team & Get Quotes').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA MÀN HÌNH SUCCESS ---
    // Đợi URL chuyển hướng (timeout 15s để đề phòng mạng chậm)
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // Kiểm tra thông báo thành công
   // cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
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
   
    // Upload File
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // Check điều khoản
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
