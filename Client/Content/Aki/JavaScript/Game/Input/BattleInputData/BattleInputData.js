"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleInputData = undefined;
const InputEnums_1 = require("../InputEnums");
class BattleInputData {
  constructor(t) {
    this.Type = undefined;
    this.Type = t;
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
    var r;
    for ([i, r] of this.OnGetActionMap()) {
      if (r === t) {
        return i;
      }
    }
  }
  GetMoveAxisList() {
    var t;
    var i;
    var r = [];
    for ([t, i] of this.OnGetAxisMap()) {
      if (i === InputEnums_1.EInputAxis.MoveForward || i === InputEnums_1.EInputAxis.MoveRight) {
        r.push(t);
      }
    }
    return r;
  }
  GetCameraAxisList() {
    var t;
    var i;
    var r = [];
    for ([t, i] of this.OnGetAxisMap()) {
      if (i === InputEnums_1.EInputAxis.LookUp || i === InputEnums_1.EInputAxis.Turn || i === InputEnums_1.EInputAxis.Zoom) {
        r.push(t);
      }
    }
    return r;
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