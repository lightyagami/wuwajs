"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EasingLibrary = void 0;
class EasingLibrary {
  static EaseInSine(t) {
    return 1 - Math.cos(t * Math.PI / 2)
  }
  static EaseOutSine(t) {
    return Math.sin(t * Math.PI / 2)
  }
  static EaseInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2
  }
  static EaseInQuad(t) {
    return t * t
  }
  static EaseOutQuad(t) {
    return 1 - (1 - t) * (1 - t)
  }
  static EaseInOutQuad(t) {
    return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }
  static EaseInCubic(t) {
    return t * t * t
  }
  static EaseOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }
  static EaseInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  static EaseInQuart(t) {
    return t * t * t * t
  }
  static EaseOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }
  static EaseInOutQuart(t) {
    return t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  }
  static EaseInQuint(t) {
    return t * t * t * t * t
  }
  static EaseOutQuint(t) {
    return 1 - Math.pow(1 - t, 5)
  }
  static EaseInOutQuint(t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
  }
  static EaseInExpo(t) {
    return 0 === t ? 0 : Math.pow(2, 10 * t - 10)
  }
  static EaseOutExpo(t) {
    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
  }
  static EaseInOutExpo(t) {
    return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
  }
  static EaseInCirc(t) {
    return 1 - Math.sqrt(1 - Math.pow(t, 2))
  }
  static EaseOutCirc(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2))
  }
  static EaseInOutCirc(t) {
    return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  }
  static EaseInBack(t) {
    var a = 1.70158;
    return 2.70158 * t * t * t - a * t * t
  }
  static EaseOutBack(t) {
    var a = 1.70158;
    return 1 + 2.70158 * Math.pow(t - 1, 3) + a * Math.pow(t - 1, 2)
  }
  static EaseInOutBack(t) {
    var a = 2.5949095;
    return t < .5 ? Math.pow(2 * t, 2) * (2 * (1 + a) * t - a) / 2 : (Math.pow(2 * t - 2, 2) * ((1 + a) * (2 * t - 2) + a) + 2) / 2
  }
  static EaseInElastic(t) {
    var a = 2 * Math.PI / 3;
    return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((10 * t - 10.75) * a)
  }
  static EaseOutElastic(t) {
    var a = 2 * Math.PI / 3;
    return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin((10 * t - .75) * a) + 1
  }
  static EaseInOutElastic(t) {
    var a = 2 * Math.PI / 4.5;
    return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * a)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * a) / 2 + 1
  }
  static EaseInBounce(t) {
    return 1 - EasingLibrary.EaseOutBounce(1 - t)
  }
  static EaseOutBounce(t) {
    var a = 7.5625,
      r = 2.75;
    if (t < 1 / r) return a * t * t;
    if (t < 2 / r) {
      const s = t - 1.5 / r;
      return a * s * s + .75
    }
    if (t < 2.5 / r) {
      const s = t - 2.25 / r;
      return a * s * s + .9375
    }
    const s = t - 2.625 / r;
    return a * s * s + .984375
  }
  static EaseInOutBounce(t) {
    return t < .5 ? (1 - EasingLibrary.EaseOutBounce(1 - 2 * t)) / 2 : (1 + EasingLibrary.EaseOutBounce(2 * t - 1)) / 2
  }
}
exports.EasingLibrary = EasingLibrary;
//# sourceMappingURL=Easing.js.map