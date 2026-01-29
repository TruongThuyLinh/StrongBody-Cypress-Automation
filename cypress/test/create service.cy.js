Cypress.on("uncaught:exception", () => false);

describe("CREATE HEA SERVICE — FULL TESTING", () => {


  const thumbInput = "input#cover-upload";//id
 

const nameInput = "input#title"; 

  //const descInput = 'textarea, div[data-field="description"] textarea';
  const descInput = 'div.ContentEditable__root[data-lexical-editor="true"]';
  const heaInput = 'input.custom-combobox-create-service';


  const priceInput = "input#price, input[name='price'], input[placeholder='Enter price']";


const galleryEmptyUploads = "input[type='file'][accept^='image']";

  const createBtn = "button:contains('Create Hea')";
const imgSlot1 = "#service-images-upload-0";          // Ảnh review đầu tiên
const imgMore = "#service-images-upload-more";        // Upload nhiều ảnh
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
  //cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
};
  
beforeEach(() => {
  cy.session("login", login, {
    validate() {
      cy.getCookies().then((cookies) => {
        const hasSession = cookies.some(c => c.name.includes('session-token'));
        if (!hasSession) {
          throw new Error("Session không tồn tại hoặc đã hết hạn");
        }
      });
    },
  });
cy.visit("/seller/create-service");
    cy.url({ timeout: 20000 }).should("include", "seller/create-service");

    cy.wait(1000);
    
  });


  
it("TC_01- Nhấn mũi tên tăng → Price tăng", () => {
  cy.get(priceInput)
    .should('be.visible')
    .clear()
    .type("10")
    .should('have.value', '10'); 

  cy.get(priceInput).type("{uparrow}");

  cy.get(priceInput).then(($input) => {
    const val = $input.val();
    cy.log("Giá trị thực tế sau khi nhấn lên là: " + val);
    expect(val).to.equal("10.01"); 
  });
});
it("TC_02- Không cho giá < 0 khi nhấn ▼", () => {
  cy.get(priceInput)
    .clear()
    .type("0");

  cy.get(priceInput).type("{downarrow}");

  cy.get(priceInput)
    .should("have.value", "0"); 
});

    it("TC_03- Bỏ trống tên → báo lỗi", () => {

     cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/2.jpg',
  'cypress/fixtures/3.jpg',
  'cypress/fixtures/4.jpg'
   ], { force: true });

cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });
      cy.get(descInput) 
      .should('be.visible')
      .click()
      .type("Mô tả cố tình để  trống name.");

cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

// 2. Chờ dropdown render
cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(createBtn).click();

      cy.contains(/Hea name is required/i).should("be.visible");
    });
it("TC_04: Nhập chỉ khoảng trắng (Space) vào Name → báo lỗi", () => {
   
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgMore).selectFile(['cypress/fixtures/2.jpg', 'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'], { force: true });

    // Chọn Category
    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").first().click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Sustainable Habits & Lifestyle Design").click({ force: true });
cy.get('body').click(0, 0, { force: true });
    // Nhập Description
    cy.get(descInput)
      .should('be.visible')
      .click()
      .type("Mô tả đầy đủ, chỉ có tên là sai.");

    // Chọn Hea Type
    cy.contains("label", "Hea Type").parent().find("button[id^='headlessui-combobox-button']").click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
      .should("be.visible")
      .contains("Online", { timeout: 8000 })
      .click({ force: true });

     cy.get(priceInput).type("3");


    cy.get(nameInput)
      .should('be.visible')
      .clear()       
      .type('     '); 
    cy.get(nameInput).blur();
    cy.get(createBtn).click();
    cy.contains(/Hea name is required/i).should("be.visible");
});
    it("TC_05- Tên > 200 ký tự nhưng các trường khác hợp lệ → Báo lỗi Name", () => {

     
     cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/2.jpg',
  'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
], { force: true });
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });
cy.get(descInput) 
      .should('be.visible')
      .click()
      .type("Nhập name quá maxlengh(200).")
            cy.get(priceInput).type("50");
cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(nameInput).type("a".repeat(220));
      cy.get(createBtn).click();

      cy.contains(/name.*200/i).should("be.visible");

      cy.contains("Category is required").should("not.exist");
      cy.contains("Description is required").should("not.exist");
      cy.contains("Hea price is required").should("not.exist");
      cy.contains("Type is required").should("not.exist");
    });

    // long desc
//     it("TC_06 - Mô tả vượt quá maxlength → Hiển thị lỗi", () => {

//        cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

//       cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

//       cy.get(imgMore).selectFile([
//       'cypress/fixtures/review2.png',
//       'cypress/fixtures/review3.png'
//       ], { force: true });
      
