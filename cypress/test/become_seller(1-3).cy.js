Cypress.on("uncaught:exception", () => false);

describe("BECOME SELLER 1-3", () => {

  const shopNameInput = "input[placeholder='Type your answer here...']";
  const yearsInput = 'input[inputmode="numeric"]';
const specialtiesInput = 'input[placeholder*="specialties"]';
const aboutYourselfInput = "textarea[placeholder='Share something about your strengths or the value you will bring to your customers...']";


  
  before(() => {
    cy.session("login", () => {
      cy.visit("https://strongbody-web.vercel.app/login");
      cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
      cy.get("input[name='password']").type("1234567l");
      cy.get("button[type='submit']").click();
      cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
    });
  });

  
  beforeEach(() => {
   
  cy.session("login", () => {
    cy.visit("https://strongbody-web.vercel.app/login");
    cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();

    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  });

    cy.visit("https://strongbody-web.vercel.app/become-seller");

cy.contains("Create Your Dream Shop")
  .should("be.visible")
  .click({ force: true });
    cy.url().should("include", "become-seller-steps");

    cy.get(shopNameInput).should("be.visible");
  });


//*********************************************************************************************************************************** */
                                        //STEP 1
//*********************************************************************************************************************************** */

 // ------------------------------------------------------
  // UNHAPPY CASE Name Shop
  // ------------------------------------------------------
  it("TC_01 - Shop name quá  maxlength (70 chars)", () => {
  const longText = "A".repeat(120); // cố tình nhập 120 ký tự

  cy.get(shopNameInput).type(longText);

 
  cy.get(shopNameInput)
    .invoke("val")
    .should("have.length", 70);
});
it("TC_02 - Shop name nhỏ hơn minlengh(3)", () => {
  cy.get(shopNameInput).type("ab").blur();  

  cy.contains("Shop name must be at least 3 characters")
    .should("be.visible");

  
  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_03 để trống Shop name", () => {
  cy.get(shopNameInput).focus().blur(); 

  
     cy.wait(3000),
  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_04 - chỉ nhập  Space vào Shop name", () => {
  cy.get(shopNameInput).type("   ").blur();

//   cy.contains("Shop name must be at least 3 characters")
//     .should("be.visible");
    cy.wait(3000),

  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_05- Shop name trùng (duplicate shop name)", () => {

  //
  cy.get("input[type='file'][accept='image/*']")
    .selectFile("cypress/fixtures/review1.png", { force: true });
 // Nhập tên shop đã tồn tại
  cy.get(shopNameInput).type("Verre");
cy.wait(2000);
  // Click nút OK
  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  // Kiểm tra thông báo lỗi duplicate
  cy.contains(/Shop name is already taken/i, { timeout: 8000 })
    .should("be.visible");

  // Không được chuyển sang Step 2
  cy.url().should("include", "become-seller-steps");
  cy.url().should("not.include", "step=profession");

});

  // ------------------------------------------------------
  // HAPPY CASE Name Shop
  // ------------------------------------------------------
    it("TC_06 - Upload valid avatar successfully", () => {
  cy.get("input[type='file'][accept='image/*']")
    .selectFile("cypress/fixtures/review1.png", { force: true });

  // Kiểm tra avatar preview xuất hiện
  cy.get("img[alt='User avatar']")
    .should("be.visible")
    .and(($img) => {
      const src = $img.attr("src");
      expect(src).to.not.contains("default"); // không còn ảnh default
    });
});
it("TC_07 - Avatar không được thay đổi (giữ nguyên ảnh cũ) nếu upload file .txt", () => {
  // 1. CHUẨN BỊ FILE GIẢ
  const invalidFile = "cypress/fixtures/Homework 22.pptx";
  cy.writeFile(invalidFile, "Đây là file text");

  // 2. LẤY SRC CỦA ẢNH CŨ TRƯỚC
  // Ta cần lưu lại link ảnh hiện tại để so sánh sau này
  cy.get("img[alt='User avatar']")
    .invoke('attr', 'src')
    .then((oldSrc) => {
        
        cy.get("input[type='file'][accept='image/*']")
          .selectFile(invalidFile, { force: true });

      
        cy.wait(1000); // Chờ 1 chút để chắc chắn UI không đổi
        cy.get("img[alt='User avatar']")
          .should('have.attr', 'src', oldSrc);
    });
});

  
  it("TC_08- shop name=3", () => {

    // Nhập tên hợp lệ  
    cy.get(shopNameInput).type("Lin");

    // Kiểm tra input hiển thị đúng giá trị
    cy.get(shopNameInput).should("have.value", "Lin");

    // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.css", "background-color")
      .then((color) => {
        // Đảm bảo không phải màu disabled
        expect(color).to.not.eq("rgb(209, 213, 219)"); 
      });
  });
  it("TC_09-3<=shop name>=70", () => {

    // Nhập tên hợp lệ
    cy.get(shopNameInput).type("Linh Store");

    // Kiểm tra input hiển thị đúng giá trị
    cy.get(shopNameInput).should("have.value", "Linh Store");

    // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.css", "background-color")
      .then((color) => {
        // Đảm bảo không phải màu disabled
        expect(color).to.not.eq("rgb(209, 213, 219)"); 
        // Click nút OK
  cy.contains("button", /^OK$/).click();
cy.url().should("include", "become-seller-steps");
cy.url().should("include", "become-seller-steps?step=profession");
      });
  });
//************************************************************************************************/
                  
                                   // STEP 2
//************************************************************************************************/ 
// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
it("TC-10 - Không nhập specialties", () => {

  // --- MOVE TO STEP 2 ---
  //cy.get("input[type='file'][accept='image/*']")
   // .selectFile("cypress/fixtures/review1.png", { force: true });

  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/).click();
  cy.url().should("include", "step=profession");

  // --- NOW TEST STEP 2 ---
  cy.get(yearsInput).type("3");
  cy.contains("button", /^OK$/).should("be.disabled");

});
it("TC-11 - Nhập specialties rồi click ra ngoài kiểm tra button OK", () => {
  // --1- BƯỚC 1: PRE-CONDITION (Đi đến Step 2) ---
  cy.get(shopNameInput).type("Linh Store");
  cy.contains("button", /^OK$/).click();
  cy.url().should("include", "step=profession");

  
  cy.get(yearsInput).type("3");

  
  const specialtiesInputSelector = 'input[placeholder^="Choose or type your specialties"]';

  // 3. Nhập dữ liệu (Ví dụ nhập sai hoặc nhập thiếu để test validation)
  cy.get(specialtiesInputSelector).type("InputSai###"); 

 
  cy.get(specialtiesInputSelector).blur();

 
  cy.contains("button", /^OK$/).should("be.disabled");
  
  // (Optional) Kiểm tra xem có hiện lỗi đỏ không (nếu UI có validate on blur)
  // cy.contains("Specialty không hợp lệ").should("be.visible");
});
it("TC-12 - Chọn specialties rồi bỏ chọn (Select & Deselect)", () => {
  
  cy.get(shopNameInput).type("Linh Store");
  cy.contains("button", /^OK$/).click();
  
  cy.get(yearsInput).type("3"); 

  const specialtiesInputSelector = 'input[placeholder^="Choose or type"]';
  
  cy.get(specialtiesInputSelector).click();

 
  cy.contains("div", "Family Physician").click(); 

 
  cy.contains("Family Physician").should("be.visible");

  
  cy.contains("button", /^OK$/).should("not.be.disabled");

  cy.contains("Family Physician")
    .parent()      
    .find("svg")    
    .click();

  cy.contains("Family Physician").should("not.exist");

  
  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC-13 - Không nhập years", () => {
  cy.get(shopNameInput).type("Linh Store");
  cy.contains("button", /^OK$/).click();
  cy.contains("Formally Trained & Certified Expert").click();
  cy.get(specialtiesInput).type("Yoga{enter}");

  cy.contains("button", /^OK$/).should("be.disabled");
});

it("TC_14- Nhập years âm", () => {

  // --- STEP 1 ---
  cy.get("input[type='file'][accept='image/*']")
    .selectFile("cypress/fixtures/review1.png", { force: true });
  
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

 
  cy.url().should("include", "step=profession");

  
  cy.contains("Formally Trained & Certified Expert").click();

 
  cy.contains("Choose your specialties")
    .parent()
    .find("svg")    // icon dropdown
    .click({ force: true });

 
  cy.contains("General Practitioner (GP)").click({ force: true });

  
  cy.contains("General Practitioner (GP)").should("be.visible");

  

  // --- YEARS ÂM ---
 cy.get(yearsInput).type("abc").blur();
  cy.contains("Please enter valid years of experience").should("be.visible");

  // --- OK DISABLED ---
  cy.contains("button", /^OK$/).should("be.disabled");
});


it("TC_15- Nhập letters vào years", () => {
   // --- STEP 1 ---

  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  // VERIFY STEP 2 LOADED
  cy.url().should("include", "step=profession");

  // SELECT PROFESSION
  cy.contains("Formally Trained & Certified Expert").click();

  // --- OPEN SPECIALTIES DROPDOWN ---
  cy.contains("Choose your specialties")
    .parent()
    .find("svg")    // icon dropdown
    .click({ force: true });

  // --- SELECT SPECIALTY ITEM ---
  cy.contains("General Practitioner (GP)").click({ force: true });

  // VERIFY TAG APPEARED
  cy.contains("General Practitioner (GP)").should("be.visible");

  cy.get(yearsInput).type("abc").blur();

  cy.contains("Please enter valid years of experience").should("be.visible");
  cy.contains("button", /^OK$/).should("be.disabled");
});



// ------------------------------------------------------
  // HAPPY CASE Name Shop
  // ------------------------------------------------------
  it("TC_17- dữ liêu hợp lệ", () => {
 // --- STEP 1 ---


  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  
  cy.url().should("include", "step=profession");

  
  cy.contains("Formally Trained & Certified Expert").click();

 
  cy.contains("Choose your specialties")
    .parent()
    .find("svg")    // icon dropdown
    .click({ force: true });

  cy.contains("General Practitioner (GP)").click({ force: true });

  cy.contains("General Practitioner (GP)").should("be.visible");

  cy.get(yearsInput).type("3");

    cy.contains("button", /^OK$/)  
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.css", "background-color")
      .then((color) => {
        // Đảm bảo không phải màu disabled
        expect(color).to.not.eq("rgb(209, 213, 219)"); 
});

});
it("TC_18- OK button enabled when all fields valid (multi specialties)", () => {

  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/).click();

  
  cy.url().should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.contains("Choose your specialties")
    .parent()
    .find("svg")
    .eq(0)                 
    .click({ force: true });

  cy.contains("General Practitioner (GP)").click({ force: true });

  cy.contains("General Practitioner (GP)").should("be.visible");

 
  cy.contains("Choose your specialties")
    .parent()
    .find("svg")
    .eq(0)
    .click({ force: true });

  cy.contains("Family Physician").click({ force: true });

  cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3").blur();

  

  cy.contains("button", /^OK$/)
    .should("be.visible")
    .and("not.be.disabled")
    .and("have.css", "background-color")
    .then((color) => {
      expect(color).to.not.eq("rgb(209, 213, 219)");
    cy.contains("button", /^OK$/).click();
    cy.url().should("include", "become-seller-steps?step=profession");
     cy.url().should("include", "become-seller-steps?step=category");
    });
});
//************************************************************************************************/
                  
                                   // STEP 3
