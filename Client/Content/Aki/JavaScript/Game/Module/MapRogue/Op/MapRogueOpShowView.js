"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueOpShowView = void 0;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpShowView extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments), this.StepSize = 1, this.AutoFinish = !0
  }
  ToString() {
    return `[ShowView] IncId:${this.IncId} Step:${this.CurrentStep} SubType:` + this.Data.FEc?.KEc
  }
  OnUpdate() {
    this.Data.FEc.KEc === Protocol_1.Aki.Protocol.KEc.Proto_InstResult && (this.ExecuteInMapView = !1)
  }
  OnStartExecute(e) {
    var t = this.Data.FEc;
    if (t) switch (t.KEc) {
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
        UiManager_1.UiManager.OpenView("RogueBattleTokenSelectResultView", this.IncId)
    }
  }
  OnExecute(e) {
    this.AutoFinish && this.Execute(e)
  }
  OnFinish(e) {}
  OnBeforeStartExecuteCheck(e) {
    var t = this.Data.FEc;
    return !(!t || t.KEc === Protocol_1.Aki.Protocol.KEc.Proto_RoleBond && UiManager_1.UiManager.IsViewOpen("RogueBattleRoleBuffSelectView"))
  }
}
exports.MapRogueOpShowView = MapRogueOpShowView;
//# sourceMappingURL=MapRogueOpShowView.js.map