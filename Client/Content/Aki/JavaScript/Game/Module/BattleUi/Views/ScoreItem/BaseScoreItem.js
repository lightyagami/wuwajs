"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseScoreItem = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BaseScoreItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.IsScoreEnable = false;
    this.nmu = (e, t) => {
      if (this.IsValidScore(e)) {
        this.OnBattleScoreChanged(e, t);
      }
    };
    this.smu = (e, t) => {
      if (this.IsValidScore(e)) {
        this.OnBattleScoreEnableChanged(e, t);
      }
    };
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreEnableMap();
    if (e) {
      for (var [t, i] of e.entries()) {
        if (i && this.IsValidScore(t)) {
          this.IsScoreEnable = true;
          break;
        }
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.nmu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreEnableChanged, this.smu);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.nmu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreEnableChanged, this.smu);
  }
  OnShowFirstTime() {
    if (this.IsScoreEnable) {
      this.ShowScore();
    }
  }
  OnTick(e) {}
  IsValidScore(e) {
    return false;
  }
  OnBattleScoreChanged(e, t) {}
  OnBattleScoreEnableChanged(e, t) {
    if (this.IsScoreEnable !== t) {
      if (this.IsScoreEnable = t) {
        this.ShowScore();
      } else {
        this.HideScore();
      }
    }
  }
  ShowScore() {
    this.IsScoreEnable = true;
  }
  HideScore() {
    this.IsScoreEnable = false;
  }
}
exports.BaseScoreItem = BaseScoreItem;
//# sourceMappingURL=BaseScoreItem.js.map