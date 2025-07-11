"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSpawnEffectV2 = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class TsEffectAttachmentContext {
  constructor(e, t, r, a, o) {
    this.AttachToActor = e;
    this.AttachToComponent = t;
    this.AttachSocket = r;
    this.AssetPath = a;
    this.Transform = o;
  }
}
class LevelEventSpawnEffectV2 extends LevelGeneralBase_1.LevelEventBase {
  lr1(e, t) {
    if (e?.IsValid()) {
      e = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (e?.IsValid()) {
        t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
        if (t && (e.DoesSocketExist(t) || e.GetBoneIndex(t) !== -1)) {
          return t;
        }
      }
    }
  }
  _r1(e, t) {
    var r = Vector_1.Vector.Create(0, 0, 0);
    if (e && (r.AdditionEqual(e), t)) {
      r.AdditionEqual(Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0));
    }
    return Transform_1.Transform.Create(Quat_1.Quat.IdentityProxy, r, Vector_1.Vector.OneVectorProxy);
  }
  cr1(e) {
    switch (e.Pos2.Type) {
      case 2:
        return this.ur1(e.Path, e.Pos2);
      case 1:
        return this.dr1(e.Path, e.Pos2);
      case 0:
        return this.mr1(e.Path, e.Pos2);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, "[EAction.PlayEffect2] IPlayCommonEffect:" + e.Pos2);
        }
        return;
    }
  }
  dr1(e, t) {
    var r = t.EntityId;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
    var a = r?.Entity?.GetComponent(1)?.ActorLocationProxy;
    var r = r?.Entity?.GetComponent(1)?.Owner;
    var o = r?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    return new TsEffectAttachmentContext(undefined, o, this.lr1(r, t.AttachSocket), e, this._r1(a, t.Offset));
  }
  mr1(e, t) {
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
    var a = Global_1.Global.BaseCharacter;
    var o = a?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    return new TsEffectAttachmentContext(undefined, o, this.lr1(a, t.AttachSocket), e, this._r1(r, t.Offset));
  }
  ur1(e, t) {
    return new TsEffectAttachmentContext(undefined, undefined, undefined, e, this._r1(Vector_1.Vector.Create(t.Pos.X ?? 0, t.Pos.Y ?? 0, t.Pos.Z ?? 0), undefined));
  }
  fr1(e) {
    return new TsEffectAttachmentContext(undefined, undefined, undefined, e, MathUtils_1.MathUtils.DefaultTransformProxy);
  }
  gr1(t) {
    switch (t.Type) {
      case "Effect":
        var e;
        var r = this.cr1(t);
        if (r) {
          e = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, r.Transform.ToUeTransform(), r.AssetPath, "[LevelEventSpawnEffect.ExecuteNew]");
          if (r.AttachSocket && r.AttachToActor) {
            if (r.AttachToActor?.IsValid()) {
              EffectSystem_1.EffectSystem.GetEffectActor(e)?.K2_AttachToActor(r.AttachToActor, r.AttachSocket, 2, 2, 2, false);
            }
          } else if (r.AttachSocket && r.AttachToComponent && r.AttachToComponent?.IsValid()) {
            EffectSystem_1.EffectSystem.GetEffectActor(e)?.K2_AttachToComponent(r.AttachToComponent, r.AttachSocket, 2, 2, 2, false);
          }
        }
        break;
      case "ScreenEffect":
        ResourceSystem_1.ResourceSystem.LoadAsync(this.fr1(t.Path).AssetPath, UE.EffectScreenPlayData_C, e => {
          if (e?.IsValid()) {
            if (e.bAutoDestroy && !e.bStopByCall) {
              ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(e);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 72, "[EAction.PlayEffect2] 检查屏幕特效:" + t.Path, ["bAutoDestroy", e.bAutoDestroy], ["bStopByCall", e.bStopByCall]);
            }
          }
        });
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, "[EAction.PlayEffect2] 未实现的类型:" + t);
        }
    }
  }
  ExecuteNew(e, t) {
    if (e) {
      this.gr1(e);
    }
  }
}
exports.LevelEventSpawnEffectV2 = LevelEventSpawnEffectV2;
//# sourceMappingURL=LevelEventSpawnEffectV2.js.map