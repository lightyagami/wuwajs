"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleScoreProgressActivityPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MoraleAreaProgressPointItem_1 = require("./MoraleAreaProgressPointItem");
const MoraleScoreProgressPercentItem_1 = require("./MoraleScoreProgressPercentItem");
class MoraleScoreProgressActivityPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PercentLayout = undefined;
    this.PointLayout = undefined;
    this.UpdatePercentHandle = () => {
      this.PercentLayout?.GetLayoutItemList().forEach(e => {
        e.UpdatePercentHandle();
      });
    };
    this.Q$1 = () => new MoraleScoreProgressPercentItem_1.MoraleScoreProgressPercentItem();
    this.blu = () => {
      return new MoraleAreaProgressPointItem_1.MoraleAreaProgressPointItem();
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
    this.PercentLayout = new GenericLayout_1.GenericLayout(e, this.Q$1, r);
    var e = this.GetLayoutBase(4);
    var r = this.GetItem(5)?.GetOwner();
    this.PointLayout = new GenericLayout_1.GenericLayout(e, this.blu, r);
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleModel;
    this.PercentLayout?.RefreshByData(e.ProgressRewardList, this.UpdatePercentHandle);
    this.PointLayout?.RefreshByData(e.ProgressRewardList);
    this.PercentLayout?.BindLateUpdate(() => {
      TimerSystem_1.TimerSystem.Next(this.UpdatePercentHandle);
      this.PercentLayout?.UnBindLateUpdate();
    });
    var r = e.GetCurrentProgressScore();
    var e = e.GetProgressTotalScore();
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Morale_title_17", r, e);
    this.GetText(1)?.ShowTextNew("Morale_title_1");
  }
}
exports.MoraleScoreProgressActivityPanel = MoraleScoreProgressActivityPanel;
//# sourceMappingURL=MoraleScoreProgressActivityPanel.js.map