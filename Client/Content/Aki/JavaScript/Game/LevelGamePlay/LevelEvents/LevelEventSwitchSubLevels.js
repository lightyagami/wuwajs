"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSwitchLevels = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSwitchLevels extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.WRe = e => {
      if (e) {
        this.FinishExecute(true);
      }
    };
  }
  ExecuteNew(e, r) {
    if (e) {
      var t = e;
      switch (t.Type) {
        case IAction_1.ESwitchSubLevelsType.Directly:
          this.KRe(t);
          break;
        case IAction_1.ESwitchSubLevelsType.Preload:
          this.QRe(t);
          break;
        case IAction_1.ESwitchSubLevelsType.Permission:
          this.FinishExecute(true);
      }
    }
  }
  ExecuteInGm(e, r) {
    this.FinishExecute(true);
  }
  QRe(e) {
    ControllerHolder_1.ControllerHolder.SubLevelController.PreloadSubLevel(e.PreloadLevels);
    this.FinishExecute(true);
  }
  KRe(e) {
    let r = undefined;
    let t = undefined;
    if (e.TeleportEntityId) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.TeleportEntityId);
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 3, "[ControllerHolder.CreatureController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。", ["TeleportEntityId", e.TeleportEntityId]);
        }
        return;
      }
      var l = o.Transform.Pos;
      if (l) {
        r = Vector_1.Vector.Create(l.X ?? 0, l.Y ?? 0, l.Z ?? 0);
      }
      var l = o.Transform.Rot;
      if (l) {
        t = Rotator_1.Rotator.Create(l.Y ?? 0, l.Z ?? 0, l.X ?? 0);
      }
    }
    ControllerHolder_1.ControllerHolder.SubLevelController.ChangeSubLevel(e.UnloadLevels, e.LoadLevels, 0, r, t, this.WRe);
  }
}
exports.LevelEventSwitchLevels = LevelEventSwitchLevels;
//# sourceMappingURL=LevelEventSwitchSubLevels.js.map