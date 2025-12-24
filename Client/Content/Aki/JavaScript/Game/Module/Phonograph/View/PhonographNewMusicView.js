"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographNewMusicView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const PhonographNewMusicItem_1 = require("../Component/PhonographNewMusicItem");
class PhonographNewMusicView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GenericLayout = undefined;
    this.yUc = undefined;
    this.OnCreateItem = () => new PhonographNewMusicItem_1.PhonographNewMusicItem();
    this.OnBtnMask = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnBtnMask]];
  }
  async OnBeforeStartAsync() {
    this.yUc = this.OpenParam;
    if (this.yUc) {
      this.GenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.OnCreateItem);
      await this.GenericLayout.RefreshByDataAsync(this.yUc.UnlockMusicList, true);
    }
  }
  OnBeforeDestroy() {
    this.yUc?.CloseCallback?.();
  }
}
exports.PhonographNewMusicView = PhonographNewMusicView;
//# sourceMappingURL=PhonographNewMusicView.js.map