"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScoreModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const StateRef_1 = require("../../../../Core/Utils/Audio/StateRef");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class BattleScoreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.vIn = new Map();
    this.Hul = new Map();
    this.MIn = new Map();
    this.EIn = 0;
    this.RougeScoreMusicState = new StateRef_1.StateRef("game_rogue_combat_combo_rank", "none");
  }
  OnInit() {
    return true;
  }
  OnLeaveLevel() {
    this.vIn.clear();
    this.Hul.clear();
    this.EIn = 0;
    this.RougeScoreMusicState.State = "none";
    return true;
  }
  HandleBattleScoreNotify(e) {
    this.UpdateScore(e.NAs, e.FAs);
  }
  HandleBattleScoreEnableNotify(e) {
    this.UpdateScoreEnable(e.NAs, e.tWn);
  }
  CacheScoreConfig(e) {
    var t;
    if (!this.MIn.has(e)) {
      if (t = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(e)) {
        this.MIn.set(e, t);
      }
    }
  }
  UpdateScore(e, t) {
    this.vIn.set(e, t);
    if (this.EIn !== e) {
      this.EIn = e;
      this.CacheScoreConfig(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleScoreChanged, e, t);
  }
  UpdateScoreEnable(e, t) {
    this.Hul.set(e, t);
    if (!t) {
      this.vIn.set(e, 0);
    }
    this.CacheScoreConfig(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleScoreEnableChanged, e, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "战斗评分开关改变", ["scoreId", e], ["enable", t]);
    }
  }
  GetScoreConfig(e, t = false) {
    let r = this.MIn.get(e);
    if (!r && t) {
      this.CacheScoreConfig(e);
      r = this.MIn.get(e);
    }
    return r;
  }
  GetScore(e) {
    return this.vIn.get(e) ?? 0;
  }
  GetScoreMap() {
    return this.vIn;
  }
  GetScoreEnableMap() {
    return this.Hul;
  }
  GetCurScoreId() {
    return this.EIn;
  }
  GetCurScore() {
    return this.GetScore(this.EIn);
  }
}
exports.BattleScoreModel = BattleScoreModel;
//# sourceMappingURL=BattleScoreModel.js.map