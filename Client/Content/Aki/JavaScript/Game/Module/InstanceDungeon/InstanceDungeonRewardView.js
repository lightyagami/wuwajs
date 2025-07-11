"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRewardView = undefined;
const ue_1 = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const InstanceDungeonRewardItem_1 = require("./InstanceDungeonRewardItem");
class InstanceDungeonRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.K1i = undefined;
    this.sGe = () => {
      return new InstanceDungeonRewardItem_1.InstanceDungeonRewardItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIText], [2, ue_1.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.K1i = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sGe);
  }
  OnBeforeShow() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "InstanceRewardTitle");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "InstanceRewardSubTitle");
    const e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId).RewardId;
    var r = ConfigManager_1.ConfigManager.ExchangeRewardConfig?.GetExchangeRewardConfig(e).RewardId;
    var i = [];
    var n = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    let t = 0;
    let a = 0;
    for (const [s, e] of r) {
      i.push([s, e]);
      if (t < s && n >= s) {
        t = s;
        a = i.length - 1;
      }
    }
    this.K1i.RefreshByData(i, () => {
      for (const e of this.K1i.GetScrollItemList()) {
        e.SetCurrentItem(t);
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        this.K1i.ScrollToTop(a);
      });
    });
  }
}
exports.InstanceDungeonRewardView = InstanceDungeonRewardView;
//# sourceMappingURL=InstanceDungeonRewardView.js.map