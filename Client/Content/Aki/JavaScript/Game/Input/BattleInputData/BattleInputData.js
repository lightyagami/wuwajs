"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleInputData = undefined;
const InputEnums_1 = require("../InputEnums");
class BattleInputData {
  constructor(t, i = 0) {
    this.Type = undefined;
    this.KeyBindingType = 0;
    this.Type = t;
    this.KeyBindingType = i;
  }
  GetAction(t) {
    var i = this.OnGetActionMap();
    if (i.has(t)) {
      return i.get(t);
    }
  }
  GetAxis(t) {
    var i = this.OnGetAxisMap();
    if (i.has(t)) {
      return i.get(t);
    }
  }
  GetActionNameList() {
    var t = this.OnGetActionMap();
    return Array.from(t.keys());
  }
  GetAxisNameList() {
    var t = this.OnGetAxisMap();
    return Array.from(t.keys());
  }
  GetActionNameByInputAction(t) {
    var i;
    var s;
    for ([i, s] of this.OnGetActionMap()) {
      if (s === t) {
        return i;
      }
    }
  }
  GetMoveAxisList() {
    var t;
    var i;
    var s = [];
    for ([t, i] of this.OnGetAxisMap()) {
      if (i === InputEnums_1.EInputAxis.MoveForward || i === InputEnums_1.EInputAxis.MoveRight) {
        s.push(t);
      }
    }
    return s;
  }
  GetCameraAxisList() {
    var t;
    var i;
    var s = [];
    for ([t, i] of this.OnGetAxisMap()) {
      if (i === InputEnums_1.EInputAxis.LookUp || i === InputEnums_1.EInputAxis.Turn || i === InputEnums_1.EInputAxis.Zoom) {
        s.push(t);
      }
    }
    return s;
  }
  CheckActionInAllowFightActionNameList(t, i) {
    return this.OnCheckActionInAllowFightActionNameList(t, i);
  }
  CheckAxisInAllowFightAxisNameList(t, i) {
    return this.OnCheckAxisInAllowFightAxisNameList(t, i);
  }
  OnCheckActionInAllowFightActionNameList(t, i) {
    return true;
  }
  OnCheckAxisInAllowFightAxisNameList(t, i) {
    return true;
  }
}
exports.BattleInputData = BattleInputData;
//# sourceMappingURL=BattleInputData.js.map