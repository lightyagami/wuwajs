"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleInstance = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhantomBattleInstance {
  constructor(t) {
    this.xe = 0;
    this.HOi = undefined;
    this.i6i = undefined;
    this.PhantomId = t.MonsterId;
    this.PhantomItem = t;
    this.PhantomSkill = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillList(t.SkillId);
  }
  set PhantomId(t) {
    this.xe = t;
  }
  get PhantomId() {
    return this.xe;
  }
  set PhantomItem(t) {
    this.HOi = t;
  }
  get PhantomItem() {
    return this.HOi;
  }
  set PhantomSkill(t) {
    this.i6i = t;
  }
  get PhantomSkill() {
    return this.i6i;
  }
  GetPhantomSkillId() {
    return this.i6i[0].Id;
  }
  GetPhantomSkillInfoByLevel() {
    if (this.PhantomSkill.length > 0) {
      return this.PhantomSkill[0];
    } else {
      return undefined;
    }
  }
  GetModelZoom() {
    return this.PhantomItem.Zoom;
  }
  GetModelLocation() {
    return this.PhantomItem.Location;
  }
  GetModelRotator() {
    return this.PhantomItem.Rotator;
  }
  GetStandAnim() {
    return this.PhantomItem.StandAnim;
  }
}
exports.PhantomBattleInstance = PhantomBattleInstance;
//# sourceMappingURL=PhantomBattleInstance.js.map