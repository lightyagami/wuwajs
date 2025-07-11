"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelComponentBase = undefined;
class UiModelComponentBase {
  constructor() {
    this.NeedTick = false;
    this.wxo = undefined;
  }
  get Owner() {
    return this.wxo;
  }
  Create(t) {
    this.wxo = t;
    this.OnCreate();
  }
  Init() {
    this.OnInit();
  }
  Start() {
    this.OnStart();
  }
  Tick(t) {
    this.OnTick(t);
  }
  End() {
    this.OnEnd();
  }
  Clear() {
    this.OnClear();
  }
  OnCreate() {}
  OnInit() {}
  OnStart() {}
  OnTick(t) {}
  OnEnd() {}
  OnClear() {}
}
(exports.UiModelComponentBase = UiModelComponentBase).Id = -1;
//# sourceMappingURL=UiModelComponentBase.js.map