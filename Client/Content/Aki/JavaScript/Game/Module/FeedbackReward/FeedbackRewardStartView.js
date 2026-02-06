"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRewardStartView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class FeedbackRewardStartView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.sGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.YP = () => {
      this.CloseMe();
      UiManager_1.UiManager.OpenView("FeedbackRewardMainView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  OnStart() {
    var e = this.OpenParam;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FeedbackRewardHaveShowRewardId, e);
    const r = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "FeedBackReward_StartView_Text", ModelManager_1.ModelManager.FeedbackRewardModel.CurrentPointCount, r?.Target);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.sGe);
    var a;
    var i;
    var o = [];
    for (const n of ModelManager_1.ModelManager.FeedbackRewardModel.GetCanFinishRewardId()) {
      const r = ConfigManager_1.ConfigManager.FeedbackRewardConfig.GetGivebackScoreRewardById(n);
      if (r) {
        for ([a, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(r.DropId).DropPreview) {
          var t = [{
            ItemId: a,
            IncId: 0
          }, i];
          o.push(t);
          break;
        }
      }
    }
    this.H3e.RefreshByData(o, () => {
      for (const e of this.H3e?.GetLayoutItemList() ?? []) {
        e.BindOnCanExecuteChange(() => false);
        e.SetAllowClickBack(false);
      }
    });
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.SplashScreenController.FinishCurTask(7);
  }
}
exports.FeedbackRewardStartView = FeedbackRewardStartView;
//# sourceMappingURL=FeedbackRewardStartView.js.map