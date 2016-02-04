/* globals jQuery:true */
/*!
 * jQuery Plugin for setting text using animation
 *
 * @author Luis Serralheiro
 */
(function ($) {
    $.fn.animatedText = function (content, duration) {
        var $el = $(this);
        var current = 0;
        var _isNumber = !isNaN(content);
        content = _isNumber ? +content : content;

        var target = _isNumber ? +content : content.length;
        var rate = (5 / (duration || 600)) * target;

        var _animateText = function () {
            current += rate;
            if (current < target) {
                var normalizedCurrent = Math.round(current);
                $el.text(_isNumber ? normalizedCurrent : content.substring(0, normalizedCurrent));
                window.setTimeout(_animateText, 5);
            } else {
                $el.text(content);
            }
        };
        _animateText();

        return this;
    };
}(jQuery));
