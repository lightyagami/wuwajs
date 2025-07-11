"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiResourceLoadModule = exports.UiResourceHandle = undefined;
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
class UiResourceHandle {
  constructor(e) {
    this.ResourceId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Object = e;
  }
  CancelResource() {
    if (this.ResourceId !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.ResourceId);
    }
  }
}
exports.UiResourceHandle = UiResourceHandle;
class UiResourceLoadModule {
  constructor() {
    this.rgr = new Map();
  }
  CancelResource(e) {
    let s = this.rgr.get(e);
    if (s) {
      s.CancelResource();
    } else {
      s = new UiResourceHandle(e);
      this.rgr.set(e, s);
    }
  }
  SetResourceId(e, s) {
    e = this.rgr.get(e);
    if (e) {
      e.ResourceId = s;
    }
  }
  DeleteResourceHandle(e) {
    this.rgr.delete(e);
  }
  Clear() {
    for (const e of this.rgr.values()) {
      e.CancelResource();
    }
    this.rgr.clear();
  }
}
exports.UiResourceLoadModule = UiResourceLoadModule;
//# sourceMappingURL=UiResourceLoadModule.js.map