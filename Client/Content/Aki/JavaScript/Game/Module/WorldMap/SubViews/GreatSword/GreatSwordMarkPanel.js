"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordMarkPanel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const GreatSwordMarkTargetListPanel_1 = require("./GreatSwordMarkTargetListPanel");
class GreatSwordMarkPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.z7a = undefined;
    this.OnConfirmBtnClick = () => {
      this.HandleTeleport();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnStart() {
    this.z7a = new GreatSwordMarkTargetListPanel_1.GreatSwordMarkTargetListPanel();
    this.z7a.Initialize(this.GetVerticalLayout(16));
    super.OnStart();
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(r) {
    if (r.MarkType === 42) {
      this.SetActive(false);
      r = r.MarkConfig.RelativeId;
      await ControllerHolder_1.ControllerHolder.GreatSwordController.RequestGreatSwordChallengeMarkItemPanelInfo(r);
    }
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(32).SetUIActive(false);
    this.ConfirmButton.SetActive(true);
  }
  OnShowWorldMapSecondaryUi(r) {
    this.u2o = r;
    this.LayoutContext.MarkItem = r;
    var r = this.u2o.MarkConfigId;
    var e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(r);
    if (e) {
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.MarkDesc);
      this.UpdateMultiMap();
      this.UpdateTopRightIconActive();
      this.UpdateHidePlayMapTipPanel();
      this.GetVerticalLayout(16).RootUIComp.SetUIActive(true);
      this.v4e();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 88, "缺少标记配置", ["MarkId", r]);
    }
  }
  v4e() {
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge();
    if (e) {
      for (let r = 0; r < e.SubChallenges.length; ++r) {
        var a = e.SubChallenges[r];
        var o = this.z7a.AddItemByKey("Target_" + r);
        o.SetDescTxt(a.Config.MapGoalText);
        o.SetState(a.Completed);
      }
    }
  }
  OnBeforeDestroy() {
    this.z7a.Clear();
    super.OnBeforeDestroy();
  }
}
exports.GreatSwordMarkPanel = GreatSwordMarkPanel;
//# sourceMappingURL=GreatSwordMarkPanel.js.map