"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectStateBox = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class DetectStateBox {
  constructor(t) {
    this.BoxElement = t;
    this.Offset = Vector_1.Vector.Create();
    this.CurrentPosition = Vector_1.Vector.Create();
    this.LastFramePosition = Vector_1.Vector.Create();
  }
}
exports.DetectStateBox = DetectStateBox;
const detectStateMap = new Map();
class TsAnimNotifyStateDetectBox extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BoxHalfSizeX = 0;
    this.BoxHalfSizeY = 0;
    this.BoxHalfSizeZ = 0;
    this.OffsetX = 10;
    this.OffsetY = 0;
    this.OffsetZ = 0;
    this.ObjectTypes = undefined;
    this.TagOnHit = undefined;
    this.SendGamePlayEvent = true;
    this.DebugDraw = false;
  }
  Constructor() {}
  GetNotifyName() {
    return "盒体检测碰撞";
  }
  K2_NotifyBegin(e, t, i) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent) {
      var r = e.GetEntityIdNoBlueprint();
      let t = detectStateMap.get(r);
      if (!t) {
        t = new DetectStateBox(new UE.TraceBoxElement());
        detectStateMap.set(r, t);
      }
      r = e.CharacterActorComponent;
      t.LastFramePosition.FromUeVector(r.ActorLocationProxy);
      t.BoxElement.WorldContextObject = e.GetWorld();
      t.BoxElement.SetObjectTypesQuery((0, puerts_1.$ref)(this.ObjectTypes));
      t.BoxElement.SetBoxHalfSize(this.BoxHalfSizeX, this.BoxHalfSizeY, this.BoxHalfSizeZ);
      if (this.DebugDraw) {
        t.BoxElement.SetDrawDebugTrace(2);
        t.BoxElement.DrawTime = 1;
      }
      t.BoxElement.bIsSingle = true;
      t.Offset.Set(this.OffsetX, this.OffsetY, this.OffsetZ);
    }
    return true;
  }
  K2_NotifyTick(t, e, i) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent) {
      var r = detectStateMap.get(t.GetEntityIdNoBlueprint());
      var t = t.CharacterActorComponent;
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AnimNotify", 20, "获取不到状态", ["Owner", t.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(e)]);
        }
        return false;
      }
      r.BoxElement.SetBoxOrientation(t.ActorRotationProxy.Pitch, t.ActorRotationProxy.Yaw, t.ActorRotationProxy.Roll);
      r.BoxElement.SetStartLocation(r.LastFramePosition.X, r.LastFramePosition.Y, r.LastFramePosition.Z);
      MathUtils_1.MathUtils.TransformPosition(t.ActorLocationProxy, t.ActorRotationProxy, t.ActorScaleProxy, r.Offset, r.CurrentPosition);
      r.BoxElement.SetEndLocation(r.CurrentPosition.X, r.CurrentPosition.Y, r.CurrentPosition.Z);
      r.LastFramePosition.FromUeVector(r.CurrentPosition);
      if (TraceElementCommon_1.TraceElementCommon.BoxTrace(r.BoxElement, "ANS_DetectBox")) {
        if (this.SendGamePlayEvent) {
          r = t.Entity.GetComponent(17);
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AnimNotify", 20, "使用DetectBoxANS的角色没有AbilityComponent", ["Owner", t.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(e)]);
            }
            return false;
          }
          r.SendGameplayEventToActor(this.TagOnHit);
        } else {
          r = t.Entity.GetComponent(206);
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AnimNotify", 20, "使用DetectBoxANS的角色没有BaseTagComponent", ["Owner", t.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(e)]);
            }
            return false;
          }
          r.AddTag(this.TagOnHit?.TagId);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default && t.CharacterActorComponent) {
      var i = t.GetEntityIdNoBlueprint();
      var r = detectStateMap.get(i);
      var t = t.CharacterActorComponent;
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AnimNotify", 20, "获取不到状态", ["Owner", t.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(e)]);
        }
        return false;
      }
      r.BoxElement.Dispose();
      detectStateMap.delete(i);
      if (t && !this.SendGamePlayEvent) {
        r = t.Entity.GetComponent(206);
        if (!r) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AnimNotify", 20, "使用DetectSphereANS的角色没有BaseTagComponent", ["Owner", t.Owner?.GetName()], ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(e)]);
          }
          return false;
        }
        r.RemoveTag(this.TagOnHit?.TagId);
      }
    }
    return true;
  }
}
exports.default = TsAnimNotifyStateDetectBox;
//# sourceMappingURL=TsAnimNotifyStateDetectBox.js.map