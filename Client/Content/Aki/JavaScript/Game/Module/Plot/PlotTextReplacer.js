"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTextReplacer = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const TA = "{TA}";
const PLAYER_NAME = "{PlayerName}";
class PlotTextReplacer {
  constructor() {
    this.gU = false;
    this.azi = false;
    this.B9e = "";
    this.hzi = "";
    this.lzi = /\{(?:Male=(.*?);Female=(.*?)|TA|PlayerName)\}/g;
    this.Dde = (e, t, i) => t !== undefined && i !== undefined ? this.azi ? t : i : e === TA ? this.hzi : e === PLAYER_NAME ? this.B9e : e;
  }
  Init() {
    if (!this.gU) {
      this.azi = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
      this.B9e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      this.hzi = this.azi ? ConfigManager_1.ConfigManager.TextConfig.GetTextById("He") : ConfigManager_1.ConfigManager.TextConfig.GetTextById("She");
      this.gU = true;
    }
  }
  Clear() {
    this.gU = false;
  }
  Replace(e, t = false) {
    if (e !== undefined) {
      if (t) {
        this.Clear();
      }
      this.Init();
      return e.replace(this.lzi, this.Dde);
    }
  }
}
exports.PlotTextReplacer = PlotTextReplacer;
//# sourceMappingURL=PlotTextReplacer.js.map