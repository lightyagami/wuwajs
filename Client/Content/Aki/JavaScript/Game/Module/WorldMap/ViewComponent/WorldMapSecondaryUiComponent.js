"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiComponent = undefined;
const MapComponent_1 = require("../../Map/Base/MapComponent");
const RogueResMapEntrancePanel_1 = require("../../PermanentRogue/View/RogueResMapEntrancePanel");
const ParkourEntrancePanel_1 = require("../SubViews/ActivityPanel/ParkourEntrancePanel");
const BoxPanel_1 = require("../SubViews/BoxPanel/BoxPanel");
const CaveHoleSecondaryPanel_1 = require("../SubViews/CaveHole/CaveHoleSecondaryPanel");
const CommonGamePlayPanel_1 = require("../SubViews/CommonGamePlay/CommonGamePlayPanel");
const CorniceMeetingEntrancePanel_1 = require("../SubViews/CorniceMeeting/CorniceMeetingEntrancePanel");
const CustomMarkPanel_1 = require("../SubViews/CustomMarkPanel/CustomMarkPanel");
const DetectorPanel_1 = require("../SubViews/DectetorPanel/DetectorPanel");
const EnrichmentAreaPanel_1 = require("../SubViews/Enrichment/EnrichmentAreaPanel");
const WorldMapFishingCageSecondaryPanel_1 = require("../SubViews/Fishing/WorldMapFishingCageSecondaryPanel");
const WorldMapFishingDockSecondaryPanel_1 = require("../SubViews/Fishing/WorldMapFishingDockSecondaryPanel");
const WorldMapFishingPointSecondaryPanel_1 = require("../SubViews/Fishing/WorldMapFishingPointSecondaryPanel");
const WorldMapFishingShipSecondaryPanel_1 = require("../SubViews/Fishing/WorldMapFishingShipSecondaryPanel");
const GeneralPanel_1 = require("../SubViews/GeneralPanel/GeneralPanel");
const GreatSwordMarkPanel_1 = require("../SubViews/GreatSword/GreatSwordMarkPanel");
const InstanceDungeonEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/InstanceDungeonEntrancePanel");
const RoguelikeEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/RoguelikeEntrancePanel");
const ShipTowerEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/ShipTowerEntrancePanel");
const TowerEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/TowerEntrancePanel");
const WeeklyRogueEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/WeeklyRogueEntrancePanel");
const LordGymPanel_1 = require("../SubViews/LordGymPanel/LordGymPanel");
const MapMarkTogglePanel_1 = require("../SubViews/MapMarkToggle/MapMarkTogglePanel");
const MapTravelQuestPanel_1 = require("../SubViews/MapTravel/MapTravelQuestPanel");
const MarkMenu_1 = require("../SubViews/MarkMenu/MarkMenu");
const PunishReportPanel_1 = require("../SubViews/PunishReport/PunishReportPanel");
const QuestPanel_1 = require("../SubViews/QuestPanel/QuestPanel");
const SceneGameplayPanel_1 = require("../SubViews/SceneGameplayPanel/SceneGameplayPanel");
const TeleportPanel_1 = require("../SubViews/TeleportPanel/TeleportPanel");
const TemporaryTeleportPanel_1 = require("../SubViews/TemporaryTeleportPanel/TemporaryTeleportPanel");
const TraceExploreEntityPanel_1 = require("../SubViews/TraceExploreEntityPanel/TraceExploreEntityPanel");
const TrackMenuPanel_1 = require("../SubViews/TrackMenu/TrackMenuPanel");
const WorldMapNotePanel_1 = require("../SubViews/WorldMapNote/WorldMapNotePanel");
const WorldMapQuickNavigatePanel_1 = require("../SubViews/WorldMapQuickNavigate/WorldMapQuickNavigatePanel");
const WorldMapDefine_1 = require("../WorldMapDefine");
const WorldMapSecondaryUi_1 = require("./WorldMapSecondaryUi");
const worldMapSecondaryPanelCtorMap = new Map([[WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel, CustomMarkPanel_1.CustomMarkPanel], [WorldMapDefine_1.ESecondaryPanel.QuestPanel, QuestPanel_1.QuestPanel], [WorldMapDefine_1.ESecondaryPanel.GeneralPanel, GeneralPanel_1.GeneralPanel], [WorldMapDefine_1.ESecondaryPanel.MarkMenuPanel, MarkMenu_1.MarkMenu], [WorldMapDefine_1.ESecondaryPanel.ParkourPanel, ParkourEntrancePanel_1.ParkourEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.LordGymPanel, LordGymPanel_1.LordGymPanel], [WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel, SceneGameplayPanel_1.SceneGameplayPanel], [WorldMapDefine_1.ESecondaryPanel.TemporaryTeleportPanel, TemporaryTeleportPanel_1.TemporaryTeleportPanel], [WorldMapDefine_1.ESecondaryPanel.DetectorPanel, DetectorPanel_1.DetectorPanel], [WorldMapDefine_1.ESecondaryPanel.BoxPanel, BoxPanel_1.BoxPanel], [WorldMapDefine_1.ESecondaryPanel.EnrichmentAreaPanel, EnrichmentAreaPanel_1.EnrichmentAreaPanel], [WorldMapDefine_1.ESecondaryPanel.PunishReportPanel, PunishReportPanel_1.PunishReportPanel], [WorldMapDefine_1.ESecondaryPanel.TeleportPanel, TeleportPanel_1.TeleportPanel], [WorldMapDefine_1.ESecondaryPanel.InstanceDungeonEntrancePanel, InstanceDungeonEntrancePanel_1.InstanceDungeonEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel, TowerEntrancePanel_1.TowerEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.ShipTowerEntrancePanel, ShipTowerEntrancePanel_1.ShipTowerEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.RoguelikePanel, RoguelikeEntrancePanel_1.RoguelikeEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.WeeklyRoguePanel, WeeklyRogueEntrancePanel_1.WeeklyRogueEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.RogueResPanel, RogueResMapEntrancePanel_1.RogueResMapEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel, CorniceMeetingEntrancePanel_1.CorniceMeetingEntrancePanel], [WorldMapDefine_1.ESecondaryPanel.QuickNavigatePanel, WorldMapQuickNavigatePanel_1.WorldMapQuickNavigatePanel], [WorldMapDefine_1.ESecondaryPanel.CaveHole, CaveHoleSecondaryPanel_1.CaveHoleSecondaryPanel], [WorldMapDefine_1.ESecondaryPanel.CommonGamePlayPanel, CommonGamePlayPanel_1.CommonGamePlayPanel], [WorldMapDefine_1.ESecondaryPanel.TrackMenuPanel, TrackMenuPanel_1.TrackMenuPanel], [WorldMapDefine_1.ESecondaryPanel.WorldMapNotePanel, WorldMapNotePanel_1.WorldMapNotePanel], [WorldMapDefine_1.ESecondaryPanel.MapMarkTogglePanel, MapMarkTogglePanel_1.MapMarkTogglePanel], [WorldMapDefine_1.ESecondaryPanel.MapTravelQuestPanel, MapTravelQuestPanel_1.MapTravelQuestPanel], [WorldMapDefine_1.ESecondaryPanel.FishingShip, WorldMapFishingShipSecondaryPanel_1.WorldMapFishingShipSecondaryPanel], [WorldMapDefine_1.ESecondaryPanel.FishingPoint, WorldMapFishingPointSecondaryPanel_1.WorldMapFishingPointSecondaryPanel], [WorldMapDefine_1.ESecondaryPanel.FishingCage, WorldMapFishingCageSecondaryPanel_1.WorldMapFishingCageSecondaryPanel], [WorldMapDefine_1.ESecondaryPanel.FishingDock, WorldMapFishingDockSecondaryPanel_1.WorldMapFishingDockSecondaryPanel], [WorldMapDefine_1.ESecondaryPanel.TraceExploreEntityPanel, TraceExploreEntityPanel_1.TraceExploreEntityPanel], [WorldMapDefine_1.ESecondaryPanel.GreatSwordChallengePanel, GreatSwordMarkPanel_1.GreatSwordMarkPanel]]);
class WorldMapSecondaryUiComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.vFo = new Map();
  }
  get ComponentType() {
    return 1;
  }
  get ExtraSecondaryUiOpen() {
    return this.PropertyMap.tryGet(0, false);
  }
  set ExtraSecondaryUiOpen(e) {
    this.PropertyMap.set(0, e);
  }
  IsInternalSecondaryUiOpen() {
    for (var [, e] of this.vFo) {
      if (e instanceof WorldMapSecondaryUi_1.WorldMapSecondaryUi && !e.IsUiCloseComplete) {
        return true;
      }
    }
    return false;
  }
  get IsSecondaryUiOpening() {
    return this.ExtraSecondaryUiOpen || this.IsInternalSecondaryUiOpen();
  }
  get NYa() {
    var e = this.Parent;
    if (e !== undefined) {
      return e;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnRemove() {
    if (this.vFo) {
      this.vFo.clear();
    }
  }
  ShowPanel(e, n, a = 1) {
    var r = e.GetSecondaryUiType();
    this.EFo(r, n, e, a);
  }
  ShowMarkMenu(e, n) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.MarkMenuPanel, e, n);
  }
  ShowTrackMenu(e, n) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.TrackMenuPanel, e, n);
  }
  ShowWorldMapNotePanel(e, n) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.WorldMapNotePanel, e, n);
  }
  ShowMapMarkTogglePanel(e) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.MapMarkTogglePanel, e);
  }
  ShowQuickNavigate(e, n) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.QuickNavigatePanel, e, n);
  }
  async EFo(e, n, ...a) {
    var r = WorldMapDefine_1.ESecondaryPanel[e];
    let o = this.vFo.get(r);
    if (o) {
      o.MarkForOpen();
    } else {
      e = worldMapSecondaryPanelCtorMap.get(e);
      o = new e();
      this.vFo.set(r, o);
      o.MarkForOpen();
      await o.CreateByResourceIdAsync(o.GetResourceId(), n);
    }
    e = o;
    r = this.NYa.Map;
    await e.ShowPanel(r, ...a);
  }
  CloseUi(e, n = true) {
    for (var [, a] of this.vFo) {
      if (a instanceof WorldMapSecondaryUi_1.WorldMapSecondaryUi) {
        var r = a.GetRootItem();
        if (a.IsUiOpen && r) {
          a.Close(e, n);
          return;
        }
      }
    }
  }
  GetSecondaryPanelGuideFocusUiItem(e) {
    return this.vFo.get(WorldMapDefine_1.ESecondaryPanel[e])?.GetGuideFocusUiItem();
  }
  AllSecondaryPanelsUpdateMap() {
    for (var [, e] of this.vFo) {
      var n = this.NYa.Map;
      e.UpdateMap(n);
    }
  }
}
exports.WorldMapSecondaryUiComponent = WorldMapSecondaryUiComponent;
//# sourceMappingURL=WorldMapSecondaryUiComponent.js.map