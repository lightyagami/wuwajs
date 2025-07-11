"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeActorTalker = undefined;
class FbChangeActorTalker {
  constructor(t) {
    this.FbDataInternal = t;
    this.xfh = false;
    this.Y_i = 0;
    this.FTh = false;
    this.NTh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangeActorTalker(t);
    }
  }
  get ActorIndex() {
    if (!this.xfh) {
      this.xfh = true;
      this.Y_i = this.FbDataInternal.actorIndex();
    }
    return this.Y_i;
  }
  get Talker() {
    if (!this.FTh) {
      this.FTh = true;
      this.NTh = this.FbDataInternal.talker();
    }
    return this.NTh;
  }
}
exports.FbChangeActorTalker = FbChangeActorTalker;
//# sourceMappingURL=FbChangeActorTalker.js.map