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
    this.Eud = undefined;
    this.Iud = false;
    this.Tud = true;
    this.bud = (t, e) => {
      this.Iud = e;
      if (this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) {
        this.Rud(!e);
      }
    };
    this.xie = (t, e) => {
      var i = this.SpecialSkillComponent.Entity.Id;
      if (t.Entity?.Id === i) {
        if (this.Iud) {
          this.Rud(false);
        }
      } else if (e?.Entity?.Id === i && this.Iud) {
        this.Rud(true);
      }
    };
    this.Jze = () => {
      if (this.Iud) {
        this.Rud(true);
      }
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
      this.Eud = t?.ListenForTagAddOrRemove(1519720150, this.bud);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  OnEnd() {
    if (this.Hte?.IsRoleAndCtrlByMe && this.Iud) {
      this.Rud(true);
    }
    this.Eud?.EndTask();
    this.Eud = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  Rud(t) {
    if (this.Tud !== t) {
      this.Tud = t;
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(12, hideBattleUiChildren, t);
      this.Nce?.SetOnlyAllowFightInput(!t);
    }
  }
}
exports.SpecialSkillAogusita = SpecialSkillAogusita;
//# sourceMappingURL=SpecialSkillAogusita.js.map