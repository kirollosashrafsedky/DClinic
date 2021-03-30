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

    $('.custom-collapse').on('show.bs.collapse', function (e) {
        e.stopPropagation()
        $(this).closest('.collapse-card').addClass('open');
    })
    
    $('.custom-collapse').on('hide.bs.collapse', function (e) {
        e.stopPropagation()
        $(this).closest('.collapse-card').removeClass('open');
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

    $('#current-clinic-top.selectpicker').on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        openSidePopup($('#selectbox-mobile-popup'));
    });

    $('#selectbox-mobile-popup [data-type="select-option"]').on('click', function(e){
        e.preventDefault();
        $('#current-clinic-top.selectpicker').selectpicker('val', $(this).attr('data-option-id'));
        // here goes the code to change the ui based on the selected option 
        closeSidePopup()
    })
      

        //chat
    
        function autoGrow(element) {
            element.css('height' , '5px');
            element.css('height' , (element.prop('scrollHeight'))+"px");
            
        }
    
        $('#chat-textarea').on('input',function(){
            autoGrow($(this))
        })
    
        function isImage(filename) {
            var ext = getExtension(filename);
            switch (ext.toLowerCase()) {
              case 'jpg':
              case 'gif':
              case 'bmp':
              case 'png':
                //etc
                return true;
            }
            return false;
        }
    
          
        $('#chat-attachment-input').change(function(){
            let input = $('#chat-attachment-input')
            if (input.prop('files') && input.prop('files')[0]) {
                let inputFiles = input[0].files
                for (var i = 0, f; f = inputFiles[i]; i++) {
                    var reader = new FileReader();
                    let fileName = inputFiles[i].name;
                    let fileExt = fileName.split('.').pop()
                    reader.onload = function (e) {
                        html = '';
                        if(fileExt == 'jpg' | fileExt == 'png' | fileExt == 'gif' | fileExt == 'jpeg' ){
                             html = `
                            <div
                                class="img-wrapper"
                                style="
                                    background-image: url('${ e.target.result}');
                                "
                            ></div>
                            ` 
                        }else{
                            html = `
                            <div class="file-name"><p>${fileName}</p></div>
                            ` 
                        }
                        
                        $('.attachments-menu-inner').append(html);
                    };
                
                    reader.readAsDataURL(f);
                
                }
            }
            $('.attachments-menu').addClass('show')
        })
        $('.attachments-menu .close-btn').on('click',function(){
            $('.attachments-menu').removeClass('show')
            $('#chat-attachment-input').val('');
            $('.attachments-menu-inner').text('');
        })

    //top bar
    function updateAppContainerHeight(){
        $("#app-container").css('padding-top',$('.top-bar').height() + 'px');
        if($(window).width() < 1440 && $(window).width() > 575.5) {
            $('.side-popup').css('top',$('.top-bar').height() - 1 + 'px')
            $('.side-popup').css('height', 'calc(100% - ' + $('.top-bar').height() + 'px)')
        }
        else if($(window).width() < 1440) {
            $('.side-popup').css('top',$('.top-bar').height() - 1 + 'px')
            $('.side-popup').css('height', 'calc(100% - ' + $('.top-bar').height() + 'px)')
            $('.side-popup:not(.profile-menu)').css('top','0');
            $('.side-popup:not(.profile-menu)').css('height','100%');
        }
        else{
            $('.side-popup').css('top','0');
            $('.side-popup').css('height','100%');
        }
    }
    updateAppContainerHeight(); //always call this function on adding the top notification-bar

    $(window).on('resize', function() {
        updateAppContainerHeight();
    });
    
});