describe('template spec', () => {
  //Agregar dos productos al carrito de compras
  it('ProcesoCompra', () => {
    //Visita sitio de tienda
    cy.visit('http://opencart.abstracta.us/')
    
    //Agrega el primer producto al carrito
    cy.get(':nth-child(6) > a').click()
    cy.get(':nth-child(2) > .product-thumb > .image > a > .img-responsive').click()
    cy.get('#button-cart').click()
    cy.wait(2000) // Esperar para que el primer producto se agregrue al carrito de compras
    cy.get('#cart-total').contains('1')
    cy.wait(2000) // Esperar 
    
    //Agrega el segundo producto al carrito
    cy.get(':nth-child(7) > a').click()
    cy.wait(2000) // Esperar 
    cy.get(':nth-child(1) > .product-thumb > .image > a > .img-responsive').click()
    cy.get('#input-option226').select('Blue')
    cy.get('#button-cart').click()
    cy.get('#cart-total').contains('2')
    //cy.wait(2000) // Esperar para confirmar el segundo producto agregado al carrito
  
    //Visualiza el carrito
    cy.get('#cart-total').click()
    cy.get('[href="http://opencart.abstracta.us:80/index.php?route=checkout/cart"] > strong').click()
    cy.wait(2000) // Esperar para visualizar el carrito
    cy.get('.pull-right > .btn').click()
      
    // Paso 1: Opciones de Pago - Seleccionar "Guest Checkout"
    cy.get('input[value="guest"]').check()
    cy.wait(2000) // Esperar 

    // Paso 2: Detalle de la facturación - Seleccionar "Guest Checkout"
    cy.get('#button-account').click()
    cy.wait(2000) // Esperar para continuar con el siguiente paso
    
    // Paso 3: Completar la información del invitado - Detalle de la entrega
    cy.get('#input-payment-firstname').type('Mayté')
    cy.get('#input-payment-lastname').type('Guamán')
    cy.get('#input-payment-email').type('mayterubiela@hotmail.com')
    cy.get('#input-payment-telephone').type('2333444')
    cy.get('#input-payment-address-1').type('Dirección prueba')
    cy.get('#input-payment-city').type('Quito')
    cy.get('#input-payment-postcode').type('1712')
    cy.get('#input-payment-country').select('Ecuador')
    cy.get('#input-payment-zone').select('Azuay')
    cy.wait(2000) // Esperar para continuar con el siguiente paso 
    cy.get('#button-guest').click()
    
    //Paso 4: Delivery method- Forma de entrega
    cy.get(':nth-child(1) > .panel-heading > .panel-title').click()
    cy.wait(2000) // Esperar para continuar con el siguiente paso 
    
    //Paso 5: Forma de pago
    cy.get('#button-shipping-method').click()
    cy.wait(2000) // Esperar para continuar con el siguiente paso 
    
    // Aceptar términos y condiciones
    cy.get('.pull-right > [type="checkbox"]').check()
    cy.get('#button-payment-method').click()
    cy.wait(2000) // Esperar para continuar con el siguiente paso 

    //Paso 6: Confirmar orden
    cy.get('#button-confirm').click()
    cy.wait(2000) // Esperar para continuar con el siguiente paso 

    //Confirmar que la orden haya finalizado
     cy.get('#content > h1').contains('Your order has been placed!').should('be.visible')
       
  })
})