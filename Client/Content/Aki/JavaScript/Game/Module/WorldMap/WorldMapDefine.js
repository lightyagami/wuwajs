"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlinePlayerIconPathList2 = exports.onlinePlayerIconPathList = exports.MarkPriority2HierarchyIndexHelper = exports.HUANG_LONG_COUNTRY_ID = exports.secondaryUiPanelComponentsRegisterInfoB = exports.secondaryUiPanelComponentsRegisterInfoA = exports.ESecondaryPanel = exports.DEBUG_SPHERE_DEFAULT_DURATION = exports.DEBUG_SPHERE_DEFAULT_SEGMENTS = exports.DEBUG_SPHERE_DEFAULT_RADIUS = exports.MARK_CLICK_RANGE = exports.MARK_ITEM_VIEW_PATH = exports.MORALE_FLAG_BOX_ICON_PATH = exports.TEMPORARY_TELEPORT_NORMAL_ICON_PATH = exports.MULTI_MAP_ICON_PATH = exports.SUB_ICON_PATH = exports.BLOCK_MARK_ICON_PATH = exports.MULTI_MAP_SELECT_ICON_PATH = undefined;
const UE = require("ue");
var ESecondaryPanel;
exports.MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect";
exports.BLOCK_MARK_ICON_PATH = "SP_MarkBlock";
exports.SUB_ICON_PATH = "SP_MarkRecommend";
exports.MULTI_MAP_ICON_PATH = "SP_MarkMultiMap";
exports.TEMPORARY_TELEPORT_NORMAL_ICON_PATH = "SP_MarkTime";
exports.MORALE_FLAG_BOX_ICON_PATH = "SP_MarkGift";
exports.MARK_ITEM_VIEW_PATH = "UiItem_WorldMapMark_Prefab";
exports.MARK_CLICK_RANGE = 50;
exports.DEBUG_SPHERE_DEFAULT_RADIUS = 30;
exports.DEBUG_SPHERE_DEFAULT_SEGMENTS = 30;
exports.DEBUG_SPHERE_DEFAULT_DURATION = 3;
(function (e) {
  e[e.CustomMarkPanel = 0] = "CustomMarkPanel";
  e[e.TeleportPanel = 1] = "TeleportPanel";
  e[e.GeneralPanel = 2] = "GeneralPanel";
  e[e.MarkMenuPanel = 3] = "MarkMenuPanel";
  e[e.QuestPanel = 4] = "QuestPanel";
  e[e.SceneGameplayPanel = 5] = "SceneGameplayPanel";
  e[e.InstanceDungeonEntrancePanel = 6] = "InstanceDungeonEntrancePanel";
  e[e.TowerEntrancePanel = 7] = "TowerEntrancePanel";
  e[e.ParkourPanel = 8] = "ParkourPanel";
  e[e.TemporaryTeleportPanel = 9] = "TemporaryTeleportPanel";
  e[e.DetectorPanel = 10] = "DetectorPanel";
  e[e.BoxPanel = 11] = "BoxPanel";
  e[e.LordGymPanel = 12] = "LordGymPanel";
  e[e.RoguelikePanel = 13] = "RoguelikePanel";
  e[e.EnrichmentAreaPanel = 14] = "EnrichmentAreaPanel";
  e[e.PunishReportPanel = 15] = "PunishReportPanel";
  e[e.CorniceMeetingPanel = 16] = "CorniceMeetingPanel";
  e[e.QuickNavigatePanel = 17] = "QuickNavigatePanel";
  e[e.CaveHole = 18] = "CaveHole";
  e[e.CommonGamePlayPanel = 19] = "CommonGamePlayPanel";
  e[e.TrackMenuPanel = 20] = "TrackMenuPanel";
  e[e.WorldMapNotePanel = 21] = "WorldMapNotePanel";
  e[e.MapMarkTogglePanel = 22] = "MapMarkTogglePanel";
  e[e.MapTravelQuestPanel = 23] = "MapTravelQuestPanel";
  e[e.FishingShip = 24] = "FishingShip";
  e[e.FishingPoint = 25] = "FishingPoint";
  e[e.FishingCage = 26] = "FishingCage";
  e[e.FishingDock = 27] = "FishingDock";
  e[e.ShipTowerEntrancePanel = 28] = "ShipTowerEntrancePanel";
  e[e.WeeklyRoguePanel = 29] = "WeeklyRoguePanel";
  e[e.RogueResPanel = 30] = "RogueResPanel";
  e[e.TraceExploreEntityPanel = 31] = "TraceExploreEntityPanel";
  e[e.GreatSwordChallengePanel = 32] = "GreatSwordChallengePanel";
  e[e.ActivityListPanel = 33] = "ActivityListPanel";
  e[e.HonamiScanItemPanel = 34] = "HonamiScanItemPanel";
  e[e.HonamiScanMachinePanel = 35] = "HonamiScanMachinePanel";
})(ESecondaryPanel = exports.ESecondaryPanel ||= {});
exports.secondaryUiPanelComponentsRegisterInfoA = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIVerticalLayout], [17, UE.UIItem], [18, UE.UIButtonComponent], [19, UE.UIItem], [20, UE.UIText], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UISprite], [24, UE.UISprite], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIButtonComponent], [29, UE.UIButtonComponent], [30, UE.UIText], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UISprite], [35, UE.UIItem], [36, UE.UIText], [37, UE.UIItem], [38, UE.UIText], [39, UE.UIButtonComponent], [40, UE.UIVerticalLayout], [41, UE.UIItem], [42, UE.UIText], [43, UE.UIItem], [44, UE.UIItem], [45, UE.UIItem], [46, UE.UIText]];
exports.secondaryUiPanelComponentsRegisterInfoB = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UIButtonComponent], [11, UE.UISprite], [12, UE.UIButtonComponent]];
exports.HUANG_LONG_COUNTRY_ID = 1;
class PriorityHierarchyIndexNode {
  constructor(e) {
    this.Priority = 0;
    this.MaxHierarchyIndex = 1;
    this.Priority = e;
  }
}
class MarkPriority2HierarchyIndexHelper {
  constructor() {
    this.d3o = [];
  }
  C3o(e, r = 0) {
    let a = 0;
    return a = e === 11 ? 3000 : r;
  }
  AddMarkItem(e, r) {
    var a = this.C3o(e, r);
    var t = this.d3o.length;
    let o = 0;
    if (t === 0) {
      this.d3o.push(new PriorityHierarchyIndexNode(a));
    } else {
      let r = -1;
      for (let e = 0; e < t; ++e) {
        var n = this.d3o[e];
        var s = n.Priority;
        if (!(s < a)) {
          if (s === a) {
            o += n.MaxHierarchyIndex;
            ++n.MaxHierarchyIndex;
            break;
          }
          r = e;
          break;
        }
        o += n.MaxHierarchyIndex;
        if (e === t - 1) {
          r = t;
          break;
        }
      }
      if (r >= 0) {
        this.d3o.splice(r, 0, new PriorityHierarchyIndexNode(a));
      }
    }
    return o;
  }
  RemoveMarkItem(e, r) {
    const a = this.C3o(e, r);
    this.d3o.filter(e => e.Priority === a).every(e => {
      if (e.MaxHierarchyIndex > 0) {
        --e.MaxHierarchyIndex;
      }
      return true;
    });
  }
  ClearData() {
    this.d3o.length = 0;
  }
}
exports.MarkPriority2HierarchyIndexHelper = MarkPriority2HierarchyIndexHelper;
exports.onlinePlayerIconPathList = ["SP_MapFollowing1", "SP_MapFollowing2", "SP_MapFollowing3"];
exports.onlinePlayerIconPathList2 = ["SP_IconMap_Mark_1P_UI", "SP_IconMap_Mark_2P_UI", "SP_IconMap_Mark_3P_UI"]; //# sourceMappingURL=WorldMapDefine.js.map