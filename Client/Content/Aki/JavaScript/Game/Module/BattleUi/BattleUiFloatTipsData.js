"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiFloatTipsData = exports.BattleUiFloatTip = undefined;
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiManager_1 = require("../../Ui/UiManager");
const MIN_VALID_TIME = 0.1;
class BattleUiFloatTip {
  constructor() {
    this.Type = 0;
    this.TextKey = undefined;
    this.EndTime = 0;
    this.CountdownEndTime = 0;
  }
}
exports.BattleUiFloatTip = BattleUiFloatTip;
class BattleUiFloatTipsData {
  constructor() {
    this.nXe = new Array();
    this.CurTip = undefined;
  }
  Init() {}
  OnLeaveLevel() {
    this.CurTip = undefined;
    this.nXe.length = 0;
  }
  Clear() {}
  GetNextFloatTip() {
    while (this.nXe.length > 0) {
      var t = this.nXe.pop();
      if (!this.CheckIsExpired(t)) {
        return t;
      }
    }
  }
  PlayNormalFloatTip(t, e) {
    var i = new BattleUiFloatTip();
    i.Type = 0;
    i.TextKey = t;
    i.EndTime = Time_1.Time.WorldTimeSeconds + e;
    this.AddNewFloatTip(i);
  }
  PlayCountdownFloatTip(t, e, i) {
    var a = new BattleUiFloatTip();
    a.Type = 1;
    a.TextKey = t;
    a.EndTime = Time_1.Time.WorldTimeSeconds + e;
    a.CountdownEndTime = Time_1.Time.WorldTimeSeconds + i;
    this.AddNewFloatTip(a);
  }
  AddNewFloatTip(t) {
    if (this.CurTip) {
      this.nXe.push(this.CurTip);
    }
    this.CurTip = t;
    if (UiManager_1.UiManager.IsViewOpen("BattleFloatTipsView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiFloatTipUpdate);
    } else {
      UiManager_1.UiManager.OpenView("BattleFloatTipsView");
    }
  }
  CheckIsExpired(t) {
    return t.EndTime - Time_1.Time.WorldTimeSeconds < MIN_VALID_TIME;
  }
}
exports.BattleUiFloatTipsData = BattleUiFloatTipsData;
//# sourceMappingURL=BattleUiFloatTipsData.js.map