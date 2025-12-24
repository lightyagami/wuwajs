"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindBuffToVehicleEffect = exports.DynamicModifyBuffStackEffect = exports.SpecialEnergyModifier = exports.SyncTimeScaleEffect = exports.ForeverTimeScaleEffect = exports.ModifyBuffTimeScale = exports.BuffOverStackCompensation = exports.AdditionBulletInterval = exports.AdditionBulletDuration = exports.AdditionBulletSize = exports.ExtraEffectModifyBuffMaxStack = exports.ModifyBuffDurationOrPeriodByInstigator = exports.ModifyBuffDurationOrPeriod = exports.PreventReduceStack = exports.ModifyToughReduce = exports.AddBuffToVision = exports.FrozenEffect = exports.AddPassiveSkill = exports.TimeScaleEffect = exports.LockLowerBound = exports.LockUpperBound = exports.LockValue = exports.ShieldEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const PanelQteController_1 = require("../../../../../../Module/PanelQte/PanelQteController");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const AbilityEvent_1 = require("../AbilityEvent");
const AbilityUtils_1 = require("../AbilityUtils");
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ShieldEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.ShieldTemplateId = 0;
  }
  InitParameters(t) {
    this.ShieldTemplateId = Number(t.ExtraEffectParameters[0]);
  }
  OnExecute() {}
  GetDebugEffectString() {
    return `添加护盾${this.ShieldTemplateId}(纯服务端逻辑)`;
  }
}
exports.ShieldEffect = ShieldEffect;
class LockValue extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.Offset = 0;
    this.Percent = -0;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Offset = Number(t.ExtraEffectParameters[1]);
    this.Percent = 0;
    if (t.ExtraEffectParameters.length > 2) {
      this.Percent = Number(t.ExtraEffectParameters[2]);
    }
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(181)?.AddStateAttributeLock(this.ActiveHandleId, this.AttributeId, this.Percent, this.Offset);
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(181)?.RemoveStateAttributeLock(this.ActiveHandleId, this.AttributeId);
  }
  GetDebugEffectString() {
    return `锁定属性${this.AttributeId}为${this.Percent}% + ${this.Offset}`;
  }
}
exports.LockValue = LockValue;
class LockUpperBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.Offset = 0;
    this.Percent = -0;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (t.ExtraEffectParameters.length > 2) {
      this.Percent = Number(t.ExtraEffectParameters[2]);
    }
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(181)?.AddIntervalLock(0, this.ActiveHandleId, this.AttributeId, this.Percent, this.Offset);
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(181)?.RemoveIntervalLock(0, this.ActiveHandleId, this.AttributeId);
  }
  GetDebugEffectString() {
    return `锁定属性${this.AttributeId}的上限为${(this.Percent / 100).toFixed(1)}% + ${this.Offset}`;
  }
}
exports.LockUpperBound = LockUpperBound;
class LockLowerBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.AttributeId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.Offset = 0;
    this.Percent = -0;
  }
  InitParameters(t) {
    this.AttributeId = Number(t.ExtraEffectParameters[0]);
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (t.ExtraEffectParameters.length > 2) {
      this.Percent = Number(t.ExtraEffectParameters[2]);
    }
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(181)?.AddIntervalLock(1, this.ActiveHandleId, this.AttributeId, this.Percent, this.Offset);
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(181)?.RemoveIntervalLock(1, this.ActiveHandleId, this.AttributeId);
  }
  GetDebugEffectString() {
    return `锁定属性${this.AttributeId}的下限为${(this.Percent / 100).toFixed(1)}% + ${this.Offset}`;
  }
}
exports.LockLowerBound = LockLowerBound;
class TimeScaleEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.Priority = 0;
    this.Dilation = 0;
    this.CurveId = -1;
    this.CurveDt = undefined;
    this.Active = true;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.Priority = Number(t[0]);
    this.Dilation = Number(t[1]);
    this.CurveId = Number(t[3] ?? -1);
    this.CurveId = this.CurveId % 1 == 0 ? this.CurveId : -1;
  }
  OnCreated() {
    this.yXo();
  }
  OnExecute() {}
  OnRemoved() {
    this.Active = false;
    this.IXo();
    this.CurveDt = undefined;
  }
  StartTimeScaleEffect() {
    this.yXo();
  }
  StopTimeScaleEffect() {
    this.IXo();
  }
  yXo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BuffItem", 35, "AddTimeScaleByBuff", ["this.CurveDt", this.CurveDt === undefined], ["this.CurveId", this.CurveId]);
    }
    if (this.CurveId === -1 || this.CurveDt) {
      this.TXo();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BuffItem", 35, "AddTimeScaleLoad", ["this.CurveId", this.CurveId]);
      }
      ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Data/Fight/DT_BuffTimeScaleCurve.DT_BuffTimeScaleCurve", UE.DataTable, t => {
        if (this.Active) {
          this.CurveDt = t;
          this.TXo();
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BuffItem", 35, "TimeScaleHasRemoved");
        }
      });
    }
  }
  TXo() {
    var t = this.CurveDt ? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.CurveDt, this.CurveId.toString()) : undefined;
    this.OwnerEntity?.CheckGetComponent(16)?.AddTimeScaleByBuff(this.ActiveHandleId, this.Priority, this.Dilation, t?.时间膨胀时长, t?.时间膨胀变化曲线);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BuffItem", 35, "AddTimeScaleByBuff", ["curve?.时间膨胀时长", t?.时间膨胀时长], ["curve?.时间膨胀变化曲线", t?.时间膨胀变化曲线]);
    }
  }
  IXo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BuffItem", 35, "RemoveTimeScaleByBuff", ["this.ActiveHandleId", this.ActiveHandleId]);
    }
    this.OwnerEntity?.CheckGetComponent(16)?.RemoveTimeScaleByBuff(this.ActiveHandleId);
  }
  GetDebugEffectString() {
    if (this.CurveId === -1) {
      return `设置时间膨胀(倍率${this.Dilation})`;
    } else {
      return `设置时间膨胀(倍率${this.Dilation} 曲线${this.CurveId})`;
    }
  }
}
exports.TimeScaleEffect = TimeScaleEffect;
class AddPassiveSkill extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.SkillIds = undefined;
  }
  InitParameters(t) {
    this.SkillIds = t.ExtraEffectParameters[0].split("#").map(t => Number(t)) ?? [];
  }
  OnCreated() {
    var t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid) {
      for (const e of this.SkillIds) {
        if (this.Buff) {
          t.LearnPassiveSkill(e, {
            NeedBroadcast: true,
            PreMessageId: this.Buff.MessageId,
            CombatMessageId: this.Buff.MessageId
          });
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BuffItem", 35, "没有Buff不能加被动技能");
        }
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid) {
      for (const e of this.SkillIds) {
        t.ForgetPassiveSkill(e, true);
      }
    }
  }
  GetDebugEffectString() {
    return "添加被动技能" + this.SkillIds?.join(",");
  }
}
exports.AddPassiveSkill = AddPassiveSkill;
class FrozenEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.LockName = "";
    this.PanelQteId = 0;
    this.PanelQteHandleId = 0;
  }
  InitParameters(t) {
    this.LockName = "" + this.ActiveHandleId;
    if (t.ExtraEffectParameters.length > 0) {
      this.PanelQteId = Number(t.ExtraEffectParameters[0]);
    }
  }
  OnCreated() {
    this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(16)?.LockFrozen(this.LockName);
    if (this.PanelQteId) {
      this.PanelQteHandleId = PanelQteController_1.PanelQteController.StartBuffQte(this.PanelQteId, this.BuffId, this.ActiveHandleId, this.OwnerBuffComponent?.GetEntity(), this.Buff.MessageId);
    }
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerBuffComponent?.GetEntity()?.CheckGetComponent(16)?.UnlockFrozen(this.LockName);
    if (this.PanelQteId && this.PanelQteHandleId > 0) {
      PanelQteController_1.PanelQteController.StopQte(this.PanelQteHandleId);
    }
  }
  GetDebugEffectString() {
    return "冻结" + (this.PanelQteId > 0 ? "并播放QTE" + this.PanelQteId : "");
  }
}
exports.FrozenEffect = FrozenEffect;
class AddBuffToVision extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.SummonType = 0;
    this.SummonIndex = 0;
    this.BuffIds = [];
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters) {
      this.SummonType = Number(t.ExtraEffectParameters[0] ?? 0);
      this.SummonIndex = Number(t.ExtraEffectParameters[1] ?? 0);
      this.BuffIds = t.ExtraEffectParameters[2]?.split("#")?.map(t => Number(t ?? 0)) ?? [];
    }
  }
  OnCreated() {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.OwnerEntity, this.SummonType, this.SummonIndex)?.Entity;
    var e = this.Buff?.MessageId;
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("BuffItem", 35, "没有父Buff的上下文信息");
      }
    }
    var s = t?.GetComponent(183);
    if (s) {
      for (const i of this.BuffIds) {
        s.AddBuff(i, {
          InstigatorId: this.InstigatorBuffComponent?.CreatureDataId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          PreMessageId: e,
          Reason: `buff${this.BuffId}向召唤物共享buff`
        });
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.OwnerEntity, this.SummonType)?.Entity?.GetComponent(183);
    if (t) {
      for (const e of this.BuffIds) {
        t.RemoveBuff(e, -1, `召唤者的buff${this.BuffId}移除`);
      }
    }
  }
}
exports.AddBuffToVision = AddBuffToVision;
class ModifyToughReduce extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.ModifyRate = 0;
    this.ModifierHandle = 0;
  }
  InitParameters(t) {
    if (t.ExtraEffectParameters) {
      this.ModifyRate = Number(t.ExtraEffectParameters[0] ?? 0);
    }
  }
  OnCreated() {
    var t = this.OwnerEntity?.CheckGetComponent(181);
    if (t) {
      this.ModifierHandle = t.AddModifier(CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce, {
        Type: -1,
        Value1: this.ModifyRate
      });
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerEntity?.CheckGetComponent(181);
    if (t) {
      t.RemoveModifier(CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce, this.ModifierHandle);
    }
  }
  GetDebugEffectString() {
    return `修改韧性扣减率${(this.ModifyRate * 100).toFixed(1)}%`;
  }
}
exports.ModifyToughReduce = ModifyToughReduce;
class PreventReduceStack extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.InvolvedBuffIds = [];
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    if (t) {
      this.InvolvedBuffIds = t[0].split("#").map(t => Number(t));
    }
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t) {
      for (const e of this.InvolvedBuffIds) {
        t.AddBuffRoutineExpirationLock(e);
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t) {
      for (const e of this.InvolvedBuffIds) {
        t.RemoveBuffRoutineExpirationLock(e);
      }
    }
  }
  GetDebugEffectString() {
    return `阻止buff${this.InvolvedBuffIds.join(",")}随时间自然衰减`;
  }
}
exports.PreventReduceStack = PreventReduceStack;
class ModifyBuffDurationOrPeriod extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.InvolvedBuffIds = [];
    this.DurationRate = 0;
    this.PeriodRate = 0;
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    this.DurationRate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.PeriodRate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (e) {
      this.InvolvedBuffIds = e[0].split("#").map(t => Number(t.trim()));
    }
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t && (this.DurationRate !== 0 || this.PeriodRate !== 0)) {
      for (const e of this.InvolvedBuffIds) {
        t.AddBuffTimeModifier(e, this.ActiveHandleId, this.PeriodRate, this.DurationRate, false);
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t) {
      for (const e of this.InvolvedBuffIds) {
        t.RemoveBuffTimeModifier(e, this.ActiveHandleId, false);
      }
    }
  }
  GetDebugEffectString() {
    var t = "修改buff" + this.InvolvedBuffIds.join(",");
    return `${t += ` 持续时间${this.DurationRate >= 0 ? "+" : ""}${(this.DurationRate * 0.01).toFixed(1)}%`} 周期${this.DurationRate >= 0 ? "+" : ""}${(this.PeriodRate * 0.01).toFixed(1)}%`;
  }
}
exports.ModifyBuffDurationOrPeriod = ModifyBuffDurationOrPeriod;
class ModifyBuffDurationOrPeriodByInstigator extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.InvolvedBuffIds = [];
    this.DurationRate = 0;
    this.PeriodRate = 0;
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    this.DurationRate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.PeriodRate = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
    if (e) {
      this.InvolvedBuffIds = e[0].split("#").map(t => Number(t.trim()));
    }
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t && (this.DurationRate !== 0 || this.PeriodRate !== 0)) {
      for (const e of this.InvolvedBuffIds) {
        t.AddBuffTimeModifier(e, this.ActiveHandleId, this.PeriodRate, this.DurationRate, true);
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t) {
      for (const e of this.InvolvedBuffIds) {
        t.RemoveBuffTimeModifier(e, this.ActiveHandleId, true);
      }
    }
  }
  GetDebugEffectString() {
    var t = "修改由该持有者施加的buff" + this.InvolvedBuffIds.join(",");
    return `${t += ` 持续时间${this.DurationRate >= 0 ? "+" : ""}${(this.DurationRate * 0.01).toFixed(1)}%`} 周期${this.DurationRate >= 0 ? "+" : ""}${(this.PeriodRate * 0.01).toFixed(1)}%`;
  }
}
exports.ModifyBuffDurationOrPeriodByInstigator = ModifyBuffDurationOrPeriodByInstigator;
class ExtraEffectModifyBuffMaxStack extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.InvolvedBuffIds = [];
    this.StackValues = [];
  }
  InitParameters(t) {
    for (const i of t.ExtraEffectParameters) {
      var [e, s] = i.split("#");
      this.InvolvedBuffIds.push(Number(e));
      this.StackValues.push(Number(s));
    }
  }
  OnCreated() {
    var e = this.OwnerBuffComponent;
    if (e) {
      for (let t = 0; t < this.InvolvedBuffIds.length; t++) {
        e.AddBuffStackModifier(this.InvolvedBuffIds[t], this.ActiveHandleId, this.StackValues[t]);
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t && this.InvolvedBuffIds.length > 0) {
      for (const e of this.InvolvedBuffIds) {
        t.RemoveBuffStackModifier(e, this.ActiveHandleId);
      }
    }
  }
  GetDebugEffectString() {
    var t = "修改buff" + this.InvolvedBuffIds;
    return t += " 修改层数" + this.StackValues;
  }
}
exports.ExtraEffectModifyBuffMaxStack = ExtraEffectModifyBuffMaxStack;
const SIZE_SCALE_PARAMS_LEN = 4;
const SIZE_SCALE_INDEX_BULLETROWNAME = 0;
const SIZE_SCALE_INDEX_X = 1;
const SIZE_SCALE_INDEX_Y = 2;
const SIZE_SCALE_INDEX_Z = 3;
class AdditionBulletSize extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.oMc = new Map();
    this.nMc = new Array();
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    var s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i;
      var r;
      var h = e[t];
      var f = h.split("#");
      if (f.length < SIZE_SCALE_PARAMS_LEN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BuffItem", 20, "参数数量不足, 需要4个", ["Buff", this.BuffId], ["参数", h], ["参数索引", t], ["参数数量", s]);
        }
      } else {
        h = f[SIZE_SCALE_INDEX_BULLETROWNAME];
        i = Number(f[SIZE_SCALE_INDEX_X]);
        r = Number(f[SIZE_SCALE_INDEX_Y]);
        f = Number(f[SIZE_SCALE_INDEX_Z]);
        this.oMc.set(h, t * SIZE_SCALE_INDEX_Z);
        this.nMc.push(i);
        this.nMc.push(r);
        this.nMc.push(f);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BuffItem", 20, "AdditionBulletSizeByInstigator.Init", ["子弹ID", h], ["子弹缩放X", i], ["子弹缩放Y", r], ["子弹缩放Z", f]);
        }
      }
    }
  }
  GetBulletSizeScale(t) {
    var e;
    var s = this.oMc.get(t);
    if (s !== undefined && !(s < 0)) {
      if (!(s >= this.nMc.length)) {
        e = this.Buff.StackCount;
        return [this.nMc[s] * e, this.nMc[s + SIZE_SCALE_INDEX_X] * e, this.nMc[s + SIZE_SCALE_INDEX_Y] * e];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BuffItem", 20, "获取到的索引超过了参数数量", ["Buff", this.BuffId], ["参数索引", s], ["参数数量", this.nMc.length], ["子弹ID", t]);
      }
    }
  }
}
exports.AdditionBulletSize = AdditionBulletSize;
const DURATION_SCALE_PARAMS_LEN = 2;
const DURATION_SCALE_INDEX_BULLETROWNAME = 0;
const DURATION_SCALE_INDEX_DURATION = 1;
class AdditionBulletDuration extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.sMc = new Map();
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    var s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i = e[t];
      var r = i.split("#");
      if (r.length < DURATION_SCALE_PARAMS_LEN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BuffItem", 20, "参数数量不足, 需要2个", ["Buff", this.BuffId], ["参数", i], ["参数索引", t], ["参数数量", s]);
        }
      } else {
        i = r[DURATION_SCALE_INDEX_BULLETROWNAME];
        r = Number(r[DURATION_SCALE_INDEX_DURATION]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BuffItem", 20, "AdditionBulletDurationByInstigator.Init", ["子弹ID", i], ["子弹持续时间", r]);
        }
        this.sMc.set(i, Number(r));
      }
    }
  }
  GetBulletDuration(t) {
    return (this.sMc.get(t) ?? 0) * this.Buff.StackCount;
  }
}
exports.AdditionBulletDuration = AdditionBulletDuration;
const INTERVAL_SCALE_PARAMS_LEN = 2;
const INTERVAL_SCALE_INDEX_BULLETROWNAME = 0;
const INTERVAL_SCALE_INDEX_INTERVAL = 1;
class AdditionBulletInterval extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.aMc = new Map();
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    var s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i = e[t];
      var r = i.split("#");
      if (r.length < INTERVAL_SCALE_PARAMS_LEN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BuffItem", 20, "参数数量不足, 需要2个", ["Buff", this.BuffId], ["参数", i], ["参数索引", t], ["参数数量", s]);
        }
      } else {
        i = r[INTERVAL_SCALE_INDEX_BULLETROWNAME];
        r = Number(r[INTERVAL_SCALE_INDEX_INTERVAL]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BuffItem", 20, "AdditionBulletIntervalByInstigator.Init", ["子弹ID", i], ["子弹作用间隔", r]);
        }
        this.aMc.set(i, r);
      }
    }
  }
  GetBulletInterval(t) {
    return (this.aMc.get(t) ?? 0) * this.Buff.StackCount;
  }
}
exports.AdditionBulletInterval = AdditionBulletInterval;
class BuffOverStackCompensation extends ExtraEffectBase_1.BuffEffect {
  OnExecute() {}
}
exports.BuffOverStackCompensation = BuffOverStackCompensation;
class ModifyBuffTimeScale extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.qbu = false;
    this.Gbu = false;
    this.jQo = [];
    this.bge = 1;
    this.OnBuffAdd = (t, e) => {
      this.OwnerBuffComponent?.GetBuffByHandle(e)?.SetBuffTimeScale(this.ActiveHandleId, this.bge);
    };
  }
  InitParameters(t) {
    var t = t.ExtraEffectParameters;
    var e = t[0].split("#").map(t => Number(t));
    this.qbu = e[0] === 1;
    this.Gbu = e[1] === 1;
    this.jQo = t[1].split("#").map(t => Number(t));
    this.bge = Number(t[2]) * 0.0001;
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t) {
      if (this.qbu) {
        for (const s of this.jQo) {
          for (const i of t.GetAllBuffById(s)) {
            i.SetBuffTimeScale(this.ActiveHandleId, this.bge);
          }
        }
      }
      var e = this.OwnerEntity;
      if (this.Gbu && e) {
        for (const r of this.jQo) {
          AbilityEvent_1.AbilityEvent.Add(e, 3, r, this.OnBuffAdd);
        }
      }
    }
  }
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t) {
      for (const s of this.jQo) {
        for (const i of t.GetAllBuffById(s)) {
          i.RemoveBuffTimeScale(this.ActiveHandleId);
        }
      }
      var e = this.OwnerEntity;
      if (this.Gbu && e) {
        for (const r of this.jQo) {
          AbilityEvent_1.AbilityEvent.Remove(e, 3, r, this.OnBuffAdd);
        }
      }
    }
  }
  OnExecute() {}
}
exports.ModifyBuffTimeScale = ModifyBuffTimeScale;
class ForeverTimeScaleEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.Priority = 0;
    this.InitTimeScale = 0;
    this.BuffStackTimeScale = 0;
    this.FrozenComponent = undefined;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.Priority = Number(t[1]);
    this.InitTimeScale = Number(t[2]);
    this.BuffStackTimeScale = Number(t[3]);
    this.FrozenComponent = this.OwnerEntity?.CheckGetComponent(16);
  }
  OnCreated() {
    this.fdu();
  }
  OnStackDecreased(t, e, s) {
    this.fdu();
  }
  OnStackIncreased(t, e, s) {
    this.fdu();
  }
  OnExecute() {}
  OnRemoved() {
    this.FrozenComponent?.RemoveForeverTimeScale(this.ActiveHandleId);
  }
  fdu() {
    var t = this.InitTimeScale + this.BuffStackTimeScale * (this.Buff?.StackCount ?? 1);
    this.FrozenComponent?.SetForeverTimeScale(this.ActiveHandleId, this.Priority, t);
  }
  GetDebugEffectString() {
    return `设置时间膨胀 初始倍率${this.InitTimeScale} + buff层数${this.Buff?.StackCount} * 层数变更系数${this.BuffStackTimeScale}`;
  }
}
exports.ForeverTimeScaleEffect = ForeverTimeScaleEffect;
class SyncTimeScaleEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.Group = undefined;
    this.fye = 0;
    this.T4u = false;
    this.cPm = new Set();
  }
  OnExecute() {}
  OnCreated() {
    if (this.InstigatorEntityId !== this.OwnerEntity.Id && this.InstigatorEntity?.Valid) {
      this.fye = this.OwnerEntity.Id;
      let t = SyncTimeScaleEffect.F7u.get(this.InstigatorEntityId);
      if (!t) {
        t = new SyncTimescaleGroup(this.InstigatorEntity, this.BuffId);
        SyncTimeScaleEffect.F7u.set(this.InstigatorEntityId, t);
      }
      (this.Group = t).AddOwner(this.OwnerEntity);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BuffItem", 20, "顿帧同步效果 OnCreated", ["Buff", this.BuffId], ["Instigator", this.OwnerEntity.Id], ["Owner", this.OwnerEntity.Id], ["Instigator.Valid", !!this.InstigatorEntity?.Valid]);
      }
      this.T4u = true;
    }
  }
  OnRemoved() {
    if (this.Group && !this.T4u) {
      for (const t of this.cPm) {
        this.RemoveTimeScale(t, false);
      }
      this.cPm.clear();
      this.Group.RemoveOwner(this.fye);
      if (this.Group.CanRelease()) {
        this.Group.Release();
        SyncTimeScaleEffect.F7u.delete(this.InstigatorEntityId);
      }
      this.Group = undefined;
    }
  }
  SetTimeScale(t, e, s, i, r, h = false, f = false) {
    if (this.Group?.InstigatorTimeScaleComp?.Valid) {
      t = this.Group.InstigatorTimeScaleComp.SetTimeScale(t, e, s, i, r, h, f);
      this.cPm.add(t);
      return t;
    } else {
      return 0;
    }
  }
  RemoveTimeScale(t, e = true) {
    if (e) {
      this.cPm.delete(t);
    }
    this.Group?.InstigatorTimeScaleComp?.RemoveTimeScale(t);
  }
}
(exports.SyncTimeScaleEffect = SyncTimeScaleEffect).F7u = new Map();
class SyncTimescaleGroup {
  constructor(t, e) {
    this.InstigatorHandle = t;
    this.eHr = e;
    this.N7u = new Map();
    this.InstigatorTimeScaleComp = undefined;
    this.OnInstigatorTimeScaleChanged = (t, e) => {
      for (var [, s] of this.N7u) {
        if (s?.Valid) {
          s.SetForceTimeScale(t, true);
        }
      }
    };
    this.InstigatorTimeScaleComp = this.InstigatorHandle.Entity.GetComponent(188);
    EventSystem_1.EventSystem.AddWithTarget(this.InstigatorHandle.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.OnInstigatorTimeScaleChanged);
  }
  Release() {
    if (this.InstigatorHandle.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.InstigatorHandle.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.OnInstigatorTimeScaleChanged);
    }
  }
  HasOwner(t) {
    return this.N7u.has(t);
  }
  AddOwner(t = undefined) {
    var e;
    if (this.N7u.get(t.Id)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BuffItem", 20, "添加了多个Buff都有85号效果", ["BuffId", this.eHr], ["Instigator", this.InstigatorHandle.Id], ["Owner", t?.Id]);
      }
    } else {
      e = t.GetComponent(188);
      this.N7u.set(t.Id, e);
    }
  }
  GetOwnerInfo() {
    return Array.from(this.N7u.keys()).toString();
  }
  RemoveOwner(t) {
    var e = this.N7u.get(t);
    if (e?.Valid) {
      e.RemoveForceTimeScale(true);
    }
    this.N7u.delete(t);
  }
  CanRelease() {
    return this.N7u.size <= 0;
  }
}
class SpecialEnergyModifier extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.ModifyEnergy = undefined;
    this.Percent = 0;
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    this.ModifyEnergy = new Set(e[0].split("#").map(t => Number(t)));
    this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
  }
  OnExecute(t) {
    if (this.ModifyEnergy && this.ModifyEnergy.has(t)) {
      return this.Percent * (this.Buff?.StackCount ?? 1);
    } else {
      return 0;
    }
  }
  static ApplyEffects(t, e, s, i) {
    t = t?.GetComponent(183)?.BuffEffectManager;
    if (!t) {
      return 0;
    }
    let r = 0;
    for (const h of t.FilterById(87)) {
      if (h.Check(i, e)) {
        r += h.Execute(s);
      }
    }
    return r;
  }
  GetDebugEffectString() {
    if (this.ModifyEnergy) {
      return `结算特殊能量获取系数加成:生效能量ID${[...this.ModifyEnergy]}, 加成系数${this.Percent}`;
    } else {
      return "";
    }
  }
}
exports.SpecialEnergyModifier = SpecialEnergyModifier;
class DynamicModifyBuffStackEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.BuffIds = undefined;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters[0].split("|");
    this.BuffIds = t.map(t => Number(t.split("#")[0]));
  }
  OnExecute() {}
  OnCreated() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t && this.BuffIds) {
      for (const e of this.BuffIds) {
        t.RemoveBuffStackModifier(e, this.ActiveHandleId);
      }
    }
  }
}
exports.DynamicModifyBuffStackEffect = DynamicModifyBuffStackEffect;
class BindBuffToVehicleEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.BuffIds = undefined;
    this.OnEnterVehicle = t => {
      if (t.IsDriver) {
        this.JYf(t.VehicleEntity, "OnEnterVehicle");
      }
    };
    this.OnLeaveVehicle = t => {
      if (t.IsDriver) {
        this.ZYf(t.VehicleEntity, "OnLeaveVehicle");
      }
    };
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.BuffIds = t[0].split("#").map(t => Number(t));
  }
  OnExecute() {}
  OnCreated() {
    var t;
    if (this.CheckAuthority() && (EventSystem_1.EventSystem.AddWithTarget(this.ExactOwnerEntity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle), EventSystem_1.EventSystem.AddWithTarget(this.ExactOwnerEntity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle), t = this.ExactOwnerEntity.GetComponent(242)) && t.IsDriver) {
      this.JYf(t.VehicleEntity, "OnCreated");
    }
  }
  OnRemoved() {
    var t;
    if (this.CheckAuthority() && (EventSystem_1.EventSystem.RemoveWithTarget(this.ExactOwnerEntity, EventDefine_1.EEventName.OnEnterVehicle, this.OnEnterVehicle), EventSystem_1.EventSystem.RemoveWithTarget(this.ExactOwnerEntity, EventDefine_1.EEventName.OnLeaveVehicle, this.OnLeaveVehicle), t = this.ExactOwnerEntity.GetComponent(242)) && t.IsDriver) {
      this.ZYf(t.VehicleEntity, "OnRemoved");
    }
  }
  JYf(t, e, s) {
    var i = this.PendingBuff;
    if (t && i) {
      var r = t.GetComponent(257);
      if (r && this.BuffIds) {
        for (const h of this.BuffIds) {
          r.AddIterativeBuff(h, i, s ?? i.StackCount, false, "BindBuffToVehicle:" + e);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.OwnerEntity, "AddBuffToVehicleInvalid", ["buffId", this.BuffId], ["vehicleEntityValid", !!t], ["buffValid", !!i]);
    }
  }
  ZYf(t, e, s) {
    var i = this.PendingBuff;
    if (t && i) {
      var r = t.GetComponent(257);
      if (r && this.BuffIds) {
        for (const h of this.BuffIds) {
          r.RemoveBuff(h, s ?? -1, "BindBuffToVehicle:" + e, i.MessageId);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.OwnerEntity, "RemoveBindBuffVehicleInvalid", ["buffId", this.BuffId], ["vehicleEntityValid", !!t], ["buffValid", !!i]);
    }
  }
  OnStackDecreased(t, e, s) {
    this.ezf(t, e);
  }
  OnStackIncreased(t, e, s) {
    this.ezf(t, e);
  }
  ezf(t, e) {
    var s;
    if (this.CheckAuthority() && t !== e && (s = this.OwnerEntity?.GetComponent(242)) && s.IsDriver && (s = s.VehicleEntity)) {
      if (e < t) {
        this.JYf(s, "OnStackIncreased", t - e);
      } else {
        this.ZYf(s, "OnStackDecreased", e - t);
      }
    }
  }
  GetDebugEffectString() {
    return "绑定buff到骑乘的载具上" + this.BuffIds;
  }
}
exports.BindBuffToVehicleEffect = BindBuffToVehicleEffect;
//# sourceMappingURL=ExtraEffectMisc.js.map