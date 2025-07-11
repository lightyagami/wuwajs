"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepItemContainer = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const CiacconaGalStepChoiceList_1 = require("./CiacconaGalStepChoiceList");
const CiacconaGalStepChosenItem_1 = require("./CiacconaGalStepChosenItem");
const CiacconaGalStepSubEndingItem_1 = require("./CiacconaGalStepSubEndingItem");
const CiacconaGalStepTextItem_1 = require("./CiacconaGalStepTextItem");
class CiacconaGalStepItemContainer extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.oLc = undefined;
    this.nLc = undefined;
    this.sLc = undefined;
    this.aLc = undefined;
    this.hLc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.oLc = new CiacconaGalStepChosenItem_1.CiacconaGalStepChosenItem();
    t.push(this.oLc.CreateByActorAsync(this.GetItem(0).GetOwner()));
    this.nLc = new CiacconaGalStepTextItem_1.CiacconaGalStepTextItem();
    t.push(this.nLc.CreateByActorAsync(this.GetItem(1).GetOwner()));
    this.sLc = new CiacconaGalStepSubEndingItem_1.CiacconaGalStepSubEndingItem();
    t.push(this.sLc.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.aLc = new CiacconaGalStepChoiceList_1.CiacconaGalStepChoiceList();
    t.push(this.aLc.CreateByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(t);
  }
  Refresh(t, e, i) {
    var r;
    this.hLc = t;
    this.oLc.SetActive(this.lLc());
    this.nLc.SetActive(this._Lc());
    this.sLc.SetActive(this.cLc());
    this.aLc.SetActive(this.uLc());
    if (this.lLc()) {
      r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(t.ChosenId);
      this.oLc.Refresh(r);
    }
    if (this._Lc()) {
      this.nLc.Refresh(t);
    }
    if (this.cLc() && (r = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(t.SubEndingId), this.sLc.Refresh(r), r = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState() === 5, this.sLc.GetRootItem().SetAlpha(r ? 1 : 0), r)) {
      this.sLc.PlayStart();
    }
    if (this.uLc()) {
      this.aLc.Refresh(t);
    }
  }
  lLc() {
    return this.hLc.Type === 2 && this.hLc.Id !== ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId;
  }
  _Lc() {
    return this.hLc.HasText;
  }
  cLc() {
    return this.hLc.Type === 3;
  }
  uLc() {
    var t = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState();
    return this.hLc.Type === 2 && this.hLc.Id === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId && (t === 4 || t === 8);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      var e;
      var i = t[0];
      if (i === "ChoicesSelect" && this.hLc.ChoiceIds.length > 1) {
        if (this.uLc()) {
          return [e = this.GetItem(3), e];
        }
      }
      if (i === "FirstChoice" && this.uLc()) {
        return this.aLc?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
}
exports.CiacconaGalStepItemContainer = CiacconaGalStepItemContainer;
//# sourceMappingURL=CiacconaGalStepItemContainer.js.map