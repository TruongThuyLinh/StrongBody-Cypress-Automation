Cypress.on("uncaught:exception", () => false);

describe("BECOME SELLER 5-7", () => {

  const shopNameInput = "input[placeholder='Type your answer here...']";
  const yearsInput = 'input[inputmode="numeric"]';
const specialtiesInput = 'input[placeholder*="specialties"]';
const aboutYourselfInput = "textarea[placeholder='Share something about your strengths or the value you will bring to your customers...']";
const countryInput="input[placeholder='Select your country']";
const fullAddressInput='input[placeholder="Full Address"]';

 
  before(() => {
    cy.session("login", () => {
      cy.visit("https://strongbody.ai/login");
      cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
      cy.get("input[name='password']").type("1234567l");
      cy.get("button[type='submit']").click();
      cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
    });
  });


  beforeEach(() => {
   
  cy.session("login", () => {
    cy.visit("https://strongbody.ai/login");
    cy.get("input[name='email']").type("thuylinh1020tb@gmail.com");
    cy.get("input[name='password']").type("1234567l");
    cy.get("button[type='submit']").click();

    cy.get("span.flex.items-center.gap-1", { timeout: 20000 }).should("be.visible");
  });

    cy.visit("https://strongbody.ai/become-seller");
//cy.wait(2000);
cy.contains("Create Your Dream Shop")
  .should("be.visible")
  .click({ force: true });
    cy.url().should("include", "become-seller-steps");

    cy.get(shopNameInput).should("be.visible");
  });

  //************************************************************************************************/
                  
                                   // STEP 4
//************************************************************************************************/ 
// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
  it("TC_25-Bỏ trống Introduce about yourself", () => {

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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh
  
// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  

  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();
  // step 4
  // Không nhập gì
  cy.get(aboutYourselfInput).should("be.visible");

  cy.contains("button", /^OK$/).should("be.disabled");

});  
it("TC_26-Chỉ nhập space Introduce about yourself", () => {

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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });

  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();
  // step 4

  // Không nhập gì
  cy.get(aboutYourselfInput).type("   ").should("have.value", "   ");
      

     cy.contains("button", /^OK$/).should("be.disabled");

}); 

it("TC_27 - Introduce about yourself nhỏ hơn minlengh ", () => {
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
// 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });


  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

  const text99 = "a".repeat(99); // tạo mô tả 99 ký tự

  cy.get(aboutYourselfInput)
    .type(text99)
    .blur(); // kích hoạt validate

  // ❌ Expect validation error
  //cy.contains("100 - 2000 characters").should("be.visible");
  cy.contains("Introduction must be at least 100 characters").should("be.visible");

  // ❌ Button OK vẫn phải disabled
  cy.contains("button", /^OK$/).should("be.disabled");
});
it("TC_28 - Introduce about yourself quá maxlengh ", () => {
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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  
  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();
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

 //Kiểm tra nút OK bật 
 cy.contains("button", /^OK$/) 
 //dùng regex match chính xác text "OK" 
 .should("be.visible")  .and("not.be.disabled")
  .and("have.css", "background-color") 
   .then((color) => { 
  //Đảm bảo không phải màu disabled 
 expect(color).to.not.eq("rgb(209, 213, 219)"); 
 });
});

it("TC_29-nhập số điện thoại vào Introduce about yourself ", () => {
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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  

  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for.Contact me at 0987654321 for more info.");
  cy.contains("Must not contain phone numbers, emails, or links").should("be.visible");
  cy.contains("button", /^OK$/).should("be.disabled");
});

it("TC_30-nhập email vào Introduce about yourself ", () => {
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

// 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh
// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });

  // Validate selected value
  cy.get("input[placeholder='Select a category to sell your service']")
    .should("have.value", "MedSupport");

  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();
cy.get(aboutYourselfInput)
  .clear()
  .type("If you need more information, you can contact me through the appropriate communication channels. I am always ready to support you and provide everything you are looking for.Contact me at truongthuylinh2004tb@gmail.com for more info.");
  cy.contains("Must not contain phone numbers, emails, or links").should("be.visible");
  cy.contains("button", /^OK$/).should("be.disabled");
});



