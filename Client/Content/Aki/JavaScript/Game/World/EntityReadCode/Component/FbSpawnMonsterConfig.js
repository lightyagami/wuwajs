"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnMonsterConfig = undefined;
const UnionSpawnMonsterCompleteConditionHelper_1 = require("./UnionSpawnMonsterCompleteConditionHelper");
const UnionSpawnMonsterPreConditionHelper_1 = require("./UnionSpawnMonsterPreConditionHelper");
class FbSpawnMonsterConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
    this.Gfh = false;
    this.Ofh = 0;
    this.Kqh = false;
    this.$qh = undefined;
    this.Xqh = false;
    this.Yqh = undefined;
    this.Hgh = false;
    this.Wgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnMonsterConfig(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
  get TargetsToAwake() {
    if (!this.Kqh) {
      this.Kqh = true;
      this.$qh = new Array();
      var i = this.FbDataInternal.targetsToAwakeLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.$qh.push(this.FbDataInternal.targetsToAwake(t));
        }
      }
    }
    return this.$qh;
  }
  get CompleteCondition() {
    var t;
    var i;
    if (!this.Xqh && (this.Xqh = true, t = this.FbDataInternal.completeConditionType(), i = UnionSpawnMonsterCompleteConditionHelper_1.UnionSpawnMonsterCompleteConditionHelper.GetUnionSpawnMonsterCompleteConditionObject(t))) {
      this.Yqh = UnionSpawnMonsterCompleteConditionHelper_1.UnionSpawnMonsterCompleteConditionHelper.ReadUnionSpawnMonsterCompleteCondition(t, this.FbDataInternal.completeCondition(i));
    }
    return this.Yqh;
  }
  get PreCondition() {
    var t;
    var i;
    if (!this.Hgh && (this.Hgh = true, t = this.FbDataInternal.preConditionType(), i = UnionSpawnMonsterPreConditionHelper_1.UnionSpawnMonsterPreConditionHelper.GetUnionSpawnMonsterPreConditionObject(t))) {
      this.Wgh = UnionSpawnMonsterPreConditionHelper_1.UnionSpawnMonsterPreConditionHelper.ReadUnionSpawnMonsterPreCondition(t, this.FbDataInternal.preCondition(i));
    }
    return this.Wgh;
  }
}
exports.FbSpawnMonsterConfig = FbSpawnMonsterConfig;
//# sourceMappingURL=FbSpawnMonsterConfig.js.map