"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPrefabLoadModule = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const LguiUtil_1 = require("../Module/Util/LguiUtil");
class UiPrefabLoadModule {
  constructor() {
    this.ogr = new Map();
  }
  async LoadPrefabAsync(e, r, o = "js_undefined") {
    if (GlobalData_1.GlobalData.World) {
      const s = LguiUtil_1.LguiUtil.GetRootActorMemoryTag(r, o);
      const t = new CustomPromise_1.CustomPromise();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiPrefabLoad", 10, "资源加载开始", ["路径", e]);
      }
      o = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, o) => {
        e = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, e, r);
        LguiUtil_1.LguiUtil.SetRootActorMemoryTag(e, s);
        t.SetResult(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiPrefabLoad", 10, "资源加载完成", ["路径", o]);
        }
      }, 102, s);
      if (o !== ResourceSystem_1.ResourceSystem.InvalidId) {
        this.ogr.set(o, e);
      }
      e = await t.Promise;
      this.ogr.delete(o);
      return e;
    }
  }
  Clear() {
    for (var [e, o] of this.ogr) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiPrefabLoad", 10, "资源加载取消", ["路径", o]);
      }
    }
    this.ogr.clear();
  }
}
exports.UiPrefabLoadModule = UiPrefabLoadModule;
//# sourceMappingURL=UiPrefabLoadModule.js.map