"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var update = React.addons.update;

var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Functions to "subscribe" to; they resemble a slow and fast AnimationFrame-Loop
var FUNCTIONS_TO_ANIMATE_SLOW = [];
var FUNCTIONS_TO_ANIMATE_ORIGINAL_TIME = [];

//To not get dizzy while working on the page.
//false = original request loop is "slow" (the time of the slow / 2)
var DEV_SWITCH_FOR_ORIGINAL = true;

var Greetings = function (_React$Component) {
  _inherits(Greetings, _React$Component);

  function Greetings(props) {
    _classCallCheck(this, Greetings);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Greetings).call(this, props));

    _this.greetingsElement = null;
    _this.wordsContainer = null;
    _this.firstWord = null;
    _this.secondWord = null;
    _this.words = ["ran", "dom"];

    _this.state = {
      firstWord: "ran",
      secondWord: "dom",
      firstWordStyles: {
        willChange: "margin-left",
        marginLeft: getRandomInt(_this.props.minMargins, _this.props.maxMargins) + "px"
      },
      secondWordStyles: {
        willChange: "margin-right",
        marginRight: getRandomInt(_this.props.minMargins, _this.props.maxMargins) + "px"
      },
      wordsContainerStyles: {
        WebkitUserSelect: "none",
        userSelect: "none",
        willChange: "border-width, font-size, line-height, padding",
        padding: getRandomInt(0, 40) + "px",
        fontSize: getRandomInt(_this.props.minFontSize, _this.props.maxFontSize) + "px",
        lineHeight: getRandomInt(50, _this.props.maxLineHeight) + "%",
        borderWidth: getRandomInt(0, _this.props.maxBorderWidth) + "px"
      },
      greetingsStyles: {
        zIndex: "" + _this.props.layer
      }
    };

    _this.changeText = _this.changeText.bind(_this);
    _this.changeGreetingStyles = _this.changeGreetingStyles.bind(_this);

    _this.addToAnimateArray = _this.addToAnimateArray.bind(_this);
    return _this;
  }

  _createClass(Greetings, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.greetingsElement = document.querySelector(".greetings");
      this.wordsContainer = this.greetingsElement.firstChild;
      this.firstWord = this.wordsContainer.firstChild;
      this.secondWord = this.wordsContainer.lastChild;

      this.addToAnimateArray();
    }
  }, {
    key: "changeText",
    value: function changeText() {
      var num = getRandomInt(0, 1);
      if (num > 0) {
        this.setState({ firstWord: this.words[0] });
        this.setState({ secondWord: this.words[1] });
      } else {
        this.setState({ firstWord: this.words[1] });
        this.setState({ secondWord: this.words[0] });
      }
    }
  }, {
    key: "changeGreetingStyles",
    value: function changeGreetingStyles() {
      var updatedStyle = update(this.state, {
        firstWordStyles: {
          marginLeft: { $set: getRandomInt(this.props.minMargins, this.props.maxMargins) + "px" }
        },
        secondWordStyles: {
          marginRight: { $set: getRandomInt(this.props.minMargins, this.props.maxMargins) + "px" }
        },
        wordsContainerStyles: {
          padding: { $set: getRandomInt(0, 40) + "px" },
          fontSize: { $set: getRandomInt(this.props.minFontSize, this.props.maxFontSize) + "px" },
          lineHeight: { $set: getRandomInt(50, this.props.maxLineHeight) + "%" },
          borderWidth: { $set: getRandomInt(0, this.props.maxBorderWidth) + "px" }
        }
      });
      this.setState(updatedStyle);
    }
  }, {
    key: "addToAnimateArray",
    value: function addToAnimateArray() {
      FUNCTIONS_TO_ANIMATE_SLOW.push(this.changeText.bind(this));
      FUNCTIONS_TO_ANIMATE_SLOW.push(this.changeGreetingStyles.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "greetings", style: this.state.greetingsStyles },
        React.createElement(
          "div",
          { style: this.state.wordsContainerStyles },
          React.createElement(
            "span",
            { style: this.state.firstWordStyles },
            this.state.firstWord
          ),
          "-",
          React.createElement("br", null),
          "-",
          React.createElement(
            "span",
            { style: this.state.secondWordStyles },
            this.state.secondWord
          )
        )
      );
    }
  }]);

  return Greetings;
}(React.Component);

