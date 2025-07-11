"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBuffEffectData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaBuffEffectData {
  constructor() {
    this.B31 = [];
    this.CardSkillTriggerInfo = undefined;
    this.RoleSkillTriggerInfo = undefined;
  }
  k31(t, e) {
    t = this.NewBuffEffectData(t, e);
    this.B31.push(t);
  }
  PushBuffEffectDataBySkillList(t, e) {
    for (const f of t) {
      this.k31(f, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
  }
  PushBuffEffectDataBySkill(t) {
    this.k31(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
  }
  PushBuffEffectDataByEffectList(t, e) {
    for (const f of t) {
      this.PushBuffEffectDataByEffect(f, e);
    }
  }
  PushBuffEffectDataByEffect(t, e) {
    t = {
      SourceFightId: t.sC1,
      SkillId: t._C1,
      SelectFightIdList: t.hC1,
      Effect: t.lC1,
      NotifyId: e
    };
    this.B31.push(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
  }
  PushBuffEffectDataByNpc(t, e, f) {
    t = {
      SourceFightId: t,
      SkillId: e.r5n,
      SelectFightIdList: e.hC1,
      Effect: e.lC1,
      NotifyId: f
    };
    this.B31.push(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
  }
  PopBuffEffectData() {
    return this.B31.shift();
  }
  SetCardSkillTriggerInfo(t, e, f, i, s) {
    this.CardSkillTriggerInfo = {
      InteractType: t,
      SelectFightIdList: e,
      SelectNum: f,
      DataId: i,
      IsRole: false,
      IsPassive: false,
      LastCardIndex: s
    };
  }
  SetRoleSkillTriggerInfo(t, e, f, i) {
    this.RoleSkillTriggerInfo = {
      InteractType: t,
      SelectFightIdList: e,
      SelectNum: f,
      DataId: i,
      IsRole: true,
      IsPassive: false,
      LastCardIndex: PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    };
  }
  NewBuffEffectData(t, e) {
    return {
      SourceFightId: t.sC1,
      SkillId: t.r5n,
      SelectFightIdList: t.hC1,
      Effect: t.lC1,
      NotifyId: e
    };
  }
}
exports.PhantomArenaBuffEffectData = PhantomArenaBuffEffectData;
//# sourceMappingURL=PhantomArenaBuffEffectData.js.map