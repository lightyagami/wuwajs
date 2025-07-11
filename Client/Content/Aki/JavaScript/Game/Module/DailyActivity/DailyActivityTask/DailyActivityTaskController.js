"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActiveTaskController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleController_1 = require("../../RoleUi/RoleController");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
class DailyActiveTaskController extends UiControllerBase_1.UiControllerBase {
  static TrackTaskByType(e, a) {
    switch (e) {
      case 1:
        break;
      case 2:
        DailyActiveTaskController.Fkt();
        break;
      case 3:
        var r = [];
        for (const o of a) {
          r.push(Number(o));
        }
        DailyActiveTaskController.dOe(r);
        break;
      case 4:
        {
          let e = "DailyActivityTabView";
          let r = undefined;
          if (a && a.length >= 1 && (e = a[0], a.length >= 2)) {
            r = a.slice(1);
          }
          DailyActiveTaskController.Vkt(e, r);
          break;
        }
      case 5:
        {
          let e = "DailyActivityTabView";
          if (a && a.length >= 1) {
            e = a[0];
          }
          DailyActiveTaskController.COe(e);
          break;
        }
      case 6:
        {
          let e = 0;
          if (a && a.length >= 1) {
            e = Number(a[0]);
          }
          DailyActiveTaskController.Hkt(e);
          break;
        }
      case 7:
        {
          let e = -1;
          if (a && a.length >= 1) {
            e = Number(a[0]);
          }
          DailyActiveTaskController.jkt(e);
          break;
        }
    }
  }
  static Fkt() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023005)) {
      let o = new Map();
      ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest().forEach(e => {
        var r = e.TreeId;
        var a = e.GetCurrentActiveChildQuestNode();
        if (a) {
          e = e.GetTrackDistance(a.NodeId);
          o.set(e, r);
        }
      });
      var [r] = (o = new Map([...o.entries()].sort((e, r) => e[0] - r[0]))).values();
      var a = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
      if (a) {
        let e = undefined;
        for (const l of a.values()) {
          if (l.TreeId === r) {
            e = l;
            break;
          }
        }
        if (e) {
          a = {
            MarkId: e.MarkId,
            MarkType: 12,
            OpenFogId: 0
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, a);
        }
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    }
  }
  static dOe(e) {
    let r = undefined;
    var a = ModelManager_1.ModelManager.AreaModel.GetAreaCountryId() ?? 1;
    if ((e.length === 0 ? r = undefined : e.length === 1 ? r = e[0] : e.length < a ? (r = e[0], Log_1.Log.CheckWarn() && Log_1.Log.Warn("AdventureGuide", 37, "[活跃度系统] 地图跳转Id错误,MarkId数量未对应国家Id", ["当前国家Id", a], ["MarkId数量", e.length])) : r = e[a - 1], r !== undefined) && !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return;
    }
    e = {
      MarkId: r,
      MarkType: 0,
      OpenFogId: 0
    };
    WorldMapController_1.WorldMapController.OpenView(2, false, e);
  }
  static Vkt(e = "DailyActivityTabView", r) {
    ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(e, r);
  }
  static COe(e) {
    RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
  }
  static jkt(e) {
    if (e === undefined || e < 0) {
      UiManager_1.UiManager.OpenView("QuestView");
    } else {
      e = ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(e);
      UiManager_1.UiManager.OpenView("QuestView", e?.Id ?? undefined);
    }
  }
  static Hkt(e) {
    if (e &&= ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)) {
      e = {
        MarkId: e.DeliveryMarkId,
        MarkType: 0,
        StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        OpenFogId: 0
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, e);
    }
  }
}
exports.DailyActiveTaskController = DailyActiveTaskController;
//# sourceMappingURL=DailyActivityTaskController.js.map