"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRougeData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityRougeData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TFe = 0;
    this.LFe = 0;
    this.qra = false;
    this.Mgl = undefined;
  }
  set FunctionBtnRedDot(t) {
    this.qra = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  get FunctionBtnRedDot() {
    return this.qra;
  }
  get SeasonData() {
    return this.Mgl;
  }
  PhraseEx(t) {
    t = t.Wps;
    if (t) {
      this.Mgl = t.PS_;
      ModelManager_1.ModelManager.RoguelikeModel.TempCountdown = t.PS_?.dps;
      this.TFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps));
      this.LFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Ups));
      this.qra = this.GetIfFirstOpen();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Roguelike", 58, "ActivityRougeData无肉鸽额外数据");
    }
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  get ReceiveEndOpenTime() {
    return this.LFe;
  }
  get RedPointShowState() {
    return this.GetRogueActivityState() !== 2 && (!!this.GetIfFirstOpen() || !!this.IsUnLock() && !!this.GetExDataRedPointShowState());
  }
  GetExtraConfig() {
    return ConfigManager_1.ConfigManager.ActivityRogueConfig.GetActivityUniversalConfig(this.Id);
  }
  GetExDataRedPointShowState() {
    return this.qra || ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeAchievementRedDot() || ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill() || ModelManager_1.ModelManager.RoguelikeModel.CheckRoguelikeShopRedDot();
  }
  GetRogueActivityState() {
    if (this.CheckIfInOpenTime()) {
      return 0;
    } else if (this.CheckIfInTimeInterval(this.TFe, this.LFe)) {
      return 1;
    } else {
      return 2;
    }
  }
}
exports.ActivityRougeData = ActivityRougeData;
//# sourceMappingURL=ActivityRogueData.js.map