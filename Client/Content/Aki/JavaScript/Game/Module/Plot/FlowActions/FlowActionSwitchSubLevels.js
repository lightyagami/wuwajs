"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSwitchSubLevels = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSwitchSubLevels extends FlowActionServerAction_1.FlowActionServerAction {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e) {
      if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
        this.FinishExecute(true);
      } else {
        switch (e.Type) {
          case IAction_1.ESwitchSubLevelsType.Directly:
            this.KRe(e);
            break;
          case IAction_1.ESwitchSubLevelsType.Preload:
            this.QRe(e);
        }
      }
    }
  }
  QRe(e) {
    ControllerHolder_1.ControllerHolder.SubLevelController.PreloadSubLevel(e.PreloadLevels);
    this.FinishExecute(true);
  }
  KRe(e) {
    let r = undefined;
    let o = undefined;
    this.RequestServerAction();
    if (e.TeleportEntityId) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.TeleportEntityId);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 3, "[CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。", ["TeleportEntityId", e.TeleportEntityId]);
        }
        return;
      }
      var i = t.Transform.Pos;
      if (i) {
        r = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
      }
      var i = t.Transform.Rot;
      if (i) {
        o = Rotator_1.Rotator.Create(i.Y ?? 0, i.Z ?? 0, i.X ?? 0);
      }
    }
    ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(e.UnloadLevels, e.LoadLevels, 0, r, o);
    this.FinishExecute(true);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSwitchSubLevels = FlowActionSwitchSubLevels;
//# sourceMappingURL=FlowActionSwitchSubLevels.js.map