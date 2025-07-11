"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityComponentBase = undefined;
class FloroRanchEntityComponentBase {
  constructor() {
    this.NeedTick = false;
    this.OwnerEntity = undefined;
  }
  Create(t) {
    this.OwnerEntity = t;
    this.OnCreate();
  }
  Init() {
    this.OnInit();
  }
  Tick(t) {
    if (this.NeedTick) {
      this.OnTick(t);
    }
  }
  End() {
    this.OnEnd();
  }
  OnCreate() {}
  OnInit() {}
  OnTick(t) {}
  OnEnd() {}
}
(exports.FloroRanchEntityComponentBase = FloroRanchEntityComponentBase).Id = 0;
//# sourceMappingURL=FloroRanchEntityComponentBase.js.map