"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleScoreProgressActivityPanel = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MoraleAreaProgressPointItem_1 = require("./MoraleAreaProgressPointItem"),
  MoraleScoreProgressPercentItem_1 = require("./MoraleScoreProgressPercentItem");
class MoraleScoreProgressActivityPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.PercentLayout = void 0, this.PointLayout = void 0, this.UpdatePercentHandle = () => {
      this.PercentLayout?.GetLayoutItemList().forEach(e => {
        e.UpdatePercentHandle()
      })
    }, this._$1 = () => new MoraleScoreProgressPercentItem_1.MoraleScoreProgressPercentItem, this.unu = () => {
      return new MoraleAreaProgressPointItem_1.MoraleAreaProgressPointItem
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
      e = (this.PercentLayout = new GenericLayout_1.GenericLayout(e, this._$1, r), this.GetLayoutBase(4)),
      r = this.GetItem(5)?.GetOwner();
    this.PointLayout = new GenericLayout_1.GenericLayout(e, this.unu, r)
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleModel,
      r = (this.PercentLayout?.RefreshByData(e.ProgressRewardList, this.UpdatePercentHandle), this.PointLayout?.RefreshByData(e.ProgressRewardList), this.PercentLayout?.BindLateUpdate(() => {
        TimerSystem_1.TimerSystem.Next(this.UpdatePercentHandle), this.PercentLayout?.UnBindLateUpdate()
      }), e.GetCurrentProgressScore()),
      e = e.GetProgressTotalScore(),
      t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Morale_title_17", r, e), this.GetText(1)?.ShowTextNew("Morale_title_1")
  }
}
exports.MoraleScoreProgressActivityPanel = MoraleScoreProgressActivityPanel;
//# sourceMappingURL=MoraleScoreProgressActivityPanel.js.map