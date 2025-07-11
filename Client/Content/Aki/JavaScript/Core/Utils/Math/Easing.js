"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EasingLibrary = undefined;
class EasingLibrary {
  static EaseInSine(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }
  static EaseOutSine(t) {
    return Math.sin(t * Math.PI / 2);
  }
  static EaseInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }
  static EaseInQuad(t) {
    return t * t;
  }
  static EaseOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }
  static EaseInOutQuad(t) {
    if (t < 0.5) {
      return t * 2 * t;
    } else {
      return 1 - Math.pow(t * -2 + 2, 2) / 2;
    }
  }
  static EaseInCubic(t) {
    return t * t * t;
  }
  static EaseOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  static EaseInOutCubic(t) {
    if (t < 0.5) {
      return t * 4 * t * t;
    } else {
      return 1 - Math.pow(t * -2 + 2, 3) / 2;
    }
  }
  static EaseInQuart(t) {
    return t * t * t * t;
  }
  static EaseOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
  static EaseInOutQuart(t) {
    if (t < 0.5) {
      return t * 8 * t * t * t;
    } else {
      return 1 - Math.pow(t * -2 + 2, 4) / 2;
    }
  }
  static EaseInQuint(t) {
    return t * t * t * t * t;
  }
  static EaseOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }
  static EaseInOutQuint(t) {
    if (t < 0.5) {
      return t * 16 * t * t * t * t;
    } else {
      return 1 - Math.pow(t * -2 + 2, 5) / 2;
    }
  }
  static EaseInExpo(t) {
    if (t === 0) {
      return 0;
    } else {
      return Math.pow(2, t * 10 - 10);
    }
  }
  static EaseOutExpo(t) {
    if (t === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, t * -10);
    }
  }
  static EaseInOutExpo(t) {
    if (t === 0) {
      return 0;
    } else if (t === 1) {
      return 1;
    } else if (t < 0.5) {
      return Math.pow(2, t * 20 - 10) / 2;
    } else {
      return (2 - Math.pow(2, t * -20 + 10)) / 2;
    }
  }
  static EaseInCirc(t) {
    return 1 - Math.sqrt(1 - Math.pow(t, 2));
  }
  static EaseOutCirc(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
  }
  static EaseInOutCirc(t) {
    if (t < 0.5) {
      return (1 - Math.sqrt(1 - Math.pow(t * 2, 2))) / 2;
    } else {
      return (Math.sqrt(1 - Math.pow(t * -2 + 2, 2)) + 1) / 2;
    }
  }
  static EaseInBack(t) {
    var a = 1.70158;
    return t * 2.70158 * t * t - a * t * t;
  }
  static EaseOutBack(t) {
    var a = 1.70158;
    return 1 + Math.pow(t - 1, 3) * 2.70158 + a * Math.pow(t - 1, 2);
  }
  static EaseInOutBack(t) {
    var a = 2.5949095;
    if (t < 0.5) {
      return Math.pow(t * 2, 2) * ((1 + a) * 2 * t - a) / 2;
    } else {
      return (Math.pow(t * 2 - 2, 2) * ((1 + a) * (t * 2 - 2) + a) + 2) / 2;
    }
  }
  static EaseInElastic(t) {
    var a = Math.PI * 2 / 3;
    if (t === 0) {
      return 0;
    } else if (t === 1) {
      return 1;
    } else {
      return -Math.pow(2, t * 10 - 10) * Math.sin((t * 10 - 10.75) * a);
    }
  }
  static EaseOutElastic(t) {
    var a = Math.PI * 2 / 3;
    if (t === 0) {
      return 0;
    } else if (t === 1) {
      return 1;
    } else {
      return Math.pow(2, t * -10) * Math.sin((t * 10 - 0.75) * a) + 1;
    }
  }
  static EaseInOutElastic(t) {
    var a = Math.PI * 2 / 4.5;
    if (t === 0) {
      return 0;
    } else if (t === 1) {
      return 1;
    } else if (t < 0.5) {
      return -(Math.pow(2, t * 20 - 10) * Math.sin((t * 20 - 11.125) * a)) / 2;
    } else {
      return Math.pow(2, t * -20 + 10) * Math.sin((t * 20 - 11.125) * a) / 2 + 1;
    }
  }
  static EaseInBounce(t) {
    return 1 - EasingLibrary.EaseOutBounce(1 - t);
  }
  static EaseOutBounce(t) {
    var a = 7.5625;
    var r = 2.75;
    if (t < 1 / r) {
      return a * t * t;
    }
    if (t < 2 / r) {
      const s = t - 1.5 / r;
      return a * s * s + 0.75;
    }
    if (t < 2.5 / r) {
      const s = t - 2.25 / r;
      return a * s * s + 0.9375;
    }
    const s = t - 2.625 / r;
    return a * s * s + 0.984375;
  }
  static EaseInOutBounce(t) {
    if (t < 0.5) {
      return (1 - EasingLibrary.EaseOutBounce(1 - t * 2)) / 2;
    } else {
      return (1 + EasingLibrary.EaseOutBounce(t * 2 - 1)) / 2;
    }
  }
}
exports.EasingLibrary = EasingLibrary;
//# sourceMappingURL=Easing.js.map