"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssDangoCircleQualityItem = exports.DangoCircleQualityData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoCircleQualityData {
  constructor() {
    this.PluginIdMap = new Map();
  }
}
exports.DangoCircleQualityData = DangoCircleQualityData;
class AbyssDangoCircleQualityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.oUc = new Map();
    this.nUc = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite]];
  }
  OnStart() {
    this.nUc.push(this.GetSprite(0));
    this.oUc.set(0, this.GetSprite(0));
    this.nUc.push(this.GetSprite(2));
    this.oUc.set(1, this.GetSprite(2));
    this.nUc.push(this.GetSprite(1));
    this.oUc.set(2, this.GetSprite(1));
    for (let t = 0; t < 6; t++) {
      var e = this.GetSprite(8 - t);
      this.nUc.push(e);
      this.oUc.set(t + 3, e);
    }
    this.nUc.forEach(t => {
      t.SetUIActive(false);
    });
  }
  RefreshData(t) {
    this.nUc.forEach(t => {
      t.SetUIActive(false);
    });
    for (var [e, i] of t.PluginIdMap) {
      if (e === 0) {
        this.sUc(i);
      } else {
        this.aUc(e, i);
      }
    }
  }
  sUc(t) {
    if (t === 0) {
      this.oUc.get(0).SetUIActive(false);
    } else {
      this.oUc.get(0).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(t).QualityId;
      t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t);
      this.SetSpriteByPath(t?.AbyssCoreItemFormationBg ?? "", this.oUc.get(0), false);
    }
  }
  aUc(t, e) {
    t = this.oUc.get(t);
    if (t) {
      if (e === 0) {
        t.SetUIActive(false);
      } else {
        t.SetUIActive(true);
        e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e).QualityId;
        e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(e);
        this.SetSpriteByPath(e?.AbyssItemFormationBg ?? "", t, false);
        e = e?.AbyssItemFormationBgColor ?? "";
        e = UE.Color.FromHex(e);
        t.SetColor(e);
      }
    }
  }
}
exports.AbyssDangoCircleQualityItem = AbyssDangoCircleQualityItem;
//# sourceMappingURL=AbyssDangoCircleQulityItem.js.map