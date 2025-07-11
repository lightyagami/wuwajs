"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionFetterDescItem = exports.VisionFetterDescData = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionFetterDescData {
  constructor() {
    this.Key = 0;
    this.Value = 0;
  }
}
exports.VisionFetterDescData = VisionFetterDescData;
class VisionFetterDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e, t, i) {
    var r = e.Value;
    this.Dke(r);
    this.P5e(r, e.Key);
  }
  P5e(e, t) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(e);
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
    this.GetText(0).SetText(e ?? "");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "VisionFetterDetailViewName", e, t.toString());
  }
  Dke(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.EffectDescription, ...e.EffectDescriptionParam);
  }
}
exports.VisionFetterDescItem = VisionFetterDescItem;
//# sourceMappingURL=VisionFetterDescItem.js.map