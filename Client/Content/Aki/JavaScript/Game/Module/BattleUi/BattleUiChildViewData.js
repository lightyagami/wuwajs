"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiChildViewData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const VisibleStateUtil_1 = require("./VisibleStateUtil");
const battleUiChildren = [0, 14, 15, 16, 17, 18, 19, 20, 26, 25];
class BattleUiChildViewData {
  constructor() {
    this.EQe = [];
    this.SQe = new Map();
    this.uD1 = new Set();
  }
  AddBattleUiCommonChildVisibleReason(t) {
    this.uD1.add(t);
    this.SetChildrenVisible(0, battleUiChildren, this.uD1.size > 0);
  }
  RemoveBattleUiCommonChildVisibleReason(t) {
    this.uD1.delete(t);
    this.SetChildrenVisible(0, battleUiChildren, this.uD1.size > 0);
  }
  Init() {
    for (let t = this.EQe.length = 0; t < 37; t++) {
      this.EQe.push(1);
    }
    this.EQe.push(0);
  }
  OnLeaveLevel() {}
  Clear() {}
  GetChildVisible(t) {
    return this.EQe[t] === 0;
  }
  SetChildVisible(t, i, e, l = true) {
    var s = this.EQe[i];
    var e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(s, e, t);
    this.EQe[i] = e;
    if (!!l && s !== e && (s === 0 || e === 0)) {
      this.yQe(i);
    }
    return e === 0;
  }
  SetChildrenVisible(t, i, e, l = true) {
    for (const s of i) {
      this.SetChildVisible(t, s, e, l);
    }
  }
  HideBattleView(i, t) {
    for (let t = 0; t < 37; t++) {
      this.SetChildVisible(i, t, false, false);
    }
    if (t) {
      for (const e of t) {
        this.SetChildVisible(i, e, true, false);
      }
    }
    this.IQe();
  }
  ShowBattleView(i) {
    for (let t = 0; t < 37; t++) {
      this.SetChildVisible(i, t, true, false);
    }
    this.IQe();
  }
  AddCallback(t, i) {
    let e = this.SQe.get(t);
    if (!e) {
      e = [];
      this.SQe.set(t, e);
    }
    e.push(i);
  }
  RemoveCallback(t, i) {
    t = this.SQe.get(t);
    if (t && (i = t.indexOf(i)) !== -1) {
      t.splice(i, 1);
    }
  }
  yQe(t) {
    t = this.SQe.get(t);
    if (t) {
      for (const i of t) {
        i();
      }
    }
  }
  IQe() {
    try {
      for (const t of this.SQe.values()) {
        for (const i of t) {
          i();
        }
      }
    } catch (t) {
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Battle", 17, "childViewError", t, ["", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "childViewError", ["error", t]);
      }
    }
  }
  DebugLogAllChildState() {
    for (let i = 0; i < 38; i++) {
      if (this.EQe[i] !== 0) {
        for (let t = 0; t < 15; t++) {
          if (!VisibleStateUtil_1.VisibleStateUtil.GetVisibleByType(this.EQe[i], t)) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "界面被隐藏", ["编号", i], ["原因", t]);
            }
          }
        }
      }
    }
  }
}
exports.BattleUiChildViewData = BattleUiChildViewData;
//# sourceMappingURL=BattleUiChildViewData.js.map