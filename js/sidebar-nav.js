//
// Return if a string is a valid selector
// @NOTE, to be transfered to the common.js file once this is merged with
//
jQuery.extend({
    isValidSelector: function(selector) {
        if (typeof(selector) !== 'string') {
            return false;
        }
        try {
            var $element = $(selector);
        } catch(error) {
            return false;
        }
        return true;
    }
});

//
// Sticky Sidebar Nav
// author: The Bohemian Carlos
//
// This function makes a sidebar nav to stick at the top
// when scrolling down the content using the jQuery stick_in_parent plugin
// it also detects if the sidebar navigation is bigger than the viewport
// and in this case uses custom code that detects when to stick at the top
// and adds scrolls if necessary
//
// two ways of using it, just add a few data atrributes to the element:
//
// 'data-stick-sidebar' to define the nav that will stick;
// 'data-sidebar-content=".selector"' as the target content area (needed for some measurements)
// 'data-sidebar-container=".selector"' as the parent element that both wraps the sidebar & content
//
// <nav data-sidebar data-sidebar-content=".selector" data-sidebar-container=".selector"></nav>
//
(function( w ) {

  // define the data attributes to be read in the elemnt
  var attrs = {
    'sidebar' : 'data-sticky-sidebar',
    'content' : 'data-sticky-content',
    'container' : 'data-sticky-container'
  };

  // if the sidebar is small enough just use the plugin
  var stickSmallerSidebar = function( $el ) {

    var stick = function() {
      var width = $(window).width()
      // @note maybe a better way to define media queries in this case
      // when the width is smaller than 768px the plugin needs to be stoped
      // since its creating the bug described on #11325
      if ( width < 768 ) {
        $el.trigger("sticky_kit:detach");
      } else {
        $el.stick_in_parent();
      }
    }

    stick();
    $(window).on('resize', stick);

  };

  //
  // if the sidebar is big that it doesnt fit the viewport
  // use the custom code
  //
  var stickBiggerSidebar = function( $el, windowHeight ) {

      var elContentSelector = $el.attr( attrs.content );
      var elContainerSelector = $el.attr( attrs.container );

      // append the content to a wrapper, needed for scrolling — I know.. :(
      var $scroll = $('<div class="stuck-scroll"></div>');


      // references to a few elements
      var $window = $(window);
      var $doc = $(document);

      var $parent = $el.parent();
      var $container = $(elContainerSelector);
      var $content = $(elContentSelector);


      //
      // setting the sidebar height depends of the viewport height
      // and the sidebar content height
      //
      var setHeight = function() {
        var contentHeight = $content.height();
        var windowHeight = $window.height();

        if ( contentHeight > windowHeight ) {
          // give a small margin at the bottom
          return windowHeight - 225; //225px = 65px (main-nav) + 64px (sec-nav) + 56px (padding) + 40px (padding)
        } else {
          return contentHeight;
        }
      };


      //
      // decide which state the nav should be, stick to the top
      // fixed, scrollable etc.
      //
      var stickOrDetach = function() {
        var contentHeight = $content.height();
        var windowHeight = $window.height();

        // if distance scrolled is greater than the distance
        // of the element from the top see if it should stick
        if ( $window.scrollTop() > $parent.offset().top ) {

          // the content is bigger than the viewport, stick the nav
          if ( !$el.hasClass('stuck-nav') && contentHeight > windowHeight  ) {
            $el.addClass('stuck-nav');
          }

          // calculate when the sticky sidebar should stop when reaching the
          // bottom of the parent container
          var currentAt = $window.scrollTop() + $window.height();
          var stopAt = $container.offset().top + $container.height();
          var diff = stopAt - currentAt;

          if ( diff < 0) {
            if ( contentHeight > windowHeight ) {
              $el.css('top', diff);
            }
          } else {
            $el.css('top', 0);
          }

        } else if( $el.hasClass('stuck-nav') ) {
          // unstuck the nav
          $el.removeClass('stuck-nav');
        }

      };


      // set the initial state of the sidebar
      $el.addClass('will-stick').css({
          'height' : setHeight(),
          'width' : $parent.width(),
          'max-height' : setHeight()
        });

      // detatch the content and move it to the scroll wrapper
      var content = $el.children().detach();

      $el.append( $scroll );
      $scroll.append(content);


      //
      // Attach events:
      //

      //
      // on resize calculate the state again
      //
      $window.on('resize', function() {

        $el.css({
          'height' : setHeight(),
          'width' : $parent.width(),
          'max-height' : setHeight()
        });

        stickOrDetach();

      });


      //
      // on sidebar scroll attach or remove the class
      // to reveal or hide the top gradient
      //
      $scroll.on('scroll', function() {

        if ( $scroll.scrollTop() > 1 ) {
          if ( !$el.hasClass('scrolled') ) {
            $el.addClass('scrolled');
          }
        } else if($el.hasClass('scrolled')) {
          $el.removeClass('scrolled');
        }

      });

      // on document scroll
      $doc.on('scroll', stickOrDetach);

  }


  //
  // Jump to active topic
  //
  var scrollToActive = function() {
    var $sidebar = $('['+attrs.sidebar+']');
    var $active = $sidebar.find('.active');
    var $scroll = $sidebar.find('.stuck-scroll');
    var scrollHeight = $scroll.height();
    var offset = 24;

    if ( $active.length == 1) {

      // we'll scroll to the parent section/topic (if it exists )
      // so we always show the topic "title" when scrolling the sidebar
      var $section = $active.parents('li').find('h2');
      var activeDistanceFromTop = $active.offset().top;
      var sidebarDistanceFromTop = $sidebar.offset().top;

      // section topic was found? Calculate relative to that.
      if ( $section.length == 1 ) {
        activeDistanceFromTop = $section.offset().top;
      }

      var scrollTo = activeDistanceFromTop - sidebarDistanceFromTop - offset;

      // only scroll the sidebar to the active item/topic
      // if the active is at least lower than half the height of the
      // sidebar
      if ( scrollTo < scrollHeight/2 ) {
        scrollTo = 0;
      }

      $scroll.scrollTop( scrollTo );
    }
  };


  var stickSidebarNav = function( $el ) {
    var windowHeight = $(window).height();
    var sidebarHeight = $el.height();

    if ( sidebarHeight > windowHeight) {
      stickBiggerSidebar($el, windowHeight);
    } else if(jQuery().stick_in_parent) {
      stickSmallerSidebar($el);
    }

  };

  var $el = $('['+attrs.sidebar+']');

  // run with the default selector
  stickSidebarNav( $el );

  // expose the method to be accessible outside fo this constructor
  $el.data('stickSidebarNav', { scrollToActive : scrollToActive });

  //
  // expose the function
  //
  w.stickSidebarNav = stickSidebarNav;

})( window );


