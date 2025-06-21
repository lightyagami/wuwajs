"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ExtraEffectBuffTransfer = void 0;
const Time_1 = require("../../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBuffTransfer extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), this.BuffIds = [], this.RecordDuration = 0, this.EffectInternal = 0, this.BuffTransferRecords = [], this.KillRecord = void 0, this.NextExecutionTime = -1, this.RecordValidTime = -1, this.BuffStack = [], this.OnEvent = (e, t, i, s) => {
      if (i.SkillMessageId && i.BulletMessageId) {
        t = t.GetComponent(209);
        if (t) {
          var r = this.BuffTransferRecords.findIndex(e => e.RecordSkillMessageId === i.SkillMessageId),
            f = this.BuffTransferRecords.findIndex(e => e.TargetSkillMessageId === i.SkillMessageId);
          if (-1 === r) {
            if (-1 === f) return !this.KillRecord || Time_1.Time.FlowTime > this.RecordValidTime ? !(this.NextExecutionTime > Time_1.Time.FlowTime) && s.IsTargetKilled && this.GetBuffStack(t) ? (this.KillRecord = {
              BulletMessageId: i.BulletMessageId,
              RecordSkillMessageId: i.SkillMessageId,
              BuffStack: [...this.BuffStack],
              TargetSkillMessageId: 0n
            }, void(this.RecordValidTime = Time_1.Time.FlowTime + this.RecordDuration)) : void 0 : void(this.KillRecord.RecordSkillMessageId === i.SkillMessageId && this.KillRecord.BulletMessageId === i.BulletMessageId ? s.IsTargetKilled && this.UpdateMaxBuffStack(t, this.KillRecord) : (this.AddBuff(t, this.KillRecord), this.NextExecutionTime = Time_1.Time.FlowTime + this.EffectInternal, this.KillRecord.TargetSkillMessageId = i.SkillMessageId, this.BuffTransferRecords.push(this.KillRecord), this.KillRecord = void 0, this.BuffTransferRecords.length > ExtraEffectBuffTransfer.MaxRecordCount && this.BuffTransferRecords.shift()));
            this.AddBuff(t, this.BuffTransferRecords[f])
          }
        }
      }
    }
  }
  InitParameters(e) {
    this.BuffIds = e.ExtraEffectParameters[0].split("#").map(e => Number(e)), this.RecordDuration = Number(e.ExtraEffectParameters[1]) * CommonDefine_1.MILLIONSECOND_PER_SECOND, this.EffectInternal = Number(e.ExtraEffectParameters[2]) * CommonDefine_1.MILLIONSECOND_PER_SECOND
  }
  OnCreated() {
    var e = this.OwnerEntity;
    e && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharDamage, this.OnEvent) && EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharDamage, this.OnEvent)
  }
  AddBuff(e, t) {
    var i, s, r = t.BuffStack;
    for ([i, s] of this.BuffIds.entries()) 0 < r[i] && e.AddIterativeBuff(s, this.Buff, r[i], !0, "buff的82额外效果:Buff转移")
  }
  GetBuffStack(e) {
    let t = !1;
    for (var [i, s] of this.BuffIds.entries()) {
      s = e.GetBuffTotalStackById(s);
      t = t || 0 < s, this.BuffStack[i] = s
    }
    return t
  }
  UpdateMaxBuffStack(e, t) {
    var i, s, r = t.BuffStack;
    for ([i, s] of this.BuffIds.entries()) {
      var f = e.GetBuffTotalStackById(s);
      f > r[i] && (r[i] = f)
    }
  }
  OnRemoved(e) {
    var t = this.OwnerEntity;
    t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)
  }
  OnExecute() {}
}(exports.ExtraEffectBuffTransfer = ExtraEffectBuffTransfer).MaxRecordCount = 5;
//# sourceMappingURL=ExtraEffectBuffTransfer.js.map