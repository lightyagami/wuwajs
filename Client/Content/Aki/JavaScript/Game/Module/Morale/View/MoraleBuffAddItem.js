"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffAddItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleBuffAddItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ItemData = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText]
    ]
  }
  Refresh(r) {
    this.ItemData = r;
    var t = this.GetTexture(0);
    this.SetTextureByPath(r.IconPath, t), this.GetText(1)?.ShowTextNew(r.NameKey), this.GetText(2)?.SetText(r.Value), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["", this.ItemData])
  }
}
exports.MoraleBuffAddItem = MoraleBuffAddItem;
//# sourceMappingURL=MoraleBuffAddItem.js.map