var GlitchingBox = function (_React$Component2) {
  _inherits(GlitchingBox, _React$Component2);

  function GlitchingBox(props) {
    _classCallCheck(this, GlitchingBox);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(GlitchingBox).call(this, props));

    _this2.state = {
      boxStyles: {
        zIndex: "" + getRandomInt(0, 1),
        backgroundColor: "hsl(0, 0%, " + getRandomInt(13, 100) + "%)",
        width: getRandomInt(0, window.innerWidth) + "px",
        height: getRandomInt(0, window.innerHeight) + "px",
        transform: "translate(" + getRandomInt(0, window.innerWidth) + "px, " + getRandomInt(0, window.innerHeight) + "px)",
        WebkitTransform: "translate(" + getRandomInt(0, window.innerWidth) + "px, " + getRandomInt(0, window.innerHeight) + "px)"
      }
    };

    _this2.changeBoxStyles = _this2.changeBoxStyles.bind(_this2);
    return _this2;
  }

  _createClass(GlitchingBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addToAnimateArray();
    }
  }, {
    key: "changeBoxStyles",
    value: function changeBoxStyles() {
      var updatedStyle = update(this.state, {
        boxStyles: {
          zIndex: { $set: "" + getRandomInt(0, this.props.maxLayer) },
          backgroundColor: { $set: "hsl(0, 0%, " + getRandomInt(13, 100) + "%)" },
          width: { $set: getRandomInt(1, window.innerWidth) + "px" },
          height: { $set: getRandomInt(1, 50) + "px" },
          transform: { $set: "translate(" + getRandomInt(0, 800) + "px, " + getRandomInt(0, 800) + "px)" },
          WebkitTransform: { $set: "translate(" + getRandomInt(0, 800) + "px, " + getRandomInt(0, 800) + "px)" }
        }
      });
      this.setState(updatedStyle);
    }
  }, {
    key: "addToAnimateArray",
    value: function addToAnimateArray() {
      FUNCTIONS_TO_ANIMATE_ORIGINAL_TIME.push(this.changeBoxStyles.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", { className: "glitchingBoxes", style: this.state.boxStyles });
    }
  }]);

  return GlitchingBox;
}(React.Component);

var GlitchingBoxesManager = function (_React$Component3) {
  _inherits(GlitchingBoxesManager, _React$Component3);

  function GlitchingBoxesManager(props) {
    _classCallCheck(this, GlitchingBoxesManager);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GlitchingBoxesManager).call(this, props));
  }

  _createClass(GlitchingBoxesManager, [{
    key: "render",
    value: function render() {
      var boxes = [];
      for (var i = 0; i < this.props.amount; i++) {
        boxes.push(React.createElement(GlitchingBox, { key: i, maxLayer: this.props.maxLayer }));
      }
      return React.createElement(
        "div",
        null,
        boxes
      );
    }
  }]);

  return GlitchingBoxesManager;
}(React.Component);

var Particle = function (_React$Component4) {
  _inherits(Particle, _React$Component4);

  function Particle(props) {
    _classCallCheck(this, Particle);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Particle).call(this, props));

    _this4.state = {
      pStyles: {
        fontSize: getRandomInt(5, 45) + "px",
        left: getRandomInt(0, window.innerWidth - 10) + "px",
        top: getRandomInt(0, window.innerHeight - 10) + "px"
      }
    };
    _this4.particle = null;

    _this4.DOMElement = null;

    _this4.setParticle = _this4.setParticle.bind(_this4);
    _this4.changeParticleStyles = _this4.changeParticleStyles.bind(_this4);
    _this4.addToAnimateArray = _this4.addToAnimateArray.bind(_this4);
    return _this4;
  }

  _createClass(Particle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.DOMElement = ReactDOM.findDOMNode(this);

      this.addToAnimateArray();
    }
  }, {
    key: "setParticle",
    value: function setParticle() {
      var num = getRandomInt(0, 4);
      if (num == 0) {
        this.particle = "?";
      } else if (num == 1) {
        this.particle = "x";
      } else if (num == 2) {
        this.particle = "o";
      } else if (num == 3) {
        this.particle = "0.o";
      } else {
        this.particle = "!";
      }
    }
  }, {
    key: "changeParticleStyles",
    value: function changeParticleStyles() {
      this.setParticle();

      var randomNum = getRandomInt(0, 2);
      var maxX = null;
      var maxY = null;
      if (randomNum == 0) {
        maxX = this.DOMElement.offsetLeft + window.innerWidth / 2;
        maxY = this.DOMElement.offsetTop + window.innerHeight / 2;
      } else {
        maxX = this.DOMElement.offsetLeft - window.innerWidth / 2;
        maxY = this.DOMElement.offsetTop - window.innerHeight / 2;
      }
      var updatedStyle = update(this.state, {
        pStyles: {
          zIndex: { $set: "" + getRandomInt(0, this.props.maxLayer) },
          transform: { $set: "translate(" + getRandomInt(1, maxX) + "px, " + getRandomInt(1, maxY) + "px)" },
          fontSize: { $set: getRandomInt(5, 45) + "px" }
        }
      });
      this.setState(updatedStyle);
    }
  }, {
    key: "addToAnimateArray",
    value: function addToAnimateArray() {
      FUNCTIONS_TO_ANIMATE_SLOW.push(this.changeParticleStyles.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "h1",
        { className: "ps", style: this.state.pStyles },
        this.particle
      );
    }
  }]);

  return Particle;
}(React.Component);

