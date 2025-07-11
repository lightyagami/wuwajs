"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundSuitDropDownTitle = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const TitleItemBase_1 = require("../../Common/DropDown/Item/TitleItemBase");
const VisionFetterSuitItem_1 = require("../../Phantom/Vision/View/VisionFetterSuitItem");
class NewSoundSuitDropDownTitle extends TitleItemBase_1.TitleItemBase {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  ShowTemp(e, t) {
    if (!this.bxt) {
      this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(1));
      this.bxt.Init().finally(() => {});
    }
    var i = e;
    let o = "";
    o = e > 0 ? (e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e), MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.FetterGroupName) ?? "") : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_FilterTextAllVisionFetter_Text") ?? "";
    this.GetText(0).SetText(o);
    e = i ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(i) : undefined;
    this.bxt.Update(e);
    this.bxt.SetActive(true);
  }
  OnBeforeDestroy() {
    this.bxt?.Destroy();
  }
}
exports.NewSoundSuitDropDownTitle = NewSoundSuitDropDownTitle;
//# sourceMappingURL=NewSoundSuitDropDownTitle.js.map