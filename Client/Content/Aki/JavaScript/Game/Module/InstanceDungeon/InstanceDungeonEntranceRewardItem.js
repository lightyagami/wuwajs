"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.InstanceDungeonEntranceRewardItem = void 0;
const ue_1 = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Uth = void 0, this.Jhi = void 0, this.zhi = !0, this.Zhi = 0, this.gMl = 0, this.eli = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.R2e = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonReward")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIScrollViewWithScrollbarComponent],
      [1, ue_1.UIButtonComponent],
      [2, ue_1.UIText],
      [3, ue_1.UIItem],
      [4, ue_1.UIText],
      [5, ue_1.UIItem],
      [6, ue_1.UIItem],
      [7, ue_1.UIText]
    ], this.BtnBindInfo = [
      [1, this.R2e]
    ]
  }
  OnStart() {
    this.Jhi = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.eli), this.Uth && this.RefreshItem(this.Uth.InstanceId)
  }
  OnBeforeDestroy() {
    this.Jhi && (this.Jhi = void 0)
  }
  RefreshItem(e) {
    var i, t, r, a;
    this.InAsyncLoading() ? this.Uth = {
      InstanceId: e
    } : (r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e), i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceDungeonReward(e), t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(r?.RewardId)?.RewardId, this.SetRewardBtnActive(1 < (t?.size ?? 0)), a = (t = ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e)) ? 0 : ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(r?.FirstRewardId ?? 0)?.length, r = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(r?.ExchangeRewardId ?? 0)?.length, this.SetFirstRewardLength(a), this.SetExchangeRewardLength(r), a = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetInstanceFirstRewardId(e), this.RefreshRewardText(!t && 0 !== a), this.RefreshReward(i[0], i[1] || ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstanceCompatible(e)), this.SetDoubleReward(e))
  }
  RefreshReward(e, i) {
    this.zhi = !i, this.Jhi.RefreshByData(e, () => {
      var i = this.Jhi?.GetScrollItemList(),
        t = i?.length ?? 0;
      for (let e = 0; e < t; e++) {
        var r = i[e];
        r.SetReceivedVisible(!this.zhi), r.SetFirstRewardVisible(e < this.Zhi), r.SetExchangeRewardVisible(e >= this.Zhi && e < this.Zhi + this.gMl)
      }
    })
  }
  RefreshRewardText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Text_RewardPreview_Text")
  }
  SetRewardBtnActive(e) {
    this.GetButton(1).GetOwner().GetUIItem().SetUIActive(e), this.GetItem(6)?.SetUIActive(e)
  }
  SetDoubleReward(e) {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e),
      i = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(i?.CustomTypes ?? []),
      t = i && 0 < i.LeftUpCount,
      [e, r, a, n, s] = ModelManager_1.ModelManager.ActivityRegressModel.GetDungeonDoubleDropTuple(e),
      o = e || !!t;
    this.GetItem(3).SetUIActive(o), this.GetItem(5).SetUIActive(o), t && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Double_reward_tips_02"), o = i.GetNumTxtAndParam(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), o[0], o[1], o[2])), e && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), s), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), n, r, a))
  }
  SetFirstRewardLength(e) {
    this.Zhi = e
  }
  SetExchangeRewardLength(e) {
    this.gMl = e
  }
}
exports.InstanceDungeonEntranceRewardItem = InstanceDungeonEntranceRewardItem;
//# sourceMappingURL=InstanceDungeonEntranceRewardItem.js.map