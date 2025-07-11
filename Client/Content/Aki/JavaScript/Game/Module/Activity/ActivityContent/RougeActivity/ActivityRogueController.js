"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRogueController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRogueData_1 = require("./ActivityRogueData");
const ActivitySubViewRogue_1 = require("./ActivitySubViewRogue");
class ActivityRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {
    if (this.vFe(e.Id) === 2) {
      ActivityRogueController.ActivityFunctionExecute(e.Id);
    }
  }
  vFe(e) {
    e = ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(e);
    if (e) {
      return e.FunctionType;
    }
  }
  OnGetActivityResource(e) {
    e = ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(e.Id);
    if (e) {
      return e.ActivityResource;
    } else {
      return "UiItem_ActivityRouge";
    }
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRogue_1.ActivitySubViewRogue();
  }
  OnCreateActivityData(e) {
    ActivityRogueController.ActivityId = e.s5n;
    return new ActivityRogueData_1.ActivityRougeData();
  }
  OnInit() {
    ActivityRogueController.MFe();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Activity", 37, "初始化肉鸽活动");
    }
    return true;
  }
  OnClear() {
    ActivityRogueController.OpenViewFuncMap.clear();
    return true;
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityRogueController.ActivityId);
    if (e) {
      return e;
    }
  }
  static RefreshActivityRedDot() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
  }
  static ActivityFunctionExecute(e) {
    e = ConfigManager_1.ConfigManager.ActivityRogueConfig?.GetActivityUniversalConfig(e);
    if (e) {
      var t;
      var i;
      var r = e.FunctionParams;
      switch (e.FunctionType) {
        case 0:
          break;
        case 1:
          {
            let e = undefined;
            if (r && r.length >= 1) {
              e = Number(r[0]);
            }
            this.EFe(e);
            break;
          }
        case 2:
          if (!(r.length < 1)) {
            t = r[0];
            i = r.slice(1);
            this.SFe(t, i);
          }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 37, "肉鸽活动功能触发", ["Type", e.FunctionType], ["Params", r]);
      }
    }
  }
  static EFe(e) {
    UiManager_1.UiManager.OpenView("QuestView", e);
  }
  static SFe(e, t) {
    var i = ActivityRogueController.OpenViewFuncMap.get(e);
    if (i) {
      i(t);
    } else {
      UiManager_1.UiManager.OpenView(e, t);
    }
  }
  static MFe() {
    this.OpenViewFuncMap.set("WorldMapView", this.yFe);
    this.OpenViewFuncMap.set("RoguelikeActivityView", this.IFe);
  }
}
(exports.ActivityRogueController = ActivityRogueController).ActivityId = 0;
ActivityRogueController.OpenViewFuncMap = new Map();
ActivityRogueController.yFe = e => {
  var t = e ? Number(e[0]) : undefined;
  if (t !== undefined && !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(t)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    return;
  }
  t = {
    MarkId: e ? Number(e[0]) : undefined,
    MarkType: 0,
    OpenFogId: 0
  };
  WorldMapController_1.WorldMapController.OpenView(2, false, t);
};
ActivityRogueController.IFe = e => {
  RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView().then(undefined);
}; //# sourceMappingURL=ActivityRogueController.js.map