"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowCollectionTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const MotorcycleArrowCollectionItem_1 = require("./MotorcycleArrowCollectionItem");
class MotorcycleArrowCollectionTipsView extends UiViewBase_1.UiViewBase {
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
    await super.OnBeforeStartAsync();
    var e = new MotorcycleArrowCollectionItem_1.MotorcycleArrowCollectionItem();
    await e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    e.UpdateData(this.Data, false);
  }
}
exports.MotorcycleArrowCollectionTipsView = MotorcycleArrowCollectionTipsView;
//# sourceMappingURL=MotorcycleArrowCollectionTipsView.js.map