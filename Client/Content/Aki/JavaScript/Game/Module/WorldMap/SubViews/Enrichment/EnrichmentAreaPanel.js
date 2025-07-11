"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrichmentAreaPanel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const MapController_1 = require("../../../Map/Controller/MapController");
const MapLogger_1 = require("../../../Map/Misc/MapLogger");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class EnrichmentAreaPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.OnDelBtnClick = () => {
      if (this.u2o) {
        MapController_1.MapController.RequestTrackEnrichmentArea();
        this.Close();
      }
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.LayoutContext.ConfirmButtonItem.SetUiActive(false);
    this.LayoutContext.DelButton.RootUIComp.SetUIActive(true);
  }
  OnShowWorldMapSecondaryUi(r) {
    this.u2o = r;
    this.LayoutContext.MarkItem = r;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(this.LayoutContext);
    var r = this.u2o.MarkConfig.MarkTitle;
    var e = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.u2o.GetEnrichmentItemNameId());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, e);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    var r = this.u2o.MarkConfig.MarkDesc;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r, e);
    this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
    this.UpdateRightDownIconActive();
    this.UpdateTopRightIconByTeleportState();
    this.UpdateQuickGotoActive(true);
  }
  HandleTrack() {
    var r = this.LayoutContext.MarkItem;
    if (r) {
      this.CheckAndShowCrossMapTips(r);
      MapLogger_1.MapLogger.Debug(63, "[地图系统]->追踪", ["markId", r.MarkId], ["IsTracked", r.IsTracked]);
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: r.MarkType,
        MarkId: r.MarkId,
        Track: !r.IsTracked,
        TrackMode: 0
      });
      this.Close();
    }
  }
}
exports.EnrichmentAreaPanel = EnrichmentAreaPanel;
//# sourceMappingURL=EnrichmentAreaPanel.js.map