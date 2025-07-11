"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceSentenceSelectItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceSentenceSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.rje = undefined;
    this.Lke = () => ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !== this.rje;
    this.ije = () => {
      if (ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !== this.rje) {
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex = this.rje;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceSort);
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.Lke);
  }
  UpdateItem(e) {
    this.GetExtendToggle(0).OnStateChange.Clear();
    this.GetExtendToggle(0).OnStateChange.Add(this.ije);
    this.rje = e;
    this.Og();
    this.nje();
  }
  Og() {
    var e = this.GetExtendToggle(0).ToggleState;
    var t = ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex !== this.rje ? 0 : 1;
    if (e !== t) {
      this.GetExtendToggle(0).SetToggleStateForce(t, false);
    }
  }
  nje() {
    let e = "";
    e = this.rje === 0 ? "AdviceFirstSentence" : "AdviceSecondSentence";
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), e);
  }
  OnBeforeDestroy() {}
}
exports.AdviceSentenceSelectItem = AdviceSentenceSelectItem;
//# sourceMappingURL=AdviceSentenceSelectItem.js.map