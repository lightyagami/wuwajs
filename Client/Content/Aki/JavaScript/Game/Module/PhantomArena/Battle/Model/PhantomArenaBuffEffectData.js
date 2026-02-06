"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBuffEffectData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class PhantomArenaBuffEffectData {
  constructor() {
    this.B31 = [];
    this.CardSkillTriggerInfo = undefined;
    this.RoleSkillTriggerInfo = undefined;
  }
  k31(t, e) {
    t = this.NewBuffEffectData(t, e);
    this.VPg(t);
  }
  VPg(t) {
    this.B31.push(t);
    this.HPg(t);
  }
  HPg(t) {
    if (t.Effect?.Xof && (t = t.Effect.Xof).nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.AddWaitReconstructCardIdList(t.$g1);
    }
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
  wBm(t, e) {
    t = {
      SourceFightId: t.sC1,
      SkillId: t._C1,
      SelectFightIdList: t.hC1,
      Effect: t.lC1,
      NotifyId: e
    };
    this.VPg(t);
  }
  PushBuffEffectDataByEffectList(t, e) {
    for (const f of t) {
      this.wBm(f, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
  }
  PushBuffEffectDataByNpc(t, e, f, i) {
    t = {
      SourceFightId: t,
      SkillId: e.r5n,
      SelectFightIdList: e.hC1,
      Effect: e.lC1,
      NotifyId: f
    };
    this.VPg(t);
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaTriggerSkillEffect);
    }
  }
  PopBuffEffectData() {
    return this.B31.shift();
  }
  SetCardSkillTriggerInfo(t, e, f, i, s, a, r) {
    this.CardSkillTriggerInfo = {
      InteractType: t,
      SelectFightIdList: e,
      SelectNum: f,
      SkillId: a,
      DataId: i,
      IsRole: false,
      IsPassive: false,
      IsFight: s,
      IsClickInteract: r
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
      IsFight: false,
      IsClickInteract: false
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