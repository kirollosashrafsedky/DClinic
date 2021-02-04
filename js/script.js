$(document).ready(function() {
    let sideMenuState = "closed";
    const reservationSwiper = new Swiper('.home-info-cards .swiper-container', {
        slidesPerView: "auto",
        // spaceBetween: 15,
        watchSlidesVisibility: true,
        freeMode: true,
        resistance : true,
        resistanceRatio: 0,
        mousewheel: true,
        updateOnWindowResize: true,
    });

    $(".slide-menu-toggler").on('click', function(e){
        e.preventDefault();
        if(sideMenuState == "closed"){
            $("#app-container .side-menu").addClass('open');
            sideMenuState = "opened";
            let alternateText = $(".slide-menu-toggler span").text();
            $(".slide-menu-toggler span").text($(".slide-menu-toggler span").attr("data-alternate"));
            $(".slide-menu-toggler span").attr("data-alternate", alternateText);
            $(".tooltip-menu").removeClass('show')
        }else{
            $("#app-container .side-menu").removeClass('open');
            sideMenuState = "closed";
            
            let alternateText = $(".slide-menu-toggler span").text();
            $(".slide-menu-toggler span").text($(".slide-menu-toggler span").attr("data-alternate"));
            $(".slide-menu-toggler span").attr("data-alternate", alternateText);
        }

    })

    $("#app-container .side-menu a").on('mouseenter', function(){
        if(sideMenuState == "closed"){
            $(".tooltip-menu").text($(this).find('span').text());
            $(".tooltip-menu").addClass('show');
            const top = $(this).offset().top + ($(this).height() / 2);
            $(".tooltip-menu").css({ top: `${top}px` });
        }
    })
    $("#app-container .side-menu a").on('mouseleave', function(){
        $(".tooltip-menu").removeClass('show')
        
    })

    $('.row-switch').change(function(){
        if(!$(this).is(":checked")){
            $(this).parents('tr').addClass('disabled');
            $(this).parents('.table-alternative .card').addClass('disabled');
        }else{
            $(this).parents('tr').removeClass('disabled');
            $(this).parents('.table-alternative .card').removeClass('disabled');

        }
    })

    $('[data-dblclick-event="true"]').dblclick(function(){
        $(this).toggleClass('disabled');
        $(this).find('.row-switch').prop('checked', !$(this).find('.row-switch').prop('checked'))
    })
    // function activeImgsOnLoad(){
    //     $("[data-active-img]").each(function(index, el){
    //         $(el).attr('data-main-img', $(el).find('img').attr('src'))
    //         if($(this).hasClass('active')){
    //             $(el).find('img').attr('src',$(el).attr('data-active-img'));
    //         }
    //     })
    // }
    // activeImgsOnLoad();
    // function activeImgsOnChange(el){
    //     $("[data-active-img]").each(function(index, el){
    //         $(el).find('img').attr('src',$(el).attr('data-main-img') )
    //     })
    //     $(el).find('img').attr('src',$(el).attr('data-active-img'));

    // }
    // $("[data-active-img]").on('click', function(){
    //     if($(window).width() < 767.5){
    //         if(!$(this).hasClass('active')){
    //             activeImgsOnChange(this)
    //         }
    //     }
        
    // })

    // $(window).on('resize', function(){
    //     if($(window).width() > 767.5){
    //         $("[data-active-img]").each(function(index, el){
    //             $(el).find('img').attr('src',$(el).attr('data-main-img') )
    //         })
    //     }else{
    //         activeImgsOnLoad();
    //     }
    // })




    // setTimeout(function(){
    //     AOS.init({
    //       duration: 400,
    //       easing:"ease-in-out",
    //       once: false,
    //       offset: 100,
    //       disable: false
    //     });
    // },200);

    // (function disableLinks(){
    //   $('#reservation-swiper .swiper-slide.disabled .stretched-link').on('click',function(){
    //     return false;
    //   })
    // }());

    // (function managePageHash(){
    //   const hash = new URL(document.URL).hash;
    //   const tab = $(`#main-content ${hash}`);
    //   if(tab.length !== 0){
    //     $(`#main-tabs a[href='${hash}']`).tab('show')
    //   }
    // }());

    // const openModal = modal => {
    //   if($(modal).length !== 0){
    //     $(modal).addClass("show-modal");
    //     $("body").addClass("show-modal");
    //   }  
    // }

    // const closeModal = modal => {
    //     modal.removeClass("show-modal");
    //     $("body").removeClass("show-modal");
    //     $(".video-overlay").removeClass("show-video");
    //     $("iframe.video").removeClass("show-video");
    // }
    
    // const validation = form => {
    //   let valid = true;
    //   form.find('.required').each( (index, input) => {
    //     if(input.value == ""){
    //       input.classList.add('is-invalid');
    //       valid = false
    //     }else{
    //       input.classList.remove('is-invalid')
    //     }
    //   })
    //   return valid;
    // }

    // $("#written-reservation-form").on('submit',function(e){
    //   e.preventDefault();
    //   if(validation($(this))){
    //     // ajax is set here to send data to the server
    //     const modal = $("#success-modal");
    //     openModal(modal);
    //   }
      
           
    // })

    // $(".custom-modal-trigger").on("click", function(e){
    //     if($(this).parents('.disabled').length === 0){
    //       e.preventDefault();
    //       const modal = $(this).attr('href');
    //       openModal(modal);     
  
    //     }
    // })
    
    // $(".custom-modal .close-btn").on("click", function(){
    //     const modal = $(this).parents("div.custom-modal");
    //     closeModal(modal);
    // })

    // $(".play-video-btn").on("click", function(){
    //   $(".video-overlay").addClass("show-video");
    //   $("iframe.video").addClass("show-video");
    // })
    

});