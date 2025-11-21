"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScoreController = undefined;
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const ModelManager_1 = require("../../../Manager/ModelManager");
class BattleScoreController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(16581, this.pIn);
    Net_1.Net.Register(24532, this.cul);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(16581);
    Net_1.Net.UnRegister(24532);
    return true;
  }
}
(exports.BattleScoreController = BattleScoreController).pIn = e => {
  ModelManager_1.ModelManager.BattleScoreModel?.HandleBattleScoreNotify(e);
};
BattleScoreController.cul = e => {
  ModelManager_1.ModelManager.BattleScoreModel?.HandleBattleScoreEnableNotify(e);
}; //# sourceMappingURL=BattleScoreController.js.map