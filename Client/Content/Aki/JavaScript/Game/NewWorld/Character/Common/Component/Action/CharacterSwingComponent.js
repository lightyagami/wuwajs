"use strict";

var CharacterSwingComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, r) {
  var s;
  var h = arguments.length;
  var a = h < 3 ? i : r === null ? r = Object.getOwnPropertyDescriptor(i, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, r);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (s = t[o]) {
        a = (h < 3 ? s(a) : h > 3 ? s(i, e, a) : s(i, e)) || a;
      }
    }
  }
  if (h > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSwingComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const CustomMovementDefine_1 = require("../Move/CustomMovementDefine");
const SWING_INTERVAL_TIME = 1000;
class SwingConfig {
  constructor() {
    this.SitOnModelBufferTime = 400;
    this.StandUpModelBufferTime = 500;
    this.StandUpMoveAwayDist = 10;
    this.AttachSocket = "Bone_Root";
    this.AttachRotator = Rotator_1.Rotator.Create();
    this.AttachLocation = Vector_1.Vector.Create();
    this.ReferenceActor = "SkeletalMesh";
    this.AnimMontagePath = "";
  }
  Init(t) {
    if (t) {
      this.SitOnModelBufferTime = t.SitOnModelBufferTime;
      this.StandUpModelBufferTime = t.StandUpModelBufferTime;
      this.StandUpMoveAwayDist = t.StandUpMoveAwayDist;
      this.AttachSocket = t.AttachSocket;
      this.ReferenceActor = t.ReferenceActor;
      this.AttachRotator.Set(t.AttachRotator.Y, t.AttachRotator.Z, t.AttachRotator.X);
      this.AttachLocation.Set(t.AttachLocation.X, t.AttachLocation.Y, t.AttachLocation.Z);
      this.AnimMontagePath = t.SwingAnimation.ToAssetPathName();
      this.AnimMontagePath.length;
    }
    return false;
  }
  InitRole(t, i) {
    return !!i && (this.SitOnModelBufferTime = i.SitOnModelBufferTime, this.StandUpModelBufferTime = i.StandUpModelBufferTime, this.StandUpMoveAwayDist = i.StandUpMoveAwayDist, this.AttachSocket = i.AttachSocket, this.ReferenceActor = i.ReferenceActor, this.AttachRotator.Set(i.AttachRotator.Y, i.AttachRotator.Z, i.AttachRotator.X), this.AttachLocation.Set(i.AttachLocation.X, i.AttachLocation.Y, i.AttachLocation.Z), !!(t = this.m0m(t, i.SwingAnimation))) && (this.AnimMontagePath = t, true);
  }
  m0m(i, e) {
    if (e) {
      for (let t = 0; t < e.Num(); t++) {
        if (e.Get(t).RoleId.Contains(i)) {
          return e.Get(t).SwingMontage.ToAssetPathName();
        }
      }
    }
  }
}
let CharacterSwingComponent = CharacterSwingComponent_1 = class CharacterSwingComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.jrm = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.Mme = Transform_1.Transform.Create();
    this.Man = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.Lie = undefined;
    this.Hrm = undefined;
    this.rRe = undefined;
    this.elm = undefined;
    this.tlm = undefined;
    this.IsSwinging = false;
    this.SwingState = 0;
    this.LastEndSwingTime = 0;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(46);
    this.oRe = this.Entity.GetComponent(186);
    this.Lie = this.Entity.GetComponent(215);
    return true;
  }
  OnTick(t) {
    if (this.SwingState === 2 && this.Gce?.HasMoveInput) {
      this.ExitLoopSwing();
    }
  }
  StartSwing(t, i, e = false) {
    if (this.IsSwinging) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 42, "[CharacterSwing] 正在荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", i]);
      }
    } else {
      this.Vi(t, t => {
        if (t?.IsValid()) {
          this.elm = t;
          this.rRe = this.oRe?.MainAnimInstance;
          if (this.rRe?.LogicParams) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 6,
              CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING,
              Context: "[CharacterSwingComponent.StartSwing]"
            });
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 42, "[CharacterSwing] 开始荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", i]);
            }
            this.$rm(i);
            this.ilm(1);
            if (e) {
              this.ilm(2);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 42, "[CharacterSwing] 开始荡秋千失败，AnimInstance异常");
          }
        }
      });
    }
  }
  StartRoleSwing(t, i, e = false) {
    var r;
    if (!(Time_1.Time.Now - this.LastEndSwingTime < SWING_INTERVAL_TIME)) {
      if (this.Hte) {
        if (this.IsSwinging) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 42, "[CharacterSwing] 正在荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", i]);
          }
        } else {
          r = this.Hte.CreatureData.GetPbDataId();
          r = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r);
          this.f0m(r, t, t => {
            if (t?.IsValid()) {
              this.elm = t;
              this.rRe = this.oRe?.MainAnimInstance;
              if (this.rRe?.LogicParams) {
                this.Hte?.Actor.KuroSetMovementMode({
                  Mode: 6,
                  CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING,
                  Context: "[CharacterSwingComponent.StartSwing]"
                });
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Character", 42, "[CharacterSwing] 开始荡秋千", ["Entity", this.Hte?.CreatureData.GetPbDataId()], ["Chair", i]);
                }
                this.$rm(i);
                this.ilm(1);
                if (e) {
                  this.ilm(2);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Character", 42, "[CharacterSwing] 开始荡秋千失败，AnimInstance异常");
              }
            }
          });
        }
      }
    }
  }
  LeftStartSwing() {
    this.ilm(2);
  }
  ExitLoopSwing() {
    if (this.IsSwinging) {
      this.ilm(3);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Character", 42, "[CharacterSwing] 重复退出荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  LeftLoopSwing() {
    this.ilm(4);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 42, "[CharacterSwing] 退出荡秋千", ["Entity", this.Hte?.CreatureData.GetPbDataId()]);
    }
    this.Wrm();
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterSwingComponent.ExitSwing]"
    });
  }
  LeftEndSwing() {
    if (this.SwingState !== 4 && this.SwingState !== 0) {
      this.LeftLoopSwing();
    }
    this.LastEndSwingTime = Time_1.Time.Now;
    this.ilm(0);
  }
  $rm(t) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
    var e = i?.GetComponent(207);
    var r = i?.GetComponent(212);
    if (i && e && r) {
      this.Man = e.GetSubEntityInteractLogicController();
      this.Man.Possess(this.Entity);
      this.Man.IgnoreCollision();
      this.FTe(this.Man.Entity);
      i = this.Man.GetSitLocation();
      (e = this.Man.GetForwardDirection()).Multiply(this.Hrm.StandUpMoveAwayDist, this.jrm);
      this.jrm.AdditionEqual(i);
      e.Rotation(this.cie);
      this.Hte?.SetActorLocationAndRotation(this.jrm.ToUeVector(), this.cie.ToUeRotator(), "[CharacterSwingComponent] SitOnChair", false);
      this.Hte?.ClearInput();
      i = this.Entity.GetComponent(186)?.GetMeshTransform();
      this.Qrm(r);
      if (i) {
        this.Entity.GetComponent(186)?.SetModelBuffer(i, this.Hrm.SitOnModelBufferTime);
      }
      this.f7f(true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 椅子Entity无效", ["PbDataId", t]);
    }
  }
  Wrm() {
    this.Man?.ResetCollision();
    this.Man?.UnPossess(this.Entity);
    if (this.Man?.Entity) {
      this.VTe(this.Man.Entity);
    }
    this.Krm();
    var t = this.Entity.GetComponent(186)?.GetMeshTransform();
    this.Hte?.SetActorLocation(this.jrm.ToUeVector(), "[CharacterSwingComponent] SitOnChair", false);
    if (t) {
      this.Entity.GetComponent(186)?.SetModelBuffer(t, this.Hrm.StandUpModelBufferTime);
    }
    TimerSystem_1.TimerSystem.Delay(() => {
      this.f7f(false);
    }, SWING_INTERVAL_TIME);
  }
  f7f(t) {
    if (t && !this.Lie?.HasTag(1453459227)) {
      this.Lie?.AddTag(1453459227);
    }
    if (!t && this.Lie?.HasTag(1453459227)) {
      this.Lie?.RemoveTag(1453459227);
    }
  }
  Qrm(t) {
    var i;
    var e;
    var r;
    var s = t.GetInteractionMainActor()?.GetActorByKey(this.Hrm.ReferenceActor);
    if (s?.SkeletalMeshComponent) {
      this.tlm = s.SkeletalMeshComponent.GetAnimInstance();
      i = FNameUtil_1.FNameUtil.GetDynamicFName(this.Hrm.AttachSocket);
      e = s.SkeletalMeshComponent.D_GetSocketTransform(i);
      r = t.ActorTransform.GetRelativeTransform(e);
      this.Mme.FromUeTransform(r);
      this.cz.FromUeVector(e.GetLocation());
      if (this.cz.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.cz.DeepCopy(t.ActorLocationProxy), Log_1.Log.CheckWarn())) {
        Log_1.Log.Warn("Character", 42, "[CharacterSwing] 找不到Socket", ["PbDataId", t?.CreatureData.GetPbDataId()], ["SocketName", i]);
      }
      this.Hte.Actor.K2_AttachToComponent(s.SkeletalMeshComponent, i, 0, 2, 1, false);
      this.Hte.SetForbidSettingLocAndRot(false, 1);
      this.Hte.Actor.D_K2_SetActorRelativeLocation(this.Hrm.AttachLocation.ToUeVector(), false, undefined, false);
      this.Hte.Actor.K2_SetActorRelativeRotation(this.Hrm.AttachRotator.ToUeRotator(), false, undefined, false);
      this.Hte.ResetAllCachedTime();
      this.Hte.SetForbidSettingLocAndRot(true, 1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 椅子ReferenceActor无效");
    }
  }
  Krm() {
    this.Hte.Actor.K2_DetachFromActor(1, 1, 1);
    this.Hte.SetForbidSettingLocAndRot(false, 1);
    this.Hte.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    });
  }
  FTe(t) {
    t = t.GetComponent(212);
    if (t && t.Entity) {
      this.HTe(t, true);
    }
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
  }
  VTe(t) {
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
    if ((t &&= t.GetComponent(212)) && t.Entity) {
      this.HTe(t, false);
    }
  }
  HTe(t, i) {
    var e = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    var e = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
    let r = undefined;
    r = e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid ? e.Entity.GetComponent(212) : t;
    var e = (0, puerts_1.$ref)(undefined);
    r.Owner.GetAttachedActors(e);
    var s = (0, puerts_1.$unref)(e);
    var h = s.Num();
    for (let t = 0; t < h; ++t) {
      var a = s.Get(t);
      var o = (0, puerts_1.$ref)(undefined);
      a.GetAttachedActors(o);
      var n = (0, puerts_1.$unref)(o);
      var _ = n.Num();
      for (let t = 0; t < _; ++t) {
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(n.Get(t), i);
      }
    }
  }
  Vi(t, i) {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CharacterSwingConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_CharacterSwingConfig_C, t => {
        this.Hrm ||= new SwingConfig();
        if (t?.IsValid()) {
          this.Hrm.Init(t);
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(this.Hrm.AnimMontagePath, UE.AnimMontage, i);
      });
    });
  }
  f0m(i, e, r) {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_RoleSwingConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.BP_RoleSwingConfig_C, t => {
        if ((this.Hrm ||= new SwingConfig(), t?.IsValid()) && !this.Hrm.InitRole(i, t)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[CharacterSwing] DA读取角色秋千Montage配置失败", ["roleId", i], ["daPath", e]);
          }
          return;
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(this.Hrm.AnimMontagePath, UE.AnimMontage, r);
      });
    });
  }
  ilm(t) {
    if (this.rRe?.LogicParams && this.tlm) {
      if (t === this.SwingState && t !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 42, "[CharacterSwing] 重复设置荡秋千状态", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["type", CharacterSwingComponent_1.olm(t)]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CharacterSwing] ChangeSwingState", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["newType", CharacterSwingComponent_1.olm(t)], ["lastType", CharacterSwingComponent_1.olm(this.SwingState)]);
        }
        this.SwingState = t;
        this.IsSwinging = t !== 0;
        this.rRe.LogicParams.bSwingState = this.IsSwinging;
        switch (this.rRe.LogicParams.SwingStateType = t) {
          case 0:
            this.tlm.Montage_Stop(1);
            break;
          case 1:
            this.tlm.Montage_Play(this.elm);
            break;
          case 2:
          case 3:
            break;
          case 4:
            this.tlm.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.elm);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 秋千状态切换失败，AnimInstance异常");
    }
  }
  static olm(t) {
    switch (t) {
      case 0:
        return "None";
      case 1:
        return "进入荡秋千";
      case 2:
        return "荡秋千中";
      case 3:
        return "预备离开秋千";
      case 4:
        return "退出荡秋千";
      default:
        return "";
    }
    return "";
  }
};
CharacterSwingComponent = CharacterSwingComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(325)], CharacterSwingComponent);
exports.CharacterSwingComponent = CharacterSwingComponent; //# sourceMappingURL=CharacterSwingComponent.js.map