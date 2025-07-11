"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyRoundBuffShowView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const DangoMonopolyRoundBuffShowItem_1 = require("./DangoMonopolyRoundBuffShowItem");
const DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyRoundBuffShowView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.OVc = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
    this.gDo = () => {
      return new DangoMonopolyRoundBuffShowItem_1.DangoMonopolyRoundBuffShowItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UILayoutBase], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t], [2, this.I5t]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.OVc = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.gDo, this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    this.OVc?.RefreshByData(this.qVc(), undefined, true);
  }
  qVc() {
    var o = this.OpenParam?.BoardId ?? 0;
    return (this.ActivityData.BoardMap.get(o) ?? this.ActivityData.CurrentBoardData)?.GetDangoBuffShowList() ?? [];
  }
  OnBeforeDestroy() {
    this.OpenParam?.Promise?.SetResult();
  }
}
exports.DangoMonopolyRoundBuffShowView = DangoMonopolyRoundBuffShowView;
//# sourceMappingURL=DangoMonopolyRoundBuffShowView.js.map