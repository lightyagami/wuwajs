"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepChoiceList = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const CiacconaGalStepChoiceItem_1 = require("./CiacconaGalStepChoiceItem");
class CiacconaGalStepChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tLc = [];
    this.hLc = undefined;
    this.iLc = undefined;
    this.rLc = () => {
      return new CiacconaGalStepChoiceItem_1.CiacconaGalStepChoiceItem();
    };
    this.AOe = () => {
      if (this.hLc) {
        this.Refresh(this.hLc);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.iLc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.rLc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaChapterDataUpdate, this.AOe);
  }
  Refresh(e) {
    this.hLc = e;
    let t = !(this.tLc = []);
    for (const s of e.ChoiceIds) {
      var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(s);
      this.tLc.push(i);
      if (i.NeedInspiration) {
        t = true;
      }
    }
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow, true);
    }
    this.iLc.RefreshByData(this.tLc);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstChoice" && this.tLc.length > 1) {
      e = this.iLc?.GetGridByDisplayIndex(0);
      if (e) {
        return [e, e];
      }
    }
  }
}
exports.CiacconaGalStepChoiceList = CiacconaGalStepChoiceList;
//# sourceMappingURL=CiacconaGalStepChoiceList.js.map