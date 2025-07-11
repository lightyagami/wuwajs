"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailSwitchItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.LDo = undefined;
    this.Lke = () => ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId !== this.LDo.Index;
    this.DDo = () => {
      ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId = this.LDo.Index;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn);
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.DDo]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.SetToggleGroup(undefined);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.Lke);
  }
  Update(e) {
    e = (this.LDo = e).Name;
    this.GetText(1).SetText(e);
    this.Og();
  }
  Og() {
    if (ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId !== this.LDo.Index) {
      this.GetExtendToggle(0).SetToggleStateForce(0, false);
    } else {
      this.GetExtendToggle(0).SetToggleStateForce(1, false);
    }
  }
}
exports.TowerDetailSwitchItem = TowerDetailSwitchItem;
//# sourceMappingURL=TowerDetailSwitchItem.js.map