//************************************************************************************************/ 
// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------

  it("TC_19-Không chọn category)", () => {

  // --- STEP 1 ---

  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/).click();

  // VERIFY STEP 2
  cy.url().should("include", "step=profession");

  // SELECT PROFESSION
  cy.contains("Formally Trained & Certified Expert").click();

  cy.contains("Choose your specialties")
    .parent()
    .find("svg")
    .eq(0)                 // icon dropdown
    .click({ force: true });

  cy.contains("General Practitioner (GP)").click({ force: true });

  cy.contains("General Practitioner (GP)").should("be.visible");
 

  cy.get(yearsInput).type("3").blur();
    cy.contains("button", /^OK$/).click();
    cy.url().should("include", "become-seller-steps?step=profession");
     cy.url().should("include", "become-seller-steps?step=category");
     cy.contains("button", /^OK$/).should("be.disabled");
    });

 it("TC_20-chỉ nhập space vào category)", () => {


  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/).click();

  cy.url().should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.contains("Choose your specialties")
    .parent()
    .find("svg")
    .eq(0)                
    .click({ force: true });

  cy.contains("General Practitioner (GP)").click({ force: true });

  cy.contains("General Practitioner (GP)").should("be.visible");


  cy.get(yearsInput).type("3").blur();
    cy.contains("button", /^OK$/).click();
    cy.url().should("include", "become-seller-steps?step=profession");
     cy.url().should("include", "become-seller-steps?step=category");

});
it("TC_21 - Chọn category rồi bỏ chọn (Select & Deselect)", () => {
  cy.get(shopNameInput).type("Linh Store");
  cy.contains("button", /^OK$/).click();

  cy.contains("Formally Trained & Certified Expert").click();
  cy.contains("Choose your specialties")
    .parent().find("svg").eq(0).click({ force: true });
  cy.contains("General Practitioner (GP)").click({ force: true });
  cy.get(yearsInput).type("3").blur();

  cy.contains("button", /^OK$/).click();
  
  cy.url({ timeout: 10000 }).should("include", "step=category");


  
  // 1. Mở Dropdown
  cy.get("input[placeholder='Select a category to sell your service']")
    .parent()          
    .find("button")    
    .should('exist')
    .and('not.be.disabled') 
    .click({ force: true }); 

  // 2. Chọn "MedSupport"
  cy.contains("MedSupport", { timeout: 5000 })
    .should('be.visible')  
    .click({ force: true });

  
  cy.get("input[placeholder='Select a category to sell your service']")
    .should('have.value', 'MedSupport'); 
  
  
  cy.contains("button", /^OK$/).should("not.be.disabled");

    cy.get("input[placeholder='Select a category to sell your service']")
      .clear({ force: true }); 

    cy.get("input[placeholder='Select a category to sell your service']")
      .should('have.value', '');
  // 2. Kiểm tra nút OK bị Disabled trở lại
  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_22 - Nhập Category sai rồi click ra ngoài (Invalid Input & Click Body)", () => {
   
    cy.get(shopNameInput).type("Linh Store");
    cy.contains("button", /^OK$/).click();

    cy.contains("Formally Trained & Certified Expert").click();
    cy.contains("Choose your specialties").parent().find("svg").eq(0).click({ force: true });
    cy.contains("General Practitioner (GP)").click({ force: true });
    cy.get(yearsInput).type("3").blur();
    
    cy.contains("button", /^OK$/).click();
    cy.url().should("include", "step=category");

    const invalidCategory = "Category Ảo Ma Canada";
   
    cy.get("input[placeholder='Select a category to sell your service']")
      .type(invalidCategory);
    cy.get('body').click(0, 0, { force: true }); 

    cy.contains("button", /^OK$/).should("be.disabled");

});
// ------------------------------------------------------
  //HAPPY CASE
  // ------------------------------------------------------

it("TC_23- Dữ liệu hợp lệ Category → Next Step thành công", () => {

  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.contains("Choose your specialties")
    .parent()
    .find("svg").eq(0)
    .click();

  cy.contains("General Practitioner (GP)").click();

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

  // --- Step 3: Category ---
  cy.url({ timeout: 10000 }).should("include", "step=category");

  
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           
  .find("button")     
  .should('exist')
  .and('not.be.disabled') 
  .click({ force: true }); 


cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible') 
  .click({ force: true });

    cy.contains("button", /^OK$/)   
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.css", "background-color")
      .then((color) => {
        expect(color).to.not.eq("rgb(209, 213, 219)"); 

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

    cy.url().should("include", "step=introduce");
});

});

});
 