var ParticlesManager = function (_React$Component5) {
  _inherits(ParticlesManager, _React$Component5);

  function ParticlesManager(props) {
    _classCallCheck(this, ParticlesManager);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticlesManager).call(this, props));
  }

  _createClass(ParticlesManager, [{
    key: "render",
    value: function render() {
      var ps = [];
      for (var i = 0; i < this.props.amount; i++) {
        ps.push(React.createElement(Particle, { key: i, maxLayer: this.props.maxLayer }));
      }
      return React.createElement(
        "div",
        null,
        ps
      );
    }
  }]);

  return ParticlesManager;
}(React.Component);

var About = function (_React$Component6) {
  _inherits(About, _React$Component6);

  function About(props) {
    _classCallCheck(this, About);

    var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(About).call(this, props));

    _this6.state = {
      aboutHiddenStyles: {
        zIndex: "" + _this6.props.layer
      },
      aboutExpandedWrapStyles: {
        zIndex: "" + _this6.props.layer
      },
      textWrapStyles: {
        padding: "50px"
      },
      madeWithStyle: {
        textAlign: "center",
        padding: "10px"
      },
      isClicked: false
    };

    _this6.handleClick = _this6.handleClick.bind(_this6);
    _this6.defaultReturn = _this6.defaultReturn.bind(_this6);
    _this6.expandedReturn = _this6.expandedReturn.bind(_this6);
    return _this6;
  }

  _createClass(About, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.state.isClicked == false) {
        this.setState({ isClicked: true });
        this.props.togglePause();
      } else {
        this.setState({ isClicked: false });
        this.props.togglePause();
      }
    }
  }, {
    key: "defaultReturn",
    value: function defaultReturn() {
      return React.createElement(
        "div",
        { className: "about-hidden", onClick: this.handleClick.bind(this), style: this.state.aboutHiddenStyles },
        "huh?"
      );
    }
  }, {
    key: "expandedReturn",
    value: function expandedReturn() {
      var heart = "<3";
      return React.createElement(
        "div",
        { className: "about-expanded", style: this.state.aboutExpandedWrapStyles },
        React.createElement(
          "div",
          { onClick: this.handleClick.bind(this), className: "about-close" },
          "x"
        ),
        React.createElement(
          "div",
          { className: "about-text-wrap", style: this.state.textWrapStyles },
          "This site has no meaning whatsoever. I made it to practice ReactJS. I think the code of this site is shit. ...well let's just say it's improvable :)"
        ),
        React.createElement(
          "div",
          { style: this.state.madeWithStyle },
          "made with ",
          React.createElement(
            "span",
            null,
            heart
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.isClicked == false) {
        return this.defaultReturn();
      } else {
        return this.expandedReturn();
      }
    }
  }]);

  return About;
}(React.Component);

