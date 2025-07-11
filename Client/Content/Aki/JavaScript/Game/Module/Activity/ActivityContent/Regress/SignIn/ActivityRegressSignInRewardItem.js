"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressSignInRewardItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressSignInRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.sft = undefined;
    this.Xy = 0;
    this.hma = 0;
    this.u6e = undefined;
    this.G3e = () => {
      var e;
      if (ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(this.hma, 1)) {
        this.u6e?.(this.Xy);
      } else {
        e = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardConfigByIndex(this.Xy);
        [e] = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardPreviewReward(e);
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.G3e]];
  }
  RegisterItemClickCallBack(e) {
    this.u6e = e;
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(4).GetOwner());
    this.sft.BindOnCanExecuteChange(() => false);
    this.sft.BindOnExtendToggleClicked(this.G3e);
  }
  RefreshByData(e) {
    var i = (this.Xy = e) + 1;
    this.hma = i;
    this.GetText(5).SetText("0" + i);
    var t = ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(this.hma, 1);
    var r = ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(this.hma, 2);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardState(i);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardLocalTextKeyByState(i);
    var s = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
    this.GetItem(1).SetUIActive(t);
    this.GetItem(2).SetUIActive(r);
    s = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardConfigByIndex(e);
    i = ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardPreviewItemInfo(s);
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.sft, i);
  }
}
exports.ActivityRegressSignInRewardItem = ActivityRegressSignInRewardItem;
//# sourceMappingURL=ActivityRegressSignInRewardItem.js.map