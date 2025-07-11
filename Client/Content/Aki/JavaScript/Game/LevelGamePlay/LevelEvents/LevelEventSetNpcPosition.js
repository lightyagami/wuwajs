"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetNpcPosition = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetNpcPosition extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      var t = e;
      var r = new UE.VectorDouble(0, 0, 0);
      var n = new UE.Rotator(0, 0, 0);
      for (const v of t.EntityData) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(v.EntityId);
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 26, "通过事件设置NPC坐标时找不到实体：pbDataId: " + v.EntityId);
          }
          this.Failure();
          return;
        }
        i = i.Entity.GetComponent(3);
        if (v.Pos.X !== undefined && v.Pos.Y !== undefined && v.Pos.Z !== undefined) {
          r.Set(v.Pos.X, v.Pos.Y, v.Pos.Z);
          if (!t.IsCenterPosition) {
            r.Z += i.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight();
          }
          i.SetActorLocation(r, "关卡事件{LevelEventSetNpcPosition}.设置NPC的位置", false);
        }
        if (v.Pos.A !== undefined) {
          n.Yaw = v.Pos.A;
          i.SetInputRotator(n);
          i.SetActorRotation(n, "关卡事件{LevelEventSetNpcPosition}.设置NPC的朝向", false);
        }
      }
    }
  }
}
exports.LevelEventSetNpcPosition = LevelEventSetNpcPosition;
//# sourceMappingURL=LevelEventSetNpcPosition.js.map