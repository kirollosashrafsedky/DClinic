$(document).ready(function() {
    let sideMenuState = "closed";
    let sidePopupState = "closed";

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
            openSideMenu();
        }else{
            closeSideMenu();
        }
    })

    function openSideMenu(){
        closeSidePopup();
        $("#app-container .side-menu").addClass('open');
        sideMenuState = "opened";
        let alternateText = $(".slide-menu-toggler span").text();
        $(".slide-menu-toggler span").text($(".slide-menu-toggler span").attr("data-alternate"));
        $(".slide-menu-toggler span").attr("data-alternate", alternateText);
        $(".tooltip-menu").removeClass('show')

    }

    function closeSideMenu(){
        $("#app-container .side-menu").removeClass('open');
        sideMenuState = "closed";
        let alternateText = $(".slide-menu-toggler span").text();
        $(".slide-menu-toggler span").text($(".slide-menu-toggler span").attr("data-alternate"));
        $(".slide-menu-toggler span").attr("data-alternate", alternateText);


    }

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
            $('#edit-modal').modal('show');

            $(this).parents('tr').removeClass('disabled');
            $(this).parents('.table-alternative .card').removeClass('disabled');

        }
    })

    $('.row-check').change(function(){
        if($(this).prop("checked")){
            // $(this).parents('tr').addClass('active');
            $(this).parents('.table-alternative .card').addClass('active');
        }else{
            // $(this).parents('tr').removeClass('active');
            $(this).parents('.table-alternative .card').removeClass('active');
        }
    })

    $('[data-dblclick-event="true"]').dblclick(function(){
        // row switch used in business hour page
        if($(this).find('.row-switch').prop('checked')){
            $('#edit-modal').modal('show');
        }else{
            $(this).find('.row-switch').prop('checked', !$(this).find('.row-switch').prop('checked'))
            $('#edit-modal').modal('show');
            $(this).removeClass('disabled');
        }
    })

    $('[data-click-event="true"]').on('click', function(){
        // row check used in other setting pages
            $(this).find('.row-check').prop('checked', !$(this).find('.row-check').prop('checked'));
            $(this).toggleClass('active')

    })

    // for illustrating success and error modals only and will be removed  -- start

    $('#settings-modal form').on('submit', function(e){
        e.preventDefault();
        $('#settings-modal').modal('hide')
        $('#success-modal').modal('show')
    })
    
    $('#edit-modal form').on('submit', function(e){
        e.preventDefault();
        $('#edit-modal').modal('hide')
        $('#error-modal').modal('show')
    })

    // for illustrating success and error modals only and will be removed  -- end


    // side-popup

    function openSidePopup(el){
        if(sideMenuState == "opened") closeSideMenu();
        $('.side-popup').removeClass('show');
        setTimeout(function(){
            el.addClass('show');
            sidePopupState = "opened";
        },50)
    }

    function closeSidePopup(){
        $('.side-popup').removeClass('show');
        $('.side-popup').attr('data-opened-by','')
        sidePopupState = "close";
    }

    $('.close-popup').on('click', function(){
        closeSidePopup();
    });

    $('[data-type="side-popup"]').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        const popup = $(`#${$(this).data('target')}`)
        const trigger = $(this).attr('data-unique-id');
        if(popup.attr('data-opened-by') == trigger || popup.attr('data-opened-by') == ''){
            if(popup.hasClass('show')){
                closeSidePopup()
            }else{
                popup.attr('data-opened-by', trigger)
                openSidePopup(popup)
            }
        }else{
            closeSidePopup()
            popup.attr('data-opened-by', trigger)
            openSidePopup(popup)
        }
        
    })

    $('[data-target="#profile-tab"]').on('click', function (event) {
        event.preventDefault()
        $('#visits-tabs a').removeClass('active')
        $(this).tab('show')
        $(this).removeClass('active');
    })
    

    // $('[data-toggle="modal"]').on('click', function (event) {
    //     event.preventDefault();
    // })

    

    // audio player -- start


    // audio player -- end

    // override bootstrap-select library to add svg imgs in the select

    // var myDefaultWhiteList = $.fn.selectpicker.Constructor.DEFAULTS.whiteList;
    // myDefaultWhiteList.svg= ['xmlns','width','height','viewBox']
    // myDefaultWhiteList.g= ['data-name','d','transform','fill']
    // myDefaultWhiteList.path= ['data-name','d','transform','fill']

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