// ------------------------------------------------------
  // UNHAPPY CASE
  // ------------------------------------------------------
  it("TC_27- minlengh<Introduce about yourself hợp lệ <maxlengh ", () => {
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

// 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  
  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

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
it("TC_28: Step 5 dũ liệu hợp lệ", () => {
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

  // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  
  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

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
  it("TC_29: để trống country", () => {
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

  // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  
  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

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
 it("TC_30: Nhập Country rồi xóa (Type & Clear)", () => {
    // --- STEP 1: SHOP NAME ---
    cy.get(shopNameInput).type("Linh Store");
    cy.contains("button", /^OK$/).should("not.be.disabled").click();

    // --- STEP 2: PROFESSION ---
    cy.url({ timeout: 10000 }).should("include", "step=profession");
    cy.contains("Formally Trained & Certified Expert").click();
    
    // Chọn Specialties
    cy.contains("Choose your specialties").parent().find("svg").eq(0).click();
    cy.contains("General Practitioner (GP)").click();
    
    // Nhập năm kinh nghiệm
    cy.get(yearsInput).type("3");
    cy.contains("button", /^OK$/).should("not.be.disabled").click();

     // --- Step 3: Category ---
  cy.url({ timeout: 10000 }).should("include", "step=category");

  // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
    // Click OK Step 3
    cy.contains("button", /^OK$/).should("not.be.disabled").click();

    // --- STEP 4: ABOUT YOURSELF ---
    cy.get(aboutYourselfInput)
      .clear()
      .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
    
    // Click OK Step 4
    cy.contains("button", /^OK$/).should("not.be.disabled").click();
    // Click OK Step 4
    cy.contains("button", /^OK$/).should("not.be.disabled").click();

    // --- STEP 5: LOCATION (TEST LOGIC CHÍNH Ở ĐÂY) ---
    cy.get(countryInput).should("be.visible");

    // 1. Nhập đầy đủ thông tin HỢP LỆ trước (Để đảm bảo nút OK sáng lên)
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi');
    
    // Nhập Country (Giả sử là ô nhập text hoặc autocomplete)
    cy.get(countryInput).type("Vietnam");
    // Nếu là dropdown autocomplete, đôi khi cần nhấn Enter để chọn
    // cy.get(countryInput).type("{enter}"); 

    // Verify: Nút OK phải SÁNG (Enabled) vì đã đủ thông tin
    cy.contains("button", /^OK$/).should("not.be.disabled");

    // 2. THỰC HIỆN XÓA COUNTRY (CLEAR)
    cy.get(countryInput).clear();
    
    // Click ra ngoài (blur) để trigger validation (nếu cần thiết)
    cy.get(countryInput).blur(); 

    // 3. VERIFY: Nút OK phải bị DISABLE (vì thiếu Country)
    cy.contains("button", /^OK$/).should("be.disabled");

    // (Tùy chọn) Kiểm tra thông báo lỗi đỏ nếu có
    // cy.contains("Country is required").should("be.visible");
});
it("TC_31: Nhập Country sai rồi click ra ngoài (Invalid Input & Click Body)", () => {
    // --- PHẦN 1: SETUP (Chạy qua Step 1 -> Step 4) ---
    // (Mình giữ nguyên phần này để bạn copy chạy được ngay)
    
    // Step 1: Shop Name
    cy.get(shopNameInput).type("Linh Store");
    cy.contains("button", /^OK$/).click();

    // Step 2: Profession
    cy.contains("Formally Trained & Certified Expert").click();
    cy.contains("Choose your specialties").parent().find("svg").eq(0).click();
    cy.contains("General Practitioner (GP)").click();
    cy.get(yearsInput).type("3");
    cy.contains("button", /^OK$/).click();

   
     // --- Step 3: Category ---
  cy.url({ timeout: 10000 }).should("include", "step=category");

  // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
cy.contains("button", /^OK$/).click();
    // Step 4: About Yourself
    cy.get(aboutYourselfInput).clear() 
    .type("Should you require any further information or clarification regarding this matter, please do not hesitate to reach out to me via the designated communication channels.");
    cy.contains("button", /^OK$/).click();
     cy.contains("button", /^OK$/).click();

    // --- PHẦN 2: STEP 5 - TEST LOCATION (LOGIC CHÍNH) ---
    
    cy.get(countryInput).should("be.visible");

    // 1. Nhập Full Address HỢP LỆ trước 
    // (Để cô lập lỗi: Nếu nút OK disable thì chắc chắn là do Country sai)
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi');

    // 2. NHẬP COUNTRY SAI (Invalid Input)
    const invalidCountry = "Quoc Gia Ao Ma 123";
    cy.get(countryInput).type(invalidCountry);

    // 3. CLICK RA NGOÀI (Click Body)
    // Hành động này giúp đóng dropdown (nếu có) và trigger validation
    cy.get('body').click(0, 0, { force: true });

    // --- PHẦN 3: VERIFY ---

    // 1. Kiểm tra nút OK phải bị DISABLE
    // Hệ thống không được chấp nhận quốc gia rác
    cy.contains("button", /^OK$/).should("be.disabled");

    // 2. (Tùy chọn) Kiểm tra hành vi của ô Input
    // Thường các form xịn sẽ tự xóa text rác đi nếu không khớp data
    // cy.get(countryInput).should('have.value', ''); 
    
    // Hoặc hiển thị thông báo lỗi
    // cy.contains("No options").should("be.visible");
});
 it("TC_30: Chỉ nhập space country", () => {
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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

// Chờ menu option mount và visible
cy.contains("MedSupport", { timeout: 5000 })
  .should('be.visible')  // đảm bảo menu hiển thị
  .click({ force: true });
  
  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

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

    // Kiểm tra value thực tế (chưa trim) chứa spaces
    cy.get(countryInput).invoke('val').then(val => {
      expect(val).to.match(/^\s+$/);
    });


 // Điền full address hợp lệ
    cy.get(fullAddressInput).clear().type('123 Le Loi, Hoan Kiem, Hanoi 100000');
    //  cy.contains("Country is required")
    // .should("be.visible");

    cy.contains("button", /^OK$/).should("be.disabled");


 });
 // ------------------------------------------------------
  // HAPPY CASE Name Shop
  // ------------------------------------------------------
it("TC_31:Dữ liệu hợp lê-> step 7", () => {
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

 // 1. Định vị từ Input -> Lên Cha -> Tìm Button
cy.get("input[placeholder='Select a category to sell your service']")
  .parent()           // Leo lên thẻ chứa (Wrapper)
  .find("button")     // Tìm thẻ <button> bạn vừa gửi (thay vì tìm svg)
  .should('exist')
  .and('not.be.disabled') // QUAN TRỌNG: Chờ cho nút này Enable (sẵn sàng)
  .click({ force: true }); // Click mạnh

  // Select category đúng theo ảnh
cy.contains("MedSupport", { timeout: 5000 }).should("be.visible").click({ force: true });

  // Validate selected value
  cy.get("input[placeholder='Select a category to sell your service']")
    .should("have.value", "MedSupport");

  // OK should be enabled
  cy.contains("button", /^OK$/).should("not.be.disabled").click();

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

