"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyAdventureTaskController = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const RoleController_1 = require("../../../RoleUi/RoleController");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
class DailyAdventureTaskController extends UiControllerBase_1.UiControllerBase {
  static TrackTaskByType(e, r) {
    switch (e) {
      case 1:
        break;
      case 2:
        var a = [];
        for (const l of r) {
          a.push(Number(l));
        }
        DailyAdventureTaskController.dOe(a);
        break;
      case 3:
        {
          let e = "DailyActivityTabView";
          if (r && r.length >= 1) {
            e = r[0];
          }
          DailyAdventureTaskController.COe(e);
          break;
        }
      case 4:
        var o = Number(r[0]);
        DailyAdventureTaskController.gha(o);
    }
  }
  static dOe(e) {
    let r = 0;
    if (e.length > 1) {
      a = ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e[0]);
      r = a ? e[0] : e[1];
    }
    var a = {
      MarkId: r,
      MarkType: 0,
      OpenFogId: 0
    };
    WorldMapController_1.WorldMapController.OpenView(2, false, a);
  }
  static COe(e) {
    RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
  }
  static gha(e) {
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
  }
}
exports.DailyAdventureTaskController = DailyAdventureTaskController;
//# sourceMappingURL=DailyAdventureTaskController.js.map