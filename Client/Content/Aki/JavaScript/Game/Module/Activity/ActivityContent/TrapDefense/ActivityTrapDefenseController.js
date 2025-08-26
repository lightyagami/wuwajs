"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTrapDefenseController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySubViewTrapDefense_1 = require("./ActivitySubViewTrapDefense");
const ActivityTrapDefenseData_1 = require("./ActivityTrapDefenseData");
class ActivityTrapDefenseController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.nye = () => {
      if (ModelManager_1.ModelManager.TrapDefenseModel.NeedOpenActivityMainView) {
        this.z$c();
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  z$c() {
    var e = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
      UiManager_1.UiManager.OpenView("TrapDefenseMainView");
    });
    ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(e);
  }
  async OnOpenSubView(e) {
    if (e === "TrapDefenseMainView") {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenMainEntryView();
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_TowerDefenseActivityMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewTrapDefense_1.ActivitySubViewTrapDefense();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityTrapDefenseData_1.ActivityTrapDefenseData();
    return this.Data;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29390, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "b6u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoChallengeUpdateNotify(e);
    });
    Net_1.Net.Register(21083, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "R6u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoRewardUpdateNotify(e);
    });
    Net_1.Net.Register(26647, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "w6u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoSpecialRewardUpdateNotify(e);
    });
    Net_1.Net.Register(28639, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "A6u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoTechUpdateNotify(e);
    });
    Net_1.Net.Register(16506, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "R8u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdUpdateNotify(e);
    });
    Net_1.Net.Register(24671, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "ycd", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffUpdateNotify(e);
    });
    Net_1.Net.Register(29763, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "q8u", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoTechPointUpdateNotify(e);
    });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29390);
    Net_1.Net.UnRegister(21083);
    Net_1.Net.UnRegister(26647);
    Net_1.Net.UnRegister(28639);
    Net_1.Net.UnRegister(16506);
  }
  RefreshActivityRedDot() {
    var e = this.Data?.Id;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
    }
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("TrapDefenseActivityUnlockView");
  }
}
exports.ActivityTrapDefenseController = ActivityTrapDefenseController;
//# sourceMappingURL=ActivityTrapDefenseController.js.map