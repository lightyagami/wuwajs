"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpineRoleGachaPoolItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityController_1 = require("../../Activity/ActivityController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const ButtonFunctionComponent_1 = require("./ButtonFunctionComponent");
const GachaPoolItem_1 = require("./GachaPoolItem");
const RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class SpineRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.mWt = undefined;
    this.F0u = undefined;
    this.rZi = () => {
      if (ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId)) {
        ActivityController_1.ActivityController.CloseAndOpenActivityById("GachaMainView", this.GachaViewInfo.TrialActivityId, 4, this.GachaViewInfo.TrialRoleId);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_1100253_Text");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await this.N0u();
    await this.V0u();
  }
  async N0u() {
    this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent();
    await this.mWt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async V0u() {
    this.F0u = new ButtonFunctionComponent_1.ButtonFunctionComponent();
    await this.F0u.CreateThenShowByResourceIdAsync("UiItem_BtnFunction", this.mWt?.GetJumpBtnRoot());
    this.F0u.SetFunction(this.rZi);
  }
  Refresh() {
    var t;
    if (this.GachaViewInfo) {
      t = this.GachaViewInfo.ShowIdList[0];
      this.mWt.Update(t, this.GachaType !== 6);
      if (!StringUtils_1.StringUtils.IsBlank(this.GachaViewInfo.TextTexture)) {
        this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(1));
      }
      this.GetSpine(2).SetAnimation(0, "idle", true);
      t = ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId);
      this.F0u?.SetUiActive(this.GachaViewInfo.TrialActivityId > 0 && t);
    }
  }
  SetDescUiActive(t) {
    this.mWt.SetUiActive(t);
  }
}
exports.SpineRoleGachaPoolItem = SpineRoleGachaPoolItem;
//# sourceMappingURL=SpineRoleGachaPoolItem.js.map