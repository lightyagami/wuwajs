"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksData = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const prevStep = [0, 0, 1, 1, 2];
const nextStep = [1, 2, 4, 4];
const BUBBLE_DRINK_LIKE = "Dialog_{0}_Like0{1}";
const BUBBLE_DRINK_DISLIKE = "Dialog_{0}_Dislike0{1}";
class DrinksData {
  constructor() {
    this.CurStep = 0;
    this.Data = undefined;
    this.RoleId = 0;
    this.RequireId = 0;
    this.FlavorValue = [0, 0, 0];
    this.RandomSort = [];
    this.SelectedEndMap = new Map([[0, false], [1, false], [2, false], [4, false]]);
  }
  Init(t, i) {
    this.CurStep = 0;
    this.RoleId = t;
    this.Data = {
      RequireId: 0,
      DrinkBase: [0, 0],
      Ornament: 0
    };
    for (var [e] of this.SelectedEndMap) {
      this.SelectedEndMap.set(e, false);
    }
    this.FlavorValue = [0, 0, 0];
    if (i) {
      this.RequireId = i;
    } else {
      i = ConfigManager_1.ConfigManager.DrinksConfig.GetRequireListByRole(t);
      t = MathUtils_1.MathUtils.GetRandomItem([...i]);
      this.RequireId = t.Id;
    }
    this.Data.RequireId = this.RequireId;
    this.hNg();
  }
  GetCurData() {
    return this.Data;
  }
  UpdateFlavorValue() {
    var t;
    var i;
    var e;
    var r;
    var s;
    var a;
    var h = [0, 0, 0];
    var n = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    if (n > 0) {
      for ([t, i] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(this.Data.DrinkBase[0]).Flavor) {
        h[t] += i;
      }
    }
    if (n > 1) {
      for ([e, r] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(this.Data.DrinkBase[1]).Flavor) {
        h[e] += r;
      }
    }
    if (this.Data.Batching && n > 2) {
      for (const o of this.Data.Batching) {
        for ([s, a] of ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(o).Flavor) {
          h[s] += a;
        }
      }
    }
    for (let t = 0; t < 3; t++) {
      this.FlavorValue[t] = h[t];
    }
    return this.FlavorValue;
  }
  GetFlavorValue() {
    return this.FlavorValue;
  }
  GetRequireId() {
    return this.RequireId;
  }
  GetRequireConfig() {
    return ConfigManager_1.ConfigManager.DrinksConfig.GetRequireList(this.RequireId);
  }
  GetCurFlavor(t = false) {
    var i;
    var e;
    var r;
    var s;
    var a;
    var h;
    var n = [0, 0, 0];
    if ((this.SelectedEndMap.get(0) || t) && this.Data.DrinkBase[0] !== 0) {
      for ([i, e] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(this.Data.DrinkBase[0]).Flavor) {
        n[i] = n[i] + e;
      }
    }
    if ((this.SelectedEndMap.get(1) || t) && this.Data.DrinkBase[1] !== 0) {
      for ([r, s] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(this.Data.DrinkBase[1]).Flavor) {
        n[r] = n[r] + s;
      }
    }
    if ((this.SelectedEndMap.get(2) || t) && this.Data.Batching) {
      for (const o of this.Data.Batching) {
        for ([a, h] of ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(o).Flavor) {
          n[a] = n[a] + h;
        }
      }
    }
    return n;
  }
  UpdateBase(i, t) {
    if (this.Data) {
      this.Data.DrinkBase[i] = t;
      for (let t = i + 1; t < this.Data.DrinkBase.length; t++) {
        this.Data.DrinkBase[t] = 0;
      }
    }
  }
  UpdateBatching(t) {
    if (this.Data && !(t.size > 2)) {
      var i = [];
      for (const e of t) {
        i.push(e);
      }
      this.Data.Batching = i;
    }
  }
  UpdateOrnament(t) {
    var i;
    var e;
    if (this.Data) {
      this.Data.Ornament = t;
      i = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
      e = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
      i.OnSetOrnament(t, e);
    }
  }
  GetCurStep() {
    return this.CurStep;
  }
  EnterNextStep() {
    this.CurStep = nextStep[this.CurStep];
  }
  BackToPrevStep() {
    if (this.CurStep === 1) {
      this.SelectedEndMap.set(0, false);
      this.UpdateBase(0, this.GetDrinkBaseShowId(this.Data.DrinkBase[0]));
    } else if (this.CurStep === 2) {
      this.SelectedEndMap.set(1, false);
      this.UpdateBatching(new Set());
      this.UpdateBase(1, this.GetDrinkBaseShowId(this.Data.DrinkBase[1]));
    } else if (this.CurStep === 4) {
      this.UpdateOrnament(0);
      this.SelectedEndMap.set(2, false);
    }
    ModelManager_1.ModelManager.DrinksModel.GetSceneController().OnBackToBeforeOrnament();
    this.CurStep = prevStep[this.CurStep];
    this.UpdateFlavorValue();
  }
  RestartGame() {
    var t;
    this.Data.DrinkBase = [0, 0];
    this.Data.Ornament = 0;
    this.Data.Batching = undefined;
    this.CurStep = 0;
    ModelManager_1.ModelManager.DrinksModel.GetSceneController().OnBackToBeforeOrnament();
    for ([t] of this.SelectedEndMap) {
      this.SelectedEndMap.set(t, false);
    }
    this.UpdateFlavorValue();
  }
  GetDrinkBaseShowId(t) {
    return ModelManager_1.ModelManager.DrinksModel.GetDrinksByBaseId(t).GetMenuBaseId();
  }
  GetDialogBubbleInfo(t) {
    if (this.CurStep !== 4 || t !== 0) {
      var i = {
        ConfigId: "",
        IsLike: false
      };
      for (const g of this.GetRequireConfig().RoleLikeSetting) {
        var e;
        var r;
        var s;
        var a;
        var h = ConfigManager_1.ConfigManager.DrinksConfig.GetRoleLikeDrink(g);
        if (this.CurStep <= 1) {
          var n;
          var o;
          var f = ModelManager_1.ModelManager.DrinksModel.GetDrinksByBaseId(t).Id;
          for (const _ of h.LinkDrinkBase) {
            if (f === _) {
              n = h.LikeStatus ? BUBBLE_DRINK_LIKE : BUBBLE_DRINK_DISLIKE;
              o = this.Pzf();
              i.ConfigId = StringUtils_1.StringUtils.Format(n, String(this.RoleId), o);
              i.IsLike = h.LikeStatus;
              return i;
            }
          }
        } else if (this.CurStep === 2) {
          for (const l of h.LinkBatching) {
            if (l === t) {
              e = h.LikeStatus ? BUBBLE_DRINK_LIKE : BUBBLE_DRINK_DISLIKE;
              r = this.Pzf();
              i.ConfigId = StringUtils_1.StringUtils.Format(e, String(this.RoleId), r);
              i.IsLike = h.LikeStatus;
              return i;
            }
          }
        } else {
          for (const M of h.LinkOrnament) {
            if (M === t) {
              s = h.LikeStatus ? BUBBLE_DRINK_LIKE : BUBBLE_DRINK_DISLIKE;
              a = this.Pzf();
              i.ConfigId = StringUtils_1.StringUtils.Format(s, String(this.RoleId), a);
              i.IsLike = h.LikeStatus;
              return i;
            }
          }
        }
      }
    }
  }
  GetDialogHintBubbleInfo() {
    if (this.CurStep === 4) {
      return this.ODg();
    }
  }
  ODg() {
    let t = "";
    for (const e of ConfigManager_1.ConfigManager.DrinksConfig.GetRequireList(this.RequireId).RoleLikeSetting) {
      var i = ConfigManager_1.ConfigManager.DrinksConfig.GetRoleLikeDrink(e);
      if (i.OrnamentHintId !== "") {
        t = i.OrnamentHintId;
      }
    }
    if (t !== "") {
      return {
        ConfigId: t,
        IsLike: true
      };
    }
  }
  UpdateStepEnd(t, i) {
    this.SelectedEndMap.set(t, i);
  }
  hNg() {
    this.RandomSort.length = 0;
    this.RandomSort = MathUtils_1.MathUtils.Shuffle([1, 2, 3]);
  }
  Pzf() {
    if (this.RandomSort.length === 0) {
      this.hNg();
    }
    var t = this.RandomSort.shift();
    return String(t);
  }
}
exports.DrinksData = DrinksData;
//# sourceMappingURL=DrinksData.js.map