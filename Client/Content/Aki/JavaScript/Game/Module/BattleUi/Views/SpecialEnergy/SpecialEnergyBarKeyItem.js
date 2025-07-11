"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKeyItem = undefined;
const UE = require("ue");
const InputEnums_1 = require("../../../../Input/InputEnums");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMultiKeyItemGroup_1 = require("../../../Common/InputKey/InputMultiKeyItemGroup");
class SpecialEnergyBarKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.Lo = undefined;
  }
  SetConfig(e) {
    this.Lo = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Qtt = new InputMultiKeyItemGroup_1.InputMultiKeyItemGroup();
    await this.Qtt.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var e = this.Lo.KeyInfoList;
    var t = e[0];
    var e = e[1];
    let i = "";
    if (this.Lo.KeyType === 0) {
      i = "";
    } else {
      switch (this.Lo.KeyType) {
        case 1:
          i = "+";
          break;
        case 2:
          i = "/";
          break;
        default:
          i = "";
      }
    }
    t = {
      SingleActionOrAxisKeyItem: this.Ldt(t),
      DoubleActionOrAxisKeyItem: e ? this.Ldt(e) : undefined,
      LinkString: i
    };
    this.Qtt?.Refresh(t);
    this.Qtt?.SetActive(true);
  }
  Ldt(e) {
    var t = e.Action === 1;
    return {
      ActionOrAxisName: InputEnums_1.EInputAction[e.ActionType],
      IsLongPressProcessVisible: t,
      IsTextArrowVisible: t
    };
  }
  RefreshKeyEnable(e, t) {
    this.Qtt?.SetEnable(e, t);
  }
}
exports.SpecialEnergyBarKeyItem = SpecialEnergyBarKeyItem;
//# sourceMappingURL=SpecialEnergyBarKeyItem.js.map