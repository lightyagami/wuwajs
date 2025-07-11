"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRangePanel = undefined;
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MarkRangeImageComponent_1 = require("../../Marks/MarkItemView/Components/MarkRangeImageComponent");
class MapRangePanel {
  constructor(e) {
    this.Map = e;
    this.jnn = undefined;
    this.TRi = undefined;
    this.OGc = undefined;
    this.qGc = undefined;
    this.GGc = undefined;
    this.h2l = () => {
      this.SetRangeComponentHide();
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideNavigateMarkRange, this.h2l);
  }
  async wNl() {
    if (!this.jnn) {
      this.jnn = new MarkRangeImageComponent_1.MarkRangeImageComponent();
      this.TRi = this.jnn.CreateThenShowByResourceIdAsync("UiItem_MarkArea_Prefab", this.Map.GetRootItem(), true);
    }
    await this.TRi;
  }
  async SetRangeComponentShow(e, t, i) {
    await this.wNl();
    var a = t && i ? 0 : ConfigManager_1.ConfigManager.CommonConfig.GetPlayPointTrackRange();
    this.jnn?.SetUiActive(true);
    this.jnn?.GetRootItem().SetAnchorOffset(e.ToUeVector2D(true));
    this.jnn?.RangeArea.SetWidth(t ?? a);
    this.jnn?.RangeArea.SetHeight(i ?? a);
    ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo = {
      Position: e,
      Width: t,
      Height: i,
      MapId: this.Map.MapId,
      Gravity: this.Map.MapGravity
    };
  }
  async SetRangeComponentHide() {
    await this.BNl();
    this.jnn?.SetUiActive(false);
    ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo = undefined;
  }
  async BNl() {
    await this.TRi;
  }
  CheckExploreMarkRangeInfo() {
    var e = ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo;
    if (e && e.MapId === this.Map.MapId && e.Gravity === this.Map.MapGravity) {
      if (this.Fx_()) {
        this.SetRangeComponentHide();
      } else {
        this.SetRangeComponentShow(e.Position, e.Width, e.Height);
      }
    }
  }
  MiniMapUpdate() {
    var e = ModelManager_1.ModelManager.WorldMapModel.MapRangeInfo;
    if (e && e.MapId === this.Map.MapId && e.Gravity === this.Map.MapGravity) {
      if (this.OGc?.X !== e.Position.X || this.OGc?.Y !== e.Position.Y || this.GGc !== e.Gravity || this.qGc !== e.MapId || !!this.Fx_()) {
        this.CheckExploreMarkRangeInfo();
        this.OGc = Vector2D_1.Vector2D.Create(e.Position.X, e.Position.Y);
        this.GGc = e.Gravity;
        this.qGc = e.MapId;
      }
    } else {
      this.SetRangeComponentHide();
    }
  }
  Fx_() {
    var e;
    var t = ModelManager_1.ModelManager.WorldMapModel.NavigateMarkShowRangeInfo;
    return !!t && (!!t.IsDiscover || !!(t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t.MarkId)) && (e = t.RelativeDungeonId, t = t.RelativeId, ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayDiscover(e, t)));
  }
  Destroy() {
    if (this.jnn) {
      this.jnn.SkipDestroyActor = false;
      this.jnn.Destroy();
      this.jnn = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HideNavigateMarkRange, this.h2l);
  }
}
exports.MapRangePanel = MapRangePanel;
//# sourceMappingURL=MapRangePanel.js.map