"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillAogusita = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const hideBattleUiChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 21, 22, 24];
const PASSIVE_SKILL_ID = 1306666;
const JUMP_FORWARD = 100003;
const JUMP_BACKWARD = 100004;
class SpecialSkillAogusita extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Nce = undefined;
    this.cBe = undefined;
    this.eyd = undefined;
    this.tyd = false;
    this.iyd = true;
    this.ryd = (t, e) => {
      this.tyd = e;
      if (this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) {
        this.oyd(!e);
      }
    };
    this.xie = (t, e) => {
      var i = this.SpecialSkillComponent.Entity.Id;
      if (t.Entity?.Id === i) {
        if (this.tyd) {
          this.oyd(false);
        }
      } else if (e?.Entity?.Id === i) {
        this.oyd(true);
      }
    };
    this.Jze = () => {
      this.oyd(true);
    };
    this.s$d = t => {
      this.cBe.EndSkill(PASSIVE_SKILL_ID, "触发通用QTE，终止奥古斯塔时停被动技能");
    };
    this.tTu = (t, e) => {
      for (const i of this.cBe.GetAllSkillData(2)) {
        if (i === t && ![JUMP_FORWARD, JUMP_BACKWARD].includes(t)) {
          this.cBe.EndSkill(PASSIVE_SKILL_ID, "触发公共技能，终止奥古斯塔时停被动技能");
          return;
        }
      }
    };
  }
  OnStart() {
    var t;
    var e = this.SpecialSkillComponent.Entity;
    this.Hte = e.GetComponent(3);
    this.cBe = e.GetComponent(39);
    if (this.Hte?.IsRoleAndCtrlByMe) {
      this.Nce = e.GetComponent(62);
      t = e.GetComponent(206);
      this.eyd = t?.ListenForTagAddOrRemove(1519720150, this.ryd);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteStart, this.s$d);
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  OnEnd() {
    if (this.Hte?.IsRoleAndCtrlByMe && this.tyd) {
      this.oyd(true);
    }
    this.eyd?.EndTask();
    this.eyd = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteStart, this.s$d)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteStart, this.s$d);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  oyd(t) {
    if (this.iyd !== t) {
      this.iyd = t;
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(12, hideBattleUiChildren, t);
      this.Nce?.SetOnlyAllowFightInput(!t);
    }
  }
}
exports.SpecialSkillAogusita = SpecialSkillAogusita;
//# sourceMappingURL=SpecialSkillAogusita.js.map