Cypress.on("uncaught:exception", () => false);

describe("CREATE HEA SERVICE — FULL TESTING", () => {

  const login = () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("liveb58966@m3player.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();
    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  };
  const thumbInput = "input#cover-upload";//id
  const moreImageInput = "input#service-images-upload-more";  //id

const nameInput = "input#title"; 

  const categoryLabel = "label:contains('Category')";
  const categoryInput = "label:contains('Category') + div input[role='combobox']";

  const descInput = 'textarea, div[data-field="description"] textarea';
 

  const priceInput = "input#price, input[name='price'], input[placeholder='Enter price']";

  const typeLabel = "label:contains('Hea Type')";
  const heaTypeInput = "label:contains('Hea Type') + div input[role='combobox']";

  const typeSelect = "select[name='type']";

const galleryEmptyUploads = "input[type='file'][accept^='image']";

  const createBtn = "button:contains('Create Hea')";
  const cancelBtn = "button:contains('Cancel')";
const imgSlot1 = "#service-images-upload-0";          // Ảnh review đầu tiên
const imgMore = "#service-images-upload-more";        // Upload nhiều ảnh


  beforeEach(() => {
    cy.session("login", login);


    cy.url().then((url) => {
        if (!url.includes("seller/read-me")) {
            cy.log("⚠️ Không vào thẳng được Dashboard -> Phải đi từ Become Seller");
            //cy.visit("https://strongbody-web.vercel.app/become-seller");
            cy.visit("https://strongbody-web.vercel.app/buyer/dashboard");
          cy.wait(1000);
            cy.contains("Switch to Seller", { timeout: 20000 }).click({ force: true });
             cy.wait(1000);
           // cy.visit("https://strongbody-web.vercel.app/seller/read-me");
        }
    });

    cy.get("body", { timeout: 15000 }).should("contain", "Create a service");
    cy.wait(500); 

    cy.contains("span", "Create a service")
      .should("be.visible")
      .parent() // Click vào thẻ cha
      .click({ force: true });

    // 5. Chốt chặn: Đảm bảo vào đúng trang
    cy.url({ timeout: 20000 }).should("include", "seller/create-service");
    
    cy.wait(1000);
  });


  
it("TC_01- Nhấn mũi tên tăng → Price tăng +1", () => {
  cy.get(priceInput)
    .clear()
    .type("10");        // giá ban đầu = 10

  cy.get(priceInput)
    .type("{uparrow}"); // simulate click nút tăng ▲

  cy.get(priceInput)
    .should("have.value", "11");  // kỳ vọng = 11
});
it("TC_02- Không cho giá < 0 khi nhấn ▼", () => {
  cy.get(priceInput)
    .clear()
    .type("0");

  cy.get(priceInput).type("{downarrow}");

  cy.get(priceInput)
    .should("have.value", "0"); // không giảm dưới 0
});

    it("TC_03- Bỏ trống tên → báo lỗi", () => {

     cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/review2.png',
  'cypress/fixtures/review3.png'
   ], { force: true });

cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Vegetarian or Vegan Diet Guidance")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });


      cy.get('textarea, div[data-field="description"] textarea') // Selector dự đoán cho textarea
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
   
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgMore).selectFile(['cypress/fixtures/review2.png', 'cypress/fixtures/review3.png'], { force: true });

    // Chọn Category
    cy.contains("label", "Category").parent().find("button[id^='headlessui-combobox-button']").first().click({ force: true });
    cy.get("div[id^='headlessui-combobox-options']").contains("Vegetarian or Vegan Diet Guidance").click({ force: true });
cy.get('body').click(0, 0, { force: true });
    // Nhập Description
    cy.get('textarea, div[data-field="description"] textarea')
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

     
     cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/review2.png',
  'cypress/fixtures/review3.png'
], { force: true });
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']")
  .contains("Vegetarian or Vegan Diet Guidance")
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

      cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

     cy.get(imgMore).selectFile([
  'cypress/fixtures/review2.png',
  'cypress/fixtures/review3.png'
   ], { force: true });
      cy.get(nameInput).type("Valid Name");
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

cy.get("div[id^='headlessui-combobox-options']")
  .contains("Vegetarian or Vegan Diet Guidance")
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

   cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/review2.png',
  'cypress/fixtures/review3.png'
  ], { force: true });
  cy.get(nameInput).type("Valid Name");

  cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .first()
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Vegetarian or Vegan Diet Guidance")
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

  cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
  cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
  cy.get(imgMore).selectFile([
    'cypress/fixtures/review2.png',
    'cypress/fixtures/review3.png'
  ], { force: true });

  cy.get(nameInput).type("Valid Name");

  // Category
  cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Vegetarian or Vegan Diet Guidance")
    .click({ force: true });

