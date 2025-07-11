"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridFunction = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteController_1 = require("../RouletteController");
const RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridFunction extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    let e = false;
    if (this.IsDataValid()) {
      var t = ModelManager_1.ModelManager.RouletteModel.UnlockFunctionDataMap.get(this.Data.Id);
      if (!t) {
        this.Data.Id = 0;
        return;
      }
      this.Data.Name = t.FuncName;
      if (t.FuncMenuIconPath.includes("Atlas")) {
        this.IsIconTexture = false;
        await this.LoadSpriteIcon(t.FuncMenuIconPath);
      } else {
        this.IsIconTexture = true;
        await this.LoadTextureIcon(t.FuncMenuIconPath);
      }
      if (this.Data.ShowRedDot && t.UnlockCondition !== undefined && (t = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(t.UnlockCondition))) {
        e = true;
        this.BindRedDot(t);
      }
    }
    if (!e) {
      this.SetRedDotVisible(false);
    }
  }
  OnSelect(e) {
    if (e && this.IsDataValid()) {
      RouletteController_1.RouletteController.FunctionOpenRequest(this.Data.Id);
    }
  }
}
exports.RouletteGridFunction = RouletteGridFunction;
//# sourceMappingURL=RouletteGridFunction.js.map