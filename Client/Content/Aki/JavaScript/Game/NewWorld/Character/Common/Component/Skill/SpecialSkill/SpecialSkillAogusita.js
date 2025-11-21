"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillAogusita = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
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
    this.SMd = undefined;
    this.MMd = false;
    this.EMd = true;
    this.IMd = (e, t) => {
      this.MMd = t;
      if (this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) {
        this.TMd(!t);
      }
    };
    this.xie = (e, t) => {
      var i = this.SpecialSkillComponent.Entity.Id;
      if (e.Entity?.Id === i) {
        if (this.MMd) {
          this.TMd(false);
        }
      } else if (t?.Entity?.Id === i) {
        this.TMd(true);
      }
    };
    this.Jze = () => {
      this.TMd(true);
    };
    this.Eim = e => {
      this.cBe.EndSkill(PASSIVE_SKILL_ID, "触发通用QTE，终止奥古斯塔时停被动技能");
    };
    this.tTu = (e, t) => {
      if (ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames().includes(e.toString()) && ![JUMP_FORWARD, JUMP_BACKWARD].includes(e)) {
        this.cBe.EndSkill(PASSIVE_SKILL_ID, "触发公共技能，终止奥古斯塔时停被动技能");
      }
    };
  }
  OnStart() {
    var e;
    var t = this.SpecialSkillComponent.Entity;
    this.Hte = t.GetComponent(3);
    this.cBe = t.GetComponent(39);
    if (this.Hte?.IsRoleAndCtrlByMe) {
      this.Nce = t.GetComponent(62);
      e = t.GetComponent(209);
      this.SMd = e?.ListenForTagAddOrRemove(1519720150, this.IMd);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteStart, this.Eim);
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  OnEnd() {
    if (this.Hte?.IsRoleAndCtrlByMe && this.MMd) {
      this.TMd(true);
    }
    this.SMd?.EndTask();
    this.SMd = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteStart, this.Eim)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteStart, this.Eim);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
  }
  TMd(e) {
    if (this.EMd !== e) {
      this.EMd = e;
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(12, hideBattleUiChildren, e);
      this.Nce?.SetOnlyAllowFightInput(!e);
    }
  }
}
exports.SpecialSkillAogusita = SpecialSkillAogusita;
//# sourceMappingURL=SpecialSkillAogusita.js.map