//       cy.get(nameInput).type("Valid HEA Name For Testing");

//     // Mở dropdown Category
// cy.contains("label", "Category")
//   .parent()
//   .find("button[id^='headlessui-combobox-button']")
//   .first()
//   .click({ force: true });

// // Chọn option
// cy.get("div[id^='headlessui-combobox-options']")
//   .contains("Vegetarian or Vegan Diet Guidance")
//   .click({ force: true });

//       cy.get(priceInput).type("50");

//        // 1. Mở dropdown Hea Type
// cy.contains("label", "Hea Type")
//   .parent()
//   .find("button[id^='headlessui-combobox-button']")
//   .click({ force: true });

// // 2. Chờ dropdown render
// cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
//   .should("be.visible")
//   .contains("Online", { timeout: 8000 })
//   .click({ force: true });

//       cy.get(descInput).click().type("a".repeat(1500), { delay: 0 });

//       cy.get(createBtn).click();

//       cy.contains(/description.*(max|limit|1000|long)/i).should("be.visible");
//     });


    it("TC_06 Price trống-> báo lỗi", () => {

      cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

     cy.get(imgMore).selectFile([
  'cypress/fixtures/2.jpg',
  'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
   ], { force: true });
      cy.get(nameInput).type("Valid Name");
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });

//       cy.get(descInput).click().type("Valid description");
// cy.get('body').click(0, 0);
cy.get(descInput) // Selector dự đoán cho textarea
      .should('be.visible')
      .click()
      .type("Mô tả  cố tình để tróng price.")

cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });

      // no price
      cy.get(createBtn).click();
      cy.contains(/price is required/i).should("be.visible");
    });

    it("TC_07 - Price nhập chữ → không cho nhập", () => {

   cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/2.jpg',
  'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
  ], { force: true });
  cy.get(nameInput).type("Valid Name");

  cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .first()
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Sustainable Habits & Lifestyle Design")
    .click({ force: true });
cy.get('body').click(0, 0, { force: true });
  cy.get(descInput).click().type("Valid description");

  cy.contains("label", "Hea Type")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Online")
    .click({ force: true });

  cy.get(priceInput).type("abc");

 
  cy.get(priceInput).should("have.value", "");  // hoặc "0" tùy UI

  cy.get(createBtn).click();

  cy.contains(/price is required/i).should("be.visible");

});

    it("TC_08- Price âm", () => {

  cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
  cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
  cy.get(imgMore).selectFile([
    'cypress/fixtures/2.jpg',
    'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
  ], { force: true });

  cy.get(nameInput).type("Valid Name");

  // Category
  cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Sustainable Habits & Lifestyle Design")
    .click({ force: true });

cy.get('body').click(0, 0, { force: true });
  // Description
  cy.get(descInput) // Selector dự đoán cho textarea
      .should('be.visible')
      .click()
      .type("[Service Name] isn’t just about [Main Task] – it’s about creating an experience that inspires. Our team brings passion and creativity to every project we touch.")

  // Hea Type
  cy.contains("label", "Hea Type")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
    .contains("Online", { timeout: 8000 })
    .click({ force: true });

  // Nhập giá âm
  cy.get(priceInput).type("-20");

  // Submit
  cy.get(createBtn).click();

  // Kiểm tra lỗi (match nhiều khả năng)
  cy.contains(/price|greater|positive|zero|invalid/i)
    .should("be.visible");
});

it("TC_9- Price bằng 0-> báo lỗi", () => {

       cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/2.jpg',
      'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
      ], { force: true });
      cy.get(nameInput).type("Valid Name");
      
    // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });
cy.get(descInput)
      .should('be.visible')
      .click()
      .type("[Service Name] isn’t just about [Main Task] – it’s about creating an experience that inspires. Our team brings passion and creativity to every project we touch.")
      
cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

// 2. Chờ dropdown render
cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(priceInput).type("0");
      cy.get(createBtn).click();
