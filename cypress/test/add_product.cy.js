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
    cy.wait(3000); 
   //cy.get('button[aria-label*="Translate page"]').click();
cy.contains('button', 'English', { timeout: 10000 })
    .should('be.visible')
    .click();  
    cy.get("input[name='email']", { timeout: 20000 }).should('be.visible');
  cy.get("input[name='email']").clear().type("liveb58966@m3player.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.url().should('not.include', '/login');
    // kiểm tra xem đã nhân dc cookies Chưa
    cy.getCookies().should('have.length.greaterThan', 0);
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  
  };
beforeEach(() => {
    cy.session("login", login, {
    validate() {
   // kiểm tra cooken còn hạn không
cy.getCookie('__Secure-next-auth.session-token').should('exist');    },
  });
    cy.visit("https://strongbody-web.vercel.app/seller/create-product");
    // 5. Chốt chặn: Đảm bảo vào đúng trang
cy.url({ timeout: 20000 }).should("include", "seller/create-product");   
  });

    // --- Name required ---
    it("TC_01- Bỏ trống tên → báo lỗi", () => {
  

     cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

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
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

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
   
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.contains("label", "Category")
        .parent()
        .find("button[id^='headlessui-combobox-button']")
        .first()
        .click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    cy.get(descInput).type("Mô tả hợp lệ cho dịch vụ để kiểm tra validation.");
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').click();

    cy.get(nameInput)
        .should('be.visible')
        .type("Tên tạm thời")     
        .should('have.value', "Tên tạm thời");

    cy.get(nameInput)
        .clear()                 
        .blur();                 

    
    cy.get(createBtn).click();
    cy.contains(/Product name is required/i).should("be.visible");
});
it("TC_04-Bỏ trống Category → Báo lỗi", () => {
   
 
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test thiếu Category");

  
    cy.get(descInput)
      .should('be.visible')
      .click()
      .type("Mô tả cho trường hợp test bỏ trống category.");
    
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

    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

   
    cy.get(nameInput).should('be.visible').clear().type("Sản phẩm Test Space Category");

    
    cy.get(descInput).should('be.visible').type("Mô tả test category space");

    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
  
    cy.contains('label', 'Category').parent().as('categoryField');

    
    cy.get('@categoryField')
      .find('input') 
      .click()
      .clear()
      .type('     '); 
          cy.get('body').click(0, 0); 
   
    cy.get(createBtn).click();
   
    cy.contains(/category is required/i).should("be.visible");
});
it("TC_06 - Chọn Category rồi bỏ chọn → Báo lỗi Category is required", () => {
   
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    
    cy.get(nameInput).type("Sản phẩm Test Deselect Category");

    
    cy.get(descInput).type("Mô tả hợp lệ có độ dài đầy đủ để test hệ thống.");

   
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').click();

  
    cy.contains("label", "Category").parent().as('categoryField');
    
   
    cy.get('@categoryField').find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    
    cy.get('@categoryField').find('input').should('have.value', 'Health & Wellness');

    cy.get('@categoryField').find('input').clear().blur();

   
    cy.get(createBtn).click();

    cy.contains(/category is required/i).should("be.visible");
});
it("TC_07- Bỏ trống Mô tả (Description) → Báo lỗi", () => {
    
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

   
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Empty Description");

    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness") // Chọn category bất kỳ
      .click({ force: true });

    
    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    cy.get(descInput)
      .should('be.visible')
      .clear(); 
      
    cy.get(createBtn).click();

   
    cy.contains(/description is required/i).should("be.visible");
});
it("TC_08- Nhập toàn khoảng trắng (Space) vào Mô tả → Báo lỗi", () => {
   
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });
    
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Space Description");
    
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();
    
    cy.get(descInput)
      .should('be.visible')
      .clear()       
      .type('     '); 
   
    cy.get(createBtn).click();
   
    cy.contains(/description is required/i).should("be.visible");
});

it("TC_09- Nhập Mô tả ngắn hơn min length → Báo lỗi", () => {

    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });
   
    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type("Sản phẩm Test Min Length");

    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Health & Wellness")
      .click({ force: true });

    
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
 
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

    cy.get(nameInput).should('be.visible').clear().type("Sản phẩm Test Block MaxLength");

    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();

  const maxLimit = 2000;
    
    cy.get(descInput)
      .should('be.visible')
      .clear()
      .invoke('val', "a".repeat(maxLimit)) 
      .trigger('input', { force: true }); 

    cy.get(descInput)
      .type('1234567890'); 
    cy.get(descInput)
      .invoke('val')
      .should((val) => {
          expect(val.length).to.equal(maxLimit); 
      });
});
it("TC_11- Nhập Tên quá Max Length (121 ký tự) → Báo lỗi", () => {
 
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Health & Wellness").click({ force: true });

    cy.contains('label', /Country/i).parent().as('countryField');
    cy.get('@countryField').find('button[id^="headlessui-combobox-button"]').click();
    cy.contains('[role="option"]', 'Vietnam').should('be.visible').click();


    cy.get(descInput).should('be.visible').clear().type("Mô tả hợp lệ cho sản phẩm test name.");

   
    
    const maxLen = 120;
    // Tạo chuỗi dài 121 ký tự (vượt quá 1 ký tự)
    const invalidName = "a".repeat(maxLen + 1); 

    cy.get(nameInput)
      .should('be.visible')
      .clear()
      .type(invalidName, { delay: 0 }); 

    cy.get(createBtn).click();

   
    cy.contains("Product name must be at most 120 characters").should("be.visible");
});
it("TC_12- Bỏ trống Country (Select country) → Báo lỗi", () => {
    
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

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
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });

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


    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgSlot2).selectFile('cypress/fixtures/2.jpg', { force: true });
    cy.get(imgSlot3).selectFile('cypress/fixtures/3.jpg', { force: true });
   
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


