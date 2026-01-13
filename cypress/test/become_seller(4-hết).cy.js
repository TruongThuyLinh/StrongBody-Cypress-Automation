Cypress.on("uncaught:exception", () => false);

describe("BECOME SELLER 5-7", () => {

  const shopNameInput = "input[placeholder='Type your answer here...']";
  const yearsInput = 'input[inputmode="numeric"]';
const specialtiesInput = 'input[placeholder*="specialties"]';
const aboutYourselfInput = "textarea[placeholder='Share something about your strengths or the value you will bring to your customers...']";
const countryInput="input[placeholder='Select your country']";
const fullAddressInput='input[placeholder="Full Address"]';
 const specialtiesInputSelector = 'input[placeholder^="Choose or type"]';

 const login = () => {
  cy.visit("/login");
  
  // cy.contains('button', 'English', { timeout: 10000 })
  //   .should('be.visible')
  //   .click();

  // // Chúng ta đợi cho đến khi Modal "Select Your Language" biến mất hoàn toàn
  // cy.get('h2').contains('Select Your Language', { timeout: 10000 }).should('not.exist');
  
  cy.wait(2000); 

  cy.get("#email", { timeout: 15000 }).should('be.visible');
  
  cy.get("#email").focus().clear().type("thuylinh1020tb@gmail.com");

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
    cy.visit("/become-seller");
    cy.wait(2000);
cy.contains("Start Selling Now — From $15/month")
  .should("be.visible")
  .click();
    cy.url().should("include", "become-seller-steps");
   
    cy.get(shopNameInput).should("be.visible");
  });

  //************************************************************************************************/              
                                   // STEP 4
//************************************************************************************************/ 
// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
  it("TC_23-Bỏ trống Introduce about yourself->Báo lỗi", () => {
    

  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

 
  cy.get(aboutYourselfInput).should("be.visible");

  cy.contains("button", /^OK$/).should("be.disabled");

});  
it("TC_24-Chỉ nhập space Introduce about yourself->Báo lỗi", () => {

  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));


  cy.get(aboutYourselfInput)
    .should("be.visible")
    .type("   ", { delay: 100 });
      cy.contains("Introduction must be at least 100 characters").should("be.visible");
     cy.contains("button", /^OK$/).should("be.disabled");

}); 

it("TC_25 - Introduce about yourself nhỏ hơn minlengh-> báo lỗi ", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

//    // --- Step 3: Category ---
//   cy.url({ timeout: 10000 }).should("include", "step=category");
// // 1. Định vị từ Input -> Lên Cha -> Tìm Button
// cy.get("input[placeholder='Select a category to sell your service']")
//   .parent()           // Leo lên thẻ chứa (Wrapper)
//   .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
//   .should('exist')
//   .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
//   .click({ force: true }); // Click mạnh

// // Chờ menu option mount và visible
// cy.contains("MedSupport", { timeout: 5000 })
//   .should('be.visible')  // đảm bảo menu hiển thị
//   .click({ force: true });


  // OK should be enabled
  //cy.contains("button", /^OK$/).should("not.be.disabled").click();

  const text99 = "a".repeat(99); // tạo mô tả 99 ký tự

  cy.get(aboutYourselfInput)
    .type(text99)
    .blur(); // kích hoạt validate

  
  cy.contains("Introduction must be at least 100 characters").should("be.visible");

  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_26 - Nhập Introduce about yourself rồi xóa -> Nút OK phải bị disabled", () => {
  cy.get(shopNameInput).type("Linh Store");
  cy.contains("button", /^OK$/).click();
  cy.url({ timeout: 10000 }).should("include", "step=profession");
  cy.contains("Formally Trained & Certified Expert").click();
   cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible"); 
  cy.get(yearsInput).type("3");
  cy.contains("button", /^OK$/).click();
  const validIntro = "This is a professional introduction that contains more than one hundred characters to ensure the validation passes successfully for this specific test case scenario.";
  cy.get(aboutYourselfInput).clear().type(validIntro);
  cy.contains("button", /^OK$/).should("not.be.disabled");
  cy.get(aboutYourselfInput).clear().blur(); 
  cy.contains("button", /^OK$/).should("be.disabled");

  // Kiểm tra thông báo lỗi (thường là "Introduction is required" hoặc báo đỏ)
  // Tùy vào message hệ thống của bạn, ví dụ:
  cy.contains(/required|at least 100 characters/i).should("be.visible");
});
it("TC_27- Introduce không cho nhập quá maxlengh và dưới 20 từ-> tự cắt giới hạn 2000 ký tự và thông báo lỗi ", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

const overMax = "a".repeat(2100);   // cố tình vượt 2000 ký tự

  cy.get(aboutYourselfInput)
    .clear()
    .type(overMax, { delay: 0 }); // UI sẽ tự cắt tại 2000

  cy.get(aboutYourselfInput)
    .invoke("val")
    .then((text) => {
      // UI phải cắt xuống đúng max length
      expect(text.length).to.eq(2000);
    });

//  //Kiểm tra nút OK bật 
//  cy.contains("button", /^OK$/) 
//  .should("be.visible")  .and("not.be.disabled")
//   .and("have.css", "background-color") 
//    .then((color) => { 
//   //Đảm bảo không phải màu disabled 
//  expect(color).to.not.eq("rgb(209, 213, 219)"); 
//  });
  cy.contains(/Introduction must contain at least 20 words/i).should("be.visible");

});

