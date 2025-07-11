"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonTimeAndCountItem = undefined;
const ue_1 = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonTimeAndCountItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIItem], [1, ue_1.UIItem], [2, ue_1.UIText], [3, ue_1.UIText]];
  }
  RefreshItem(e) {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId;
    var i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(i)?.SharedId;
    if (i) {
      var t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(i);
      this.GetItem(0).SetUIActive(true);
      this.GetText(2).SetUIActive(true);
      var i = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(i);
      var t = t.MaxCount;
      const a = t - i;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "InstanceCanRewardTimes", (a >= 0 ? a : 0) + "/" + t);
      if (a === t) {
        this.GetItem(1).SetUIActive(false);
        return;
      }
    } else {
      i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).EnterControlId;
      t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(i);
      if (t?.LimitChallengedTimes) {
        this.GetItem(0).SetUIActive(true);
        this.GetText(2).SetUIActive(true);
        const a = t.LeftChallengedTimes >= 0 ? t.LeftChallengedTimes : 0;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "InstanceCanRewardTimes", a + "/" + t.LimitChallengedTimes);
        if (a === t.LimitChallengedTimes) {
          this.GetItem(1).SetUIActive(false);
          return;
        }
      } else {
        this.GetItem(0).SetUIActive(false);
        this.GetText(2).SetUIActive(false);
      }
    }
    i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceResetTime(e);
    let n = MathUtils_1.MathUtils.LongToBigInt(i ?? 0);
    if (n <= 0) {
      n = MathUtils_1.MathUtils.LongToBigInt(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEndTime);
    }
    const a = Number(n) - TimeUtil_1.TimeUtil.GetServerTime();
    if (n > 0 && a > 0) {
      this.GetItem(1).SetUIActive(true);
      t = TimeUtil_1.TimeUtil.CalculateRemainingTime(a);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), t.TextId, t.TimeValue > 0 ? t.TimeValue : 1);
    } else {
      this.GetItem(1).SetUIActive(false);
    }
  }
}
exports.InstanceDungeonTimeAndCountItem = InstanceDungeonTimeAndCountItem;
//# sourceMappingURL=InstanceDungeonTimeAndCountItem.js.map