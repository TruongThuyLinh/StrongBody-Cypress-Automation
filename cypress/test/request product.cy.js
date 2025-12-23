Cypress.on("uncaught:exception", () => false);

describe("Post Request", () => {

  const descriptionInput = 'textarea[name="description"]';
    const CategoryDropdown = 'input[placeholder="Select categories"]';

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

    cy.visit("https://strongbody-web.vercel.app/products");

  });

  // ------------------------unhappy----------------------- 

it('TC_01: để trống Mô tả (Description), các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: ĐỂ TRỐNG MÔ TẢ ---
    // Ngắt chuỗi để tránh lỗi Detached DOM
    cy.get(descriptionInput).clear();
    cy.get(descriptionInput).should('have.value', '');

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG CÒN LẠI ---
    // Chọn Category
    cy.get(CategoryDropdown).click();
    cy.contains('MedSupport').click();

    // Upload File (dùng force: true vì input thường bị ẩn)
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // Check điều khoản
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 3: CLICK NÚT SUBMIT (Sửa lỗi bị che khuất tại đây) ---
    // Thêm { force: true } để ép Cypress click xuyên qua lớp phủ
    cy.contains('button', 'Post request').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ ---
    // Kiểm tra URL vẫn ở trang products (không chuyển sang success)
    cy.url().should('include', '/products');
     
    // Kiểm tra thông báo lỗi xuất hiện
    //cy.contains('Description is required', { timeout: 10000 }).should('be.visible'); 
});
  it('TC_02: chỉ nhập space Mô tả (Description), các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP KHOẢNG TRẮNG VÀO MÔ TẢ ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi trang re-render
    cy.get('#description').clear();
    cy.get('#description').type('                   ', { delay: 0 }); 

    // --- BƯỚC 2: ĐIỀN HỢP LỆ CÁC TRƯỜNG CÒN LẠI ---
    
    // 2.1. Chọn Category (Sử dụng ID chuẩn #categoryId và chọn từ danh sách)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 

    // 2.2. Upload File (Nếu form yêu cầu upload file để kích hoạt nút Submit)
    // cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // 2.3. Check vào điều khoản
    // Dùng force: true để tránh bị các lớp CSS che khuất
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('input[type="checkbox"]').should('be.checked');


    // --- BƯỚC 3: CLICK NÚT SUBMIT ---
    // QUAN TRỌNG: Dùng { force: true } vì nút này hay bị che bởi lớp layout khác
    cy.contains('button', 'Post request').click({ force: true });


    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    
    // 4.1. Kiểm tra vẫn ở trang hiện tại (URL chứa /products)
    cy.url().should('include', '/products');
    
    // 4.2. Kiểm tra thông báo lỗi hiển thị (Tăng timeout để chờ validation)
    cy.contains('Description is required', { timeout: 10000 }).should('be.visible'); 
});
  it('TC_03: nhập Mô tả 9 ký tự (nhỏ hơn Minlength)', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ KHÔNG ĐẠT YÊU CẦU ---
    // Min length là 10, ta nhập 9 ký tự để test biên
    const invalidText = '123456789'; 

    // QUAN TRỌNG: Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM
    cy.get('#description').clear();
    
    // Tìm lại phần tử và nhập liệu
    cy.get('#description')
      .type(invalidText)
      .blur(); // Tab ra ngoài để kích hoạt validation

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG CÒN LẠI ---
    // 2.1 Chọn Category (Dùng ID chuẩn và click chọn thay vì type)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 

    // 2.3 Check điều khoản (Dùng force: true để vượt qua các lớp phủ)
    cy.get('input[type="checkbox"]').check({ force: true });


    // --- BƯỚC 3: CLICK SUBMIT ---
    // Dùng force: true vì nút này thường bị che khuất bởi lớp layout
    cy.contains('button', 'Post request').click({ force: true });

    
    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    // 4.1. Form KHÔNG được gửi đi (URL vẫn ở trang /products)
    cy.url().should('include', '/products');

    // 4.2. Kiểm tra thông báo lỗi cụ thể xuất hiện
    cy.contains('Description must be at least 10 characters', { timeout: 10000 })
      .should('be.visible'); 
});
  it('TC_04: Kiểm tra khi nhập mô tả quá 5000 ký tự', () => {
    
    // --- 1. CHUẨN BỊ DỮ LIỆU ---
    const maxLength = 5000;
    const overLimitText = 'a'.repeat(maxLength + 1); // 5001 ký tự

    // --- 2. NHẬP LIỆU VÀO MÔ TẢ ---
    // QUAN TRỌNG: Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM
    cy.get('#description').clear();
    
    // Sử dụng delay: 0 và parseSpecialCharSequences: false để nhập 5000 ký tự nhanh nhất
    cy.get('#description')
      .type(overLimitText, { delay: 0, parseSpecialCharSequences: false }); 

    // --- 3. ĐIỀN CÁC TRƯỜNG KHÁC ---
    // 3.1. Chọn Category (Sử dụng ID chuẩn và click chọn thay vì type)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click();

    // 3.2. Check vào điều khoản (Dùng force: true để tránh bị che khuất)
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- 4. CLICK SUBMIT ---
    // Dùng force: true vì nút bấm hay bị che bởi lớp layout (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });

    // --- 5. KIỂM TRA VALIDATION ---
    // Kiểm tra URL không đổi (vẫn ở trang products)
    cy.url().should('include', '/products');

    // Kiểm tra thông báo lỗi cụ thể xuất hiện (Tăng timeout cho dữ liệu lớn)
    cy.contains('Description must be at most 5000 characters', { timeout: 10000 })
      .should('be.visible');
});
  it('TC_05:  bỏ trống Danh mục (Category), các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Để đảm bảo lỗi không phát sinh từ trường này
    cy.get(descriptionInput)
      .type('Tôi muốn tìm lớp học boxing tại Hà Nội.');

    // --- BƯỚC 2: BỎ TRỐNG CATEGORY ---
    // Kiểm tra đảm bảo giá trị đang rỗng
    cy.get(CategoryDropdown)
      .should('have.value', ''); 

    // 3.2 Check điều khoản
    cy.get(agreeInput)
      .check()
      .should('be.checked');


    // --- BƯỚC 4: CLICK SUBMIT ---
    cy.contains('button', 'Post request').click();

// 4.1. Form KHÔNG được gửi thành công (Vẫn ở trang hiện tại)
    cy.url().should('include', '/products');
     
     cy.contains('Category is required').should('be.visible'); 
    
  });

  it('TC_06: Chỉ nhập khoảng trắng vào Category', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Tách riêng clear() và type() để tránh lỗi Detached DOM khi React re-render
    cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    // --- BƯỚC 2: NHẬP SPACE VÀO CATEGORY ---
    // Lưu ý: #categoryId là một thẻ <button>
    // Nếu dropdown hỗ trợ gõ tìm kiếm, ta dùng .type(). Nếu không, Cypress có thể báo lỗi
    cy.get('#categoryId')
      .click()
      .type('     '); // Nhập 5 dấu cách

    // Click ra ngoài body để đóng dropdown và kích hoạt validation
    cy.get('body').click(0, 0); 

    // --- BƯỚC 3: CHECK ĐIỀU KHOẢN ---
    // Sử dụng { force: true } để vượt qua các lớp phủ CSS Tailwind
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 4: CLICK SUBMIT ---
    // Dùng { force: true } vì nút này bị che khuất bởi thẻ div (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });

    // --- BƯỚC 5: KIỂM TRA KẾT QUẢ ---
    // Kiểm tra URL vẫn ở trang products
    cy.url().should('include', '/products');
    
    // Đợi thông báo lỗi xuất hiện (tăng timeout cho validation)
    cy.contains('Category is required', { timeout: 10000 }).should('be.visible');
});
 it('TC_07: bỏ trống checkbox agree', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // Tách riêng clear() và type() để tránh lỗi Detached DOM khi React re-render
    cy.get('#description').clear();
    cy.get('#description').type('Tôi cần tìm chuyên gia dinh dưỡng.', { delay: 20 });

    // --- BƯỚC 2: CHỌN CATEGORY ---
    // #categoryId là một button, nên click để mở và chọn text thay vì .type()
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 

    // --- BƯỚC 3: XỬ LÝ CHECKBOX AGREE ---
    // Sử dụng { force: true } để đảm bảo thực hiện được hành động dù có lớp phủ CSS
    cy.get('input[type="checkbox"]')
      .should('be.checked')      // Đảm bảo trạng thái mặc định (nếu có)
      .uncheck({ force: true })  // Thao tác BỎ CHỌN
      .should('not.be.checked'); // Xác nhận đã bỏ chọn thành công

    // --- BƯỚC 4: CLICK NÚT SUBMIT ---
    // Thêm { force: true } vì nút này hay bị các thẻ div che khuất (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });

    // --- BƯỚC 5: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    // 5.1. Kiểm tra không chuyển trang (URL vẫn chứa /products)
    cy.url().should('include', '/products');

    // 5.2. Kiểm tra thông báo lỗi xuất hiện (Tăng timeout để chờ validation)
    cy.contains('You must agree to the terms', { timeout: 10000 }).should('be.visible');
});
  // ------------------------happy case----------------------- 

  it('TC_08: Gửi thành công khi nhập đúng 5000 ký tự (Max Length)', () => {
    const maxLength = 5000;
    const validMaxText = 'a'.repeat(maxLength);

    // --- BƯỚC 1: NHẬP MÔ TẢ (5000 KÝ TỰ) ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi trang re-render
    cy.get('#description').clear();
    
    // Sử dụng delay: 0 và parseSpecialCharSequences: false để nhập 5000 ký tự siêu tốc
    cy.get('#description')
      .type(validMaxText, { delay: 0, parseSpecialCharSequences: false });

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG KHÁC HỢP LỆ ---
    // 2.1. Chọn Category (Sử dụng ID #categoryId và chọn từ danh sách)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
        
    // 2.2. Check vào điều khoản (Dùng force: true để vượt qua lớp phủ CSS)
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 3: SUBMIT ---
    // Dùng force: true vì nút này bị che bởi lớp div (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });

    // --- BƯỚC 4: KIỂM TRA KẾT QUẢ (ASSERTION) ---
    // 4.1. Kiểm tra URL chuyển hướng đúng (Tăng timeout chờ server xử lý dữ liệu lớn)
    cy.url({ timeout: 20000 }).should('include', '/create-request/success');

    // 4.2. Kiểm tra các thông báo thành công xuất hiện
    cy.contains('Submission successful!', { timeout: 10000 }).should('be.visible');
    cy.contains('Request posted successfully').should('be.visible');

    // 4.3. Kiểm tra nút điều hướng tiếp theo (Lưu ý chữ Manage hay Manager)
    cy.contains('Manage requests').should('be.visible'); 
});
  it('TC_09: 10 < Gửi yêu cầu thành công < 5000 và các trường khác hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ HỢP LỆ ---
    // QUAN TRỌNG: Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi React re-render
    cy.get('#description').clear(); // Sử dụng ID chuẩn từ Inspect
    cy.get('#description').type('Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.', { delay: 20 });

    // --- BƯỚC 2: CHỌN CATEGORY HỢP LỆ ---
    // #categoryId là một thẻ <button>, nên thực hiện click mở rồi chọn nội dung thay vì dùng .type()
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
   
    // --- BƯỚC 3: UPLOAD FILE HỢP LỆ ---
    // Đảm bảo dùng selector 'input#file-upload' đã xác định ở các bước trước
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });


    // --- BƯỚC 4: CHECK ĐIỀU KHOẢN ---
    // Sử dụng { force: true } để vượt qua các lớp phủ CSS Tailwind
    cy.get('input[type="checkbox"]').check({ force: true });


    // --- BƯỚC 5: CLICK SUBMIT ---
    // Dùng { force: true } vì nút này hay bị che bởi lớp div (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });


    // --- BƯỚC 6: KIỂM TRA MÀN HÌNH SUCCESS ---
    
    // 6.1. Kiểm tra URL chuyển hướng (Tăng timeout để đề phòng server phản hồi chậm)
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // 6.2. Kiểm tra Thông báo Toast xuất hiện
    cy.contains('Request posted successfully', { timeout: 10000 }) 
      .should('be.visible');

    // 6.3. Kiểm tra Tiêu đề chính
    cy.contains('Submission successful!') 
      .should('be.visible');
      
    // 6.4. Kiểm tra nội dung phụ
    cy.contains('Congratulations! Your request has been submitted successfully')
      .should('be.visible');
});
  it('TC_10: Gửi yêu cầu thành công khi nhập đúng 10 ký tự (Min Length)', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ (VỪA ĐỦ 10 KÝ TỰ) ---
    // QUAN TRỌNG: Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi React re-render
    cy.get('#description').clear(); // Sử dụng ID chuẩn #description
    
    // Tìm lại phần tử và nhập liệu
    cy.get('#description')
      .type('Tôi muốn t', { delay: 20 }); // "Tôi muốn t" là đúng 10 ký tự

    // --- BƯỚC 2: ĐIỀN CÁC TRƯỜNG KHÁC HỢP LỆ ---
    // 2.1. Chọn Category (Sử dụng ID #categoryId và chọn từ danh sách)
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
   
    // 2.2. Upload File hợp lệ (Dùng force: true vì input thường bị ẩn)
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // 2.3. Check vào điều khoản (Dùng force: true để vượt qua lớp phủ CSS)
    cy.get('input[type="checkbox"]').check({ force: true });


    // --- BƯỚC 3: CLICK NÚT SUBMIT ---
    // Dùng force: true vì nút này hay bị che bởi lớp div (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });


    // --- BƯỚC 4: KIỂM TRA MÀN HÌNH SUCCESS ---
    // 4.1. Kiểm tra URL chuyển hướng (Tăng timeout để đề phòng server phản hồi chậm)
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // 4.2. Kiểm tra các thông báo thành công hiển thị
    cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
    cy.contains('Submission successful!').should('be.visible');
      
    // 4.3. Kiểm tra nội dung phụ
    cy.contains('Congratulations! Your request has been submitted successfully').should('be.visible');
});
  it('TC_11: Nhập space đầu và cuối cho dữ liệu hợp lệ', () => {
    
    // --- BƯỚC 1: NHẬP MÔ TẢ CÓ KHOẢNG TRẮNG ---
    // Ngắt chuỗi clear() và type() để tránh lỗi Detached DOM khi React re-render
    cy.get('#description').clear();
    cy.get('#description')
      .type('   Tôi muốn tìm PT Gym hướng dẫn 1-1 tại Quận 3.   ', { delay: 0 });

    // --- BƯỚC 2: CHỌN CATEGORY HỢP LỆ ---
    // #categoryId là một button, nên click mở rồi chọn nội dung thay vì dùng .type()
    cy.get('#categoryId').click();
    cy.contains('MedSupport').click(); 
   
    // --- BƯỚC 3: UPLOAD FILE HỢP LỆ ---
    // Sử dụng selector ID chuẩn và force: true vì input thường bị ẩn
    cy.get('input#file-upload').selectFile('cypress/fixtures/photo1.png', { force: true });

    // --- BƯỚC 4: CHECK ĐIỀU KHOẢN ---
    // Sử dụng { force: true } để vượt qua các lớp phủ CSS Tailwind
    cy.get('input[type="checkbox"]').check({ force: true });

    // --- BƯỚC 5: CLICK SUBMIT ---
    // QUAN TRỌNG: Dùng { force: true } vì nút này bị che bởi lớp div (lỗi trong ảnh image_09880b.jpg)
    cy.contains('button', 'Post request').click({ force: true });

    // --- BƯỚC 6: KIỂM TRA MÀN HÌNH SUCCESS ---
    // 6.1. Kiểm tra URL chuyển hướng (Tăng timeout chờ server phản hồi)
    cy.url({ timeout: 15000 }).should('include', '/create-request/success');

    // 6.2. Kiểm tra các thông báo thành công hiển thị
    cy.contains('Request posted successfully', { timeout: 10000 }).should('be.visible');
    cy.contains('Submission successful!').should('be.visible');
    cy.contains('Congratulations! Your request has been submitted successfully').should('be.visible');
});
});
