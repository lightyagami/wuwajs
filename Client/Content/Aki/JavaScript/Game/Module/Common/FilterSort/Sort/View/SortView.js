"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const AttributeSortGroup_1 = require("./AttributeSortGroup");
const BaseSortGroup_1 = require("./BaseSortGroup");
class SortView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.KUt = undefined;
    this.QUt = undefined;
    this.C0t = undefined;
    this.Z9e = () => {
      this.KUt.Reset();
      this.QUt.Reset();
    };
    this.xDt = () => {
      var t = ModelManager_1.ModelManager.SortModel.GetSortResultData(this.C0t.ConfigId);
      t.SetSelectBaseSort(this.KUt.GetTempSelect());
      t.SetSelectAttributeSort(this.QUt.GetTempSelectMap());
      this.C0t.ConfirmFunction?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Z9e], [1, this.xDt]];
  }
  OnStart() {
    this.KUt = new BaseSortGroup_1.BaseSortGroup(this.GetItem(2));
    this.QUt = new AttributeSortGroup_1.AttributeSortGroup(this.GetItem(3));
    this.C0t = this.OpenParam;
    this.AUt();
  }
  OnBeforeDestroy() {
    this.KUt.Destroy();
    this.QUt.Destroy();
  }
  AUt() {
    this.KUt.Init(this.C0t.ConfigId);
    this.QUt.Init(this.C0t.ConfigId);
  }
}
exports.SortView = SortView;
//# sourceMappingURL=SortView.js.map