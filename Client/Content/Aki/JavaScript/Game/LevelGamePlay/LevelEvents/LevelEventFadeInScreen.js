"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventFadeInScreen = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeInScreen extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.SDe = false;
    this.yDe = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteNew(t, r) {
    if (t) {
      let e = undefined;
      if (t.KeepFadeAfterTreeEnd) {
        this.SDe = t.KeepFadeAfterTreeEnd;
      }
      if (!this.SDe && r && r.Type === 6 && (r = r) && r.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && (e = r.TreeConfigId, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("BlackScreen", 45, "玩法内开启黑幕：", ["treeId", r.TreeConfigId]);
      }
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent?.ExitCameraHook(false);
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && t.TypeOverride !== undefined) {
        ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1;
      } else {
        ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0;
      }
      if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 0) {
        switch (t.ScreenType) {
          case IAction_1.EFadeInScreenShowType.White:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 2;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
          this.FinishExecute(true);
        }, t?.Ease?.Duration, t.ScreenType, true, true, e);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, true, this.yDe);
      }
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  OnUpdateGuarantee() {
    var e;
    if (this.SDe) {
      e = {
        Name: "ActionBlackScreenFadeOut"
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, e);
    } else {
      e = {
        Name: "ActionBlackScreenFadeOut"
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, e);
    }
  }
  OnReset() {
    this.SDe = false;
  }
}
exports.LevelEventFadeInScreen = LevelEventFadeInScreen;
//# sourceMappingURL=LevelEventFadeInScreen.js.map