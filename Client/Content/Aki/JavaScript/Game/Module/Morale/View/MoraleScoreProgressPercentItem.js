"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleScoreProgressPercentItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MoraleScoreProgressPercentItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite]];
  }
  Refresh(e) {
    this.fGt = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["", this.fGt]);
    }
    var r = this.GetSprite(1);
    var e = ModelManager_1.ModelManager.MoraleModel.GetStageProgressPercent(e);
    this.GetSprite(2)?.SetUIActive(false);
    r?.SetFillAmount(e);
  }
  UpdatePercentHandle() {
    var e = this.GetSprite(1);
    var r = this.GetSprite(2);
    var e = e?.GetWidth() ?? 0;
    var t = ModelManager_1.ModelManager.MoraleModel.GetStageProgressPercent(this.fGt);
    var o = this.fGt.IsInCurrentStage && t > 0;
    r?.SetUIActive(o);
    if (o) {
      r?.SetAnchorOffsetX(e * t);
    }
  }
}
exports.MoraleScoreProgressPercentItem = MoraleScoreProgressPercentItem;
//# sourceMappingURL=MoraleScoreProgressPercentItem.js.map