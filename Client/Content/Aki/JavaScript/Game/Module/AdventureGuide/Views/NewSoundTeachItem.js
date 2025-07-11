"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundTeachItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTeachItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  Update(e) {
    var e = e.DetectRecordData;
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name);
    var t = this.GetTexture(1);
    this.SetTextureShowUntilLoaded(e.Conf.BigIcon, t);
  }
}
exports.NewSoundTeachItem = NewSoundTeachItem;
//# sourceMappingURL=NewSoundTeachItem.js.map