"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbyssDangoCircleQualityItem = exports.DangoCircleQualityData = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoCircleQualityData {
  constructor() {
    this.PluginIdMap = new Map
  }
}
exports.DangoCircleQualityData = DangoCircleQualityData;
class AbyssDangoCircleQualityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.oUc = new Map, this.nUc = []
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite]
    ]
  }
  OnStart() {
    this.nUc.push(this.GetSprite(0)), this.oUc.set(0, this.GetSprite(0)), this.nUc.push(this.GetSprite(2)), this.oUc.set(1, this.GetSprite(2)), this.nUc.push(this.GetSprite(1)), this.oUc.set(2, this.GetSprite(1));
    for (let t = 0; t < 6; t++) {
      var e = this.GetSprite(8 - t);
      this.nUc.push(e), this.oUc.set(t + 3, e)
    }
    this.nUc.forEach(t => {
      t.SetUIActive(!1)
    })
  }
  RefreshData(t) {
    this.nUc.forEach(t => {
      t.SetUIActive(!1)
    });
    for (var [e, i] of t.PluginIdMap) 0 === e ? this.sUc(i) : this.aUc(e, i)
  }
  sUc(t) {
    0 === t ? this.oUc.get(0).SetUIActive(!1) : (this.oUc.get(0).SetUIActive(!0), t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(t).QualityId, t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t), this.SetSpriteByPath(t?.AbyssCoreItemFormationBg ?? "", this.oUc.get(0), !1))
  }
  aUc(t, e) {
    t = this.oUc.get(t);
    t && (0 === e ? t.SetUIActive(!1) : (t.SetUIActive(!0), e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e).QualityId, e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(e), this.SetSpriteByPath(e?.AbyssItemFormationBg ?? "", t, !1), e = e?.AbyssItemFormationBgColor ?? "", e = UE.Color.FromHex(e), t.SetColor(e)))
  }
}
exports.AbyssDangoCircleQualityItem = AbyssDangoCircleQualityItem;
//# sourceMappingURL=AbyssDangoCircleQulityItem.js.map