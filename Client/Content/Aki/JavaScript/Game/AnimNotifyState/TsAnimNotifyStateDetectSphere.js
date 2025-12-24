"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectStateSphere = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class DetectStateSphere {
  constructor(e) {
    this.SphereElement = e;
    this.Offset = Vector_1.Vector.Create();
    this.CurrentPosition = Vector_1.Vector.Create();
    this.LastFramePosition = Vector_1.Vector.Create();
  }
}
exports.DetectStateSphere = DetectStateSphere;
const detectStateMap = new Map();
class TsAnimNotifyStateDetectSphere extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Radius = 0;
    this.OffsetX = 10;
    this.OffsetY = 0;
    this.OffsetZ = 0;
    this.ObjectTypes = undefined;
    this.TagOnHit = undefined;
    this.SendGamePlayEvent = true;
    this.DebugDraw = false;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent) {
      var i = t.GetEntityIdNoBlueprint();
      let e = detectStateMap.get(i);
      if (!e) {
        e = new DetectStateSphere(new UE.TraceSphereElement());
        detectStateMap.set(i, e);
      }
      e.LastFramePosition.FromUeVector(t.CharacterActorComponent.ActorLocationProxy);
      e.SphereElement.WorldContextObject = t.GetWorld();
      e.SphereElement.SetObjectTypesQuery((0, puerts_1.$ref)(this.ObjectTypes));
      e.SphereElement.Radius = this.Radius;
      e.SphereElement.bIsSingle = true;
      if (this.DebugDraw) {
        e.SphereElement.SetDrawDebugTrace(2);
        e.SphereElement.DrawTime = 1;
      }
      e.Offset.Set(this.OffsetX, this.OffsetY, this.OffsetZ);
    }
    return true;
  }
  K2_NotifyTick(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent) {
      var i = detectStateMap.get(e.GetEntityIdNoBlueprint());
      var e = e.CharacterActorComponent;
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AnimNotify", 20, "获取不到状态", ["Owner", e.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(t)]);
        }
        return false;
      }
      i.SphereElement.SetStartLocation(i.LastFramePosition.X, i.LastFramePosition.Y, i.LastFramePosition.Z);
      MathUtils_1.MathUtils.TransformPosition(e.ActorLocationProxy, e.ActorRotationProxy, e.ActorScaleProxy, i.Offset, i.CurrentPosition);
      i.SphereElement.SetEndLocation(i.CurrentPosition.X, i.CurrentPosition.Y, i.CurrentPosition.Z);
      i.LastFramePosition.FromUeVector(i.CurrentPosition);
      if (TraceElementCommon_1.TraceElementCommon.SphereTrace(i.SphereElement, "ANS_DetectSphere")) {
        if (this.SendGamePlayEvent) {
          i = e.Entity.GetComponent(17);
          if (!i) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AnimNotify", 20, "使用DetectSphereANS的角色没有AbilityComponent", ["Owner", e.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(t)]);
            }
            return false;
          }
          i.SendGameplayEventToActor(this.TagOnHit);
        } else {
          i = e.Entity.GetComponent(215);
          if (!i) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AnimNotify", 20, "使用DetectSphereANS的角色没有BaseTagComponent", ["Owner", e.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(t)]);
            }
            return false;
          }
          i.AddTag(this.TagOnHit?.TagId);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent) {
      var r = e.GetEntityIdNoBlueprint();
      var i = detectStateMap.get(r);
      var e = e.CharacterActorComponent;
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AnimNotify", 20, "获取不到状态", ["Owner", e.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(t)]);
        }
        return false;
      }
      i.SphereElement.Dispose();
      detectStateMap.delete(r);
      if (e && !this.SendGamePlayEvent) {
        i = e.Entity.GetComponent(215);
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AnimNotify", 20, "使用DetectSphereANS的角色没有BaseTagComponent", ["Owner", e.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(t)]);
          }
          return false;
        }
        i.RemoveTag(this.TagOnHit?.TagId);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "球形检测碰撞";
  }
}
exports.default = TsAnimNotifyStateDetectSphere;
//# sourceMappingURL=TsAnimNotifyStateDetectSphere.js.map