"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectorPanel = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapController_1 = require("../../../Map/Controller/MapController");
const MapLogger_1 = require("../../../Map/Misc/MapLogger");
const MapExploreToolController_1 = require("../../../MapExploreTool/MapExploreToolController");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class DetectorPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.OnDelBtnClick = () => {
      var r = this.u2o.MarkId;
      MapExploreToolController_1.MapExploreToolController.RemoveTreasureBoxSlotRequest(r);
      this.Close();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(12).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.LayoutContext.DelButton.RootUIComp.SetUIActive(true);
    this.LayoutContext.SetConfirmBtnActive(false);
  }
  OnShowWorldMapSecondaryUi(r) {
    this.u2o = r;
    this.LayoutContext.MarkItem = r;
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("TreasureBoxDetectionMaxNum") ?? 0;
    this.GetText(1).SetText(StringUtils_1.StringUtils.Format("{0}{1}/{2}", this.u2o.GetTitleText(), ModelManager_1.ModelManager.MapModel.GetMarkCountByType(17).toString(), e.toString()));
    this.LayoutContext.DescriptionText.SetText(r.GetDescText());
    this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
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
exports.DetectorPanel = DetectorPanel;
//# sourceMappingURL=DetectorPanel.js.map