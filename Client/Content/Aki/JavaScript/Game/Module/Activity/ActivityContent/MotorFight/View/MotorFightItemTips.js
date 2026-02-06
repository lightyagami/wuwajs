"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightItemTips = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const MotorFightItemDetailPanel_1 = require("./Item/MotorFightItemDetailPanel");
class MotorFightItemTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CollectionItem = undefined;
    this.Data = undefined;
    this.xli = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.xli]];
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam;
    var t = new MotorFightItemDetailPanel_1.MotorFightItemDetailPanel();
    await t.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    t.Refresh(this.Data);
  }
}
exports.MotorFightItemTips = MotorFightItemTips;
//# sourceMappingURL=MotorFightItemTips.js.map