$(document).ready(function() {

  //Adding url active state
  $(".toc-nav a").each(function(){
    if ($(this).prop('href') == window.location.href) {
      $(this).addClass('active active-by-url');
    }
  });

  //
  // Sets the link active in the table of contents navigation
  // as we scroll and the content is visible on the screen
  //
  var updateActiveTableOfContentsTopic = function( $nav ) {

    var $links = $nav.find('a');

    //
    // Tells if an element is visible in the screen
    // @NOTE, to be transfered to the common.js file once this is merged with
    // issue #10901
    //
    // based & adapted from:
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    //
    var elementInViewport = function(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return {
        'visible' : (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        ),
        'top' : (top - window.pageYOffset )
      }
    }

    //
    // see what's the active topic, and add the active class
    // to the nav link
    //
    var activeTopic = function() {

      var $active = $links.filter('.active-by-url'),
          visible = [];

      //
      // For each link, detect that if the topic is in view
      //
      $links.each(function() {

          var $el = $(this);

          if ( $.isValidSelector( $el.attr('href') ) ) {

            var $topic = $( $el.attr('href') );
            var inViewport = elementInViewport( $topic[0] );

            if ( inViewport.visible ) {
              visible.push({ $topic : $topic, $link: $el, inViewport: inViewport } );
            }
          }
      });

      //
      // If more than one topic is in view, select the first one or
      // the one that the title it's at least at the top third are of the screen
      //
      $.each(visible, function(index, el) {

        var fromTop = el.inViewport.top * 100 / window.innerHeight;

        // at least 30% at the top
        if ( fromTop < 30 ) {
          $active = el.$link;
        }

      });

      $links.removeClass('active');

      // add the active class to the topic nav item
      if ($active || $active.length == 0) {
        $active.addClass('active');
      }

    }

    //
    // initialize
    //
    activeTopic();

    // make it update on scroll
    $(document).on('scroll', activeTopic);
    $(window).on('resize', activeTopic);

  }( $('.toc-sidebar [role="navigation"]') );


  //
  // add smooth scrolling to the nav
  //
  if ( window.smoothScroll ) {
    smoothScroll.init({
      speed: 600, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutQuart', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0
    });
  }

  // if stickSidebarNav is available, used the exposed method
  if ( $(".toc-sidebar").data('stickSidebarNav') ) {
    $(".toc-sidebar").data('stickSidebarNav').scrollToActive();
  }

});