cy.get('body').click(0, 0, { force: true });
  // Description
  cy.get(descInput).click().type("Valid description");

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


    it("TC_10- Upload ít hơn 4 ảnh → báo lỗi", () => {

       const file1 = "cypress/fixtures/review1.png";

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
  .contains("Vegetarian or Vegan Diet Guidance")
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
  
  it("TC_11 - Bỏ trống mô tả, các trường khác hợp lệ", () => {

      const file = "cypress/fixtures/review1.png";

       cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

    cy.get(imgMore).selectFile([
  'cypress/fixtures/review2.png',
  'cypress/fixtures/review3.png'
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
  .contains("Vegetarian or Vegan Diet Guidance")
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
    cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });
    cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });
    cy.get(imgMore).selectFile(['cypress/fixtures/review2.png', 'cypress/fixtures/review3.png'], { force: true });

    // Nhập tên
    cy.get(nameInput).type("Valid HEA Name with Space Desc");

    // Chọn Category
    cy.contains("label", "Category")
      .parent()
      .find("button[id^='headlessui-combobox-button']")
      .first()
      .click({ force: true });

    cy.get("div[id^='headlessui-combobox-options']")
      .contains("Vegetarian or Vegan Diet Guidance")
      .click({ force: true });
cy.get('body').click(0, 0, { force: true });
    // Nhập giá
    cy.get(priceInput).type("100");

    
    cy.get('textarea, div[data-field="description"] textarea') 
      .should('be.visible')
      .click()
      .type("     "); // Nhập 5 dấu cách

    // --- 3. SUBMIT ---
    cy.get(createBtn).click();

    cy.contains(/description is required/i).should("not.exist");
});

    it('TC_13: Hiển thị popup xác nhận Discard khi bấm Cancel', () => {
    
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
 
    it("TC_14- Tất cả trường = đúng maxlength → Valid", () => {

      const maxName = "a".repeat(200);
      const maxDesc = "b".repeat(1000);

       cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/review2.png',
      'cypress/fixtures/review3.png'
      ], { force: true });

      cy.get(nameInput).type(maxName);

     // Mở dropdown Category
cy.contains("label", "Category")
  .parent()
  .find("button[id^='headlessui-combobox-button']")
  .first()
  .click({ force: true });

// Chọn option
cy.get("div[id^='headlessui-combobox-options']")
  .contains("Vegetarian or Vegan Diet Guidance")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });

      cy.get(descInput).click().type(maxDesc, { delay: 0 });
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

      cy.contains(/name.*200/i).should("not.exist");
      cy.contains(/description.*1000/i).should("not.exist");
      cy.contains(/required/i).should("not.exist");

      cy.url().should("include", "seller/my-service");
    });

    it("TC_15- Tất cả các trường < maxlength → Valid", () => {

      const shortName = "a".repeat(150);
      const shortDesc = "b".repeat(500);

       const file = "cypress/fixtures/review1.png";

       cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/review2.png',
      'cypress/fixtures/review3.png'
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
  .contains("Vegetarian or Vegan Diet Guidance")
  .click({ force: true });
cy.get('body').click(0, 0, { force: true });

      cy.get('textarea, div[data-field="description"] textarea') // Selector dự đoán cho textarea
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
it("TC_09- Price bằng 0", () => {

       cy.get(thumbInput).selectFile('cypress/fixtures/thumbnail.png', { force: true });

       cy.get(imgSlot1).selectFile('cypress/fixtures/review1.png', { force: true });

       cy.get(imgMore).selectFile([
      'cypress/fixtures/review2.png',
      'cypress/fixtures/review3.png'
      ], { force: true });
      cy.get(nameInput).type("Valid Name");

      
   cy.contains("label", "Category")
    .parent()
    .find("button[id^='headlessui-combobox-button']")
    .first()
    .click({ force: true });

  cy.get("div[id^='headlessui-combobox-options']")
    .contains("Vegetarian or Vegan Diet Guidance")
    .click({ force: true });
cy.get('body').click(0, 0, { force: true });

      cy.get(descInput).click().type("Valid description");
cy.get('body').click(0, 0, { force: true });
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

      cy.contains("required").should("not.exist");
      cy.contains("max").should("not.exist");
      cy.contains("invalid").should("not.exist");

      cy.url().should("include", "seller/my-service");
    });
   
  });