cy.contains(/Price must be greater than 0/i).should("be.visible");
     
    });

    it("TC_10-không up ảnh dịch vụ → báo lỗi", () => {

       const file1 = "cypress/fixtures/1.jpg";

      cy.get(thumbInput).selectFile(file1, { force: true });
       cy.get(galleryEmptyUploads).eq(0).selectFile(file1, { force: true });
       cy.get(nameInput).type("Valid Name");

  // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });
      cy.get(descInput).click().type("Valid description");

      // 1. Mở dropdown Hea Type
cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

// 2. Chờ dropdown render
cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(priceInput).type("0");
      cy.get(createBtn).click();

       cy.contains(/upload|image|at least|4/i, { timeout: 6000 })
    .should("be.visible");
    });
    it("TC_11-upload ảnh không đúng định dạng → báo lỗi", () => {

      cy.get(thumbInput).selectFile('cypress/fixtures/fake-avatar.txt', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/Homework 22.ppx', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/2.jpg',
      'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
      ], { force: true });

       cy.get(nameInput).type("Valid Name");

  // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });
      cy.get(descInput).click().type("Valid description");

      // 1. Mở dropdown Hea Type
cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

// 2. Chờ dropdown render
cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(priceInput).type("0");
      cy.get(createBtn).click();

       cy.contains(/invalid file format|only images are allowed/i, { timeout: 6000 })
    .should("be.visible");
    });
  
  it("TC_11 - Bỏ trống mô tả, các trường khác hợp lệ", () => {

      const file = "cypress/fixtures/1.jpg";

       cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/2.jpg',
  'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
   ], { force: true });
   
      cy.get(nameInput).type("Valid HEA Name");

     // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });

      cy.get(priceInput).type("100");


      cy.get(createBtn).click();
        cy.contains(/Description is required/i, { timeout: 6000 })
    .should("be.visible");
      //cy.contains(/Description is required/i).should("exist");

    });
    it("TC_12 - Nhập chỉ khoảng trắng (Space) vào mô tả (Trường hợp Optional) ", () => {
    
    // Upload ảnh
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgMore).selectFile(['cypress/fixtures/2.jpg', 'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'], { force: true });

    // Nhập tên
    cy.get(nameInput).type("Valid HEA Name with Space Desc");

    // Chọn Category
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .first()
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Sustainable Habits & Lifestyle Design")
      .click({ force: true });
cy.get('body').click(0, 0, { force: true });
    // Nhập giá
    cy.get(priceInput).type("100");

    
    cy.get(descInput) 
      .should('be.visible')
      .click()
      .type("     "); // Nhập 5 dấu cách

    // --- 3. SUBMIT ---
    cy.get(createBtn).click();

    cy.contains(/Description is required/i).should("exist");
});
it("TC_13 - Bỏ trống Category → Báo lỗi bắt buộc", () => {
    
    cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
    cy.get(imgMore).selectFile(['cypress/fixtures/2.jpg', 'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'], { force: true });

    cy.get(nameInput).type("Product Name Without Category");

    cy.get(priceInput).type("200");

    cy.get(descInput)
      .should('be.visible')
      .type("This is a valid description");

    cy.get(createBtn).click();


    cy.contains(/Category is required/i).should("be.visible");
});
it("TC_14 - Nhập chỉ khoảng trắng (Space) vào Category → Hệ thống không chấp nhận", () => {
    cy.get(nameInput).type("Product Testing Space Category");
    cy.get(priceInput).type("100");
    cy.get(descInput).type("Valid description here");

    cy.get('#category_ids')
      .filter(':visible')
      .should('be.visible')
      .type("      "); 
    cy.get('body').click(0, 0, { force: true });
    cy.get(createBtn).click();
    cy.contains(/Category is required|Please select a category/i)
      .should("be.visible");
});
it("TC_15 - Nhập Category không tồn tại → Không cho phép chọn và báo lỗi", () => {

    cy.get(nameInput).type("Product with Invalid Category");
    cy.get(priceInput).type("150");
    cy.get(descInput).type("Testing how the system handles fake categories.");
    const fakeCate = "Category_Khong_Ton_Tai_999";

    cy.get('#category_ids')
      .filter(':visible') // Tránh lỗi trùng ID nếu có
      .should('be.visible')
      .type(fakeCate);

    cy.contains(/No results found|Không tìm thấy kết quả/i)
      .should('be.visible');
    cy.get('#category_ids').type('{enter}');
    cy.get('body').click(0, 0, { force: true });

    cy.get(createBtn).click();

    cy.contains(/Category is required|Please select a category/i)
      .should("be.visible");
});

