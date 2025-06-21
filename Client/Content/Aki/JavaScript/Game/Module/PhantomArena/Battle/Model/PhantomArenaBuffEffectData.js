"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBuffEffectData = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaBuffEffectData {
  constructor() {
    this.r31 = [], this.CardSkillTriggerInfo = void 0, this.RoleSkillTriggerInfo = void 0
  }
  o31(t, e) {
    t = this.NewBuffEffectData(t, e);
    this.r31.push(t)
  }
  PushBuffEffectDataBySkillList(t, e) {
    for (const f of t) this.o31(f, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect)
  }
  PushBuffEffectDataBySkill(t) {
    this.o31(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect)
  }
  PushBuffEffectDataByEffectList(t, e) {
    for (const f of t) this.PushBuffEffectDataByEffect(f, e)
  }
  PushBuffEffectDataByEffect(t, e) {
    t = {
      SourceFightId: t.Og1,
      SkillId: t.Ng1,
      SelectFightIdList: t.Gg1,
      Effect: t.Fg1,
      NotifyId: e
    };
    this.r31.push(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect)
  }
  PushBuffEffectDataByNpc(t, e, f) {
    t = {
      SourceFightId: t,
      SkillId: e.r5n,
      SelectFightIdList: e.Gg1,
      Effect: e.Fg1,
      NotifyId: f
    };
    this.r31.push(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect)
  }
  PopBuffEffectData() {
    return this.r31.shift()
  }
  SetCardSkillTriggerInfo(t, e, f, i, s) {
    this.CardSkillTriggerInfo = {
      InteractType: t,
      SelectFightIdList: e,
      SelectNum: f,
      DataId: i,
      IsRole: !1,
      IsPassive: !1,
      LastCardIndex: s
    }
  }
  SetRoleSkillTriggerInfo(t, e, f, i) {
    this.RoleSkillTriggerInfo = {
      InteractType: t,
      SelectFightIdList: e,
      SelectNum: f,
      DataId: i,
      IsRole: !0,
      IsPassive: !1,
      LastCardIndex: PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    }
  }
  NewBuffEffectData(t, e) {
    return {
      SourceFightId: t.Og1,
      SkillId: t.r5n,
      SelectFightIdList: t.Gg1,
      Effect: t.Fg1,
      NotifyId: e
    }
  }
}
exports.PhantomArenaBuffEffectData = PhantomArenaBuffEffectData;
//# sourceMappingURL=PhantomArenaBuffEffectData.js.map