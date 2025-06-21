"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalStepChoiceList = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CiacconaGalStepChoiceItem_1 = require("./CiacconaGalStepChoiceItem");
class CiacconaGalStepChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.tLc = [], this.hLc = void 0, this.iLc = void 0, this.rLc = () => {
      return new CiacconaGalStepChoiceItem_1.CiacconaGalStepChoiceItem
    }, this.AOe = () => {
      this.hLc && this.Refresh(this.hLc)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.iLc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.rLc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe)
  }
  Refresh(e) {
    this.hLc = e;
    let t = !(this.tLc = []);
    for (const s of e.ChoiceIds) {
      var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(s);
      this.tLc.push(i), i.NeedInspiration && (t = !0)
    }
    t && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow, !0), this.iLc.RefreshByData(this.tLc)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length && ("FirstChoice" === e[0] && 1 < this.tLc.length)) {
      e = this.iLc?.GetGridByDisplayIndex(0);
      if (e) return [e, e]
    }
  }
}
exports.CiacconaGalStepChoiceList = CiacconaGalStepChoiceList;
//# sourceMappingURL=CiacconaGalStepChoiceList.js.map