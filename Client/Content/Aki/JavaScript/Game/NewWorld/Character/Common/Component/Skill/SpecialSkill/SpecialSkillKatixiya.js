"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillKatixiya = undefined;
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const SpecialSkillMorphBase_1 = require("./SpecialSkillMorphBase");
const UPDATE_MATERIAL_DELAY = 500;
class SpecialSkillKatixiya extends SpecialSkillMorphBase_1.SpecialSkillMorphBase {
  constructor() {
    super(...arguments);
    this.yqu = undefined;
    this.wqu = undefined;
    this.OnCharacterMorphTypeChanged = (e, i, t) => {
      if (i === 0 && this.ActorComp?.IsRoleAndCtrlByMe) {
        this.jm();
        this.wqu = TimerSystem_1.TimerSystem.Delay(() => {
          this.yqu?.RefreshStarScarMaterial();
          this.wqu = undefined;
        }, UPDATE_MATERIAL_DELAY);
      }
      this.RefreshNoUpdateMeshes(i);
    };
    this.G5u = (e, i, t) => {
      if (this.ActorComp?.IsRoleAndCtrlByMe && (this.F5u(), this.ActorComp.Actor.DitherEffectController?.CurrentDitherValue !== 1)) {
        this.ActorComp.Actor.CharRenderingComponent?.SetDitherEffect(1, 1);
      }
    };
  }
  get MorphBuffsConfigKey() {
    return "KatixiyaMorphBuffs";
  }
  get MorphCueIdConfigKey() {
    return "KatixiyaMorphCues";
  }
  get ResetMorphSkillsConfigKey() {
    return "KatixiyaResetMorphSkills";
  }
  get NotResetMorphSkillsConfigKey() {
    return "KatixiyaNotResetMorphSkills";
  }
  get ChangeRoleResetMorphTagsConfigKey() {
    return "KatixiyaChangeRoleResetMorphTags";
  }
  get Morph0SubMeshConfigKey() {
    return "KatixiyaMorph0SubMeshList";
  }
  get Morph1SubMeshConfigKey() {
    return "KatixiyaMorph1SubMeshList";
  }
  OnStart() {
    super.OnStart();
    var e = this.SpecialSkillComponent.Entity;
    this.yqu = e.GetComponent(100);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
  }
  OnEnd() {
    super.OnEnd();
    var e = this.SpecialSkillComponent.Entity;
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
    this.jm();
  }
  jm() {
    if (this.wqu) {
      TimerSystem_1.TimerSystem.Remove(this.wqu);
      this.wqu = undefined;
    }
  }
  F5u() {
    var e = this.SkillComp?.CurrentSkill;
    if (e) {
      e = e.GetLoadedMontages();
      if (e) {
        var i = this.AnimComp?.MainAnimInstance;
        if (i) {
          for (const t of e) {
            if (i.Montage_IsPlaying(t)) {
              this.SkillComp?.StopGroup1Skill("形态变化时存在正在播放的技能动画");
              break;
            }
          }
        }
      }
    }
  }
}
exports.SpecialSkillKatixiya = SpecialSkillKatixiya;
//# sourceMappingURL=SpecialSkillKatixiya.js.map