"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillLinnai = undefined;
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const SPECIAL_TAG_LISTENER_DA = "/Game/Aki/Character/Role/FemaleM/LinNai/Data/DA_SpecialTagConfig.DA_SpecialTagConfig";
class SpecialSkillLinnai extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.EQf = 0;
    this.RWr = undefined;
    this.Lie = undefined;
    this.IQf = undefined;
    this.qZf = undefined;
    this.TQf = i => {
      return this.RWr?.GetClimbState().攀爬状态 !== 3 || this.RWr?.GetClimbState().攀爬状态 === 3 && this.RWr?.GetClimbState().退出攀爬类型 === 10;
    };
    this.OZf = (i, s) => {
      if (s) {
        this.RWr?.ResetClimbObjectConfig("FemaleLinnaiSpecial");
      } else {
        this.RWr?.ResetClimbObjectConfig("FemaleM");
      }
    };
  }
  OnStart() {
    var i = this.SpecialSkillComponent.Entity;
    this.IQf = i.GetComponent(216);
    this.RWr = i.GetComponent(35);
    this.Lie = i.GetComponent(215);
    this.EQf = this.IQf?.InitTagListenerConfig(SPECIAL_TAG_LISTENER_DA, this.TQf) ?? 0;
    this.qZf = this.Lie?.ListenForTagAddOrRemove(35512583, this.OZf);
  }
  OnEnd() {
    this.IQf?.RemoveTagListenerConfig(this.EQf);
    this.Lie?.RemoveTagAddOrRemoveListener(35512583, this.OZf);
    this.qZf?.EndTask();
    this.qZf = undefined;
  }
}
exports.SpecialSkillLinnai = SpecialSkillLinnai;
//# sourceMappingURL=SpecialSkillLinnai.js.map