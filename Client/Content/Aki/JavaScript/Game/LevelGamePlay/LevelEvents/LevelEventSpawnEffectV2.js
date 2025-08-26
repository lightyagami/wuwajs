"use strict";

var __decorate = this && this.__decorate || function (e, t, n, f) {
  var a;
  var o = arguments.length;
  var r = o < 3 ? t : f === null ? f = Object.getOwnPropertyDescriptor(t, n) : f;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, f);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (a = e[c]) {
        r = (o < 3 ? a(r) : o > 3 ? a(t, n, r) : a(t, n)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSpawnEffectV2 = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class TsAttachEffectContext {
  constructor(e, t, n, f, a, o) {
    this.AssetPath = e;
    this.Transform = t;
    this.EntityHandle = n;
    this.ShouldAttachToEntity = f;
    this.AttachSocket = a;
    this.AttachOffset = o;
  }
}
class TsScreenEffectContext {
  constructor(e) {
    this.AssetPath = e;
  }
}
class TsDissolveEffectContext {
  constructor(e) {
    this.AssetPath = e;
  }
}
function applyOffsetThenGetTransform(e, t) {
  var n = Vector_1.Vector.Create(0, 0, 0);
  if (e && (n.AdditionEqual(e), t)) {
    n.AdditionEqual(Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0));
  }
  return Transform_1.Transform.Create(Quat_1.Quat.IdentityProxy, n, Vector_1.Vector.OneVectorProxy);
}
class SpawnEffectImplementation {
  static RegisterEffectHandler(f) {
    return (e, t, n) => {
      n = n.value;
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 72, "[SpawnEffectImplementation] EEffectType参数不对", ["EEffectType", f]);
        }
      }
      if (SpawnEffectImplementation.PWu.has(f)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 72, "[SpawnEffectImplementation] EEffectType重复注册", ["EEffectType", f]);
        }
      } else {
        SpawnEffectImplementation.PWu.set(f, n);
      }
    };
  }
  static RegisterCommonEffectContextGenerator(f) {
    return (e, t, n) => {
      n = n.value;
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 72, "[SpawnEffectImplementation] EPos2参数不对", ["EPos2", f]);
        }
      }
      if (SpawnEffectImplementation.DWu.has(f)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 72, "[SpawnEffectImplementation] EPos2重复注册", ["EPos2", f]);
        }
      } else {
        SpawnEffectImplementation.DWu.set(f, n);
      }
    };
  }
  static ScreenEffectHandler(e, t) {
    var n = new TsScreenEffectContext(e.Path);
    const f = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(e.Path);
    if (e.DestroyTime !== undefined) {
      TimerSystem_1.TimerSystem.Delay(() => {
        ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(f);
      }, e.DestroyTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventSpawnEffectV2", t, {
      Name: "StopEffect",
      Params: {
        ScreenEffectHandle: f
      }
    }, true);
    return n;
  }
  static CommonEffectHandler(e, t) {
    var n = SpawnEffectImplementation.DWu.get(e.Pos2.Type);
    if (n) {
      const f = n(e, t);
      const a = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, f.Transform.ToUeTransform(), f.AssetPath, "[LevelEventSpawnEffect.ExecuteNew]");
      if (e.DestroyTime !== undefined) {
        TimerSystem_1.TimerSystem.Delay(() => {
          EffectSystem_1.EffectSystem.StopEffectById(a, "[SpawnEffectImplementation] 定时销毁特效", true);
        }, e.DestroyTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventSpawnEffectV2", t, {
        Name: "StopEffect",
        Params: {
          EffectId: a
        }
      }, true);
      if (f.EntityHandle?.Valid && f.EntityHandle.Entity?.Valid && (EventSystem_1.EventSystem.OnceWithTarget(f.EntityHandle, EventDefine_1.EEventName.RemoveEntity, () => {
        EffectSystem_1.EffectSystem.StopEffectById(a, `[SpawnEffectImplementation] 移除实体${f.EntityHandle}销毁特效`, true);
      }), f.ShouldAttachToEntity)) {
        n = f.EntityHandle.Entity.GetComponent(1)?.Owner;
        e = EffectSystem_1.EffectSystem.GetEffectActor(a);
        if (f.AttachSocket) {
          t = n?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
          if (!t?.IsValid) {
            return f;
          }
          e?.K2_AttachToComponent(t, f.AttachSocket, 2, 2, 2, false);
        } else {
          EffectSystem_1.EffectSystem.GetEffectActor(a)?.K2_AttachToActor(n, f.AttachSocket, 2, 2, 2, false);
        }
        if (f.AttachOffset) {
          e?.D_K2_SetActorRelativeLocation(f.AttachOffset.ToUeVector(), false, undefined, false);
        }
      }
      return f;
    }
  }
  static DissolveEffectHandler(e, t) {
    var n;
    if (e) {
      n = new TsDissolveEffectContext(e.Path);
      ControllerHolder_1.ControllerHolder.VideoBpController.PlayEffect(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventSpawnEffectV2", t, {
        Name: "StopEffect",
        Params: {
          Mp4Name: e.Path
        }
      }, true);
      return n;
    }
  }
  static EffectEntityPos2Context(e, t) {
    var n = e.Pos2.EntityId;
    var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
    var f = n?.Entity?.GetComponent(1)?.ActorLocationProxy;
    var a = n?.Entity?.GetComponent(1)?.Owner;
    return new TsAttachEffectContext(e.Path, applyOffsetThenGetTransform(f, e.Pos2.Offset), n, true, ActorUtils_1.ActorUtils.TryGetBoneSocket(a, e.Pos2.AttachSocket), Vector_1.Vector.Create(e.Pos2.Offset.X ?? 0, e.Pos2.Offset.Y ?? 0, e.Pos2.Offset.Z ?? 0));
  }
  static EffectPlayerPos2Context(e, t) {
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var f = n?.Entity?.GetComponent(1)?.ActorLocationProxy;
    var n = n?.Entity?.GetComponent(1)?.Owner;
    return new TsAttachEffectContext(e.Path, applyOffsetThenGetTransform(f, e.Pos2.Offset), ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity, true, ActorUtils_1.ActorUtils.TryGetBoneSocket(n, e.Pos2.AttachSocket), Vector_1.Vector.Create(e.Pos2.Offset.X ?? 0, e.Pos2.Offset.Y ?? 0, e.Pos2.Offset.Z ?? 0));
  }
  static AbsolutePos2Context(e, t) {
    let n = undefined;
    switch (t.Type) {
      case 1:
        if (t.EntityId !== undefined) {
          n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
        }
        break;
      case 5:
        if (t.TriggerEntityId !== undefined) {
          n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.TriggerEntityId);
        }
    }
    return new TsAttachEffectContext(e.Path, applyOffsetThenGetTransform(Vector_1.Vector.Create(e.Pos2.Pos.X ?? 0, e.Pos2.Pos.Y ?? 0, e.Pos2.Pos.Z ?? 0), undefined), n, false);
  }
  static SpawnEffect(e, t) {
    var n = SpawnEffectImplementation.PWu.get(e.Type);
    if (n) {
      return n(e, t);
    }
  }
}
SpawnEffectImplementation.PWu = new Map();
SpawnEffectImplementation.DWu = new Map();
__decorate([SpawnEffectImplementation.RegisterEffectHandler("ScreenEffect")], SpawnEffectImplementation, "ScreenEffectHandler", null);
__decorate([SpawnEffectImplementation.RegisterEffectHandler("Effect")], SpawnEffectImplementation, "CommonEffectHandler", null);
__decorate([SpawnEffectImplementation.RegisterEffectHandler("DissolveEffect")], SpawnEffectImplementation, "DissolveEffectHandler", null);
__decorate([SpawnEffectImplementation.RegisterCommonEffectContextGenerator(1)], SpawnEffectImplementation, "EffectEntityPos2Context", null);
__decorate([SpawnEffectImplementation.RegisterCommonEffectContextGenerator(0)], SpawnEffectImplementation, "EffectPlayerPos2Context", null);
__decorate([SpawnEffectImplementation.RegisterCommonEffectContextGenerator(2)], SpawnEffectImplementation, "AbsolutePos2Context", null);
class LevelEventSpawnEffectV2 extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      SpawnEffectImplementation.SpawnEffect(e, t);
    }
  }
}
exports.LevelEventSpawnEffectV2 = LevelEventSpawnEffectV2;
//# sourceMappingURL=LevelEventSpawnEffectV2.js.map