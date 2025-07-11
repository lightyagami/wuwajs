"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnterOrbitalCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterOrbitalCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.gDe = Vector_1.Vector.Create();
    this.fDe = Vector_1.Vector.Create();
  }
  ExecuteNew(e, r) {
    var t;
    if (e) {
      e = e.Option;
      if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.BegEntity)?.Transform?.Pos) {
        this.gDe.Set(t.X, t.Y, t.Z);
        if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.EndEntity)?.Transform?.Pos) {
          this.fDe.Set(t.X, t.Y, t.Z);
          ControllerHolder_1.ControllerHolder.CameraController.OrbitalCamera.PlayerComponent.PlayCameraOrbitalPath(e.LevelSequence, this.gDe, this.fDe, e.BlendInTime, e.BlendOutTime);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 6, "EnterOrbitalCamera 缺少终点");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 6, "EnterOrbitalCamera 缺少起点");
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "ExitOrbitalCamera"
    });
  }
}
exports.LevelEventEnterOrbitalCamera = LevelEventEnterOrbitalCamera;
//# sourceMappingURL=LevelEventEnterOrbitalCamera.js.map