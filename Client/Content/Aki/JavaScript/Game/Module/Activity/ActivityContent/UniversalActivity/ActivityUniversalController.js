"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityUniversalController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewUniversal_1 = require("./ActivitySubViewUniversal");
const ActivityUniversalData_1 = require("./ActivityUniversalData");
class ActivityUniversalController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {
    if (this.vFe(e.Id) === 2) {
      ActivityUniversalController.ActivityFunctionExecute(e.Id);
    }
  }
  vFe(e) {
    e = ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(e);
    if (e) {
      return e.FunctionType;
    }
  }
  OnGetActivityResource(e) {
    e = ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(e.Id);
    if (e) {
      return e.UiResource;
    } else {
      return "";
    }
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewUniversal_1.ActivitySubViewUniversal();
  }
  OnCreateActivityData(e) {
    ActivityUniversalController.UniversalActivityIdSet.add(e.s5n);
    return new ActivityUniversalData_1.ActivityUniversalData();
  }
  OnInit() {
    ActivityUniversalController.MFe();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Activity", 37, "初始化通用活动");
    }
    return true;
  }
  OnClear() {
    ActivityUniversalController.UniversalActivityIdSet.clear();
    ActivityUniversalController.OpenViewFuncMap.clear();
    return true;
  }
  static ActivityFunctionExecute(e) {
    e = ConfigManager_1.ConfigManager.ActivityUniversalConfig?.GetActivityUniversalConfig(e);
    if (e) {
      var r;
      var i;
      var t = e.FunctionParams;
      switch (e.FunctionType) {
        case 0:
          break;
        case 1:
          {
            let e = undefined;
            if (t && t.length >= 1) {
              e = Number(t[0]);
            }
            this.EFe(e);
            break;
          }
        case 2:
          if (!(t.length < 1)) {
            r = t[0];
            i = t.slice(1);
            this.SFe(r, i);
          }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 37, "通用活动功能触发", ["Type", e.FunctionType], ["Params", t]);
      }
    }
  }
  static EFe(e) {
    UiManager_1.UiManager.OpenView("QuestView", e);
  }
  static SFe(e, r) {
    var i = ActivityUniversalController.OpenViewFuncMap.get(e);
    if (i) {
      i(r);
    } else {
      UiManager_1.UiManager.OpenView(e, r);
    }
  }
  static MFe() {
    this.OpenViewFuncMap.set("WorldMapView", this.yFe);
    this.OpenViewFuncMap.set("RoguelikeActivityView", this.IFe);
  }
}
(exports.ActivityUniversalController = ActivityUniversalController).UniversalActivityIdSet = new Set();
ActivityUniversalController.OpenViewFuncMap = new Map();
ActivityUniversalController.yFe = e => {
  var r = e ? Number(e[0]) : undefined;
  if (r !== undefined && !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    return;
  }
  r = {
    MarkId: e ? Number(e[0]) : undefined,
    MarkType: 0,
    OpenFogId: 0
  };
  WorldMapController_1.WorldMapController.OpenView(2, false, r);
};
ActivityUniversalController.IFe = e => {
  RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(undefined);
}; //# sourceMappingURL=ActivityUniversalController.js.map