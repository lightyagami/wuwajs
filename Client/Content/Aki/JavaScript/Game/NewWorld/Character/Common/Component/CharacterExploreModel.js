"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterExploreModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
class CharacterExploreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ManipulateFound = false;
    this.ManipulateEntity = undefined;
    this.ManipulateActorComp = undefined;
    this.LastManipulateTriggerId = 0;
    this.CurManipulateTriggerId = 0;
    this.HookFound = false;
    this.HookEntity = undefined;
    this.LastHookTriggerId = 0;
    this.CurHookTriggerId = 0;
    this.AutoResetSkillFinished = true;
    this.FAc = new Array(3).fill(0);
    this.NAc = 1001;
    this.VAc = 0;
  }
  jAc(e) {
    if (e !== undefined) {
      this.VAc = e === 0 ? this.NAc : e;
    } else {
      let t = this.NAc;
      for (let e = 2; e >= 0; e--) {
        if (this.FAc[e] !== 0) {
          t = this.FAc[e];
          this.VAc = t;
          break;
        }
      }
      this.VAc = t;
    }
  }
  HAc(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[CharacterExploreModel] DoSetExploreSkillId", ["skillId", e], ["layer", t], ["DefaultExploreSkillId", this.NAc], ["ExploreSkillIdLayerData", this.FAc]);
    }
  }
  SetDefaultExploreSkillId(e) {
    this.NAc = e;
    this.$Ac(e);
  }
  GetTopLayerExplodeSkillId() {
    return this.VAc;
  }
  $Ac(e, t = 0) {
    this.FAc[t] = e;
    if (t !== 0) {
      this.HAc(e, t);
      this.jAc();
    } else {
      for (let e = 2; e > 0; e--) {
        this.FAc[e] = 0;
      }
      this.HAc(e, t);
      this.jAc(e);
    }
  }
  SetExploreSkillId(e, t = 0) {
    this.$Ac(e, t);
  }
  ResetExplodeSkillId(e = 0) {
    this.$Ac(0, e);
  }
  ExistAutoLayerSkill() {
    return this.FAc[2] !== 0;
  }
  CheckNeedChangeSkill(e, t) {
    if (this.FAc[t] === e || this.VAc === e) {
      return false;
    }
    for (let e = t + 1; e < 3; e++) {
      if (this.FAc[e] !== 0) {
        return false;
      }
    }
    return true;
  }
}
exports.CharacterExploreModel = CharacterExploreModel;
//# sourceMappingURL=CharacterExploreModel.js.map