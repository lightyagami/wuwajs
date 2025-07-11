"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewSetContainer = undefined;
const Log_1 = require("../../../Core/Common/Log");
const UiViewContainer_1 = require("./UiViewContainer");
class UiViewSetContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super();
    this.v3o = undefined;
    this.v3o = e;
  }
  async OpenViewAsync(e) {
    var i = e.Info.Name;
    if (this.v3o.has(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 1, "界面重复", ["name", i]);
      }
    } else {
      this.v3o.set(i, e);
      await this.OpenViewImplementAsync(e);
    }
  }
  async CloseViewAsync(e) {
    this.v3o.delete(e.Info.Name);
    await this.CloseViewImplementAsync(e);
  }
  ClearContainer() {
    var e;
    var i;
    var o = [];
    for ([e, i] of this.v3o) {
      i.IsExistInLeaveLevel = true;
      if (!i.Info.IsPermanent) {
        this.TryCatchViewDestroyCompatible(i);
        o.push(e);
      }
    }
    for (const r of o) {
      this.v3o.delete(r);
    }
  }
  async PreOpenViewAsync(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "此类型容器不支持预打开界面", ["name", e.Info.Name], ["type", e.Info.Type]);
    }
    return Promise.resolve();
  }
  async OpenViewAfterPreOpenedAsync(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "此类型容器不支持预打开界面", ["name", e.Info.Name], ["type", e.Info.Type]);
    }
    return Promise.reject(TypeError("此类型容器不支持预打开界面"));
  }
}
exports.UiViewSetContainer = UiViewSetContainer;
//# sourceMappingURL=UiViewSetContainer.js.map