"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeConvert = exports.AttributeEventEffects = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AttributeEventEffects extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.GoalType = 0;
    this.Ids = [];
    this.Times = undefined;
    this.KQo = undefined;
    this.QQo = undefined;
    this.XQo = false;
    this.jht = false;
    this.$Qo = new Array();
    this.YQo = 0;
    this._yo = (t, i, e) => {
      var s = this.jht;
      this.jht = this.KQo.CheckListenActiveness(i, this.QQo);
      if (s !== this.jht) {
        if (this.jht) {
          this.TryExecute({}, this.OwnerBuffComponent);
        } else {
          this.zQo();
        }
      }
    };
  }
  InitParameters(t) {
    var i = t.ExtraEffectParameters;
    var e = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    var s = this.Level;
    var h = Number(i[0]);
    var r = Number(i[1]) === 1;
    var e = AbilityUtils_1.AbilityUtils.GetLevelValue(e, s, -1);
    var t = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, -1);
    this.KQo = new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(h, e, t, r);
    this.GoalType = Number(i[2]);
    this.Ids = i[3].split("#").map(t => Number(t));
    this.XQo = Number(i[4] ?? 0) === 1;
    if (Number(i[5] ?? 0) === 1) {
      this.YQo = 2;
    } else {
      this.YQo = 0;
    }
    if (Number(i[6] ?? 0) === 1) {
      this.TargetType = 2;
    } else {
      this.TargetType = 0;
    }
  }
  OnCreated() {
    var t = this.JQo();
    if (t) {
      this.QQo = t.GetComponent(177);
      if (this.KQo.IsPerTenThousand && this.KQo.MaxAttributeId === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 19, "Buff额外效果6 监听属性变化到特定区间，基于相对最大值的万分比，但是监听的属性没有对应的最大值属性，该效果无效", ["buff Id", this.BuffId], ["属性Id", this.KQo.ListenAttributeId]);
        }
      } else {
        t = this.QQo.GetCurrentValue(this.KQo.ListenAttributeId);
        this._yo(this.KQo.ListenAttributeId, t, t);
        this.QQo.AddListener(this.KQo.ListenAttributeId, this._yo, "ExtraEffectAttributeEvent");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "Invalid listen target when add extra effect attribute event", ["handle", this.ActiveHandleId], ["instigator id", this.InstigatorEntityId], ["instigator name", this.InstigatorBuffComponent?.ActorComponent?.Owner?.GetName()], ["owner id", this.OwnerEntity?.Id], ["owner name", this.OwnerBuffComponent?.GetActorComponent()?.Owner?.GetName()], ["listen type", this.YQo]);
    }
  }
  OnRemoved() {
    this.QQo?.RemoveListener(this.KQo.ListenAttributeId, this._yo);
  }
  CheckExecutable() {
    return !!this.OwnerBuffComponent?.HasBuffAuthority();
  }
  OnExecute() {
    if (this.jht) {
      switch (this.GoalType) {
        case 1:
          this.ExecuteAddBullet();
          break;
        case 0:
          this.ExecuteAddBuffs();
      }
    }
  }
  JQo() {
    if (this.YQo !== 2) {
      return this.OwnerEntity;
    } else {
      return this.InstigatorEntity?.Entity;
    }
  }
  GetEffectTarget() {
    if (this.TargetType !== 2) {
      return this.OwnerBuffComponent;
    } else {
      return this.InstigatorBuffComponent;
    }
  }
  zQo() {
    if (this.GoalType === 0) {
      if (this.XQo) {
        for (const t of this.$Qo) {
          this.GetEffectTarget()?.RemoveBuffByHandle(t, -1, `因为其它buff属性监听额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`);
        }
      }
      this.$Qo.length = 0;
    }
  }
  ExecuteAddBuffs() {
    var i = this.GetEffectTarget();
    if (this.CheckExecutable() && i) {
      for (let t = 0; t < this.Ids.length; t++) {
        var e = this.Ids[t];
        var s = AbilityUtils_1.AbilityUtils.GetArrayValue(this.Times, t, ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BUFF_ADD_TIMES);
        var e = i.AddBuffLocal(e, {
          InstigatorId: this.InstigatorBuffComponent.CreatureDataId,
          Level: this.Level,
          OuterStackCount: s,
          PreMessageId: this.Buff.MessageId,
          ServerId: this.ServerId,
          Reason: `因为其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`
        });
        if (this.XQo && e > 0) {
          this.$Qo.push(e);
        }
      }
    }
  }
  ExecuteAddBullet() {
    var t = this.GetEffectTarget().GetActorComponent();
    var i = t?.ActorTransform;
    var e = this.InstigatorEntity;
    var s = t?.Entity;
    if (i && e && s) {
      for (let t = 0; t < this.Ids.length; t++) {
        var h = String(this.Ids[t]);
        var r = AbilityUtils_1.AbilityUtils.GetArrayValue(this.Times, t, ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES);
        var a = this.Buff.MessageId;
        for (let t = 0; t < r; t++) {
          BulletController_1.BulletController.CreateBulletCustomTarget(s, h, i, {
            SyncType: 1,
            CreateOnAuthority: false
          }, a);
        }
      }
    }
  }
}
exports.AttributeEventEffects = AttributeEventEffects;
class AttributeConvert extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.xul = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.Pul = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.wul = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.Bul = false;
    this.bul = 2;
    this.qul = false;
    this.dBi = 0;
    this.yB = 0;
    this._yo = (t, i, e) => {
      if (this.OwnerBuffComponent) {
        i -= e;
        if ((this.bul !== 1 || !(i <= 0)) && (this.bul !== 0 || !(i >= 0))) {
          this.TryExecute({}, this.OwnerBuffComponent, i);
        }
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.OwnerEntity, "属性转换额外效果没有找到buff组件", ["handle", this.ActiveHandleId], ["buff Id", this.BuffId]);
      }
    };
  }
  InitParameters(t) {
    var i;
    var e = t.ExtraEffectParameters;
    var s = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    var h = this.Level;
    this.xul = Number(e[0]);
    this.wul = Number(e[1]);
    this.Bul = Number(e[2]) === 1;
    if (this.Bul) {
      if (i = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.xul)) {
        this.Pul = i;
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.OwnerEntity, "属性转换额外效果监听属性为万分比时，监听属性没有对应的最大值属性", ["handle", this.ActiveHandleId], ["buff Id", this.BuffId], ["instigator id", this.InstigatorEntityId], ["属性Id", this.xul]);
      }
    }
    this.bul = Number(e[3]);
    this.qul = Number(e[4]) === 1;
    this.dBi = AbilityUtils_1.AbilityUtils.GetLevelValue(s, h, -1) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    this.yB = AbilityUtils_1.AbilityUtils.GetLevelValue(t, h, -1);
  }
  OnCreated() {
    var t = this.ExactOwnerEntity?.GetComponent(177);
    if (t) {
      if (!this.Bul || this.Pul !== CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None) {
        t.AddListener(this.xul, this._yo, "ExtraEffectAttributeEvent");
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.OwnerEntity, "Invalid listen target when add extra effect attribute event", ["handle", this.ActiveHandleId], ["buff Id", this.BuffId], ["instigator id", this.InstigatorEntityId]);
    }
  }
  OnRemoved() {
    this.OwnerEntity?.GetComponent(176)?.RemoveListener(this.xul, this._yo);
  }
  OnExecute(i) {
    var e = this.OwnerEntity?.GetComponent(176);
    if (e) {
      let t = this.qul ? Math.abs(i) : i;
      if (this.Bul) {
        t = t / e.GetCurrentValue(this.Pul) * CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      }
      i = this.dBi * t + this.yB;
      e.AddBaseValue(this.wul, i);
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.OwnerEntity, "属性转换额外效果没有找到属性组件", ["handle", this.ActiveHandleId], ["buff Id", this.BuffId]);
    }
  }
}
exports.AttributeConvert = AttributeConvert;
//# sourceMappingURL=ExtraEffectAttributeEvent.js.map