"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureObservatoryPanel = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MapVerticalLayoutItem_1 = require("../MapVerticalLayoutItem");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class InfrastructureObservatoryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.q_o = undefined;
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.q_o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), () => new MapVerticalLayoutItem_1.MapVerticalLayoutItem());
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(14).SetUIActive(true);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.cxm();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    this.GetText(4).ShowTextNew(e.GetLocaleDesc());
    this.UpdateMultiMap();
    this.UpdateTopRightIconByTeleportState();
    e = this.UpdateQuickGoto();
    this.LayoutContext.SetConfirmBtnActive(!e);
    this.Cjm();
    this.q_o.RefreshByData(this.pjm());
  }
  cxm() {
    var e = this.LayoutContext.MarkItem;
    this.LayoutContext.SetConfirmBtnEnableClick(!e.IsLocked);
  }
  Cjm() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel();
    var e = Array.from(e.Requirement.entries());
    const a = ModelManager_1.ModelManager.InventoryModel;
    e = e.every(([e, r]) => a.GetItemCountByConfigId(e) >= r);
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel < r && ModelManager_1.ModelManager.InfrastructureModel.FireStatus === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress && e) {
      this.GetItem(25).SetUIActive(true);
      this.GetText(30).ShowTextNew("Map_BuildObser_BuildAllowedTips");
    }
  }
  pjm() {
    var e;
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      return [];
    } else {
      e = new Date(ModelManager_1.ModelManager.InfrastructureModel.FireLevelReachTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      return [{
        LeftTextId: "Build_CompleteTime",
        RightText: TimeUtil_1.TimeUtil.DateFormat3(e),
        ShowBtnHelp: false,
        ShowIcon: false,
        ShowSprite: false,
        ShowScaleIcon: false
      }];
    }
  }
}
exports.InfrastructureObservatoryPanel = InfrastructureObservatoryPanel;
//# sourceMappingURL=InfrastructureObservatoryPanel.js.map