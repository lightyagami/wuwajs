"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestFailedBehaviorNode = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const ResponsibilityChain_1 = require("../../../Utils/ResponsibilityChain/ResponsibilityChain");
const QuestController_1 = require("../../QuestNew/Controller/QuestController");
const RangeCheck_1 = require("../../Util/RangeCheck");
const BehaviorNodeBase_1 = require("./BehaviorNodeBase");
const STALK_FAILED_DELAY_TIME = 1000;
const vectorArrayName = FNameUtil_1.FNameUtil.GetDynamicFName("VectorArray");
class RangeFailedParameterContext {
  constructor(e) {
    this.RangeEffectHandleId = 0;
    this.RangeFailedEffectPath = undefined;
    this.RangeFailedEffectCenterPos = undefined;
    this.RangeFailedEffectRadius = 0;
    this.RangeEntities = undefined;
    this.FailRangeCheck = undefined;
    this.RangeFailedEffectPath = e.RangeEffectPath;
    if (this.RangeFailedEffectPath) {
      if (e.RangeEntities) {
        this.RangeEntities = e.RangeEntities;
        this.FailRangeCheck ||= new RangeCheck_1.RangeCheck();
        for (const t of this.RangeEntities) {
          this.FailRangeCheck.GetOrAdd(t);
        }
        if (this.RangeEntities.length > 0) {
          return;
        }
      }
      this.RangeFailedEffectRadius = e.Range;
      this.RangeFailedEffectCenterPos = Vector_1.Vector.Create(e.Point?.X ?? 0, e.Point?.Y ?? 0, e.Point?.Z ?? 0);
    }
  }
  Clear() {
    this.FailRangeCheck?.OnClear();
    this.FailRangeCheck = undefined;
  }
  IsValid() {
    return this.RangeFailedEffectPath !== undefined && !StringUtils_1.StringUtils.IsBlank(this.RangeFailedEffectPath);
  }
}
class RangeFailedEffectHandler extends ResponsibilityChain_1.AbstractHandler {
  ExecuteStopping(e) {
    if (EffectSystem_1.EffectSystem.IsValid(e.RangeEffectHandleId)) {
      EffectSystem_1.EffectSystem.StopEffectById(e.RangeEffectHandleId, "[QuestFailedBehaviorNode.StopFailRangeEffect]", true);
    }
    e.RangeEffectHandleId = 0;
  }
}
class RangeFailedEffectRangeEntitiesHandler extends RangeFailedEffectHandler {
  static yN1(e) {
    return e.IsValid() && e.RangeEntities !== undefined && e.RangeEntities.length > 0;
  }
  static async SN1(t, e, i) {
    try {
      var r = await RangeFailedEffectRangeEntitiesHandler.MN1(t);
      var a = await RangeFailedEffectRangeEntitiesHandler.EN1(r.D_K2_GetActorLocation(), i.RangeFailedEffectPath);
      i.RangeEffectHandleId = a;
      EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(a, () => i.RangeEffectHandleId !== 0);
      RangeFailedEffectRangeEntitiesHandler.IN1(a, r.K2_GetActorLocation(), e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("GeneralLogicTree", 72, "WaitVolumeAndSpawnEffectThenSetParam执行异常", e, ["context", i], ["shape", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 72, "WaitVolumeAndSpawnEffectThenSetParam执行异常", ["context", i], ["shape", t], ["error", e]);
      }
    }
  }
  static async EN1(e, t) {
    return new Promise((i, r) => {
      EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, e, Vector_1.Vector.OneVectorDouble), t, "[QuestFailedBehaviorNode.RangeFailedEffectRangeEntitiesHandler]", undefined, 3, undefined, (e, t) => {
        if (e !== 5 || t === 0) {
          r(new Error(`[SpawnEffectAsync] SpawnEffect 失败 result: ${e}, handle: ${t}`));
        } else {
          i(t);
        }
      });
    });
  }
  static async MN1(o) {
    return new Promise((i, r) => {
      const a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass());
      if (!a) {
        r(new Error("[GetVolumeLocationAsync] 没有获得有效KuroTriggerVolumeManager WorldSubSystem"));
      }
      var e = a.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(o.VolumeKey));
      if (e) {
        i(e);
      } else {
        const n = e => {
          var t;
          if (e?.toString() === o.VolumeKey) {
            a?.OnTriggerVolumeAddToSubsystem.Remove(n);
            if ((t = a.GetKuroTriggerVolume(e))?.IsValid()) {
              i(t);
            } else {
              r(new Error("[GetVolumeLocationAsync] TriggerVolume无效" + e));
            }
          }
        };
        a.OnTriggerVolumeAddToSubsystem.Add(n);
      }
    });
  }
  static IN1(e, t, i) {
    var r = UE.NewArray(UE.Vector);
    for (const a of i) {
      r.Add(new UE.Vector(t.X + (a.Position.X ?? 0), t.Y + (a.Position.Y ?? 0), t.Z + (a.Position.Z ?? 0)));
    }
    i = new EffectParameterNiagara_1.EffectParameterNiagara();
    i.UserParameterArrayVector = [[vectorArrayName, r]];
    EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, i);
  }
  CanHandle(e) {
    return RangeFailedEffectRangeEntitiesHandler.yN1(e);
  }
  ShouldStop(e) {
    return RangeFailedEffectRangeEntitiesHandler.yN1(e);
  }
  ExecuteProcessing(e) {
    for (const r of e.RangeEntities) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 本地无法找到实体数据", ["rangeEntityPbDataId", r]);
        }
        return;
      }
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent");
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 无法找到样条组件配置", ["rangeEntityPbDataId", r]);
        }
        return;
      }
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 无法找到范围组件配置", ["rangeEntityPbDataId", r]);
        }
        return;
      }
      if (t.Shape.Type === "Volume") {
        if (i.Option.Type === IComponent_1.ESplineType.Range) {
          RangeFailedEffectRangeEntitiesHandler.SN1(t.Shape, i.Option.Points, e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 配置的样条类型未支持", ["ESplineType", i.Option.Type], ["rangeEntityPbDataId", r]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 72, "[RangeFailedEffectRangeEntitiesHandler.ExecuteProcessing] 配置的Range未支持", ["shape.Type", t.Shape.Type], ["rangeEntityPbDataId", r]);
      }
    }
  }
}
class RangeFailedEffectFixedPointHandler extends RangeFailedEffectHandler {
  static TN1(e) {
    return e.IsValid() !== undefined && e.RangeFailedEffectCenterPos !== undefined && e.RangeFailedEffectRadius > 0;
  }
  CanHandle(e) {
    return RangeFailedEffectFixedPointHandler.TN1(e);
  }
  ShouldStop(e) {
    return RangeFailedEffectFixedPointHandler.TN1(e);
  }
  ExecuteProcessing(i) {
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, i.RangeFailedEffectCenterPos.ToUeVector(), Vector_1.Vector.OneVectorDouble), i.RangeFailedEffectPath, "[QuestFailedBehaviorNode.RangeFailedEffectFixedPointHandler]", undefined, 3, undefined, (e, t) => {
      if (e !== 5) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误", ["result", e]);
        }
      } else if (t) {
        i.RangeEffectHandleId = t;
        EffectSystem_1.EffectSystem.SetEffectDataFloatConstParam(t, FNameUtil_1.FNameUtil.GetDynamicFName("CircleRadius"), i.RangeFailedEffectRadius);
        EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(t, () => i.RangeEffectHandleId !== 0);
      }
    });
  }
}
class QuestFailedBehaviorNode extends BehaviorNodeBase_1.BehaviorNodeBase {
  constructor(e) {
    super(e);
    this.TimerUiConfig = undefined;
    this.CanGiveUp = undefined;
    this.R$t = undefined;
    this.A$t = false;
    this.P$t = undefined;
    this.jLa = undefined;
    this.GiveUpText = undefined;
    this.x$t = [];
    this.pct = false;
    this.NeedRequiresSecondConfirmation = false;
    this.bN1 = undefined;
    this.Zpe = e => {
      var t;
      this.B$t(!e);
      if (e !== this.R$t && this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
        if (!(this.R$t = e)) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSneakFoundChange, this.R$t, 0);
        }
        t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId);
        t = Protocol_1.Aki.Protocol.IJn.create({
          d9n: t,
          C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
          b5n: this.NodeId,
          g9n: e
        });
        Net_1.Net.Call(28747, t, e => {
          switch (e.BEs) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotInSneak:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBehaviorTreeNotFound:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 24781);
          }
        });
      }
    };
    this.vYe = e => {
      var e = EntitySystem_1.EntitySystem.Get(e);
      if (e?.Valid && (e = e.GetComponent(0).GetPbDataId(), this.x$t.includes(e))) {
        TimerSystem_1.TimerSystem.Delay(() => {
          if (!this.pct) {
            this.pct = true;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStalkFailed);
            this.b$t();
          }
        }, STALK_FAILED_DELAY_TIME);
      }
    };
    this.b$t = () => {
      var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId);
      var e = Protocol_1.Aki.Protocol.bJn.create({
        d9n: e,
        C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId),
        b5n: this.NodeId
      });
      Net_1.Net.Call(17693, e, e => {
        if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 21183);
        }
      });
    };
    this.NodeType = "QuestFailed";
  }
  get NeedSecondaryConfirm() {
    return this.P$t;
  }
  get NowTransitionType() {
    return this.jLa;
  }
  get RangeFailedEffectChain() {
    var e;
    var t;
    if (!QuestFailedBehaviorNode.RN1) {
      e = new RangeFailedEffectRangeEntitiesHandler();
      t = new RangeFailedEffectFixedPointHandler();
      e.SetNext(t);
      QuestFailedBehaviorNode.RN1 = e;
    }
    return QuestFailedBehaviorNode.RN1;
  }
  OnCreate(e) {
    if (!e || e.Type !== "QuestFailed") {
      return false;
    }
    this.P$t = e.FailedCondition?.FailedTeleport?.IsConfirm;
    this.jLa = e.FailedCondition?.FailedTeleport?.TransitionOption?.Type;
    this.TimerUiConfig = e.FailedCondition?.Timer?.UiConfig;
    var t = e.FailedCondition?.RangeLimiting;
    if (t) {
      this.bN1 = new RangeFailedParameterContext(t);
    }
    this.NeedRequiresSecondConfirmation = e.FailedCondition?.RangeLimiting?.RequiresSecondConfirmation ?? false;
    if (e.FailedCondition?.SneakPlayCondition) {
      this.G$t();
    }
    if (e.FailedCondition?.EntityAlert?.EntityIds && e.FailedCondition?.EntityAlert?.EntityIds.length > 0) {
      this.x$t = e.FailedCondition.EntityAlert.EntityIds;
      this.N$t();
    }
    this.CanGiveUp = e.FailedCondition?.CanGiveUp;
    this.GiveUpText = e.FailedCondition?.TidGiveUpText;
    return true;
  }
  OnNodeActive() {
    if (this.bN1) {
      this.RangeFailedEffectChain.Handle(this.bN1);
    }
  }
  OnNodeDeActive(e) {
    this.OUa();
    if (this.A$t) {
      this.B$t(false);
    }
    this.O$t();
    this.k$t();
    if (this.bN1) {
      this.bN1.Clear();
      this.bN1 = undefined;
    }
    super.OnNodeDeActive(e);
    if (QuestController_1.QuestNewController.QuestRangeFailWarningTreeId === this.TreeIncId) {
      QuestController_1.QuestNewController.HideCancelRangeFailWaringEffect();
    }
  }
  G$t() {
    var e;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    this.B$t(true);
    this.A$t = true;
    Net_1.Net.Register(20535, e => {
      e = Number(MathUtils_1.MathUtils.LongToBigInt(e.dps));
      this.R$t = e !== 0;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSneakFoundChange, this.R$t, e);
    });
    if (this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart);
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.TreeIncId);
      e = Protocol_1.Aki.Protocol.LJn.create({
        d9n: e,
        C9n: MathUtils_1.MathUtils.BigIntToLong(this.TreeIncId)
      });
      Net_1.Net.Call(15223, e, e => {
        if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 24266);
        }
      });
    }
  }
  O$t() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    }
    if (this.A$t) {
      Net_1.Net.UnRegister(20535);
      this.A$t = false;
    }
  }
  N$t() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStalkFound, this.vYe);
  }
  k$t() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnStalkFound, this.vYe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStalkFound, this.vYe);
    }
  }
  B$t(e) {
    var t = Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(175);
    if (t?.Valid) {
      if (e) {
        t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
          InstigatorId: t.CreatureDataId,
          Reason: "QuestFailedBehaviorNode"
        });
      } else {
        t.RemoveBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, -1, "QuestFailedBehaviorNode");
      }
    }
  }
  IsFadeInScreen() {
    return this.jLa === IAction_1.ETeleportTransitionType.FadeInScreen;
  }
  OUa() {
    if (this.bN1) {
      this.RangeFailedEffectChain.Stop(this.bN1);
    }
  }
  IsOutFailRange(e) {
    if (this.bN1) {
      if (this.bN1.FailRangeCheck !== undefined) {
        return !this.bN1.FailRangeCheck.MapCheckReachedPosition(e);
      }
      if (this.bN1.RangeFailedEffectCenterPos !== undefined && this.bN1.RangeFailedEffectRadius !== undefined) {
        return Vector_1.Vector.DistXY(this.bN1.RangeFailedEffectCenterPos, e) > this.bN1.RangeFailedEffectRadius;
      }
    }
    return false;
  }
}
(exports.QuestFailedBehaviorNode = QuestFailedBehaviorNode).RN1 = undefined;
//# sourceMappingURL=QuestFailedBehaviorNode.js.map