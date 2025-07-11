"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiResourceManager = exports.ELguiLoadResultType = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
var ELguiLoadResultType;
(function (e) {
  e[e.Success = 0] = "Success";
  e[e.Fail = 1] = "Fail";
})(ELguiLoadResultType = exports.ELguiLoadResultType ||= {});
class LguiResourceManager {
  static LoadPrefabByResourceId(e, a, r) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    return LguiResourceManager.LoadPrefab(e, a, r);
  }
  static LoadPrefab(e, r, o) {
    var a = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, a) => {
      if (e) {
        if (GlobalData_1.GlobalData.World) {
          e = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, e, r);
          if (o) {
            o?.(e, a, ELguiLoadResultType.Success);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LguiUtil", 10, "资源加载失败,Game.World为空", ["path", a]);
          }
          o?.(undefined, a, ELguiLoadResultType.Fail);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LguiUtil", 10, "资源加载失败,资源不存在", ["path", a]);
        }
        o?.(undefined, a, ELguiLoadResultType.Fail);
      }
    });
    if (a !== LguiResourceManager.InvalidId) {
      LguiResourceManager.kdr.set(a, e);
    }
    return a;
  }
  static CancelLoadPrefab(e) {
    if (LguiResourceManager.InvalidId !== e && LguiResourceManager.kdr.get(e)) {
      LguiResourceManager.kdr.delete(e);
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    }
  }
}
(exports.LguiResourceManager = LguiResourceManager).kdr = new Map();
LguiResourceManager.InvalidId = -1; //# sourceMappingURL=LguiResourceManager.js.map