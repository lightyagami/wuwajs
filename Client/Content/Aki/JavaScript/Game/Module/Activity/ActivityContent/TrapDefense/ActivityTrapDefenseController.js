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
        this.tHu();
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
  tHu() {
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
    Net_1.Net.Register(17461, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "A9c", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoChallengeUpdateNotify(e);
    });
    Net_1.Net.Register(23734, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "P9c", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoRewardUpdateNotify(e);
    });
    Net_1.Net.Register(15617, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "D9c", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoSpecialRewardUpdateNotify(e);
    });
    Net_1.Net.Register(25489, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "U9c", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoTechUpdateNotify(e);
    });
    Net_1.Net.Register(27803, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "lHc", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdUpdateNotify(e);
    });
    Net_1.Net.Register(20060, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "fbd", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoBdBuffUpdateNotify(e);
    });
    Net_1.Net.Register(26099, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseEvent", 69, "yKc", ["", e]);
      }
      ModelManager_1.ModelManager.TrapDefenseModel?.ProtoTechPointUpdateNotify(e);
    });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17461);
    Net_1.Net.UnRegister(23734);
    Net_1.Net.UnRegister(15617);
    Net_1.Net.UnRegister(25489);
    Net_1.Net.UnRegister(27803);
  }
  RefreshActivityRedDot() {
    var e = this.Data?.Id;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
    }
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("TrapDefenseActivityUnlockView");
  }
}
exports.ActivityTrapDefenseController = ActivityTrapDefenseController;
//# sourceMappingURL=ActivityTrapDefenseController.js.map