var App = function (_React$Component7) {
  _inherits(App, _React$Component7);

  function App(props) {
    _classCallCheck(this, App);

    var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this7.requestId_Slow = null;
    _this7.counterSlow = 0;
    _this7.countUntilSlow = 8;
    _this7.incrementCounterBySlow = 1;

    _this7.requestId_Original = null;
    _this7.counterOriginal = 0;
    _this7.countUntilOriginal;
    if (DEV_SWITCH_FOR_ORIGINAL == true) {
      _this7.countUntilOriginal = 1;
    } else {
      _this7.countUntilOriginal = _this7.countUntilSlow / 2;
    }
    _this7.incrementCounterByOriginal = 1;

    _this7.isPaused = false;
    _this7.togglePause = _this7.togglePause.bind(_this7);

    _this7.cancelSlow = _this7.cancelSlow.bind(_this7);
    _this7.cancelOriginal = _this7.cancelOriginal.bind(_this7);
    _this7.cancelAll = _this7.cancelAll.bind(_this7);

    _this7.loopSlow = _this7.loopSlow.bind(_this7);
    _this7.loopOriginal = _this7.loopOriginal.bind(_this7);

    _this7.runSkel = _this7.runSkel.bind(_this7);
    _this7.state = {
      greetingsMinFontSize: 100,
      greetingsMaxFontSize: 300,
      greetingsMaxMargins: 300,
      greetingsMinMargins: -200,
      greetingsMaxLineHeight: 100,
      greetingsMaxBorderWidth: 40
    };
    return _this7;
  }

  _createClass(App, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.runSkel();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.toggleAnimationPause = this.togglePause.bind(this);

      window.cancelSlowAnimation = this.cancelSlow.bind(this);
      window.cancelOriginalAnimation = this.cancelOriginal.bind(this);
      window.cancelAllAnimations = this.cancelAll.bind(this);

      window.loopSlow = this.loopSlow.bind(this);
      window.loopOriginal = this.loopOriginal.bind(this);

      this.loopSlow();
      this.loopOriginal();
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.isPaused == false) {
        this.isPaused = true;
      } else {
        this.isPaused = false;
      }
    }
  }, {
    key: "cancelSlow",
    value: function cancelSlow() {
      window.cancelAnimationFrame(this.requestId_Slow);
    }
  }, {
    key: "cancelOriginal",
    value: function cancelOriginal() {
      window.cancelAnimationFrame(this.requestId_Orignal);
    }
  }, {
    key: "cancelAll",
    value: function cancelAll() {
      window.cancelAnimationFrame(this.requestId_Slow);
      window.cancelAnimationFrame(this.requestId_Orignal);
    }
  }, {
    key: "loopSlow",
    value: function loopSlow() {
      this.counterSlow += this.incrementCounterBySlow;
      if (this.counterSlow > this.countUntilSlow && this.isPaused == false) {
        for (var i = 0; i < FUNCTIONS_TO_ANIMATE_SLOW.length; i++) {
          FUNCTIONS_TO_ANIMATE_SLOW[i]();
        }
        this.counterSlow = 0;
      }
      this.requestId_Slow = window.requestAnimationFrame(this.loopSlow);
    }
  }, {
    key: "loopOriginal",
    value: function loopOriginal() {
      this.counterOriginal += this.incrementCounterByOriginal;
      if (this.counterOriginal > this.countUntilOriginal && this.isPaused == false) {
        for (var i = 0; i < FUNCTIONS_TO_ANIMATE_ORIGINAL_TIME.length; i++) {
          FUNCTIONS_TO_ANIMATE_ORIGINAL_TIME[i]();
        }
        this.counterOriginal = 0;
      }
      this.requestId_Orignal = window.requestAnimationFrame(this.loopOriginal);
    }
  }, {
    key: "runSkel",
    value: function runSkel() {
      var _this8 = this;

      skel.breakpoints({
        large: "(max-width: 1280px)",
        medium: "(max-width: 980px)",
        small: "(max-width: 736px)",
        xsmall: "(max-width: 480px)",
        tiny: "(max-width: 320px)"
      });
      skel.on("+large", function () {
        console.log("Large active.");
        _this8.setState({ greetingsMaxFontSize: 250 });
      });
      skel.on("+medium", function () {
        console.log("Medium active.");
        _this8.setState({ greetingsMaxFontSize: 200 });
        _this8.setState({ greetingsMinMargins: -150 });
        _this8.setState({ greetingsMaxMargins: 200 });
      });
      skel.on("+small", function () {
        console.log("Small active.");
        _this8.setState({
          greetingsMinMargins: -100,
          greetingsMaxMargins: 150
        });
      });
      skel.on("+xsmall", function () {
        console.log("XSmall active.");
        _this8.setState({
          greetingsMaxFontSize: 120,
          greetingsMaxMargins: 50,
          greetingsMaxLineHeight: 50
        });
      });
      skel.on("+tiny", function () {
        console.log("Tiny is active.");
        _this8.setState({
          greetingsMaxFontSize: 100,
          greetingsMinFontSize: 60,
          greetingsMaxMargins: 20,
          greetingsMaxLineHeight: 20,
          greetingsMaxBorderWidth: 20
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "page" },
          React.createElement(Greetings, { layer: 1,
            minFontSize: this.state.greetingsMinFontSize,
            maxFontSize: this.state.greetingsMaxFontSize,
            maxMargins: this.state.greetingsMaxMargins,
            minMargins: this.state.greetingsMinMargins,
            maxLineHeight: this.state.greetingsMaxLineHeight,
            maxBorderWidth: this.state.greetingsMaxBorderWidth }),
          React.createElement(GlitchingBoxesManager, { amount: 10, maxLayer: 1 }),
          React.createElement(ParticlesManager, { amount: 100, maxLayer: 2 }),
          React.createElement(About, { layer: 3, togglePause: this.togglePause.bind(this) })
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector("#app"));

