"use strict";

var CharacterSwingComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, r) {
  var s;
  var h = arguments.length;
  var a = h < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, r);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (s = t[o]) {
        a = (h < 3 ? s(a) : h > 3 ? s(e, i, a) : s(e, i)) || a;
      }
    }
  }
  if (h > 3 && a) {
    Object.defineProperty(e, i, a);
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
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const CustomMovementDefine_1 = require("../Move/CustomMovementDefine");
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
  InitRole(t, e) {
    return !!e && (this.SitOnModelBufferTime = e.SitOnModelBufferTime, this.StandUpModelBufferTime = e.StandUpModelBufferTime, this.StandUpMoveAwayDist = e.StandUpMoveAwayDist, this.AttachSocket = e.AttachSocket, this.ReferenceActor = e.ReferenceActor, this.AttachRotator.Set(e.AttachRotator.Y, e.AttachRotator.Z, e.AttachRotator.X), this.AttachLocation.Set(e.AttachLocation.X, e.AttachLocation.Y, e.AttachLocation.Z), !!(t = this.Hum(t, e.SwingAnimation))) && (this.AnimMontagePath = t, true);
  }
  Hum(e, i) {
    if (i) {
      for (let t = 0; t < i.Num(); t++) {
        if (i.Get(t).RoleId.Contains(e)) {
          return i.Get(t).SwingMontage.ToAssetPathName();
        }
      }
    }
  }
}
let CharacterSwingComponent = CharacterSwingComponent_1 = class CharacterSwingComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Yem = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.Mme = Transform_1.Transform.Create();
    this.Man = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.zem = undefined;
    this.rRe = undefined;
    this.Uom = undefined;
    this.xom = undefined;
    this.IsSwinging = false;
    this.SwingState = 0;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(45);
    this.oRe = this.Entity.GetComponent(181);
    return true;
  }
  OnTick(t) {
    if (this.SwingState === 2 && this.Gce?.HasMoveInput) {
      this.ExitLoopSwing();
    }
  }
  StartSwing(t, e, i = false) {
    if (this.IsSwinging) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 42, "[CharacterSwing] 正在荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", e]);
      }
    } else {
      this.Vi(t, t => {
        if (t?.IsValid()) {
          this.Uom = t;
          this.rRe = this.oRe?.MainAnimInstance;
          if (this.rRe?.LogicParams) {
            this.Hte?.Actor.KuroSetMovementMode({
              Mode: 6,
              CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING,
              Context: "[CharacterSwingComponent.StartSwing]"
            });
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 42, "[CharacterSwing] 开始荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", e]);
            }
            this.Jem(e);
            this.Bom(1);
            if (i) {
              this.Bom(2);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 42, "[CharacterSwing] 开始荡秋千失败，AnimInstance异常");
          }
        }
      });
    }
  }
  StartRoleSwing(t, e, i = false) {
    var r;
    if (this.Hte) {
      if (this.IsSwinging) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 42, "[CharacterSwing] 正在荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Chair", e]);
        }
      } else {
        r = this.Hte.CreatureData.GetPbDataId();
        r = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r);
        this.$um(r, t, t => {
          if (t?.IsValid()) {
            this.Uom = t;
            this.rRe = this.oRe?.MainAnimInstance;
            if (this.rRe?.LogicParams) {
              this.Hte?.Actor.KuroSetMovementMode({
                Mode: 6,
                CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING,
                Context: "[CharacterSwingComponent.StartSwing]"
              });
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 42, "[CharacterSwing] 开始荡秋千", ["Entity", this.Hte?.CreatureData.GetPbDataId()], ["Chair", e]);
              }
              this.Jem(e);
              this.Bom(1);
              if (i) {
                this.Bom(2);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 42, "[CharacterSwing] 开始荡秋千失败，AnimInstance异常");
            }
          }
        });
      }
    }
  }
  LeftStartSwing() {
    this.Bom(2);
  }
  ExitLoopSwing() {
    if (this.IsSwinging) {
      this.Bom(3);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Character", 42, "[CharacterSwing] 重复退出荡秋千", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  LeftLoopSwing() {
    this.Bom(4);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 42, "[CharacterSwing] 退出荡秋千", ["Entity", this.Hte?.CreatureData.GetPbDataId()]);
    }
    this.Zem();
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterSwingComponent.ExitSwing]"
    });
  }
  LeftEndSwing() {
    this.Bom(0);
  }
  Jem(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
    var i = e?.GetComponent(201);
    var r = e?.GetComponent(206);
    if (e && i && r) {
      this.Man = i.GetSubEntityInteractLogicController();
      this.Man.Possess(this.Entity);
      this.Man.IgnoreCollision();
      this.FTe(this.Man.Entity);
      e = this.Man.GetSitLocation();
      (i = this.Man.GetForwardDirection()).Multiply(this.zem.StandUpMoveAwayDist, this.Yem);
      this.Yem.AdditionEqual(e);
      i.Rotation(this.cie);
      this.Hte?.SetActorLocationAndRotation(this.Yem.ToUeVector(), this.cie.ToUeRotator(), "[CharacterSwingComponent] SitOnChair", false);
      this.Hte?.ClearInput();
      e = this.Entity.GetComponent(181)?.GetMeshTransform();
      this.etm(r);
      if (e) {
        this.Entity.GetComponent(181)?.SetModelBuffer(e, this.zem.SitOnModelBufferTime);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 椅子Entity无效", ["PbDataId", t]);
    }
  }
  Zem() {
    this.Man?.ResetCollision();
    this.Man?.UnPossess(this.Entity);
    if (this.Man?.Entity) {
      this.VTe(this.Man.Entity);
    }
    this.ttm();
    var t = this.Entity.GetComponent(181)?.GetMeshTransform();
    this.Hte?.SetActorLocation(this.Yem.ToUeVector(), "[CharacterSwingComponent] SitOnChair", false);
    if (t) {
      this.Entity.GetComponent(181)?.SetModelBuffer(t, this.zem.StandUpModelBufferTime);
    }
  }
  etm(t) {
    var e;
    var i;
    var r;
    var s = t.GetInteractionMainActor()?.GetActorByKey(this.zem.ReferenceActor);
    if (s?.SkeletalMeshComponent) {
      this.xom = s.SkeletalMeshComponent.GetAnimInstance();
      e = FNameUtil_1.FNameUtil.GetDynamicFName(this.zem.AttachSocket);
      i = s.SkeletalMeshComponent.D_GetSocketTransform(e);
      r = t.ActorTransform.GetRelativeTransform(i);
      this.Mme.FromUeTransform(r);
      this.cz.FromUeVector(i.GetLocation());
      if (this.cz.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.cz.DeepCopy(t.ActorLocationProxy), Log_1.Log.CheckWarn())) {
        Log_1.Log.Warn("Character", 42, "[CharacterSwing] 找不到Socket", ["PbDataId", t?.CreatureData.GetPbDataId()], ["SocketName", e]);
      }
      this.Hte.Actor.K2_AttachToComponent(s.SkeletalMeshComponent, e, 0, 2, 1, false);
      this.Hte.SetForbidSettingLocAndRot(false, 1);
      this.Hte.Actor.D_K2_SetActorRelativeLocation(this.zem.AttachLocation.ToUeVector(), false, undefined, false);
      this.Hte.Actor.K2_SetActorRelativeRotation(this.zem.AttachRotator.ToUeRotator(), false, undefined, false);
      this.Hte.ResetAllCachedTime();
      this.Hte.SetForbidSettingLocAndRot(true, 1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 椅子ReferenceActor无效");
    }
  }
  ttm() {
    this.Hte.Actor.K2_DetachFromActor(1, 1, 1);
    this.Hte.SetForbidSettingLocAndRot(false, 1);
    this.Hte.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    });
  }
  FTe(t) {
    t = t.GetComponent(206);
    if (t && t.Entity) {
      this.HTe(t, true);
    }
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
  }
  VTe(t) {
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
    if ((t &&= t.GetComponent(206)) && t.Entity) {
      this.HTe(t, false);
    }
  }
  HTe(t, e) {
    var i = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    var i = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(i);
    let r = undefined;
    r = i && (i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))?.Valid ? i.Entity.GetComponent(206) : t;
    var i = (0, puerts_1.$ref)(undefined);
    r.Owner.GetAttachedActors(i);
    var s = (0, puerts_1.$unref)(i);
    var h = s.Num();
    for (let t = 0; t < h; ++t) {
      var a = s.Get(t);
      var o = (0, puerts_1.$ref)(undefined);
      a.GetAttachedActors(o);
      var n = (0, puerts_1.$unref)(o);
      var C = n.Num();
      for (let t = 0; t < C; ++t) {
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(n.Get(t), e);
      }
    }
  }
  Vi(t, e) {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CharacterSwingConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_CharacterSwingConfig_C, t => {
        this.zem ||= new SwingConfig();
        if (t?.IsValid()) {
          this.zem.Init(t);
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(this.zem.AnimMontagePath, UE.AnimMontage, e);
      });
    });
  }
  $um(e, i, r) {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_RoleSwingConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BP_RoleSwingConfig_C, t => {
        if ((this.zem ||= new SwingConfig(), t?.IsValid()) && !this.zem.InitRole(e, t)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[CharacterSwing] DA读取角色秋千Montage配置失败", ["roleId", e], ["daPath", i]);
          }
          return;
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(this.zem.AnimMontagePath, UE.AnimMontage, r);
      });
    });
  }
  Bom(t) {
    if (this.rRe?.LogicParams && this.xom) {
      if (t === this.SwingState && t !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 42, "[CharacterSwing] 重复设置荡秋千状态", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["type", CharacterSwingComponent_1.kom(t)]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CharacterSwing] ChangeSwingState", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["newType", CharacterSwingComponent_1.kom(t)], ["lastType", CharacterSwingComponent_1.kom(this.SwingState)]);
        }
        this.SwingState = t;
        this.IsSwinging = t !== 0;
        this.rRe.LogicParams.bSwingState = this.IsSwinging;
        switch (this.rRe.LogicParams.SwingStateType = t) {
          case 0:
            this.xom.Montage_Stop(1);
            break;
          case 1:
            this.xom.Montage_Play(this.Uom);
            break;
          case 2:
          case 3:
            break;
          case 4:
            this.xom.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.Uom);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 42, "[CharacterSwing] 秋千状态切换失败，AnimInstance异常");
    }
  }
  static kom(t) {
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
CharacterSwingComponent = CharacterSwingComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(306)], CharacterSwingComponent);
exports.CharacterSwingComponent = CharacterSwingComponent; //# sourceMappingURL=CharacterSwingComponent.js.map