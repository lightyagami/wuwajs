"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectBuffTransfer = undefined;
const Time_1 = require("../../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBuffTransfer extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.BuffIds = [];
    this.RecordDuration = 0;
    this.EffectInternal = 0;
    this.BuffTransferRecords = [];
    this.KillRecord = undefined;
    this.NextExecutionTime = -1;
    this.RecordValidTime = -1;
    this.BuffStack = [];
    this.OnEvent = (e, t, i, s) => {
      if (i.SkillMessageId && i.BulletMessageId) {
        t = t.GetComponent(209);
        if (t) {
          var r = this.BuffTransferRecords.findIndex(e => e.RecordSkillMessageId === i.SkillMessageId);
          var f = this.BuffTransferRecords.findIndex(e => e.TargetSkillMessageId === i.SkillMessageId);
          if (r === -1) {
            if (f === -1) {
              if (!this.KillRecord || Time_1.Time.FlowTime > this.RecordValidTime) {
                if (!(this.NextExecutionTime > Time_1.Time.FlowTime) && s.IsTargetKilled && this.GetBuffStack(t)) {
                  this.KillRecord = {
                    BulletMessageId: i.BulletMessageId,
                    RecordSkillMessageId: i.SkillMessageId,
                    BuffStack: [...this.BuffStack],
                    TargetSkillMessageId: 0n,
                    TransferEntity: new Set()
                  };
                  this.RecordValidTime = Time_1.Time.FlowTime + this.RecordDuration;
                  return;
                } else {
                  return undefined;
                }
              } else {
                if (this.KillRecord.RecordSkillMessageId === i.SkillMessageId && this.KillRecord.BulletMessageId === i.BulletMessageId) {
                  if (s.IsTargetKilled) {
                    this.UpdateMaxBuffStack(t, this.KillRecord);
                  }
                } else {
                  this.AddBuff(t, this.KillRecord);
                  this.NextExecutionTime = Time_1.Time.FlowTime + this.EffectInternal;
                  this.KillRecord.TargetSkillMessageId = i.SkillMessageId;
                  this.BuffTransferRecords.push(this.KillRecord);
                  this.KillRecord = undefined;
                  if (this.BuffTransferRecords.length > ExtraEffectBuffTransfer.MaxRecordCount) {
                    this.BuffTransferRecords.shift();
                  }
                }
                return;
              }
            }
            this.AddBuff(t, this.BuffTransferRecords[f]);
          }
        }
      }
    };
  }
  InitParameters(e) {
    this.BuffIds = e.ExtraEffectParameters[0].split("#").map(e => Number(e));
    this.RecordDuration = Number(e.ExtraEffectParameters[1]) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.EffectInternal = Number(e.ExtraEffectParameters[2]) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  OnCreated() {
    var e = this.OwnerEntity;
    if (e && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
  AddBuff(e, t) {
    var i = t.BuffStack;
    if (!t.TransferEntity.has(e.Entity.Id)) {
      for (var [s, r] of this.BuffIds.entries()) {
        if (i[s] > 0) {
          e.AddIterativeBuff(r, this.Buff, i[s], true, "buff的82额外效果:Buff转移");
        }
      }
      t.TransferEntity.add(e.Entity.Id);
    }
  }
  GetBuffStack(e) {
    let t = false;
    for (var [i, s] of this.BuffIds.entries()) {
      s = e.GetBuffTotalStackById(s);
      t = t || s > 0;
      this.BuffStack[i] = s;
    }
    return t;
  }
  UpdateMaxBuffStack(e, t) {
    var i;
    var s;
    var r = t.BuffStack;
    for ([i, s] of this.BuffIds.entries()) {
      var f = e.GetBuffTotalStackById(s);
      if (f > r[i]) {
        r[i] = f;
      }
    }
  }
  OnRemoved(e) {
    var t = this.OwnerEntity;
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
  OnExecute() {}
}
(exports.ExtraEffectBuffTransfer = ExtraEffectBuffTransfer).MaxRecordCount = 5;
//# sourceMappingURL=ExtraEffectBuffTransfer.js.map