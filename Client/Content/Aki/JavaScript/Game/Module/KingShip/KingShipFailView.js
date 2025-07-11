"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipFailView = undefined;
const UE = require("ue");
const PublicUtil_1 = require("../../Common/PublicUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class KingShipFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Jvt = () => {
      this.OpenParam.OnCloseCallBack();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.Jvt]];
  }
  OnStart() {
    var i = this.OpenParam.CardId;
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
    this.GetText(1).SetText(e);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardTitle");
    this.GetText(0).SetText(e);
  }
  OnBeforeDestroy() {}
}
exports.KingShipFailView = KingShipFailView;
//# sourceMappingURL=KingShipFailView.js.map