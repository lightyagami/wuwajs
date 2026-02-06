"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterExploreModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const Global_1 = require("../../../../Global");
class CharacterExploreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Cvg = new Set();
    this.AutoResetSkillFinishedInternal = true;
    this.FAc = new Array(4).fill(0);
    this.NAc = 1001;
    this.VAc = 0;
  }
  GetActiveExploreComponent() {
    if (this.Cvg.size === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[CharacterExploreModel] 当前没有激活的探索组件");
      }
    } else {
      if (this.Cvg.size > 1 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[CharacterExploreModel] 同时存在多个激活的探索组件,", ["数量", this.Cvg.size]);
      }
      for (const e of this.Cvg) {
        if (e.Valid) {
          return e;
        }
      }
    }
  }
  RegisterExploreComponent(e) {
    this.Cvg.add(e);
  }
  UnregisterExploreComponent(e) {
    if (!e.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 79, "[CharacterExploreModel] 注销探索组件时组件已失效", ["EntityId", e.Entity.Id]);
      }
    }
    this.Cvg.delete(e);
  }
  get AutoResetSkillFinished() {
    return this.AutoResetSkillFinishedInternal;
  }
  set AutoResetSkillFinished(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[CharacterExploreModel] AutoResetSkillFinished Changed", ["OldValue", this.AutoResetSkillFinishedInternal], ["NewValue", e]);
    }
    this.AutoResetSkillFinishedInternal = e;
  }
  get IsPlayerDrivingMotorcycle() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!e && !!(e = e.Entity.CheckGetComponent(242)) && e.VehicleType === "Motorcycle";
  }
  jAc(e) {
    if (e !== undefined) {
      this.VAc = e === 0 ? this.NAc : e;
    } else {
      let t = this.NAc;
      for (let e = 3; e >= 0; e--) {
        if (this.FAc[e] !== 0) {
          t = this.FAc[e];
          this.VAc = t;
          break;
        }
      }
      this.VAc = t;
    }
  }
  HAc(e, t, r) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[CharacterExploreModel] DoSetExploreSkillId", ["SkillId", e], ["Layer", t], ["Reason", r], ["DefaultExploreSkillId", this.NAc], ["ExploreSkillIdLayerData", this.FAc]);
    }
  }
  SetDefaultExploreSkillId(e) {
    this.NAc = e;
    this.$Ac(e, 0, "SetDefaultExploreSkillId");
  }
  GetTopLayerExplodeSkillId() {
    return this.VAc;
  }
  $Ac(e, t, r) {
    this.FAc[t] = e;
    if (t !== 0) {
      this.HAc(e, t, r);
      this.jAc();
    } else {
      for (let e = 3; e > 0; e--) {
        this.FAc[e] = 0;
      }
      this.HAc(e, t, r);
      this.jAc(e);
    }
  }
  SetExploreSkillId(e, t, r) {
    this.$Ac(e, t, r);
  }
  ResetExplodeSkillId(e, t) {
    this.$Ac(0, e, t);
  }
  ExistAutoLayerSkill() {
    return this.FAc[3] !== 0;
  }
  CheckNeedChangeSkill(e, t) {
    if (this.FAc[t] === e || this.VAc === e) {
      return false;
    }
    for (let e = t + 1; e < 4; e++) {
      if (this.FAc[e] !== 0) {
        return false;
      }
    }
    return true;
  }
}
exports.CharacterExploreModel = CharacterExploreModel;
//# sourceMappingURL=CharacterExploreModel.js.map