it("TC_16- Để trống trường Hea Type → Báo lỗi ", () => {

  cy.get(nameInput).type("Service Testing Empty Hea");
  cy.get(priceInput).type("100");
  cy.get(descInput).type("Description for testing purposes");
  cy.get(heaInput)
    .filter(':visible')
    .should('be.visible')
    .clear();
      cy.get('body').click(0, 0, { force: true });
  cy.get(createBtn).click();

  cy.contains(/Type is required/i).should('be.visible');

 
});
it("TC_17 - Nhập chỉ khoảng trắng (Space) vào Hea Type → Báo lỗi", () => {
  cy.get(nameInput).type("Service Testing Space Hea");
  cy.get(priceInput).type("100");
  cy.get(descInput).type("Description for testing purposes");

  cy.get(heaInput)
    .filter(':visible') // Sử dụng :visible do hệ thống có lỗi trùng ID
    .should('be.visible')
    .clear()             
    .type("      ");   

  cy.get('body').click(0, 0, { force: true });

  cy.get(createBtn).click();

  cy.contains(/Type is required|Please select/i).should('be.visible');

  
});
it("TC_18 - Nhập Hea Type không tồn tại → Không cho phép chọn và báo lỗi", () => {
  cy.get(nameInput).type("Service Testing Space Hea");
  cy.get(priceInput).type("100");
  cy.get(descInput).type("Description for testing purposes");

  cy.get(heaInput)
    .filter(':visible') // Sử dụng :visible do hệ thống có lỗi trùng ID
    .should('be.visible')
    .clear()             
    .type("Type_Khong_Ton_Tai_999");   

  cy.get('body').click(0, 0, { force: true });

  cy.get(createBtn).click();

  cy.contains(/Type is required|Please select/i).should('be.visible');

  
});
    it('TC_19: Hiển thị popup xác nhận Discard khi bấm Cancel', () => {
    
    cy.get('input[name="title"]').type("Dữ liệu đang nhập dở...");

    cy.contains('button', 'Cancel').click();

    cy.get("div[role='dialog'], div[class*='modal']") // Selector bao quanh popup
      .should('be.visible')
      .within(() => {
          // Kiểm tra các thành phần BÊN TRONG popup
          cy.contains('Comfirm').should('be.visible'); // Tiêu đề
          cy.contains('Discard & exit').should('be.visible'); // Nội dung
          cy.contains('button', 'Cancel').should('be.visible'); // Nút Cancel nhỏ
          cy.contains('button', 'Discard').should('be.visible'); // Nút Discard xanh
      });

   
    cy.get("div[role='dialog']").contains('button', 'Cancel').click();
    
    cy.contains('Discard & exit').should('not.exist');
    cy.get('input[name="title"]').should('have.value', 'Dữ liệu đang nhập dở...');

    cy.contains('button', 'Cancel').click(); // Click Cancel trang chính
    
    // Click nút Discard màu xanh
    cy.get("div[role='dialog']").contains('button', 'Discard').click();

    cy.url().should('not.include', '/create'); // URL không còn ở trang tạo mới
});
 
    it("TC_20- Tất cả trường = đúng maxlength → Valid", () => {

      const maxName = "a".repeat(200);
      const maxDesc = "b".repeat(1000);

         cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });
  cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });
  cy.get(imgMore).selectFile([
    'cypress/fixtures/2.jpg',
    'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
  ], { force: true });

  cy.get(nameInput).type( maxName);

  // Category
  cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Sustainable Habits & Lifestyle Design")
    .click({ force: true });

cy.get('body').click(0, 0, { force: true });
  // Description
  cy.get(descInput).click().type(maxDesc );

  // Hea Type
  cy.contains("label", "Hea Type")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
    .contains("Online", { timeout: 8000 })
    .click({ force: true });

      cy.get(priceInput).type("100");

      cy.get(createBtn).click();

      cy.contains(/name.*200/i).should("not.exist");
      cy.contains(/description.*1000/i).should("not.exist");
      cy.contains(/required/i).should("not.exist");

      cy.url().should("include", "seller/my-service");
    });

    it("TC_21- Tất cả các trường < maxlength → Valid", () => {

      const shortName = "a".repeat(150);
      const shortDesc = "b".repeat(500);


       cy.get(thumbInput).selectFile('cypress/fixtures/anh-meo-gian-cute-13.jpg', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/1.jpg', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/2.jpg',
      'cypress/fixtures/3.jpg','cypress/fixtures/4.jpg'
      ], { force: true });

      cy.get(nameInput).type(shortName);
      cy.get(nameInput).invoke("val").should("have.length", 150);

     // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Sustainable Habits & Lifestyle Design")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });

      cy.get(descInput) // Selector dự đoán cho textarea
      .should('be.visible')
      .click()
      .type("ncncixhdfsxhuhfvuhxshcfvhchxuc.")

      cy.get(priceInput).type("100");
 // 1. Mở dropdown Hea Type
cy.contains("label", "Hea Type")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .click({ force: true });

// 2. Chờ dropdown render
cy.get("div[id^='headlessui-combobox-options']", { timeout: 8000 })
  .should("be.visible")
  .contains("Online", { timeout: 8000 })
  .click({ force: true });
      cy.get(createBtn).click();

      cy.contains("required").should("not.exist");
      cy.contains("max").should("not.exist");
      cy.contains("invalid").should("not.exist");

      cy.url().should("include", "seller/my-service");
    });

   
  });


