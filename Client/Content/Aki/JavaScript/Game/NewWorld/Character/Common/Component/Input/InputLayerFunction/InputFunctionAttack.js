"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attackOnRelease = exports.attackOnPress = exports.attackFunction = undefined;
const Global_1 = require("../../../../../../Global");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
function attackFunction(t, n) {
  var o;
  var e = Global_1.Global.BaseCharacter;
  if ((e = e && e.CharacterActorComponent?.Entity) && (o = e.GetComponent(206)) && o.Valid && (o = (n.通用_攻击按下 = false, InputFunctionCommon_1.createInputCommandFromDataTable)(e.Id, 4, 1))) {
    n.通用_攻击按下 = true;
    return o;
  } else {
    return undefined;
  }
}
function attackOnPress(t, n) {
  return attackFunction(t, n);
}
function attackOnRelease(t, n) {}
exports.attackFunction = attackFunction;
exports.attackOnPress = attackOnPress;
exports.attackOnRelease = attackOnRelease; //# sourceMappingURL=InputFunctionAttack.js.map