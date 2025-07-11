"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressDoubleDropChallengeItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class ActivityRegressDoubleDropChallengeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.EntryType = e;
    this.p9t = undefined;
    this.tWt = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
      var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(e);
      if (this.EntryType === 1) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.WorldBossAccessPathId);
      } else if (this.EntryType === 2) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.WeekAccessPathId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText]];
  }
  OnStart() {
    var e = this.GetItem(2);
    this.p9t = new ButtonItem_1.ButtonItem(e);
    this.p9t.SetFunction(this.tWt);
  }
  OnBeforeShow() {
    this.U_1();
  }
  U_1() {
    this.Hli();
    this.mp1();
  }
  Hli() {
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(ModelManager_1.ModelManager.ActivityRegressModel.Grade);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsDoubleDropUnlock(this.EntryType);
    let a = "";
    if (this.EntryType === 1) {
      e = t.BossUnLock;
      e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetConditionGroup(e);
      a = e?.HintText ?? "";
    }
    if (this.EntryType === 2) {
      e = t.WeekUnLock;
      t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetConditionGroup(e);
      a = t?.HintText ?? "";
    }
    if (!i && !StringUtils_1.StringUtils.IsEmpty(a)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), a);
    }
    this.p9t.SetUiActive(i);
    this.GetItem(3).SetUIActive(!i);
  }
  mp1() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsDoubleDropUnlock(this.EntryType);
    var t = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(this.EntryType);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(this.EntryType);
    var a = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Recall_double_reward_tips", e ? t : i, i);
  }
}
exports.ActivityRegressDoubleDropChallengeItem = ActivityRegressDoubleDropChallengeItem;
//# sourceMappingURL=ActivityRegressDoubleDropChallengeItem.js.map