var work = work || {};

(function($){

  work = {

    init: function() {
      var _this = this;
      window.onload = function() {
      if($('.grid').length > 0) {
          var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
              columnWidth: '.grid-sizer'
            }
          });
          _this.bindUIAction($grid);
        }
      }

    },

    bindUIAction: function($grid) {
      $('.filter-button-group').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        console.log('filtervalue',filterValue );

        $grid.isotope({ filter: filterValue });
      });

      // $('.c-work__single').on('hover',  $.proxy(this.itemHover, this) )
      // $('.c-work__single').on('mouseleave',  $.proxy(this.itemLeave, this) )
      $(window).on('scroll', $.proxy(this.scrollMove, this) );

  },

  itemHover: function(e) {
    var item = e.currentTarget;
    $('.c-work__single').not(item).addClass('hover');
    $(item).removeClass('hover');
  },

  itemLeave: function(e) {
    $('.c-work__single').removeClass('hover');
  }

}


work.init();
})(jQuery);
