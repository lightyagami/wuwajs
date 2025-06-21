"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VisionRefineAttributePanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PhantomTipsAttributeItem_1 = require("../../../Item/SpecialItem/PhantomTipsAttributeItem"),
  VisionRefineAttributeSelectItem_1 = require("./VisionRefineAttributeSelectItem");
class VisionRefineAttributePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.S1c = void 0, this.M1c = void 0, this.E1c = void 0, this.I1c = void 0, this.Nji = void 0, this.T1c = () => {
      this.Nji && this.Nji()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.T1c]
    ]
  }
  async OnBeforeStartAsync() {
    this.I1c = new VisionRefineAttributeSelectItem_1.AttributeSelectItem, this.S1c = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem, this.M1c = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem, this.E1c = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem;
    var t = new Array;
    t.push(this.I1c.CreateThenShowByActorAsync(this.GetButton(2).GetOwner())), t.push(this.S1c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())), t.push(this.M1c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), t.push(this.E1c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), await Promise.all(t)
  }
  RefreshItemNow(t) {
    var e;
    t.length < 2 ? Log_1.Log.CheckError() && Log_1.Log.Error("Calabash", 75, "声骸属性少于2") : (e = t[0], t = t[1], this.S1c.RefreshUi(e), this.M1c.RefreshUi(t), this.E1c.RefreshUi(t))
  }
  RefreshItemSwitch(t) {
    this.I1c.RefreshUi(t)
  }
  BindClickCallBack(t) {
    this.Nji = t
  }
}
exports.VisionRefineAttributePanel = VisionRefineAttributePanel;
//# sourceMappingURL=VisionRefineAttributePanel.js.map