it("TC_28-nhập số điện thoại vào Introduce about yourself->báo lỗi ", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

   cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");
  cy.contains("General Practitioner (GP)").click();
  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));


cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for.Contact me at 0987654321 for more info.");
  cy.contains("Must not contain phone numbers, emails, or links").should("be.visible");
  cy.contains("button", /^OK$/).should("be.disabled");
});

it("TC_29-nhập email vào Introduce about yourself ", () => {
// Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");
  cy.contains("General Practitioner (GP)").click();

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));
cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for.Contact me at truongthuylinh2004tb@gmail.com for more info.");
  cy.contains("Must not contain phone numbers, emails, or links").should("be.visible");
  cy.contains("button", /^OK$/).should("be.disabled");
});



// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
  it("TC_30- minlengh<Introduce about yourself hợp lệ <maxlengh ", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

 cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for");
 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
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
cy.url().should("include", "become-seller-steps?step=introduce");
cy.url().should("include", "become-seller-steps?step=certification");


   });
});

  //*********************************************************************************************************************************** */
                                        //STEP 5
//*********************************************************************************************************************************** */

 // ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
it("TC_31: Step 5 dũ liệu hợp lệ", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for");
 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
  // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
        // Click nút OK
  cy.contains("button", /^OK$/).click();
  cy.contains("button", /^OK$/).click();

   });
   //*********************************************************************************************************************************** */
                                        //STEP 6
//*********************************************************************************************************************************** */



 // ------------------------------------------------------
  // UNHAPPY CASE 
  // ------------------------------------------------------
  it("TC_32: để trống country", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for");
 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
  // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
        // Click nút OK
  cy.contains("button", /^OK$/).click();
  cy.contains("button", /^OK$/).click();
  cy.get(countryInput).should("be.visible");

 // Điền full address hợp lệ
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi 100000');
    //  cy.contains("Country is required")
    // .should("be.visible");

    cy.contains("button", /^OK$/).should("be.disabled");


 });
//  it("TC_33: Nhập Country rồi xóa (Type & Clear)", () => {
//     // --- STEP 1: SHOP NAME ---
//     cy.get(shopNameInput).type("Linh Store");
//     cy.contains("button", /^OK$/).should("not.be.disabled").click();

//     cy.url({ timeout: 10000 }).should("include", "step=profession");
//     //cy.contains("Formally Trained & Certified Expert").click();
    
//    cy.get(specialtiesInputSelector).click();
//   cy.contains("div", "Family Physician").click(); 
// // Thêm force: true vào lệnh click
// cy.get('body').click(0, 0, { force: true });  
// cy.contains("Family Physician").should("be.visible");

//     // Nhập năm kinh nghiệm
//     cy.get(yearsInput).type("3");
//     cy.contains("button", /^OK$/).should("not.be.disabled").click();

//     // --- STEP 4: ABOUT YOURSELF ---
//     cy.get(aboutYourselfInput)
//       .clear()
//       .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
    
//     cy.contains("button", /^OK$/).should("not.be.disabled").click();
//     cy.contains("button", /^OK$/).should("not.be.disabled").click();

//     cy.get(countryInput).should("be.visible");
//     cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi');
    
//     cy.get(countryInput).type("Vietnam");
   
//     cy.contains("button", /^OK$/).should("not.be.disabled");

//     cy.get(countryInput).clear();
    
//     cy.get(countryInput).blur(); 
//     cy.contains("Country is required")
//     .should("be.visible");

//     cy.contains("button", /^OK$/).should("be.disabled");
// });
it("TC_34: Nhập Country sai rồi click ra ngoài (Invalid Input & Click Body)", () => {
    
    cy.get(shopNameInput).type("Linh Store");
    cy.contains("button", /^OK$/).click();

    cy.contains("Formally Trained & Certified Expert").click();
    cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 

cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");
    cy.get(yearsInput).type("3");
    cy.contains("button", /^OK$/).click();
    

    cy.get(aboutYourselfInput).clear() 
    .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
    cy.contains("button", /^OK$/).click();
     cy.contains("button", /^OK$/).click();
    
    cy.get(countryInput).should("be.visible");

    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi');
    const invalidCountry = "Quoc Gia Ao Ma 123";
    cy.get(countryInput).type(invalidCountry);

    cy.get('body').click(0, 0, { force: true });

    cy.contains("button", /^OK$/).should("be.disabled");
    cy.contains("Please select a valid country from the list")
    .should("be.visible");


});
// it("TC_35: Tìm kiếm Country và chọn kết quả hợp lệ -> Nút OK được bật", () => {
   
