"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographNewMusicView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const PhonographNewMusicItem_1 = require("../Component/PhonographNewMusicItem");
class PhonographNewMusicView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GenericLayout = undefined;
    this.OnCreateItem = () => new PhonographNewMusicItem_1.PhonographNewMusicItem();
    this.OnBtnMask = () => {
      UiManager_1.UiManager.OpenView("PhonographView", undefined, () => {
        this.CloseMe();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnBtnMask]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.GenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.OnCreateItem);
    await this.GenericLayout.RefreshByDataAsync(e, true);
  }
}
exports.PhonographNewMusicView = PhonographNewMusicView;
//# sourceMappingURL=PhonographNewMusicView.js.map