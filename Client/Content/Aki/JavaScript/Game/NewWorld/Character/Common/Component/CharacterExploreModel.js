"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterExploreModel = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
class CharacterExploreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.ManipulateFound = !1, this.ManipulateEntity = void 0, this.ManipulateActorComp = void 0, this.LastManipulateTriggerId = 0, this.CurManipulateTriggerId = 0, this.HookFound = !1, this.HookEntity = void 0, this.LastHookTriggerId = 0, this.CurHookTriggerId = 0, this.AutoResetSkillFinished = !0, this.FAc = new Array(3).fill(0), this.NAc = 1001, this.VAc = 0
  }
  jAc(e) {
    if (void 0 !== e) this.VAc = 0 === e ? this.NAc : e;
    else {
      let t = this.NAc;
      for (let e = 2; 0 <= e; e--)
        if (0 !== this.FAc[e]) {
          t = this.FAc[e], this.VAc = t;
          break
        } this.VAc = t
    }
  }
  HAc(e, t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 79, "[CharacterExploreModel] DoSetExploreSkillId", ["skillId", e], ["layer", t], ["DefaultExploreSkillId", this.NAc], ["ExploreSkillIdLayerData", this.FAc])
  }
  SetDefaultExploreSkillId(e) {
    this.NAc = e, this.$Ac(e)
  }
  GetTopLayerExplodeSkillId() {
    return this.VAc
  }
  $Ac(e, t = 0) {
    if (this.FAc[t] = e, 0 !== t) this.HAc(e, t), this.jAc();
    else {
      for (let e = 2; 0 < e; e--) this.FAc[e] = 0;
      this.HAc(e, t), this.jAc(e)
    }
  }
  SetExploreSkillId(e, t = 0) {
    return this.$Ac(e, t), !!this.ExistHigherLayerSkill(t)
  }
  ResetExplodeSkillId(e = 0) {
    this.$Ac(0, e)
  }
  ExistAutoLayerSkill() {
    return 0 !== this.FAc[2]
  }
  ExistHigherLayerSkill(t) {
    for (let e = t + 1; e < 3; e++)
      if (0 !== this.FAc[e]) return !0;
    return !1
  }
}
exports.CharacterExploreModel = CharacterExploreModel;
//# sourceMappingURL=CharacterExploreModel.js.map