"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceWordSelectItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.sje = 0;
    this.E9 = 0;
    this.vje = () => {
      this.Og();
    };
    this.jbe = () => {
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId = this.sje;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceWord);
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceWord, this.vje);
  }
  Update(e, t) {
    this.sje = e;
    this.E9 = t;
    this.Og();
    this.T2e();
  }
  nHe() {
    var e = this.GetExtendToggle(0).ToggleState;
    if (this.sje === ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId) {
      if (e !== 1) {
        this.GetExtendToggle(0).SetToggleStateForce(1, false);
      }
    } else if (e !== 0) {
      this.GetExtendToggle(0).SetToggleStateForce(0, false);
    }
  }
  T2e() {
    if (this.E9 === 0) {
      let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(this.sje);
      e = e.replace("{}", "_");
      this.GetText(1).SetText(e);
    } else {
      var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(this.sje);
      this.GetText(1).SetText(e);
    }
  }
  Og() {
    var e = this.sje === ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId;
    this.GetItem(2).SetUIActive(e);
    this.nHe();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceWord, this.vje);
  }
}
exports.AdviceWordSelectItem = AdviceWordSelectItem;
//# sourceMappingURL=AdviceWordSelectItem.js.map