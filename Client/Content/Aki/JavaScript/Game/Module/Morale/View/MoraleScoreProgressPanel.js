"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleScoreProgressPanel = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MoraleScoreProgressPercentItem_1 = require("./MoraleScoreProgressPercentItem"),
  MoraleScoreProgressRewardItem_1 = require("./MoraleScoreProgressRewardItem");
class MoraleScoreProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RewardPercentLayout = void 0, this.RewardRewardLayout = void 0, this.UpdatePercentHandle = () => {
      this.RewardPercentLayout?.GetLayoutItemList().forEach(e => {
        e.UpdatePercentHandle()
      })
    }, this._$1 = () => new MoraleScoreProgressPercentItem_1.MoraleScoreProgressPercentItem, this.rOe = () => {
      var e = new MoraleScoreProgressRewardItem_1.MoraleScoreProgressRewardItem;
      return e.ClickCallBack = this.u$1, e
    }, this.u$1 = e => {
      e.IsCanReceived ? ModelManager_1.ModelManager.MoraleModel.RequestProgressReward(e.Id, !0) : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId)
    }
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UILayoutBase],
      [5, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(2),
      r = this.GetItem(3)?.GetOwner(),
      e = (this.RewardPercentLayout = new GenericLayout_1.GenericLayout(e, this._$1, r), this.GetLayoutBase(4)),
      r = this.GetItem(5)?.GetOwner();
    this.RewardRewardLayout = new GenericLayout_1.GenericLayout(e, this.rOe, r)
  }
  UpdateData() {
    this.UpdateDataExcludeReward(), this.RewardRewardLayout?.RefreshByData(ModelManager_1.ModelManager.MoraleModel.ProgressRewardList)
  }
  UpdateDataExcludeReward() {
    var e = ModelManager_1.ModelManager.MoraleModel,
      r = (this.RewardPercentLayout?.RefreshByData(e.ProgressRewardList, this.UpdatePercentHandle), this.RewardPercentLayout?.BindLateUpdate(() => {
        TimerSystem_1.TimerSystem.Next(this.UpdatePercentHandle), this.RewardPercentLayout?.UnBindLateUpdate()
      }), e.GetCurrentProgressScore()),
      e = e.GetProgressTotalScore(),
      t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Morale_title_17", r, e), this.GetText(1)?.ShowTextNew("Morale_title_1")
  }
}
exports.MoraleScoreProgressPanel = MoraleScoreProgressPanel;
//# sourceMappingURL=MoraleScoreProgressPanel.js.map