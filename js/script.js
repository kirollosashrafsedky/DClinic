$(document).ready(function() {
    // very important - solve chrome mobile height issue -- start
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $(window).on('resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    // very important - solve chrome mobile height issue -- end
    
    let sideMenuState = "closed";
    let sidePopupState = "closed";

    const reservationSwiper = new Swiper('.home-info-cards .swiper-container', {
        slidesPerView: "auto",
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
        // close all modals first
        $('.modal').modal('hide')
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
    
    // add inputs to branches modal on "add btn click" -- start
    // please note the input placeholder here is hard coded in english "Enter Branch Name" and needs to be changed in arabic as well
    $('.modal').on('click','.add-input-btn', function (event) {
        event.preventDefault();
        const html = `
        <div class="form-group mb-3 px-0 px-sm-3 px-md-5">
                                <div
                                    class="row align-items-center justify-content-center no-gutters"
                                >
                                    <div class="col-10">
                                        <input
                                            type="text"
                                            class="form-control input-border input-gray"
                                            placeholder="Enter Branch Name"
                                        />
                                    </div>
                                    <div
                                        class="col-2 d-flex align-items-center justify-content-center"
                                    >
                                        <button
                                            class="btn rounded-circle btn-border-gray add-input-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
        `;
        $(this).parents('form .form-inputs').append(html);
    })
    // add inputs to branches modal on "add btn click" -- end

    // custom collapse -- start

    $('.custom-collapse').on('show.bs.collapse', function () {
        $(this).parents('.collapse-card').addClass('open');
    })
    
    $('.custom-collapse').on('hide.bs.collapse', function () {
        $(this).parents('.collapse-card').removeClass('open');
    })

    // custom collapse -- end

    // link appointment desktop and mobile tabs -- start

    $('.nav-appointment a[data-toggle="tab"]').on('show.bs.tab', function (event) {
        $('.nav-appointment a').removeClass('active');
        var href = $(this).attr('data-target');  
        $('.nav-appointment a[data-target="'+href+'"]').addClass('active');

      })
    
    // link appointment desktop and mobile tabs -- end


    const appointmentsWeekSwiper = new Swiper('.appointments-week-swiper .swiper-container', {
        slidesPerView: "auto",
        // spaceBetween: 15,
        watchSlidesVisibility: true,
        freeMode: true,
        resistance : true,
        resistanceRatio: 0,
        mousewheel: true,
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
    });


});