//     cy.get(shopNameInput).clear().type("Linh Store");
//     cy.contains("button", /^OK$/).click();
//     cy.contains("Formally Trained & Certified Expert").click();
//     cy.get(specialtiesInputSelector).click().type("Fami");
//     cy.contains("div", "Family Physician").should("be.visible").click(); 
//     cy.get('body').click(0, 0, { force: true }); // Đóng dropdown specialties
//     cy.get(yearsInput).clear().type("3");
//     cy.contains("button", /^OK$/).click();

//     cy.get(aboutYourselfInput).clear() 
//         .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
//     cy.contains("button", /^OK$/).click();
//      cy.contains("button", /^OK$/).click();
//     cy.wait(500); 
//     cy.get(fullAddressInput).should("be.visible").clear().type('123 Le Loi, Hanoi');
//     cy.get(countryInput)
//         .should("be.visible")
//         .clear()
//         .type("Viet");
//     cy.contains("div", "Vietnam", { timeout: 10000 })
//         .should("be.visible")
//         .click();
//     cy.get('body').click(0, 0, { force: true });


//     cy.get(countryInput).should('not.have.value', ''); 

//     cy.contains("button", /^OK$/)
//         .should("be.visible")
//         .and("not.be.disabled"); //
// });
it("TC_36: Nhập space trước 'Viet' và chọn 'Vietnam'  -> Nút OK được bật", () => {
   
    cy.get(shopNameInput).clear().type("Linh Store");
    cy.contains("button", /^OK$/).click();
    cy.contains("Formally Trained & Certified Expert").click();
    cy.get(specialtiesInputSelector).click().type("Fami");
    cy.contains("div", "Family Physician").should("be.visible").click(); 
    cy.get('body').click(0, 0, { force: true }); // Đóng dropdown specialties
    cy.get(yearsInput).clear().type("3");
    cy.contains("button", /^OK$/).click();

    cy.get(aboutYourselfInput).clear() 
        .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
    cy.contains("button", /^OK$/).click();
     cy.contains("button", /^OK$/).click();
    cy.wait(500); 
    cy.get(fullAddressInput).should("be.visible").clear().type('123 Le Loi, Hanoi');
    cy.get(countryInput)
        .should("be.visible")
        .clear()
        .type("    Viet");
    cy.contains("div", "Vietnam", { timeout: 10000 })
        .should("be.visible")
        .click();
    cy.get('body').click(0, 0, { force: true });


    cy.get(countryInput).should('not.have.value', ''); 

    cy.contains("button", /^OK$/)
        .should("be.visible")
        .and("not.be.disabled"); //
});
 it("TC_37: Chỉ nhập space country", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));

cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for");
 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
  // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
        // Click nút OK
  cy.contains("button", /^OK$/).click();
  cy.contains("button", /^OK$/).click();
   // Đảm bảo rỗng trước
    cy.get(countryInput).clear().should('have.value', '');

    // Nhập chỉ khoảng trắng
    cy.get(countryInput).type('   ');

cy.get('body').click(0, 0, { force: true });  
   
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi 100000');
    
  cy.contains("button", /^OK$/).should("be.disabled");
    cy.contains("Country is required")
    .should("be.visible");
    


 });
 // ------------------------------------------------------
  // HAPPY CASE Name Shop
  // ------------------------------------------------------
it("TC_38:Dữ liệu hợp lê-> step 7", () => {
  // Step 1: Shop Name
  cy.get(shopNameInput).type("Linh Store");

  cy.contains("button", /^OK$/)
    .should("not.be.disabled")
    .click();

  cy.url().then(url => cy.log("After Step1 URL:", url));

  // --- Step 2: Profession ---
  cy.url({ timeout: 10000 }).should("include", "step=profession");

  cy.contains("Formally Trained & Certified Expert").click();

  cy.get(specialtiesInputSelector).click();
  cy.contains("div", "Family Physician").click(); 
// Thêm force: true vào lệnh click
cy.get('body').click(0, 0, { force: true });  
cy.contains("Family Physician").should("be.visible");

  cy.get(yearsInput).type("3");

  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  cy.url().then(url => cy.log("After Step2 URL:", url));


cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for");
 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
  // Kiểm tra nút OK bật
    cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
        // Click nút OK
  cy.contains("button", /^OK$/).click();
  cy.contains("button", /^OK$/).click();
   // Đảm bảo rỗng trước
    cy.get(countryInput).clear().should('have.value', '');

  cy.get(countryInput)
    .parent()
    .find("svg")
    .eq(0)
    .click({ force: true });
    // Chờ dropdown menu mount và visible

  
cy.get(countryInput).parent().find('svg').click({ force: true }); // mở dropdown
cy.get('body').contains('Singapore', { timeout: 5000 }).click({ force: true });
 // Điền full address hợp lệ
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi 100000');
    //  cy.contains("Country is required")
    // .should("be.visible");
     cy.contains("button", /^OK$/)   // dùng regex match chính xác text "OK"
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.css", "background-color")
      .then((color) => {
        // Đảm bảo không phải màu disabled
        expect(color).to.not.eq("rgb(209, 213, 219)"); 
  cy.contains("button", /^OK$/).should("not.be.disabled").click();
  });

 });


  });

