"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleControlMobilePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TouchUiEditApplyHelper_1 = require("../../../../InputSettings/TouchUiEdit/TouchUiEditApplyHelper");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MotorcycleControlPanelBase_1 = require("./MotorcycleControlPanelBase");
const MotorcycleJoystick_1 = require("./MotorcycleJoystick");
const MotorcycleSkillButtonMobilePanel_1 = require("./MotorcycleSkillButtonMobilePanel");
class MotorcycleControlMobilePanel extends MotorcycleControlPanelBase_1.MotorcycleControlPanelBase {
  constructor() {
    super(...arguments);
    this.aza = undefined;
    this.TJe = undefined;
    this.S8g = false;
    this.Mug = e => {
      if (e === 2) {
        this.RCd();
      }
    };
    this.C8g = () => {
      this.rxg();
      this.RCd();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.InitChildType(43);
    await Promise.all([this.Xef(), this.XJe()]);
  }
  async Xef() {
    this.aza = new MotorcycleSkillButtonMobilePanel_1.MotorcycleSkillButtonMobilePanel();
    await this.aza.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  async XJe() {
    this.TJe = new MotorcycleJoystick_1.MotorcycleJoystick();
    await this.TJe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), this.RootItem);
  }
  OnStart() {
    super.OnStart();
    this.rxg();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorcycleRoundJoystickChanged, this.C8g);
  }
  OnBeforeShow() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[摩托车]手机端操作界面显示");
    }
    super.OnBeforeShow();
    this.aza?.SetVisible(0, true);
    this.RCd();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTouchUiEditSave, this.Mug);
  }
  OnBeforeHide() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[摩托车]手机端操作界面隐藏");
    }
    super.OnBeforeHide();
    this.aza?.SetVisible(0, false);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTouchUiEditSave, this.Mug);
  }
  Tick(e) {
    if (this.IsShowOrShowing && (this.aza?.Tick(e), this.S8g)) {
      this.TJe?.Tick(e);
    }
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorcycleRoundJoystickChanged, this.C8g);
    this.aza?.Destroy();
    this.aza = undefined;
    this.TJe?.Destroy();
    this.TJe = undefined;
    super.Reset();
  }
  RCd() {
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetIsRoundJoystick()) {
      TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(3, this.aza, "UiItem_MotorcycleMobileKeyRoundStickEdit");
    } else {
      TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(2, this.aza, "UiItem_MotorcycleMobileKey");
    }
    TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(2, this.TJe, "UiItem_MotorcycleJoystickEdit");
  }
  rxg() {
    var e = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    this.S8g = !e.GetIsRoundJoystick();
    this.TJe?.SetEnable(this.S8g);
  }
}
exports.MotorcycleControlMobilePanel = MotorcycleControlMobilePanel;
//# sourceMappingURL=MotorcycleControlMobilePanel.js.map