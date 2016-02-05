/* globals jQuery:true */
/*!
 * jQuery plugin to animate elements:
 *  - text being set into elements
 *   - css transitions using easing functions
 *
 * requires easing - https://github.com/lcavadas/easing
 *
 * @author Luis Serralheiro
 */
(function ($) {
  $.fn.animateCss = function (props) {
    var options = $.extend({
      easing: 'linear',
      prop: 'font-size',
      from: 1,
      variation: 0,
      unit: 'em',
      duration: 600,
      delay: navigator.userAgent.indexOf('Trident') === -1 ? 5 : 50,
      props: {}
    }, props);

    var _$el = $(this);

    var _animateCss = function (time) {
      time += options.delay;
      _$el.css(options.prop, Math.Easing[options.easing](time, options.from, options.variation, options.duration, options.props) + (options.unit || 0));
      if (time < options.duration) {
        window.setTimeout(function () {
          _animateCss(time);
        }, options.delay);
      }
    };
    _animateCss(0);

    return this;
  };

  $.fn.animatedText = function (content, params) {
    var options = $.extend({
      easing: 'linear',
      duration: 600,
      //IE's minimum setTimeout interval in practice appears to be ~50
      delay: navigator.userAgent.indexOf('Trident') === -1 ? 5 : 50,
      animation: {
        easing: 'none',
        changes: [
          //{
          //  easing: 'easeOutCubic', -- [optional], defaults to linear
          //  prop: 'font-size',      -- [required], the css prop to animate
          //  from: 2,                -- [required], initial value
          //  variation: -1,          -- [required], desired variation from initial value
          //  unit: 'em',             -- [optional], the units to use
          //  duration: 200           -- [optional], duration of the animation
          //  props: {}               -- [optional], object with extra properties for the easing
          //}
        ]
      }
    }, params);

    var $el = $(this);
    var _isNumber = !isNaN(content);
    content = _isNumber ? +content : content;
    var target = _isNumber ? +content : content.length;
    var time = 0;

    var _animateText = function () {
      var previous = Math.round(Math.Easing[options.easing](time, 0, target, options.duration));
      time += options.delay;
      var current = Math.round(Math.Easing[options.easing](time, 0, target, options.duration));
      if (time < options.duration) {
        var $span = $('<span></span>');
        if (_isNumber) {
          $span.text(current);
          $el.html($span);
          if (time === options.delay) {
            options.animation.changes.forEach(function (change) {
              $el.animateCss(change);
            });
          }
        } else {
          $span.text(content.substring(previous, current));
          $el.append($span);
          options.animation.changes.forEach(function (change) {
            change.duration = change.duration || (options.duration / options.delay);
            $span.animateCss(change);
          });
        }
        window.setTimeout(_animateText, options.delay);
      } else {
        $el.text(content);
      }
    };
    _animateText();

    return this;
  };
}(jQuery));
