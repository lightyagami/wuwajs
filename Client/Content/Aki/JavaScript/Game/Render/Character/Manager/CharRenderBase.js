"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharRenderBase = undefined;
const Stats_1 = require("../../../../Core/Common/Stats");
class CharRenderBase {
  constructor() {
    this.RenderComponent = undefined;
    this.RenderStat = undefined;
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
  GetRenderStat() {
    this.RenderStat ||= Stats_1.Stat.Create(this.GetStatName());
    return this.RenderStat;
  }
  Awake(t) {
    this.RenderComponent = t;
  }
  Start() {}
  Update() {}
  LateUpdate() {}
  Destroy() {}
  OnResetRenderState() {}
  PreBodyInfoRuntimeInit(t) {}
  PostBodyInfoRuntimeInit(t) {}
  GetDeltaTime() {
    return this.RenderComponent.GetDeltaTime();
  }
}
exports.CharRenderBase = CharRenderBase;
//# sourceMappingURL=CharRenderBase.js.map