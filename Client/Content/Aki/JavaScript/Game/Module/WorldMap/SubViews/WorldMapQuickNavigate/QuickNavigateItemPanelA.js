"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickNavigateItemPanelA = undefined;
const UE = require("ue");
const CountryById_1 = require("../../../../../Core/Define/ConfigQuery/CountryById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateItemPanelA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RYa = undefined;
    this.kqe = () => {
      this.Ilh();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapFirstNavigateSelect, this.RYa);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  RefreshByData(e) {
    var e = (this.RYa = e).CountryId;
    var e = CountryById_1.configCountryById.GetConfig(e);
    var t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title);
    var t = this.GetTexture(2);
    this.SetTextureByPath(e.Logo, t);
    var e = this.RYa.HasState;
    if (this.RYa.RefreshType === 4) {
      this.Ilh();
    }
    this.GetItem(3).SetUIActive(e);
  }
  Ilh() {
    var e = this.GetExtendToggle(0);
    if (this.RYa.IsSelected) {
      e.SetToggleState(1);
    } else {
      e.SetToggleState(0);
    }
  }
}
exports.QuickNavigateItemPanelA = QuickNavigateItemPanelA;
//# sourceMappingURL=QuickNavigateItemPanelA.js.map