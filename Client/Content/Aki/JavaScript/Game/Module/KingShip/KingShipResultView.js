"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipResultView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const PublicUtil_1 = require("../../Common/PublicUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController");
const KingShipUtil_1 = require("./KingShipUtil");
class KingShipResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$It = false;
    this.Ubu = 0;
    this.FJu = 0;
    this.aRo = () => {
      var i;
      if (this.$It) {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_Reigns, this.Ubu.toString());
      }
      if (this.$It && this.FJu) {
        i = KingShipUtil_1.KingShipUtil.GetKingShipOpenData(this.FJu);
        UiManager_1.UiManager.OpenView("KingShipLoadingView", i, () => {
          this.CloseMe();
        });
      } else {
        this.CloseMe();
      }
    };
    this.Jvt = () => {
      if (this.$It) {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_Reigns, this.Ubu.toString());
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Jvt], [5, this.aRo]];
  }
  OnStart() {
    var i = this.OpenParam;
    this.$It = i.IsSuccess;
    this.Ubu = i.ReignsId;
    this.FJu = i.NextReignsId;
    var i = i.CardId;
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
    this.GetText(3).SetText(e);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardTitle");
    this.GetText(0).SetText(e);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardHeader");
    this.GetText(1).SetText(e);
  }
}
exports.KingShipResultView = KingShipResultView;
//# sourceMappingURL=KingShipResultView.js.map