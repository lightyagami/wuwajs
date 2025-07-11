"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridReduceButtonComponent = undefined;
const UE = require("ue");
const LongPressButtonItem_1 = require("../../Button/LongPressButtonItem");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridReduceButtonComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.oft = undefined;
    this.Dwt = undefined;
    this.Rwt = undefined;
    this.Uwt = undefined;
    this.Awt = t => {
      if (this.Rwt) {
        this.Rwt(t);
      }
    };
    this.Pwt = () => {
      if (this.oft) {
        this.oft();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Pwt]];
  }
  GetResourceId() {
    return "UiItem_ItemBtnReduce";
  }
  OnInitialize() {
    this.Dwt = new LongPressButtonItem_1.LongPressButtonItem();
  }
  OnStart() {
    var t = this.GetButton(0);
    this.Dwt.Initialize(t, this.Awt);
  }
  OnDeactivate() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind();
    t.OnPointUpCallBack.Unbind();
    this.Dwt?.Clear();
    this.Dwt = undefined;
    this.Uwt = undefined;
    this.oft = undefined;
  }
  OnRefresh(t) {
    var e = t.IsVisible;
    var t = t.LongPressConfigId;
    this.Uwt = t;
    this.SetActive(e);
    if (this.Uwt !== undefined && !this.Dwt.IsActivate()) {
      this.Dwt.Activate(this.Uwt);
    }
  }
  BindReduceButtonCallback(t) {
    this.oft = t;
  }
  UnBindReduceButtonCallback() {
    this.oft = undefined;
  }
  BindLongPressCallback(t) {
    this.Rwt = t;
  }
  UnBindLongPressCallback() {
    this.Rwt = undefined;
    this.Dwt.Deactivate();
  }
  GetReduceButton() {
    return this.GetButton(0);
  }
}
exports.MediumItemGridReduceButtonComponent = MediumItemGridReduceButtonComponent;
//# sourceMappingURL=MediumItemGridReduceButtonComponent.js.map