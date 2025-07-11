"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundSuitDropDownItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const DropDownItemBase_1 = require("../../Common/DropDown/Item/DropDownItemBase");
const VisionFetterSuitItem_1 = require("../../Phantom/Vision/View/VisionFetterSuitItem");
class NewSoundSuitDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.GetItem(4).SetUIActive(false);
    this.GetText(3).SetUIActive(false);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(2));
    this.bxt.Init();
    var t = e;
    let i = "";
    i = e > 0 ? (e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e), MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.FetterGroupName) ?? "") : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_FilterTextAllVisionFetter_Text") ?? "";
    this.GetText(1).SetText(i);
    e = t ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t) : undefined;
    this.bxt.Update(e);
    this.bxt.SetActive(true);
  }
  OnBeforeDestroy() {
    this.bxt?.Destroy();
  }
}
exports.NewSoundSuitDropDownItem = NewSoundSuitDropDownItem;
//# sourceMappingURL=NewSoundSuitDropDownItem.js.map