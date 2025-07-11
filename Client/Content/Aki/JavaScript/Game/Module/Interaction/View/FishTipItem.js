"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishTipItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DYNAMIC_FISHING_POINT_NAME = "Fishing_TemporaryPoint";
class FishTipItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos.push([0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]);
  }
  RefreshByFishingPoint(e) {
    var i;
    var a;
    var r;
    var n = ConfigManager_1.ConfigManager.FishingConfig?.GetFishingPointConfigByEntityId(e);
    if (n) {
      i = ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(e);
      r = n.ShowItem;
      a = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(r)?.Name;
      r = ModelManager_1.ModelManager.FishingQuestModel.IsAcceptedEntrustItem(r);
      this.Og(a, r, n.UnlockTech, i?.CurrentCount, i?.MaxCount);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 18, "找不到捕捞点配置", ["实体配置Id", e]);
    }
  }
  RefreshByDynamicFishingPoint(e) {
    var i = ModelManager_1.ModelManager.FishingModel.GetTempFishingPointDataByCreatureDataId(e);
    if (i) {
      this.Og(DYNAMIC_FISHING_POINT_NAME, false, -1, i.CurrentCount, i.MaxCount);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 48, "找不到临时捕捞点配置", ["CreatureDataId", e]);
    }
  }
  Og(e, i, a, r = 0, n = 0) {
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    }
    this.GetItem(3)?.SetUIActive(i);
    e = this.GetItem(2);
    i = this.GetText(1);
    let o = true;
    if (a > 0) {
      a = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(a);
      o = ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(a.Id);
    }
    if (o) {
      e?.SetUIActive(false);
      i?.SetUIActive(true);
      i?.SetText(`<color=#ffe65a>${r}</color>/${n}`);
    } else {
      e?.SetUIActive(true);
      i?.SetUIActive(false);
    }
  }
}
exports.FishTipItem = FishTipItem;
//# sourceMappingURL=FishTipItem.js.map