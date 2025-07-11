"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticSceneUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
class StaticSceneUtils {
  static GetActorRefByPbDataId(e) {
    if (e) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetActorRefData();
      if (t) {
        var a = ModelManager_1.ModelManager.GameModeModel.MapPath;
        var o = a.split("/");
        var a = a + "." + o[o.length - 1];
        var o = e;
        var e = t.get(a);
        if (e) {
          if (!(t = e.get(o))) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 7, "[StaticSceneUtils]无actor引用", ["levelPath", a], ["pbDataId", o]);
            }
          }
          return t;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Level", 7, "[StaticSceneUtils]未读到对应Level配置", ["levelPath", a]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 7, "[StaticSceneUtils]ActorRefConfig配置文件读取失败");
      }
    }
  }
}
exports.StaticSceneUtils = StaticSceneUtils;
//# sourceMappingURL=StaticSceneUtils.js.map