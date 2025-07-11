"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFixCook = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFixCook extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    if (e.BoardId) {
      ControllerHolder_1.ControllerHolder.CookController.SetCurrentFixId(e.BoardId);
      if (t.Type === 1) {
        t = EntitySystem_1.EntitySystem.Get(t.EntityId);
        t = MathUtils_1.MathUtils.NumberToLong(t?.GetComponent(0).GetCreatureDataId());
        ControllerHolder_1.ControllerHolder.CookController.SetCurrentEntityId(t);
      }
      return ControllerHolder_1.ControllerHolder.CookController.ShowFixCookView();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 64, "打开厨具修复参数有误", ["BoardId", e.BoardId]);
      }
      return false;
    }
  }
  GetViewName(e) {
    return "CookPopFixView";
  }
}
exports.OpenSystemFixCook = OpenSystemFixCook;
//# sourceMappingURL=OpenSystemFixCook.js.map