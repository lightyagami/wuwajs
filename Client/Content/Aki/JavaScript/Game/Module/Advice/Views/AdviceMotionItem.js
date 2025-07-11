"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceMotionItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AdviceMotionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.NHe = 0;
    this.kqe = () => {
      ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId = this.NHe;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceMotion);
    };
    this.x7e = () => {
      this.Oqe();
    };
    this.Lke = () => {
      var e;
      var t;
      var i = this.NHe === ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId;
      if (this.NHe === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()) {
        return !i;
      } else {
        e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(this.NHe);
        if (e = (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(e, this.NHe)) === 0 || e === 1) {
          t = ConfigManager_1.ConfigManager.ComposeConfig.GetConditionInfo(ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(this.NHe).CondGroupId);
          t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.HintText);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UnlockCondition", t);
        }
        return !i && !e;
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.Lke);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
  }
  Update(e) {
    this.NHe = e;
    this.Og();
  }
  Og() {
    this.rHe();
    this.Aqe();
    this.P5e();
    this.Oqe();
    this.wke();
  }
  P5e() {
    let e = "";
    e = this.NHe === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId() ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParamsContent(this.NHe) : ConfigManager_1.ConfigManager.MotionConfig.GetMotionContent(this.NHe);
    this.GetText(1).SetText(e);
  }
  Aqe() {
    let e = "";
    e = (this.NHe === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId() ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParams(this.NHe) : ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(this.NHe)).MotionImg;
    this.SetTextureByPath(e, this.GetTexture(2));
  }
  rHe() {
    var e = this.NHe === ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId;
    this.GetItem(4).SetUIActive(e);
  }
  Oqe() {
    var e = this.NHe === ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId ? 1 : 0;
    if (this.GetExtendToggle(0).ToggleState !== e) {
      this.GetExtendToggle(0).SetToggleStateForce(e, false);
    }
  }
  wke() {
    var e;
    if (this.NHe === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()) {
      this.GetSprite(3).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
    } else {
      e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(this.NHe);
      e = (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(e, this.NHe)) === 0 || e === 1;
      this.GetSprite(3).SetUIActive(e);
      this.GetItem(5).SetUIActive(e);
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
  }
}
exports.AdviceMotionItem = AdviceMotionItem;
//# sourceMappingURL=AdviceMotionItem.js.map