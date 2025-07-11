"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterGachaItemComponent = undefined;
class FbMonsterGachaItemComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.X7h = false;
    this.Y7h = undefined;
    this.z7h = false;
    this.J7h = undefined;
    this.Qvh = false;
    this.Kvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMonsterGachaItemComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MaterialDataPath() {
    if (!this.X7h) {
      this.X7h = true;
      this.Y7h = this.FbDataInternal.materialDataPath();
    }
    return this.Y7h;
  }
  get MonsterType() {
    if (!this.z7h) {
      this.z7h = true;
      this.J7h = this.FbDataInternal.monsterType();
    }
    return this.J7h;
  }
  get MonsterEntityIds() {
    if (!this.Qvh) {
      this.Qvh = true;
      this.Kvh = new Array();
      var s = this.FbDataInternal.monsterEntityIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Kvh.push(this.FbDataInternal.monsterEntityIds(t));
        }
      }
    }
    return this.Kvh;
  }
}
exports.FbMonsterGachaItemComponent = FbMonsterGachaItemComponent;
//# sourceMappingURL=FbMonsterGachaItemComponent.js.map