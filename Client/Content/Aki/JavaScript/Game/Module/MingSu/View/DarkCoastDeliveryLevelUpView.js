"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryLevelUpView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const DarkCoastDeliveryLevelUpItem_1 = require("./DarkCoastDeliveryLevelUpItem");
class DarkCoastDeliveryLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.EQa = undefined;
    this.IQa = () => new DarkCoastDeliveryLevelUpItem_1.DarkCoastDeliveryLevelUpItem();
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i = this.OpenParam;
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MingSuTi", 58, "DarkCoastDeliveryLevelUpView 无效输入");
      }
    } else {
      this.EQa = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.IQa);
      e = i.GetLevelDataList();
      await this.EQa.RefreshByDataAsync(e);
      e = i.GetLevelTexture(i.PreLevel);
      i = i.GetLevelTexture(i.CurLevel);
      this.SetTextureShowUntilLoaded(e, this.GetTexture(1));
      this.SetTextureShowUntilLoaded(i, this.GetTexture(2));
    }
  }
}
exports.DarkCoastDeliveryLevelUpView = DarkCoastDeliveryLevelUpView;
//# sourceMappingURL=DarkCoastDeliveryLevelUpView.js.map