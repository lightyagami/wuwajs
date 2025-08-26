"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhantomManageConfigItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.fLt = undefined;
    this.jqu = () => {
      if (this.Pe && PhantomManageConfigItem.CallbackBtnSelect) {
        PhantomManageConfigItem.CallbackBtnSelect(this.Pe);
      }
    };
    this.Hqu = () => {
      var t;
      return !!this.Pe && !!PhantomManageConfigItem.ViewModel && (t = PhantomManageConfigItem.ViewModel.GetSelectConfig()).GetIndex() === this.Pe.GetIndex() && this.Pe.GetType() === t.GetType();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIExtendToggle]];
    this.BtnBindInfo = [[3, this.jqu]];
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(() => {
      return this.GetExtendToggle(3).GetToggleState() !== 1 || !this.Hqu();
    });
    this.fLt = this.GetRootActor().GetComponentByClass(UE.LGUICanvas.StaticClass());
  }
  Refresh(t, i, e) {
    t.SetDisplayIndex(this.DisplayIndex);
    var s = (this.Pe = t).GetIndexString();
    this.GetText(0).SetText(s);
    this.GetText(1).SetText(t.GetName());
    this.GetSprite(2).SetUIActive(t.GetIsOn());
    var s = this.Hqu();
    var t = s ? 1 : 0;
    var h = this.Dzu();
    this.GetExtendToggle(3).SetToggleState(t);
    this.GetExtendToggle(3).SetSelfInteractive(!h);
    this.GetRootItem().SetBubbleUpToParent(!h);
    this.fLt.SetSortOrder(s ? 1 : 0, true);
  }
  GetKey(t, i) {
    return t.GetIndex();
  }
  Dzu() {
    return !!this.Pe && !!PhantomManageConfigItem.ViewModel && PhantomManageConfigItem.ViewModel.GetEditState();
  }
}
(exports.PhantomManageConfigItem = PhantomManageConfigItem).CallbackBtnSelect = undefined;
PhantomManageConfigItem.ViewModel = undefined; //# sourceMappingURL=PhantomManageConfigItem.js.map