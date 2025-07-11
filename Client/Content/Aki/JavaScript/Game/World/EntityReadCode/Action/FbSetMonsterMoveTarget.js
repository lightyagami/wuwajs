"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetMonsterMoveTarget = undefined;
class FbSetMonsterMoveTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Vvh = false;
    this.jvh = 0;
    this.Hvh = false;
    this.Wvh = undefined;
    this.Qvh = false;
    this.Kvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetMonsterMoveTarget(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetEntityId() {
    if (!this.Vvh) {
      this.Vvh = true;
      this.jvh = this.FbDataInternal.targetEntityId();
    }
    return this.jvh;
  }
  get MoveEvent() {
    if (!this.Hvh) {
      this.Hvh = true;
      this.Wvh = this.FbDataInternal.moveEvent();
    }
    return this.Wvh;
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
exports.FbSetMonsterMoveTarget = FbSetMonsterMoveTarget;
//# sourceMappingURL=FbSetMonsterMoveTarget.js.map