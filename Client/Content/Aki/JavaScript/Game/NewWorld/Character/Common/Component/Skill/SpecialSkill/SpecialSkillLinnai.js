"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillLinnai = undefined;
const Time_1 = require("../../../../../../../Core/Common/Time");
const CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const JUMP_DELAY_TIME = 500;
const JUMP_EXIT_CLIMB_DELAY_TIME = 800;
const SPECIAL_TAG_LISTENER_DA = "/Game/Aki/Character/Role/FemaleM/LinNai/Data/DA_SpecialTagConfig.DA_SpecialTagConfig";
class SpecialSkillLinnai extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Vsg = 0;
    this.RWr = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.rJo = undefined;
    this.Hsg = undefined;
    this.VSg = undefined;
    this.jsg = i => {
      var t = this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      var e = this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air;
      var s = this.Gce?.LastJumpTime ?? 0;
      var s = this.Gce?.IsJump || Time_1.Time.PlayerWorldTime - s < JUMP_DELAY_TIME;
      var t = (e || t) && s;
      var s = this.RWr?.LastExitClimbType === 4 && Time_1.Time.PlayerWorldTime - (this.RWr?.LastExitClimbTime ?? 0) < JUMP_EXIT_CLIMB_DELAY_TIME;
      var e = e && s;
      var s = this.RWr?.GetClimbState?.();
      var s = s?.攀爬状态 !== 3 || s?.退出攀爬类型 === 10;
      return !t && s && !e;
    };
    this.HSg = (i, t) => {
      if (t) {
        this.RWr?.ResetClimbObjectConfig("FemaleLinnaiSpecial");
      } else {
        this.RWr?.ResetClimbObjectConfig("FemaleM");
      }
    };
  }
  OnStart() {
    var i = this.SpecialSkillComponent.Entity;
    this.Gce = i.GetComponent(189);
    this.Hsg = i.GetComponent(218);
    this.RWr = i.GetComponent(36);
    this.Lie = i.GetComponent(217);
    this.rJo = i.GetComponent(111);
    this.Vsg = this.Hsg?.InitTagListenerConfig(SPECIAL_TAG_LISTENER_DA, this.jsg) ?? 0;
    this.VSg = this.Lie?.ListenForTagAddOrRemove(35512583, this.HSg);
  }
  OnEnd() {
    this.Hsg?.RemoveTagListenerConfig(this.Vsg);
    this.Lie?.RemoveTagAddOrRemoveListener(35512583, this.HSg);
    this.VSg?.EndTask();
    this.VSg = undefined;
  }
}
exports.SpecialSkillLinnai = SpecialSkillLinnai;
//# sourceMappingURL=SpecialSkillLinnai.js.map