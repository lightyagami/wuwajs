"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleScoreProgressPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MoraleScoreProgressPercentItem_1 = require("./MoraleScoreProgressPercentItem");
const MoraleScoreProgressRewardItem_1 = require("./MoraleScoreProgressRewardItem");
class MoraleScoreProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RewardPercentLayout = undefined;
    this.RewardRewardLayout = undefined;
    this.UpdatePercentHandle = () => {
      this.RewardPercentLayout?.GetLayoutItemList().forEach(e => {
        e.UpdatePercentHandle();
      });
    };
    this.Q$1 = () => new MoraleScoreProgressPercentItem_1.MoraleScoreProgressPercentItem();
    this.rOe = () => {
      var e = new MoraleScoreProgressRewardItem_1.MoraleScoreProgressRewardItem();
      e.ClickCallBack = this.K$1;
      return e;
    };
    this.K$1 = e => {
      if (e.IsCanReceived) {
        ModelManager_1.ModelManager.MoraleModel.RequestProgressReward(e.Id, true);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
      }
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UILayoutBase], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(2);
    var r = this.GetItem(3)?.GetOwner();
    this.RewardPercentLayout = new GenericLayout_1.GenericLayout(e, this.Q$1, r);
    var e = this.GetLayoutBase(4);
    var r = this.GetItem(5)?.GetOwner();
    this.RewardRewardLayout = new GenericLayout_1.GenericLayout(e, this.rOe, r);
  }
  UpdateData() {
    this.UpdateDataExcludeReward();
    this.RewardRewardLayout?.RefreshByData(ModelManager_1.ModelManager.MoraleModel.ProgressRewardList);
  }
  UpdateDataExcludeReward() {
    var e = ModelManager_1.ModelManager.MoraleModel;
    this.RewardPercentLayout?.RefreshByData(e.ProgressRewardList, this.UpdatePercentHandle);
    this.RewardPercentLayout?.BindLateUpdate(() => {
      TimerSystem_1.TimerSystem.Next(this.UpdatePercentHandle);
      this.RewardPercentLayout?.UnBindLateUpdate();
    });
    var r = e.GetCurrentProgressScore();
    var e = e.GetProgressTotalScore();
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Morale_title_17", r, e);
    this.GetText(1)?.ShowTextNew("Morale_title_1");
  }
}
exports.MoraleScoreProgressPanel = MoraleScoreProgressPanel;
//# sourceMappingURL=MoraleScoreProgressPanel.js.map