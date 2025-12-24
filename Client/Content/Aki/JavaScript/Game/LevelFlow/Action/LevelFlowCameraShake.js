"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowCameraShake = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
const MAX_SHAKE_DURATION = CommonDefine_1.SECOND_PER_MINUTE;
class LevelFlowCameraShake extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.emf = undefined;
  }
  Init(e) {
    this.emf = e;
    return this;
  }
  OnExecute() {
    var e = this.emf;
    if (e) {
      const a = e.CameraShakeConfig;
      ResourceSystem_1.ResourceSystem.LoadAsync(e.CameraShakeBp + "_C", UE.Class, r => {
        if (r?.IsValid()) {
          var o = (0, puerts_1.$ref)(undefined);
          if (UE.KuroStaticLibrary.GetCameraShakeInfo(r, o)) {
            o = (0, puerts_1.$unref)(o);
            if (o.Duration.Type === 1 || o.Duration.Duration > MAX_SHAKE_DURATION) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, "振荡类型为无限或时长过长，取消振荡", ["时长类型", o.Duration.Type], ["时长", o.Duration.Duration], ["限制最大时长", MAX_SHAKE_DURATION]);
              }
            } else if (a.Type === "Constant") {
              ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(r, ControllerHolder_1.ControllerHolder.CameraController.Model.ShakeModify);
            } else if (a.Type === "LinearOverRange") {
              var l;
              var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.CenterEntityId);
              let e = undefined;
              if (o?.Valid) {
                l = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(o);
                e = l ? l.ActorLocation : o.Entity.GetComponent(0)?.GetLocation();
              } else if (l = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(a.CenterEntityId)?.Transform?.Pos) {
                MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(l);
                e = MathUtils_1.MathUtils.CommonTempVector.ToUeVector();
              }
              if (e) {
                ControllerHolder_1.ControllerHolder.CameraController.PlayWorldCameraShake(r, e, a.MinRange, a.MaxRange, 0, false);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, "[TriggerCameraShake] 找不到对应的实体坐标", ["EntityConfigId", a.CenterEntityId]);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[TriggerCameraShake] 振荡时长检测失败，取消振荡", ["CameraShakeClass", r]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "[TriggerCameraShake] 相机振荡类加载失败", ["CameraShakeClass", r]);
        }
      });
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "[TriggerCameraShake] 参数为空");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowCameraShake = LevelFlowCameraShake;
//# sourceMappingURL=LevelFlowCameraShake.js.map