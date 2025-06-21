"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalStepItemContainer = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  CiacconaGalStepChoiceList_1 = require("./CiacconaGalStepChoiceList"),
  CiacconaGalStepChosenItem_1 = require("./CiacconaGalStepChosenItem"),
  CiacconaGalStepSubEndingItem_1 = require("./CiacconaGalStepSubEndingItem"),
  CiacconaGalStepTextItem_1 = require("./CiacconaGalStepTextItem");
class CiacconaGalStepItemContainer extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.oLc = void 0, this.nLc = void 0, this.sLc = void 0, this.aLc = void 0, this.hLc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.oLc = new CiacconaGalStepChosenItem_1.CiacconaGalStepChosenItem, t.push(this.oLc.CreateByActorAsync(this.GetItem(0).GetOwner())), this.nLc = new CiacconaGalStepTextItem_1.CiacconaGalStepTextItem, t.push(this.nLc.CreateByActorAsync(this.GetItem(1).GetOwner())), this.sLc = new CiacconaGalStepSubEndingItem_1.CiacconaGalStepSubEndingItem, t.push(this.sLc.CreateByActorAsync(this.GetItem(2).GetOwner())), this.aLc = new CiacconaGalStepChoiceList_1.CiacconaGalStepChoiceList, t.push(this.aLc.CreateByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(t)
  }
  Refresh(t, e, i) {
    var r;
    this.hLc = t, this.oLc.SetActive(this.lLc()), this.nLc.SetActive(this._Lc()), this.sLc.SetActive(this.cLc()), this.aLc.SetActive(this.uLc()), this.lLc() && (r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(t.ChosenId), this.oLc.Refresh(r)), this._Lc() && this.nLc.Refresh(t), this.cLc() && (r = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(t.SubEndingId), this.sLc.Refresh(r), r = 5 === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState(), this.sLc.GetRootItem().SetAlpha(r ? 1 : 0), r) && this.sLc.PlayStart(), this.uLc() && this.aLc.Refresh(t)
  }
  lLc() {
    return 2 === this.hLc.Type && this.hLc.Id !== ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId
  }
  _Lc() {
    return this.hLc.HasText
  }
  cLc() {
    return 3 === this.hLc.Type
  }
  uLc() {
    var t = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState();
    return 2 === this.hLc.Type && this.hLc.Id === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId && (4 === t || 8 === t)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length) {
      var e, i = t[0];
      if ("ChoicesSelect" === i && 1 < this.hLc.ChoiceIds.length)
        if (this.uLc()) return [e = this.GetItem(3), e];
      return "FirstChoice" === i && this.uLc() ? this.aLc?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
    }
  }
}
exports.CiacconaGalStepItemContainer = CiacconaGalStepItemContainer;
//# sourceMappingURL=CiacconaGalStepItemContainer.js.map