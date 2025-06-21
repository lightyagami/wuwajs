"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseScoreItem = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BaseScoreItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments), this.IsScoreEnable = !1, this.jau = (e, t) => {
      this.IsValidScore(e) && this.OnBattleScoreChanged(e, t)
    }, this.Hau = (e, t) => {
      this.IsValidScore(e) && this.OnBattleScoreEnableChanged(e, t)
    }
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreEnableMap();
    if (e)
      for (var [t, i] of e.entries())
        if (i && this.IsValidScore(t)) {
          this.IsScoreEnable = !0;
          break
        } EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.jau), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreEnableChanged, this.Hau)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.jau), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreEnableChanged, this.Hau)
  }
  OnShowFirstTime() {
    this.IsScoreEnable && this.ShowScore()
  }
  OnTick(e) {}
  IsValidScore(e) {
    return !1
  }
  OnBattleScoreChanged(e, t) {}
  OnBattleScoreEnableChanged(e, t) {
    this.IsScoreEnable !== t && ((this.IsScoreEnable = t) ? this.ShowScore() : this.HideScore())
  }
  ShowScore() {
    this.IsScoreEnable = !0
  }
  HideScore() {
    this.IsScoreEnable = !1
  }
}
exports.BaseScoreItem = BaseScoreItem;
//# sourceMappingURL=BaseScoreItem.js.map