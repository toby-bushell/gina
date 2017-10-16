var gina = gina || {};

(function($){

  gina = {

    init: function() {
      this.bindUIAction();
      this.clipboardJS();
    },

    bindUIAction: function() {
      // Example Bind UI Action
      $('.js-hamburger').on('click',   $.proxy(this.hamburgerClick, this) );
      $(window).on('resize', $.proxy(this.windowResize, this));
      $(window).on('scroll', $.proxy(this.scrollMove, this) );

  },

  hamburgerClick: function(e) {
    var _this = e.currentTarget;

    if($('.c-nav-primary').hasClass('c-nav-primary--active')) {
      $(_this).removeClass('is-active');
      $('.c-nav-primary').removeClass('c-nav-primary--active');
    } else {
      $(_this).addClass('is-active');
      $('.c-nav-primary').addClass('c-nav-primary--active');
    }
  },

  scrollMove: function() {

    var scrollPosition = $(window).scrollTop();
    if($(window).width() > 780) {

      $('.js-move').each(function(i, _this) {

          var container = $(_this).closest('.c-content');
          var percentageInView = $(container).outerHeight(true) / 2;
          // console.log('percentageInView', percentageInView);

          var containerTop = $(container).position().top - percentageInView;
          var containerBottom = ( $(container).position().top + $(container).outerHeight(true) ) - (percentageInView);

          // console.log('scrollPosition', scrollPosition, 'containerTop', containerTop, 'containerBottom' , containerBottom, 'percentageInView', percentageInView, 'height', $(container).outerHeight(true));

          var maxMovement = $(container).outerHeight();
          var movement = (scrollPosition - containerTop) - (maxMovement / 2);

          // Less movement on c-content-two div
          movement = container.hasClass('c-content-two') ? movement * 0.5 : movement;

          // If neg turn to pos and vice versa, so that the movemnt it up
          var cssTop = movement > 0 ? -Math.abs(movement) / 5 : Math.abs(movement) / 5;

          // If in view
          if(scrollPosition > containerTop && scrollPosition < containerBottom) {

            // Apply css to element
            if(movement < maxMovement && movement > -Math.abs(maxMovement)) {
              console.log('firing still', cssTop);
              $(_this).animate({
                // top: =+ cssTop
            },
            1000, 'linear');
              $(_this).css('transform' , "translate3d(0," + cssTop  +"px, 0)" );
            }
          }
          else {
            $(_this).css('transform' , "translate3d(0," + cssTop  +"px, 0)" );
          }

      });
    }
  },

  clipboardJS: function() {
    console.log('clipboard firing');
    var clipboard = new Clipboard('.c-btn--copy');
    var _this = this;

    clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      _this.addTooltip(e.trigger);
      e.clearSelection();
    });

  },

  addTooltip: function (button) {
    var buttonWrapper = $(button).closest('.c-cta__button');
    console.log('buttonWrapper', buttonWrapper);
    console.log('button', button);

    console.log('length', $('.o-tooltip', buttonWrapper).length);

    if( $('.o-tooltip', buttonWrapper).length < 1) {
      console.log('firing');

      var div = document.createElement("div");
      div.setAttribute('class', 'o-tooltip'); // and make sure myclass has some styles in css
      div.innerHTML = 'Copied';
      console.log('div', div);

      $(div).insertAfter(button);
    }

    $('.o-tooltip', buttonWrapper).addClass('active');
    setTimeout(function() {
      $('.o-tooltip', buttonWrapper).removeClass('active');
    }, 2000);

  },

  windowResize: function() {
    if( $(window).width() < 780) {
      $('.js-move').css('transform' , "translate3d(0, 0, 0)" );
    }
  }

}


gina.init();
})(jQuery);
