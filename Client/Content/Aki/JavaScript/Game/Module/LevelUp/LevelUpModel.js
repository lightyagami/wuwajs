"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class LevelUpModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CanBreakTipsShowFlag = true;
    this.GNn = undefined;
  }
  SetExpChange(e, r, t, i, s) {
    this.ovi({
      AddExp: true,
      PreLevel: e,
      PreExp: t,
      CurLevel: e,
      CurExp: r
    });
  }
  SetLevelUp(e, r, t, i, s, a, h, l) {
    this.ovi({
      AddExp: l > 0,
      PreLevel: e,
      PreExp: i,
      CurLevel: r,
      CurExp: t
    });
  }
  SetShowLevelOnly(e) {
    var r = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp() ?? 0;
    this.ovi({
      AddExp: false,
      PreLevel: e,
      PreExp: r,
      CurLevel: e,
      CurExp: r
    });
  }
  ONn(e) {
    if (this.GNn) {
      if (e.AddExp) {
        this.GNn.AddExp = e.AddExp;
      }
      if (e.PreLevel < this.GNn.PreLevel) {
        this.GNn.PreLevel = e.PreLevel;
        this.GNn.PreExp = e.PreExp;
      } else if (e.PreLevel === this.GNn.PreLevel && e.PreExp <= this.GNn.PreExp) {
        this.GNn.PreExp = e.PreExp;
      }
      if (e.CurLevel > this.GNn.CurLevel) {
        this.GNn.CurLevel = e.CurLevel;
        this.GNn.CurExp = e.CurExp;
      } else if (e.CurLevel === this.GNn.CurLevel && e.CurExp >= this.GNn.CurExp) {
        this.GNn.CurExp = e.CurExp;
      }
    }
  }
  ovi(e) {
    if (UiManager_1.UiManager.IsViewOpen("LevelUpView") && this.GNn) {
      this.ONn(e);
    } else {
      this.GNn = e;
      if (!UiManager_1.UiManager.GetViewByName("LevelUpView")) {
        UiManager_1.UiManager.OpenView("LevelUpView", this.GNn);
      }
    }
  }
  GetCacheData() {
    return this.GNn;
  }
  ClearCacheData() {
    this.GNn = undefined;
  }
}
exports.LevelUpModel = LevelUpModel;
//# sourceMappingURL=LevelUpModel.js.map