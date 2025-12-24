"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const AudioUtils_1 = require("../../../../../Utils/AudioUtils");
class TsMeshAnimBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static MainAnimInstance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 186)?.MainAnimInstance;
  }
  static MainAnimInstanceForVehicle(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 248)?.MainAnimInstance;
  }
  static GetSightDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.GetSightDirect();
  }
  static GetHeadBaseYawBuffer(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.GetHeadBaseYawBuffer() ?? 0;
  }
  static GetHulu(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 84)?.Hulu;
  }
  static GetBattleIdleTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 186)?.BattleIdleEndTime;
  }
  static GetDisableBlink(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.DisableBlink ?? false;
  }
  static EnterBattleIdle(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 186)?.EnterBattleIdle();
  }
  static SetTransformWithModelBuffer(t, e, i) {
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (n = n || EntitySystem_1.EntitySystem.GetComponent(t, 248)) {
      n.SetTransformWithModelBuffer(e, i);
    }
  }
  static SetSightDirectEnable(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 45);
    if (t) {
      t.EnableSightDirect = e;
    }
  }
  static HideWeaponsWhenHideBones(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 84)?.HideWeaponsWhenHideBones(e, i);
  }
  static ChangeWeaponHangState(t, e, i, n, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 84)?.ChangeWeaponHangState(e, (0, puerts_1.$unref)(n), (0, puerts_1.$unref)(r), i);
  }
  static GetCurrentWeaponHangState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 84)?._Pr;
  }
  static GetIsCurrentWeaponHideEffectPlaying(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 84)?.IsCurrentWeaponHideEffectPlaying() ?? false;
  }
  static ChangeWeapon(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 84)?.ChangeWeaponByWeaponSocketItem(e);
  }
  static GetRandomStandActionIndex(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 186)?.GetRandomStandActionIndex();
  }
  static HideWeapon(t, e, i, n, r = false) {
    EntitySystem_1.EntitySystem.GetComponent(t, 84)?.HideWeapon(i, e, n, false, r ? 1 : 0);
  }
  static HideHulu(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 84)?.SetHuluHidden(e);
  }
  static GetDegMovementSlope(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 186)?.DegMovementSlope;
  }
  static GetRoleFootStepState(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 0);
    var e = t.GetEntityType();
    if (e === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      e = t.GetPlayerId();
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
      t = t.GetRoleId();
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t, e);
      if (t) {
        e = t.GetRoleConfig();
        if (e) {
          return e.FootStepState;
        }
      }
    }
  }
  static SetIkMeshOffset(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (t) {
      t.IkMeshOffset = e;
    }
  }
  static GetWeaponBreachLevel(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 84);
    if (t) {
      return t.GetWeaponBreachLevel();
    } else {
      return -1;
    }
  }
  static UpdateAnimInfoMeshAnim(t, e) {
    var i;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (r?.Valid && (e = e, i = r.AnimLogicParamsSetter, n = r.BattleIdleEndTime, i.BattleIdleTime !== n && (i.BattleIdleTime = n, e.BattleIdleTimeRef = n), n = r.DegMovementSlope, i.DegMovementSlope !== n && (i.DegMovementSlope = n, e.DegMovementSlopeRef = n), n = r.GetTsSightDirect(), i.SightDirect.Equals(n) || (i.SightDirect.DeepCopy(n), e.SightDirectRef = n.ToUeVectorOld()), n = r.DisableBlink, i.DisableBlink !== n && (i.DisableBlink = n, e.DisableBlinkRef = n), r = EntitySystem_1.EntitySystem.GetComponent(t, 75).GetRagRollQuitState(), i.RagQuitState !== r)) {
      i.RagQuitState = r;
      e.RagQuitStateRef = r;
    }
  }
  static UpdateAnimInfoMeshAnimRoleNpc(t, e) {
    var i;
    var n;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (t?.Valid && (e = e, i = t.AnimLogicParamsSetter, n = t.DegMovementSlope, i.DegMovementSlope !== n && (i.DegMovementSlope = n, e.DegMovementSlopeRef = n), n = t.GetTsSightDirect(), i.SightDirect.Equals(n) || (i.SightDirect.DeepCopy(n), e.SightDirectRef = n.ToUeVectorOld()), n = t.DisableBlink, i.DisableBlink !== n && (i.DisableBlink = n, e.DisableBlinkRef = n), n = t.GetTsLookAt(), i.LookAt.Equals(n) || (i.LookAt.DeepCopy(n), e.LookAtRef = n.ToUeVector2D()), i.EnableBlendSpaceLookAt !== t.EnableBlendSpaceLookAt && (i.EnableBlendSpaceLookAt = t.EnableBlendSpaceLookAt, e.EnableBlendSpaceLookAtRef = t.EnableBlendSpaceLookAt), i.EnableLowerBlend !== t.EnableLowerBlend && (i.EnableLowerBlend = t.EnableLowerBlend, e.StateLowerBlend = t.EnableLowerBlend), i.EnableLeftArmBlend !== t.EnableLeftArmBlend && (i.EnableLeftArmBlend = t.EnableLeftArmBlend, e.StateLeftArmBlend = t.EnableLeftArmBlend), i.EnableRightArmBlend !== t.EnableRightArmBlend)) {
      i.EnableRightArmBlend = t.EnableRightArmBlend;
      e.StateRightArmBlend = t.EnableRightArmBlend;
    }
  }
  static UpdateAnimInfoHoldingHandsRoleNpc(t, e) {
    var i;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (n?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 321)) && (e = e, n = n.AnimLogicParamsSetter, (i = t.GetHandIkTarget(0)) && !n.LeftHandIkTarget.Equals(i) && (n.LeftHandIkTarget.DeepCopy(i), i = t.GetHandIkTargetUe(0)) && (e.LeftHandIKTargetCS = i), (i = t.GetHandIkTarget(1)) && !n.RightHandIkTarget.Equals(i) && (n.RightHandIkTarget.DeepCopy(i), i = t.GetHandIkTargetUe(1)) && (e.RightHandIKTargetCS = i), (i = t.GetIsHoldingHands()) !== n.IsHoldingHands && (n.IsHoldingHands = i, e.IsHoldingHands = i), (i = t.GetIsBeHoldingHands()) !== n.IsBeHoldingHands && (n.IsBeHoldingHands = i, e.IsBeHoldingHands = i), (i = t.GetHandReachable(0) || t.GetHandReachable(1)) !== n.IsHoldingHandsReachable && (n.IsHoldingHandsReachable = i, e.IsHoldingHandsReachable = i), (i = t.GetIsAcceptingInvitation()) !== n.IsAcceptingInvitation)) {
      n.IsAcceptingInvitation = i;
      e.IsAcceptingInvitation = i;
    }
  }
  static UpdateFootstepAudioEvent(t, i, n) {
    var r = n.碰撞信息;
    if (n["状态-地面-Sprint"] || r.bBlockingHit) {
      t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
      if (t?.Valid) {
        var a = t.Owner;
        if (a instanceof TsBaseCharacter_1.default) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharFootOnTheGround);
          t = t.Entity.GetComponent(50);
          if (t?.Valid) {
            var s = t.GetAkComponentBySocketName(FNameUtil_1.FNameUtil.GetDynamicFName("hitcase"));
            if (s?.IsValid()) {
              var o = a.CharRenderingComponent.GetInWater() ? n.缓存角色位置 : r.Location;
              let e = "";
              var y = GlobalData_1.GlobalData.World;
              if (a.CharRenderingComponent.GetInWater()) {
                UE.AkGameplayStatics.SetRTPCValue(undefined, t.WaterDepth, 0, undefined, FNameUtil_1.FNameUtil.NONE);
                e = "WaterSurface";
              } else {
                if (!y?.IsValid()) {
                  return;
                }
                {
                  a = UE.KismetMathLibrary.Conv_VectorToVectorDouble(o);
                  y = AudioUtils_1.AudioUtils.QueryFoliageAudioPhysicalMaterial(a);
                  let t = r.PhysMaterial;
                  o = (t = y.IsHitFoliage && y.PhysicalMaterial ? y.PhysicalMaterial : t)?.SurfaceType;
                  a = o ? UE.KuroAudioMaterialSettings.GetFootstepTextureName(o) : FNameUtil_1.FNameUtil.NONE;
                  e = (e = a === FNameUtil_1.FNameUtil.NONE ? a.toString() : "").length > 0 ? e : "DirtSurface";
                }
              }
              s.SetSwitch(undefined, "FootStep_Ground_Texture", e);
              t.FootSwitch = e;
              s.SetSwitch(undefined, "FootStep_Shoes", TsMeshAnimBlueprintFunctionLibrary.GetRoleFootStepState(i));
              if (n["状态-地面-Walk"] || n["状态-跑停-WalkStop"]) {
                s.PostAkEvent(n.WalkAkAudioEvent, 0, undefined, "");
              } else if (n["状态-地面-Run"] || n["状态-跑停-RunStop"]) {
                s.PostAkEvent(n.RunAkAudioEvent, 0, undefined, "");
              } else if (n["状态-地面-Sprint"] || n["状态-跑停-SprintStop"]) {
                s.PostAkEvent(n.SprintAkAudioEvent, 0, undefined, "");
              } else {
                s.PostAkEvent(n.FallbackAkAudioEvent, 0, undefined, "");
              }
            }
          }
        }
      }
    }
  }
  static ChangeTickOverlap(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 123).SetTakeOverTick(e);
  }
  static AnimTurnLog(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "AnimTurn 1058338", ["EntityId", t], ["CurrentFacing", e.ActorRotationProxy], ["InputFace", e.InputRotatorProxy]);
    }
  }
  static IsNpcTurning(t) {
    return !!EntitySystem_1.EntitySystem.GetComponent(t, 190)?.IsTurning;
  }
  static UpdateAndGetRotateBonesMap(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 186);
    if (t && t.RotateBonesToTargetMgr) {
      t.RotateBonesToTargetMgr.Update(e);
      t.RotateBonesToTargetMgr.GetActivateBones((0, puerts_1.$unref)(i));
      t.RotateBonesToTargetMgr.GetTargetOffset((0, puerts_1.$unref)(n));
    }
  }
}
exports.default = TsMeshAnimBlueprintFunctionLibrary;
//# sourceMappingURL=TsMeshAnimBlueprintFunctionLibrary.js.map