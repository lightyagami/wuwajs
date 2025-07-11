"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharRenderBase = undefined;
class CharRenderBase {
  constructor() {
    this.RenderComponent = undefined;
    this.jlr = false;
  }
  GetIsInitSuc() {
    return this.jlr;
  }
  GetRenderingComponent() {
    return this.RenderComponent;
  }
  OnInitSuccess() {
    this.jlr = true;
  }
  Awake(e) {
    this.RenderComponent = e;
  }
  Start() {}
  Update() {}
  LateUpdate() {}
  Destroy() {}
  OnResetRenderState() {}
  GetDeltaTime() {
    return this.RenderComponent.GetDeltaTime();
  }
}
exports.CharRenderBase = CharRenderBase;
//# sourceMappingURL=CharRenderBase.js.map