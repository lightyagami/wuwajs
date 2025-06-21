"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpineRoleGachaPoolItem = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityController_1 = require("../../Activity/ActivityController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  ButtonFunctionComponent_1 = require("./ButtonFunctionComponent"),
  GachaPoolItem_1 = require("./GachaPoolItem"),
  RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class SpineRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments), this.mWt = void 0, this.x_u = void 0, this.rZi = () => {
      ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId) ? ActivityController_1.ActivityController.CloseAndOpenActivityById("GachaMainView", this.GachaViewInfo.TrialActivityId, 4, this.GachaViewInfo.TrialRoleId) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_1100253_Text")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    await this.U_u(), await this.D_u()
  }
  async U_u() {
    this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent, await this.mWt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  async D_u() {
    this.x_u = new ButtonFunctionComponent_1.ButtonFunctionComponent, await this.x_u.CreateThenShowByResourceIdAsync("UiItem_BtnFunction", this.mWt?.GetJumpBtnRoot()), this.x_u.SetFunction(this.rZi)
  }
  Refresh() {
    var t;
    this.GachaViewInfo && (t = this.GachaViewInfo.ShowIdList[0], this.mWt.Update(t, 6 !== this.GachaType), StringUtils_1.StringUtils.IsBlank(this.GachaViewInfo.TextTexture) || this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(1)), this.GetSpine(2).SetAnimation(0, "idle", !0), t = ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId), this.x_u?.SetUiActive(0 < this.GachaViewInfo.TrialActivityId && t))
  }
  SetDescUiActive(t) {
    this.mWt.SetUiActive(t)
  }
}
exports.SpineRoleGachaPoolItem = SpineRoleGachaPoolItem;
//# sourceMappingURL=SpineRoleGachaPoolItem.js.map