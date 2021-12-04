'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScratchArea = function (_React$Component) {
  _inherits(ScratchArea, _React$Component);

  function ScratchArea(props) {
    _classCallCheck(this, ScratchArea);

    var _this = _possibleConstructorReturn(this, (ScratchArea.__proto__ || Object.getPrototypeOf(ScratchArea)).call(this, props));

    _this.state = { loaded: false };
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    return _this;
  }

  _createClass(ScratchArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var cover = this.props.canvas;

      this.isDrawing = false;
      this.lastPoint = null;
      this.ctx = this.canvas.getContext('2d');

      var isColorCover = this.checkColorCover(cover);

      if (!isColorCover) {
        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = function () {
          _this2.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, _this2.ctx.canvas.width, _this2.ctx.canvas.height);
          _this2.setState({ loaded: true });
        };
        image.src = cover;
      } else {
        var _canvas = this.canvas,
            width = _canvas.width,
            height = _canvas.height;

        this.ctx.save();
        this.ctx.fillStyle = cover;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, width, height);
        this.ctx.fill();
        this.ctx.restore();
        this.setState({ loaded: true });
      }
    }
  }, {
    key: 'checkColorCover',
    value: function checkColorCover(cover) {
      return (/^#(\d|\w){3,6}$/.test(cover) || /^rgba?\(.*\)/.test(cover)
      );
    }
  }, {
    key: 'getFilledInPixels',
    value: function getFilledInPixels(stride) {
      if (!stride || stride < 1) {
        stride = 1;
      }

      var pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var total = pixels.data.length / stride;
      var count = 0;

      for (var i = 0; i < pixels.data.length; i += stride) {
        if (parseInt(pixels.data[i], 10) === 0) {
          count++;
        }
      }

      return Math.round(count / total * 100);
    }
  }, {
    key: 'getMouse',
    value: function getMouse(e, canvas) {
      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          top = _canvas$getBoundingCl.top,
          left = _canvas$getBoundingCl.left;

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      return {
        x: (e.pageX || e.touches[0].pageX) - left - scrollLeft,
        y: (e.pageY || e.touches[0].pageY) - top - scrollTop
      };
    }
  }, {
    key: 'distanceBetween',
    value: function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
  }, {
    key: 'angleBetween',
    value: function angleBetween(point1, point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
  }, {
    key: 'handlePercentage',
    value: function handlePercentage() {
      var filledInPixels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (filledInPixels > this.props.finishPercent) {
        this.canvas.parentNode.removeChild(this.canvas);
        this.setState({ finished: true });
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.isDrawing = true;
      this.lastPoint = this.getMouse(e, this.canvas);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (!this.isDrawing) return;

      e.preventDefault();

      var currentPoint = this.getMouse(e, this.canvas);
      var distance = this.distanceBetween(this.lastPoint, currentPoint);
      var angle = this.angleBetween(this.lastPoint, currentPoint);

      var x = void 0,
          y = void 0;

      for (var i = 0; i < distance; i++) {
        x = this.lastPoint.x + Math.sin(angle) * i;
        y = this.lastPoint.y + Math.cos(angle) * i;
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, 2 * Math.PI, false);
        this.ctx.fill();
      }

      this.lastPoint = currentPoint;
      this.handlePercentage(this.getFilledInPixels(32));
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.isDrawing = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          cover = _props.canvas,
          finishPercent = _props.finishPercent,
          onComplete = _props.onComplete,
          className = _props.className,
          attr = _objectWithoutProperties(_props, ['width', 'height', 'canvas', 'finishPercent', 'onComplete', 'className']);

      var loaded = this.state.loaded;


      var containerStyle = {
        width: width,
        height: height,
        position: 'relative',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      };

      var canvasStyle = {
        position: 'absolute',
        top: 0,
        zIndex: 1
      };

      var resultStyle = {
        visibility: loaded ? 'visible' : 'hidden'
      };

      var canvasProps = {
        ref: function ref(_ref) {
          return _this3.canvas = _ref;
        },
        className: 'ScratchArea__Canvas',
        style: canvasStyle,
        width: width,
        height: height,
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onTouchMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        onTouchEnd: this.handleMouseUp
      };

      return _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)("ScratchArea__Container", className),
          style: containerStyle
        }, attr),
        _react2.default.createElement('canvas', canvasProps),
        _react2.default.createElement(
          'div',
          { className: 'ScratchArea__Result', style: resultStyle },
          this.props.children
        )
      );
    }
  }]);

  return ScratchArea;
}(_react2.default.Component);

ScratchArea.propTypes = {
  canvas: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  finishPercent: _propTypes2.default.number.isRequired,
  onComplete: _propTypes2.default.func
};

var _default = ScratchArea;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ScratchArea, 'ScratchArea', 'src/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/index.js');
}();

;