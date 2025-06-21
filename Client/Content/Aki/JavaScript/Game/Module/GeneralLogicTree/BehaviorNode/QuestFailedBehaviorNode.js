"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestFailedBehaviorNode = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  ResponsibilityChain_1 = require("../../../Utils/ResponsibilityChain/ResponsibilityChain"),
  QuestController_1 = require("../../QuestNew/Controller/QuestController"),
  RangeCheck_1 = require("../../Util/RangeCheck"),
  BehaviorNodeBase_1 = require("./BehaviorNodeBase"),
  STALK_FAILED_DELAY_TIME = 1e3,
  vectorArrayName = FNameUtil_1.FNameUtil.GetDynamicFName("VectorArray");
class RangeFailedParameterContext {
  constructor(e) {
    if (this.RangeEffectHandleId = 0, this.RangeFailedEffectPath = void 0, this.RangeFailedEffectCenterPos = void 0, this.RangeFailedEffectRadius = 0, this.RangeEntities = void 0, this.FailRangeCheck = void 0, this.RangeFailedEffectPath = e.RangeEffectPath, this.RangeFailedEffectPath) {
      if (e.RangeEntities) {
        this.RangeEntities = e.RangeEntities, this.FailRangeCheck || (this.FailRangeCheck = new RangeCheck_1.RangeCheck);
        for (const t of this.RangeEntities) this.FailRangeCheck.GetOrAdd(t);
        if (0 < this.RangeEntities.length) return
      }
      this.RangeFailedEffectRadius = e.Range, this.RangeFailedEffectCenterPos = Vector_1.Vector.Create(e.Point?.X ?? 0, e.Point?.Y ?? 0, e.Point?.Z ?? 0)
    }
  }
  Clear() {
    this.FailRangeCheck?.OnClear(), this.FailRangeCheck = void 0
  }
  IsValid() {
    return void 0 !== this.RangeFailedEffectPath && !StringUtils_1.StringUtils.IsBlank(this.RangeFailedEffectPath)
  }
}
class RangeFailedEffectHandler extends ResponsibilityChain_1.AbstractHandler {
  ExecuteStopping(e) {
    EffectSystem_1.EffectSystem.IsValid(e.RangeEffectHandleId) && EffectSystem_1.EffectSystem.StopEffectById(e.RangeEffectHandleId, "[QuestFailedBehaviorNode.StopFailRangeEffect]", !0), e.RangeEffectHandleId = 0
  }
}
class RangeFailedEffectRangeEntitiesHandler extends RangeFailedEffectHandler {
  static jF1(e) {
    return e.IsValid() && void 0 !== e.RangeEntities && 0 < e.RangeEntities.length
  }
  static async HF1(t, e, i) {
    try {
      var r = await RangeFailedEffectRangeEntitiesHandler.$F1(t),
        a = await RangeFailedEffectRangeEntitiesHandler.WF1(r.D_K2_GetActorLocation(), i.RangeFailedEffectPath);
      i.RangeEffectHandleId = a, EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(a, () => 0 !== i.RangeEffectHandleId), RangeFailedEffectRangeEntitiesHandler.QF1(a, r.K2_GetActorLocation(), e)
    } catch (e) {
      e instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("GeneralLogicTree", 72, "WaitVolumeAndSpawnEffectThenSetParam执行异常", e, ["context", i], ["shape", t]) : Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "WaitVolumeAndSpawnEffectThenSetParam执行异常", ["context", i], ["shape", t], ["error", e])
    }
  }
  static async WF1(e, t) {
    return new Promise((i, r) => {
      EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, e, Vector_1.Vector.OneVectorDouble), t, "[QuestFailedBehaviorNode.RangeFailedEffectRangeEntitiesHandler]", void 0, 3, void 0, (e, t) => {
        5 !== e || 0 === t ? r(new Error(`[SpawnEffectAsync] SpawnEffect 失败 result: ${e}, handle: ` + t)) : i(t)
      })
    })
  }
  static async $F1(o) {
    return new Promise((i, r) => {
      const a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass());
      a || r(new Error("[GetVolumeLocationAsync] 没有获得有效KuroTriggerVolumeManager WorldSubSystem"));
      var e = a.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(o.VolumeKey));
      if (e) i(e);
      else {
        const n = e => {
          var t;
          e?.toString() === o.VolumeKey && (a?.OnTriggerVolumeAddToSubsystem.Remove(n), (t = a.GetKuroTriggerVolume(e))?.IsValid() ? i(t) : r(new Error("[GetVolumeLocationAsync] TriggerVolume无效" + e)))
        };
        a.OnTriggerVolumeAddToSubsystem.Add(n)
      }
    })
  }
  static QF1(e, t, i) {
    var r = UE.NewArray(UE.Vector);
    for (const a of i) r.Add(new UE.Vector(t.X + (a.Position.X ?? 0), t.Y + (a.Position.Y ?? 0), t.Z + (a.Position.Z ?? 0)));
    i = new EffectParameterNiagara_1.EffectParameterNiagara;
    i.UserParameterArrayVector = [
      [vectorArrayName, r]
    ], EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, i)
  }
  CanHandle(e) {
    return RangeFailedEffectRangeEntitiesHandler.jF1(e)
  }
  ShouldStop(e) {
    return RangeFailedEffectRangeEntitiesHandler.jF1(e)
  }
  ExecuteProcessing(e) {
    for (const r of e.RangeEntities) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
      if (!t) return void(Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 本地无法找到实体数据", ["rangeEntityPbDataId", r]));
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent");
      if (!i) return void(Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 无法找到样条组件配置", ["rangeEntityPbDataId", r]));
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
      if (!t) return void(Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 无法找到范围组件配置", ["rangeEntityPbDataId", r]));
      "Volume" === t.Shape.Type ? i.Option.Type === IComponent_1.ESplineType.Range ? RangeFailedEffectRangeEntitiesHandler.HF1(t.Shape, i.Option.Points, e) : Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 配置的样条类型未支持", ["ESplineType", i.Option.Type], ["rangeEntityPbDataId", r]) : Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 配置的Range未支持", ["shape.Type", t.Shape.Type], ["rangeEntityPbDataId", r])
    }
  }
}
class RangeFailedEffectFixedPointHandler extends RangeFailedEffectHandler {
  static KF1(e) {
    return void 0 !== e.IsValid() && void 0 !== e.RangeFailedEffectCenterPos && 0 < e.RangeFailedEffectRadius
  }
  CanHandle(e) {
    return RangeFailedEffectFixedPointHandler.KF1(e)
  }
  ShouldStop(e) {
    return RangeFailedEffectFixedPointHandler.KF1(e)
  }
  ExecuteProcessing(i) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, i.RangeFailedEffectCenterPos.ToUeVector(), Vector_1.Vector.OneVectorDouble), i.RangeFailedEffectPath, "[QuestFailedBehaviorNode.RangeFailedEffectFixedPointHandler]", void 0, 3, void 0, (e, t) => {
      5 !== e ? Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误", ["result", e]) : t && (i.RangeEffectHandleId = t, EffectSystem_1.EffectSystem.SetEffectDataFloatConstParam(t, FNameUtil_1.FNameUtil.GetDynamicFName("CircleRadius"), i.RangeFailedEffectRadius), EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(t, () => 0 !== i.RangeEffectHandleId))
    })
  }
}
class QuestFailedBehaviorNode extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(e) {
    super(e), this.TimerUiConfig = void 0, this.CanGiveUp = void 0, this.R$t = void 0, this.A$t = !1, this.P$t = void 0, this.jLa = void 0, this.GiveUpText = void 0, this.x$t = [], this.pct = !1, this.NeedRequiresSecondConfirmation = !1, this.XF1 = void 0, this.Zpe = e => {
      var t;
      this.B$t(!e), e !== this.R$t && this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid && ((this.R$t = e) || EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSneakFoundChange, this.R$t, 0), t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId), t = Protocol_1.Aki.Protocol.IJn.create({
        d9n: t,
        C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
        b5n: this.NodeId,
        g9n: e
      }), Net_1.Net.Call(19866, t, e => {
        switch (e.BEs) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotInSneak:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBehaviorTreeNotFound:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 17878)
        }
      }))
    }, this.vYe = e => {
      var e = EntitySystem_1.EntitySystem.Get(e);
      e?.Valid && (e = e.GetComponent(0).GetPbDataId(), this.x$t.includes(e)) && TimerSystem_1.TimerSystem.Delay(() => {
        this.pct || (this.pct = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStalkFailed), this.b$t())
      }, STALK_FAILED_DELAY_TIME)
    }, this.b$t = () => {
      var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId),
        e = Protocol_1.Aki.Protocol.bJn.create({
          d9n: e,
          C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
          b5n: this.NodeId
        });
      Net_1.Net.Call(19033, e, e => {
        e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 24652)
      })
    }, this.NodeType = "QuestFailed"
  }
  get NeedSecondaryConfirm() {
    return this.P$t
  }
  get NowTransitionType() {
    return this.jLa
  }
  get RangeFailedEffectChain() {
    var e, t;
    return QuestFailedBehaviorNode.YF1 || (e = new RangeFailedEffectRangeEntitiesHandler, t = new RangeFailedEffectFixedPointHandler, e.SetNext(t), QuestFailedBehaviorNode.YF1 = e), QuestFailedBehaviorNode.YF1
  }
  OnCreate(e) {
    if (!e || "QuestFailed" !== e.Type) return !1;
    this.P$t = e.FailedCondition?.FailedTeleport?.IsConfirm, this.jLa = e.FailedCondition?.FailedTeleport?.TransitionOption?.Type, this.TimerUiConfig = e.FailedCondition?.Timer?.UiConfig;
    var t = e.FailedCondition?.RangeLimiting;
    return t && (this.XF1 = new RangeFailedParameterContext(t)), this.NeedRequiresSecondConfirmation = e.FailedCondition?.RangeLimiting?.RequiresSecondConfirmation ?? !1, e.FailedCondition?.SneakPlayCondition && this.G$t(), e.FailedCondition?.EntityAlert?.EntityIds && 0 < e.FailedCondition?.EntityAlert?.EntityIds.length && (this.x$t = e.FailedCondition.EntityAlert.EntityIds, this.N$t()), this.CanGiveUp = e.FailedCondition?.CanGiveUp, this.GiveUpText = e.FailedCondition?.TidGiveUpText, !0
  }
  OnNodeActive() {
    this.XF1 && this.RangeFailedEffectChain.Handle(this.XF1)
  }
  OnNodeDeActive(e) {
    this.OUa(), this.A$t && this.B$t(!1), this.O$t(), this.k$t(), this.XF1 && (this.XF1.Clear(), this.XF1 = void 0), super.OnNodeDeActive(e), QuestController_1.QuestNewController.QuestRangeFailWarningTreeId === this.TreeIncId && QuestController_1.QuestNewController.HideCancelRangeFailWaringEffect()
  }
  G$t() {
    var e;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), this.B$t(!0), this.A$t = !0, Net_1.Net.Register(20352, e => {
      e = Number(MathUtils_1.MathUtils.LongToBigInt(e.dps));
      this.R$t = 0 !== e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSneakFoundChange, this.R$t, e)
    }), this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart), e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId), e = Protocol_1.Aki.Protocol.LJn.create({
      d9n: e,
      C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId)
    }), Net_1.Net.Call(15202, e, e => {
      e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 22246)
    }))
  }
  O$t() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), this.A$t && (Net_1.Net.UnRegister(20352), this.A$t = !1)
  }
  N$t() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStalkFound, this.vYe)
  }
  k$t() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnStalkFound, this.vYe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStalkFound, this.vYe)
  }
  B$t(e) {
    var t = Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(174);
    t?.Valid && (e ? t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
      InstigatorId: t.CreatureDataId,
      Reason: "QuestFailedBehaviorNode"
    }) : t.RemoveBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, -1, "QuestFailedBehaviorNode"))
  }
  IsFadeInScreen() {
    return this.jLa === IAction_1.ETeleportTransitionType.FadeInScreen
  }
  OUa() {
    this.XF1 && this.RangeFailedEffectChain.Stop(this.XF1)
  }
  IsOutFailRange(e) {
    if (this.XF1) {
      if (void 0 !== this.XF1.FailRangeCheck) return !this.XF1.FailRangeCheck.MapCheckReachedPosition(e);
      if (void 0 !== this.XF1.RangeFailedEffectCenterPos && void 0 !== this.XF1.RangeFailedEffectRadius) return Vector_1.Vector.DistXY(this.XF1.RangeFailedEffectCenterPos, e) > this.XF1.RangeFailedEffectRadius
    }
    return !1
  }
}(exports.QuestFailedBehaviorNode = QuestFailedBehaviorNode).YF1 = void 0;
//# sourceMappingURL=QuestFailedBehaviorNode.js.map