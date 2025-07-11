"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerCurrencyItem = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
class PowerCurrencyItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments);
    this.JXs = 0;
    this.zXs = e => {
      var t;
      var r;
      var n;
      if (this.JXs === e) {
        t = (e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(e)).GetCurrentPower();
        r = e.GetPowerLimit();
        n = e.GetPowerCurrencyShowTextId();
        this.SetCountTextNew(n, t, r);
        n = e.IfNeedShowMax() && r <= t;
        this.RefreshMaxItem(n);
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.AddOverPowerEventListener();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.RemoveOverPowerEventListener();
  }
  AddOverPowerEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPowerChangedWithId, this.zXs);
  }
  RemoveOverPowerEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPowerChangedWithId, this.zXs);
  }
  RefreshTemp(e, t) {
    this.ShowWithoutText(e);
  }
  ShowWithoutText(e) {
    this.JXs = e;
    super.ShowWithoutText(e);
    this.zXs(e);
  }
  RefreshAddButtonActive() {
    this.SetButtonActive(this.JXs === ItemDefines_1.EItemId.Power && !UiManager_1.UiManager.IsViewOpen("PowerView"));
  }
}
exports.PowerCurrencyItem = PowerCurrencyItem;
//# sourceMappingURL=PowerCurrencyItem.js.map