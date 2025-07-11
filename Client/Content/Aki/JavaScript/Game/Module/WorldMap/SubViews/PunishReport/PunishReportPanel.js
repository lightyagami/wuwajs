"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportPanel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const PunishReportTargetListPanel_1 = require("./PunishReportTargetListPanel");
class PunishReportPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
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
    this.z7a = new PunishReportTargetListPanel_1.PunishReportTargetListPanel();
    this.z7a.Initialize(this.GetVerticalLayout(16));
    super.OnStart();
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(r) {
    var e;
    if (r.MarkType === 28) {
      this.SetActive(false);
      e = r.MarkConfig.RelativeDungeonId;
      r = r.MarkConfig.RelativeId;
      await ControllerHolder_1.ControllerHolder.LevelPlayReportController.CheckAndRequestLevelPlayVarAsync(e, r);
    }
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(r) {
    this.u2o = r;
    this.LayoutContext.MarkItem = r;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    var r = this.u2o.MarkConfigId;
    var e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(r);
    if (e) {
      e = e.MarkDesc.split("|")[this.u2o.IsPunishReportFinish() ? 1 : 0];
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      this.UpdateMultiMap();
      this.UpdateTopRightIconActive();
      this.UpdateHidePlayMapTipPanel();
      e = this.UpdateQuickGoto();
      this.ConfirmButton.SetActive(!e);
      this.GetVerticalLayout(16).RootUIComp.SetUIActive(true);
      e = this.u2o.CanGetReward();
      this.GetItem(25).SetUIActive(e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), "DarkShoreBossRewardNotGet");
      }
      this.v4e();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "缺少标记配置", ["MarkId", r]);
    }
  }
  v4e() {
    var e = this.u2o.GetPunishReportTarget();
    for (let r = 0; r < e.States.length; ++r) {
      var t = e.States[r];
      var o = e.ConditionTxtIds[r];
      var a = this.z7a.AddItemByKey("Target_" + r);
      a.SetDescLocalNewTxt(o);
      a.SetNumTxt("x1");
      var o = t === 1 ? 2 : 0;
      a.SetState(o);
    }
  }
  OnBeforeDestroy() {
    this.z7a.Clear();
    super.OnBeforeDestroy();
  }
}
exports.PunishReportPanel = PunishReportPanel;
//# sourceMappingURL=PunishReportPanel.js.map