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
const VoxelUtils_1 = require("../../../../../Utils/VoxelUtils");
class TsMeshAnimBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static MainAnimInstance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 181)?.MainAnimInstance;
  }
  static MainAnimInstanceForVehicle(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 239)?.MainAnimInstance;
  }
  static GetSightDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 44)?.GetSightDirect();
  }
  static GetHulu(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 81)?.Hulu;
  }
  static GetBattleIdleTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 181)?.BattleIdleEndTime;
  }
  static GetDisableBlink(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 44)?.DisableBlink ?? false;
  }
  static EnterBattleIdle(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 181)?.EnterBattleIdle();
  }
  static SetTransformWithModelBuffer(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 181)?.SetTransformWithModelBuffer(e, i);
  }
  static SetSightDirectEnable(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 44);
    if (t) {
      t.EnableSightDirect = e;
    }
  }
  static HideWeaponsWhenHideBones(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 81)?.HideWeaponsWhenHideBones(e, i);
  }
  static ChangeWeaponHangState(t, e, i, n, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 81)?.ChangeWeaponHangState(e, (0, puerts_1.$unref)(n), (0, puerts_1.$unref)(r), i);
  }
  static GetCurrentWeaponHangState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 81)?._Pr;
  }
  static GetIsCurrentWeaponHideEffectPlaying(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 81)?.IsCurrentWeaponHideEffectPlaying() ?? false;
  }
  static ChangeWeapon(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 81)?.ChangeWeaponByWeaponSocketItem(e);
  }
  static GetRandomStandActionIndex(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 181)?.GetRandomStandActionIndex();
  }
  static HideWeapon(t, e, i, n, r = false) {
    EntitySystem_1.EntitySystem.GetComponent(t, 81)?.HideWeapon(i, e, n, false, r ? 1 : 0);
  }
  static HideHulu(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 81)?.SetHuluHidden(e);
  }
  static ChangeMeshAnim(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.ChangeMeshAnim(e, i);
  }
  static GetDegMovementSlope(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 181)?.DegMovementSlope;
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 181);
    if (t) {
      t.IkMeshOffset = e;
    }
  }
  static GetWeaponBreachLevel(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 81);
    if (t) {
      return t.GetWeaponBreachLevel();
    } else {
      return -1;
    }
  }
  static UpdateAnimInfoMeshAnim(t, e) {
    var i;
    var n;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 181);
    if (r?.Valid && (e = e, i = r.AnimLogicParamsSetter, n = r.BattleIdleEndTime, i.BattleIdleTime !== n && (i.BattleIdleTime = n, e.BattleIdleTimeRef = n), n = r.DegMovementSlope, i.DegMovementSlope !== n && (i.DegMovementSlope = n, e.DegMovementSlopeRef = n), n = r.GetTsSightDirect(), i.SightDirect.Equals(n) || (i.SightDirect.DeepCopy(n), e.SightDirectRef = n.ToUeVectorOld()), n = r.DisableBlink, i.DisableBlink !== n && (i.DisableBlink = n, e.DisableBlinkRef = n), r = EntitySystem_1.EntitySystem.GetComponent(t, 72).GetRagRollQuitState(), i.RagQuitState !== r)) {
      i.RagQuitState = r;
      e.RagQuitStateRef = r;
    }
  }
  static UpdateAnimInfoMeshAnimRoleNpc(t, e) {
    var i;
    var n;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 181);
    if (t?.Valid && (e = e, i = t.AnimLogicParamsSetter, n = t.DegMovementSlope, i.DegMovementSlope !== n && (i.DegMovementSlope = n, e.DegMovementSlopeRef = n), n = t.GetTsSightDirect(), i.SightDirect.Equals(n) || (i.SightDirect.DeepCopy(n), e.SightDirectRef = n.ToUeVectorOld()), n = t.DisableBlink, i.DisableBlink !== n && (i.DisableBlink = n, e.DisableBlinkRef = n), n = t.GetTsLookAt(), i.LookAt.Equals(n) || (i.LookAt.DeepCopy(n), e.LookAtRef = n.ToUeVector2D()), i.EnableBlendSpaceLookAt !== t.EnableBlendSpaceLookAt && (i.EnableBlendSpaceLookAt = t.EnableBlendSpaceLookAt, e.EnableBlendSpaceLookAtRef = t.EnableBlendSpaceLookAt), i.EnableLowerBlend !== t.EnableLowerBlend && (i.EnableLowerBlend = t.EnableLowerBlend, e.StateLowerBlend = t.EnableLowerBlend), i.EnableLeftArmBlend !== t.EnableLeftArmBlend && (i.EnableLeftArmBlend = t.EnableLeftArmBlend, e.StateLeftArmBlend = t.EnableLeftArmBlend), i.EnableRightArmBlend !== t.EnableRightArmBlend)) {
      i.EnableRightArmBlend = t.EnableRightArmBlend;
      e.StateRightArmBlend = t.EnableRightArmBlend;
    }
  }
  static UpdateAnimInfoHoldingHandsRoleNpc(t, e) {
    var i;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 181);
    if (n?.Valid && (t = EntitySystem_1.EntitySystem.GetComponent(t, 302)) && (e = e, n = n.AnimLogicParamsSetter, (i = t.GetHandIkTarget(0)) && !n.LeftHandIkTarget.Equals(i) && (n.LeftHandIkTarget.DeepCopy(i), i = t.GetHandIkTargetUe(0)) && (e.LeftHandIKTargetCS = i), (i = t.GetHandIkTarget(1)) && !n.RightHandIkTarget.Equals(i) && (n.RightHandIkTarget.DeepCopy(i), i = t.GetHandIkTargetUe(1)) && (e.RightHandIKTargetCS = i), (i = t.GetIsHoldingHands()) !== n.IsHoldingHands && (n.IsHoldingHands = i, e.IsHoldingHands = i), (i = t.GetIsBeHoldingHands()) !== n.IsBeHoldingHands && (n.IsBeHoldingHands = i, e.IsBeHoldingHands = i), (i = t.GetHandReachable(0) || t.GetHandReachable(1)) !== n.IsHoldingHandsReachable && (n.IsHoldingHandsReachable = i, e.IsHoldingHandsReachable = i), (i = t.GetIsAcceptingInvitation()) !== n.IsAcceptingInvitation)) {
      n.IsAcceptingInvitation = i;
      e.IsAcceptingInvitation = i;
    }
  }
  static UpdateFootstepAudioEvent(e, i, n) {
    var r = n.碰撞信息;
    if (n["状态-地面-Sprint"] || r.bBlockingHit) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 3);
      if (e?.Valid) {
        var a = e.Owner;
        if (a instanceof TsBaseCharacter_1.default) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharFootOnTheGround);
          e = e.Entity.GetComponent(49);
          if (e?.Valid) {
            var s = e.GetAkComponentBySocketName(FNameUtil_1.FNameUtil.GetDynamicFName("hitcase"));
            if (s?.IsValid()) {
              r = a.CharRenderingComponent.GetInWater() ? n.缓存角色位置 : r.Location;
              let t = "";
              if (a.CharRenderingComponent.GetInWater()) {
                UE.AkGameplayStatics.SetRTPCValue(undefined, e.WaterDepth, 0, undefined, FNameUtil_1.FNameUtil.NONE);
                t = "WaterSurface";
              } else {
                a = GlobalData_1.GlobalData.World;
                if (!a?.IsValid()) {
                  return;
                }
                r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(r);
                t = UE.KuroVoxelSystem.GetMtlNameByID(VoxelUtils_1.VoxelUtils.GetVoxelInfo(a, r).MtlID);
              }
              s.SetSwitch(undefined, "FootStep_Ground_Texture", t);
              e.FootSwitch = t;
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
    EntitySystem_1.EntitySystem.GetComponent(t, 118).SetTakeOverTick(e);
  }
  static AnimTurnLog(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "AnimTurn 1058338", ["EntityId", t], ["CurrentFacing", e.ActorRotationProxy], ["InputFace", e.InputRotatorProxy]);
    }
  }
  static IsNpcTurning(t) {
    return !!EntitySystem_1.EntitySystem.GetComponent(t, 185)?.IsTurning;
  }
  static UpdateAndGetRotateBonesMap(t, e, i, n) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 181);
    if (t && t.RotateBonesToTargetMgr) {
      t.RotateBonesToTargetMgr.Update(e);
      t.RotateBonesToTargetMgr.GetActivateBones((0, puerts_1.$unref)(i));
      t.RotateBonesToTargetMgr.GetTargetOffset((0, puerts_1.$unref)(n));
    }
  }
}
exports.default = TsMeshAnimBlueprintFunctionLibrary;
//# sourceMappingURL=TsMeshAnimBlueprintFunctionLibrary.js.map