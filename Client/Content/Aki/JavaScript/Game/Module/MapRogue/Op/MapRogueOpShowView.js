"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpShowView = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const UiManager_1 = require("../../../Ui/UiManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpShowView extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
    this.AutoFinish = true;
  }
  ToString() {
    return `[ShowView] IncId:${this.IncId} Step:${this.CurrentStep} SubType:${this.Data.FEc?.KEc}`;
  }
  OnUpdate() {
    if (this.Data.FEc.KEc === Protocol_1.Aki.Protocol.KEc.Proto_InstResult) {
      this.ExecuteInMapView = false;
    }
  }
  OnStartExecute(e) {
    var t = this.Data.FEc;
    if (t) {
      switch (t.KEc) {
        case Protocol_1.Aki.Protocol.KEc.Proto_GridTake:
          UiManager_1.UiManager.OpenView("MapRogueGridTakeView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.KEc.Proto_InstResult:
          UiManager_1.UiManager.OpenView("RogueBattleSettleView", this.Data.FEc.ZEc);
          break;
        case Protocol_1.Aki.Protocol.KEc.Proto_RoleBond:
          UiManager_1.UiManager.OpenView("RogueBattleRoleStarUpView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.KEc.Proto_AddToken:
          UiManager_1.UiManager.OpenView("RogueBattleTokenSelectResultView", this.IncId);
      }
    }
  }
  OnExecute(e) {
    if (this.AutoFinish) {
      this.Execute(e);
    }
  }
  OnFinish(e) {}
  OnBeforeStartExecuteCheck(e) {
    var t = this.Data.FEc;
    return !!t && (t.KEc !== Protocol_1.Aki.Protocol.KEc.Proto_RoleBond || !UiManager_1.UiManager.IsViewOpen("RogueBattleRoleBuffSelectView"));
  }
}
exports.MapRogueOpShowView = MapRogueOpShowView;
//# sourceMappingURL=MapRogueOpShowView.js.map