"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelegationData = undefined;
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const LevelGeneralCommons_1 = require("../../../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class DelegationData {
  constructor(e, t, r) {
    this.Id = 0;
    this.Vke = 0;
    this.IsVisible = false;
    this.Id = e;
    this.Vke = t;
    this.IsVisible = r;
  }
  GetConsumeList() {
    var e;
    var t;
    var r = [];
    for ([e, t] of ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(this.Id).Consume) {
      r.push({
        ItemId: e,
        Count: t
      });
    }
    return r;
  }
  GetRecommendList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(this.Id).CapacityMap.keys()) {
      e.push(t);
    }
    return e;
  }
  GetLockText() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(this.Id);
    var e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.UnlockCondition);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  HasBestEvaluate() {
    return this.Vke > 0;
  }
  SetBestEvaluateLevel(e) {
    if (!(this.Vke > e)) {
      this.Vke = e;
    }
  }
  get BestEvaluateLevel() {
    return this.Vke;
  }
  GetNotEnoughConsumeItemId() {
    for (const e of this.GetConsumeList()) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.ItemId) < e.Count) {
        return e.ItemId;
      }
    }
    return -1;
  }
}
exports.DelegationData = DelegationData;
//# sourceMappingURL=DelegationData.js.map