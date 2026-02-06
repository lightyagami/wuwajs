"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpineRoleGachaPoolItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityController_1 = require("../../Activity/ActivityController");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const ButtonFunctionComponent_1 = require("./ButtonFunctionComponent");
const GachaPoolItem_1 = require("./GachaPoolItem");
const RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class SpineRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.mWt = undefined;
    this.Fpu = undefined;
    this.rZi = () => {
      var e;
      if (ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId)) {
        ActivityController_1.ActivityController.CloseAndOpenActivityById("GachaMainView", this.GachaViewInfo.TrialActivityId, 4, this.GachaViewInfo.TrialRoleId);
        (e = new LogReportDefine_1.OnClickGachaTryRoleLogEvent()).i_gacha_id = this.GachaViewInfo.Id;
        e.i_role_id = this.GachaViewInfo.ShowIdList[0];
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_1100253_Text");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await this.Npu();
    await this.Vpu();
  }
  async Npu() {
    this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent();
    await this.mWt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async Vpu() {
    this.Fpu = new ButtonFunctionComponent_1.ButtonFunctionComponent();
    await this.Fpu.CreateThenShowByResourceIdAsync("UiItem_BtnFunction", this.mWt?.GetJumpBtnRoot());
    this.Fpu.SetFunction(this.rZi);
  }
  Refresh() {
    var e;
    if (this.GachaViewInfo) {
      e = this.GachaViewInfo.ShowIdList[0];
      this.mWt.Update(e, this.GachaType !== 6);
      if (!StringUtils_1.StringUtils.IsBlank(this.GachaViewInfo.TextTexture)) {
        this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(1));
      }
      this.RefreshAnimation();
      e = ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GachaViewInfo.TrialActivityId);
      this.Fpu?.SetUiActive(this.GachaViewInfo.TrialActivityId > 0 && e);
    }
  }
  SetDescUiActive(e) {
    this.mWt.SetUiActive(e);
  }
  RefreshAnimation() {
    this.GetSpine(2).SetAnimation(0, "idle", true);
  }
}
exports.SpineRoleGachaPoolItem = SpineRoleGachaPoolItem;
//# sourceMappingURL=SpineRoleGachaPoolItem.js.map