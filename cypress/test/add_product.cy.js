Cypress.on("uncaught:exception", () => false);

describe("ADD PRODUCT", () => {


  
  const thumbInput = "input#product-cover-upload";//id

const nameInput = "input#name"; 

  
  const descInput = 'textarea, div[data-field="description"] textarea';
 

const galleryEmptyUploads = "input[type='file'][accept^='image']";

  const createBtn = "button:contains('Create Your Product')";
  const cancelBtn = "button:contains('Cancel')";
const imgSlot1 = "#product-images-upload-0";          // Ảnh review đầu tiên
const imgSlot2 = "#product-images-upload-1"; 
const imgSlot3 = "#product-images-upload-2";         // Upload nhiều ảnh
const countryInput='input[placeholder="Select country"]';
 

 
    const categoryInput = 'input[placeholder="Select category"]';
 const titleInput = 'input[name="title"]';
    const submitBtn = 'button[type="submit"]';
    const editor = 'div[contenteditable="true"][role="textbox"]';
    const publishBtn = 'button';
 
    const login = () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("liveb58966@m3player.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };
beforeEach(() => {
    cy.session("login", login);

    // cy.url().then((url) => {
    //     if (!url.includes("seller/read-me")) {
    //         cy.log("⚠️ Không vào thẳng được Dashboard -> Phải đi từ Become Seller");
    //         cy.visit("https://strongbody-web.vercel.app/buyer/dashboard");
    //       cy.wait(1000);
    //         cy.contains("Switch to Seller", { timeout: 20000 }).click({ force: true });
    //         //cy.visit("https://strongbody-web.vercel.app/seller/read-me");
    //     }
    // });

    // cy.get("body", { timeout: 15000 }).should("contain", "Share a local products");
    // cy.wait(500); 

    // cy.contains("span", "Share a local products")
    //   .should("be.visible")
    //   .parent() // Click vào thẻ cha
    //   .click({ force: true });
cy.visit("https://strongbody-web.vercel.app/seller/create-product");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
    cy.url({ timeout: 20000 }).should("include", "seller/create-product");
    
    cy.wait(1000);
  });

    // --- Name required ---
    it("TC_01- Bỏ trống tên → báo lỗi", () => {
     

     cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Health & Wellness")
  .click({ force: true });

      cy.get(descInput) // Selector dự đoán cho textarea
      .should('be.visible')
      .click()
      .type("test để trống name các trường các hợp lệ.");

    cy.contains('label', /Country/i)
      .parent() // Lên 1 cấp để lấy thẻ div bao quanh cả Input và Button
      .as('countryField'); 
    
    cy.get('@countryField')
      .find('button[id^="headlessui-combobox-button"]')
      .click();

    cy.contains('[role="option"]', 'Vietnam')
      .should('be.visible')
      .click();

  
    cy.get('@countryField')
      .find('input') 
      .should('have.value', 'Vietnam'); // Với Input phải dùng 'have.value', không dùng 'contain.text'

      // Do not enter name
      cy.get(createBtn).click();

      cy.contains(/Product name is required/i).should("be.visible");
    });
it("TC_02-Nhập space vào tên → báo lỗi", () => {
    // 1. Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // 2. Chọn Category
    cy.contains("label", "Category")
        .parent()
        .find("button[id^='headlessui-combobox-button']")
        .first()
        .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
        .contains("Health & Wellness")
        .click({ force: true });

    // 3. Nhập Description
    cy.get(descInput)
        .should('be.visible')
        .click()
        .type("test nhập space vào name.");

    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    cy.get('@countryField').find('input').should('have.value', 'Vietnam');

    cy.get(nameInput) 
      .should('be.visible')
      .clear()        // Xóa sạch text cũ nếu có
      .type('     '); // Nhập 5 dấu cách

    // 5. Bấm Create
    cy.get(createBtn).click();

    cy.contains(/Product name is required/i).should("be.visible");
});   
   
it("TC_03-Nhập tên rồi xóa sạch → Báo lỗi name is required", () => {
    // 1. Setup: Điền các thông tin bắt buộc khác để tránh nhiễu (Prerequisites)
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    
    // Chọn Category
    cy.contains("label", "Category")
        .parent()
        .find("button[id^='headlessui-combobox-button']")
        .first()
        .click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    // Nhập Description
    cy.get(descInput).type("Mô tả hợp lệ cho dịch vụ để kiểm tra validation.");

    // Chọn Country
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').click();

    // 2. HÀNH ĐỘNG CHÍNH: Nhập rồi xóa tên
    cy.get(nameInput)
        .should('be.visible')
        .type("Tên tạm thời")     // Nhập tên hợp lệ trước
        .should('have.value', "Tên tạm thời");

    cy.get(nameInput)
        .clear()                 // Xóa sạch nội dung
        .blur();                 // Click ra ngoài để trigger validation (nếu có)

    // Cách 2: Bấm Create để kiểm tra validation khi submit (Giống TC_02 của bạn)
    cy.get(createBtn).click();
    cy.contains(/Product name is required/i).should("be.visible");
});
it("TC_04-Bỏ trống Category → Báo lỗi", () => {
   
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test thiếu Category");

    // Nhập Description
    cy.get(descInput)
      .should('be.visible')
      .click()
      .type("Mô tả cho trường hợp test bỏ trống category.");
    // Chọn Country (Dùng cách tìm theo Label chuẩn xác)
    cy.contains('label', /Country/i).parent().as('countryField');
    
    cy.get('@countryField')
      .find('button[id^="headlessui-combobox-button"]')
      .click();

    cy.contains('[role="option"]', 'Vietnam')
      .should('be.visible')
      .click();

    cy.get(createBtn).click();

    cy.contains(/category is required/i).should("be.visible");
});
it("TC_05-Nhập toàn khoảng trắng (Space) vào Category → Báo lỗi", () => {

    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // Nhập Tên hợp lệ
    cy.get(nameInput).should('be.visible').clear().type("Sản phẩm Test Space Category");

    // Nhập Description
    cy.get(descInput).should('be.visible').type("Mô tả test category space");

    // Chọn Country hợp lệ
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    // Tìm vùng Category
    cy.contains('label', 'Category').parent().as('categoryField');

    // CÁCH 1: Nếu Category là INPUT (Cho phép gõ)
    cy.get('@categoryField')
      .find('input') // Tìm thẻ input
      .click()
      .clear()
      .type('     '); // Nhập 5 dấu cách
          cy.get('body').click(0, 0); 
   
    cy.get(createBtn).click();
   
    cy.contains(/category is required/i).should("be.visible");
});
it("TC_06 - Chọn Category rồi bỏ chọn → Báo lỗi Category is required", () => {
    // --- BƯỚC 1: SETUP DỮ LIỆU HỢP LỆ ---
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    // Nhập Tên hợp lệ
    cy.get(nameInput).type("Sản phẩm Test Deselect Category");

    // Nhập Mô tả hợp lệ
    cy.get(descInput).type("Mô tả hợp lệ có độ dài đầy đủ để test hệ thống.");

    // Chọn Country hợp lệ
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').click();

    // --- BƯỚC 2: CHỌN CATEGORY ---
    cy.contains("label", "Category").parent().as('categoryField');
    
    // Mở dropdown và chọn "Health & Wellness"
    cy.get('@categoryField').find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    // Kiểm tra xem giá trị đã được nhận chưa (Optional)
    cy.get('@categoryField').find('input').should('have.value', 'Health & Wellness');

    // --- BƯỚC 3: BỎ CHỌN (DESELECT) ---
    // Xóa trắng input để giả lập hành động bỏ chọn
    cy.get('@categoryField').find('input').clear().blur();

    // --- BƯỚC 4: KIỂM TRA VALIDATION ---
    // Bấm Create để kích hoạt kiểm tra lỗi
    cy.get(createBtn).click();

    // Kỳ vọng: Thông báo lỗi xuất hiện
    cy.contains(/category is required/i).should("be.visible");
});
it("TC_07- Bỏ trống Mô tả (Description) → Báo lỗi", () => {
    
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // Nhập Tên hợp lệ
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Empty Description");

    // Chọn Category hợp lệ
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness") // Chọn category bất kỳ
      .click({ force: true });

    // Chọn Country hợp lệ (Code chuẩn)
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    cy.get(descInput)
      .should('be.visible')
      .clear(); // Quan trọng: Đảm bảo ô này rỗng tuếch
      
    cy.get(createBtn).click();

   
    cy.contains(/description is required/i).should("be.visible");
});
it("TC_08- Nhập toàn khoảng trắng (Space) vào Mô tả → Báo lỗi", () => {
    // ---------------------------------------------------------------
    // 1. ĐIỀN DỮ LIỆU HỢP LỆ CHO CÁC TRƯỜNG KHÁC
    // ---------------------------------------------------------------
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });
    // Nhập Tên hợp lệ
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Space Description");
    // Chọn Category hợp lệ
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    // Chọn Country hợp lệ
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    
    cy.get(descInput)
      .should('be.visible')
      .clear()        // Xóa sạch dữ liệu cũ
      .type('     '); // Nhập 5 dấu cách liên tiếp
   
    cy.get(createBtn).click();
   
    cy.contains(/description is required/i).should("be.visible");
});

it("TC_09- Nhập Mô tả ngắn hơn min length → Báo lỗi", () => {

    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });
    // Nhập Tên hợp lệ
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Min Length");

    // Chọn Category hợp lệ
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    // Chọn Country hợp lệ
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    
    cy.get(descInput)
      .should('be.visible')
      .clear()
      .type('ab'); 

    cy.get(createBtn).click();

    cy.contains(/Description must be at least 30 characters/i).should("be.visible");
});
it("TC_10- Kiểm tra chặn ký tự khi nhập quá Max Length (Hard Limit)", () => {
    // ---------------------------------------------------------------
    // 1. CHUẨN BỊ DATA VÀ ĐIỀN CÁC TRƯỜNG KHÁC
    // ---------------------------------------------------------------
    
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // Nhập Tên
    cy.get(nameInput).should('be.visible').clear().type("Sản phẩm Test Block MaxLength");

    // Chọn Category
    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    // Chọn Country
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();

  const maxLimit = 2000;
    
    // Bước 1: Điền vừa khít 2000 ký tự (Dùng invoke cho nhanh)
    cy.get(descInput)
      .should('be.visible')
      .clear()
      .invoke('val', "a".repeat(maxLimit)) 
      .trigger('input', { force: true }); // Báo cho React/Vue biết đã có dữ liệu

    // Bước 2: Giả lập người dùng cố tình gõ thêm 10 ký tự nữa
    // Lúc này input đã đầy, nếu có maxlength, các ký tự này sẽ không vào được
    cy.get(descInput)
      .type('1234567890'); 
    // Kiểm tra độ dài vẫn là 2000 (nghĩa là 10 ký tự kia đã bị chặn)
    cy.get(descInput)
      .invoke('val')
      .should((val) => {
          expect(val.length).to.equal(maxLimit); 
      });
});
it("TC_11- Nhập Tên quá Max Length (121 ký tự) → Báo lỗi", () => {
 
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // Chọn Category hợp lệ
    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    // Chọn Country hợp lệ
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();

    // Nhập Description hợp lệ
    cy.get(descInput).should('be.visible').clear().type("Mô tả hợp lệ cho sản phẩm test name.");

    //  NHẬP TÊN QUÁ 120 KÝ TỰ (TEST CHÍNH)
    
    const maxLen = 120;
    // Tạo chuỗi dài 121 ký tự (vượt quá 1 ký tự)
    const invalidName = "a".repeat(maxLen + 1); 

    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type(invalidName, { delay: 0 }); // delay: 0 để nhập nhanh

    cy.get(createBtn).click();

    // Kiểm tra thông báo lỗi hiển thị chính xác dòng text bạn yêu cầu
    cy.contains("Product name must be at most 120 characters").should("be.visible");
});
it("TC_12- Bỏ trống Country (Select country) → Báo lỗi", () => {
    
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    // Nhập Tên hợp lệ
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Empty Country");

    // Nhập Mô tả hợp lệ
    cy.get(descInput)
      .should('be.visible')
      .clear()
      .type("Mô tả đầy đủ để test lỗi thiếu country.");

    // Chọn Category hợp lệ
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    
    cy.get(createBtn).click();

    cy.contains(/(country|origin).*required/i).should("be.visible");
});
it("TC_13- Tạo sản phẩm thành công (Happy Path)", () => {
    // ---------------------------------------------------------------
    // 1. UPLOAD ẢNH
    // ---------------------------------------------------------------
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });

    const timestamp = new Date().getTime();
    const productName = "Sản phẩm Test " + timestamp; 
    
    // Nhập Tên
    cy.get(nameInput).should('be.visible').clear().type(productName);

  
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    cy.get(descInput)
      .should('be.visible')
      .clear()
      .type("Mô tả hợp lệ cho sản phẩm Happy Case.");

  
    cy.contains('label', /Country/i).parent().as('countryField')
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    cy.get('@countryField').find('input').should('have.value', 'Vietnam');

   
    cy.get(createBtn).click();
    
    cy.contains(/created successfully|success/i, { timeout: 15000 })
      .should("be.visible");

   // KIỂM TRA URL CHÍNH XÁC (my-product)
     cy.url({ timeout: 20000 })
      .should('include', '/seller/my-product');
});
it("TC_14- Tất cả các trường (Name, Desc) nhập đúng bằng Max Length → Thành công", () => {
   
    const nameMax = 120;
    const descMax = 2000;
    
    const boundaryName = "n".repeat(nameMax); 
    
    // CHIẾN THUẬT SỬA LỖI: Tạo chuỗi 1999 ký tự thôi
    const almostFullDesc = "d".repeat(descMax - 1); 


    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/review2.png', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/review3.png', { force: true });
   
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type(boundaryName, { delay: 0 }); 

    cy.get(nameInput).should('have.value', boundaryName);
    
    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });
    // Country
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').click();
    
    cy.get(descInput)
      .should('be.visible')
      .clear()
      
      .invoke('val', almostFullDesc)
      .trigger('input', { force: true }); // Đánh thức UI
    
    cy.get(descInput).type('d');
    // Verify độ dài: 1999 + 1 = 2000
    cy.get(descInput).invoke('val').should('have.length', descMax);
    
    cy.get(createBtn).click();
    cy.contains(/created successfully|success/i, { timeout: 15000 }).should("be.visible");
    cy.url({ timeout: 20000 })
      .should('include', '/seller/my-product');
});
});


