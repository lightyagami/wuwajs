"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleScoreProgressPercentItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleScoreProgressPercentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.fGt = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite]
    ]
  }
  Refresh(e) {
    this.fGt = e, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["", this.fGt]);
    var r = this.GetSprite(1),
      e = ModelManager_1.ModelManager.MoraleModel.GetStageProgressPercent(e);
    this.GetSprite(2)?.SetUIActive(!1), r?.SetFillAmount(e)
  }
  UpdatePercentHandle() {
    var e = this.GetSprite(1),
      r = this.GetSprite(2),
      e = e?.GetWidth() ?? 0,
      t = ModelManager_1.ModelManager.MoraleModel.GetStageProgressPercent(this.fGt),
      o = this.fGt.IsInCurrentStage && 0 < t;
    r?.SetUIActive(o), o && r?.SetAnchorOffsetX(e * t)
  }
}
exports.MoraleScoreProgressPercentItem = MoraleScoreProgressPercentItem;
//# sourceMappingURL=MoraleScoreProgressPercentItem.js.map