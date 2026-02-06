"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadTopPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const GamepadPhoneMessageButton_1 = require("../Phone/GamepadPhoneMessageButton");
const iconTypeSprite = {
  [0]: "T_IconPcBtn_Xbox17_UI",
  1: "T_IconPcBtn_Xbox17_UI",
  3: "T_IconPcBtn_PsCai_UI",
  4: "T_IconPcBtn_PsCai_UI",
  2: "T_IconPcBtn_Xbox17_UI",
  5: "T_IconPcBtn_Xbox17_UI",
  6: "T_IconPcBtn_Xbox17_UI",
  7: "T_IconPcBtn_Xbox17_UI"
};
class GamepadTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.kgl = undefined;
    this.SPe = undefined;
    this.C$l = undefined;
    this.JOm = undefined;
    this.g$l = e => {
      if (e) {
        this.C$l?.PlayLevelSequenceByName("BtnShow");
        this.GetItem(1).SetUIActive(true);
      }
    };
    this.$Wl = () => {
      var e = this.GetItem(3).bIsUIActive || this.GetItem(4).bIsUIActive || this.GetItem(5).bIsUIActive || this.GetItem(6).bIsUIActive || this.GetItem(8).bIsUIActive || this.GetItem(9).bIsUIActive;
      this.GetItem(1).SetUIActive(e);
    };
    this.XBo = () => {
      if (Info_1.Info.IsInGamepad()) {
        this.SetVisible(5, true);
        this.yQl();
      } else {
        this.SetVisible(5, false);
      }
    };
    this.RQe = (e, t) => {
      if (e === 10023 && t) {
        RedDotController_1.RedDotController.BindRedDot("AdventureBattleButton", this.GetItem(4));
      }
      if (e === 10130 && t) {
        RedDotController_1.RedDotController.BindRedDot("FunctionPhoneMsg", this.GetItem(9));
      }
    };
    this.stt = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton();
      } else {
        UiManager_1.UiManager.OpenView("FunctionView");
      }
    };
    this.E3f = () => {
      this.SPe?.StopSequenceByKey("Phone");
      this.SPe?.PlayLevelSequenceByName("Phone");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.stt]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(2);
    this.AddEvents();
    this.BindRedDot();
    this.kgl = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.C$l = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(0).RootUIComp);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  async InitializeAsync(e) {
    this.JOm = new GamepadPhoneMessageButton_1.GamepadPhoneMessageButton();
    await this.JOm.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  Reset() {
    super.Reset();
    this.SPe?.Clear();
    this.SPe = undefined;
    this.JOm?.Destroy();
    this.JOm = undefined;
    this.RemoveEvents();
    this.RemoveRedDot();
  }
  BindRedDot() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      this.GetItem(1).SetUIActive(false);
    } else {
      RedDotController_1.RedDotController.BindRedDot("BattleViewMenu", this.GetItem(2), this.g$l);
      RedDotController_1.RedDotController.BindRedDot("ActivityEntrance", this.GetItem(3), this.g$l);
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023)) {
        RedDotController_1.RedDotController.BindRedDot("AdventureBattleButton", this.GetItem(4), this.g$l);
      }
      RedDotController_1.RedDotController.BindRedDot("BattleViewGachaButton", this.GetItem(5), this.g$l);
      RedDotController_1.RedDotController.BindRedDot("BattlePass", this.GetItem(6), this.g$l);
      RedDotController_1.RedDotController.BindRedDot("ActivityDirectTrainProEntry", this.GetItem(8), this.g$l);
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10130)) {
        RedDotController_1.RedDotController.BindRedDot("FunctionPhoneMsg", this.GetItem(9), this.g$l);
      }
    }
  }
  RemoveRedDot() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      RedDotController_1.RedDotController.UnBindRedDot("BattleViewMenu");
      RedDotController_1.RedDotController.UnBindRedDot("ActivityEntrance");
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023)) {
        RedDotController_1.RedDotController.UnBindRedDot("AdventureBattleButton");
      }
      RedDotController_1.RedDotController.UnBindRedDot("BattleViewGachaButton");
      RedDotController_1.RedDotController.UnBindRedDot("BattlePass");
      RedDotController_1.RedDotController.UnBindRedDot("ActivityDirectTrainProEntry");
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneTipsClose, this.E3f);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneTipsClose, this.E3f);
  }
  OnShowBattleChildView() {
    this.$Wl();
    this.yQl();
    this.zpg();
    this.kgl?.PlayLevelSequenceByName("BtnShow");
  }
  OnHideBattleChildView() {
    this.Jpg();
    this.kgl?.PlayLevelSequenceByName("BtnHide");
  }
  yQl() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(iconTypeSprite[Info_1.Info.InputControllerType]);
    this.SetTextureByPath(e, this.GetTexture(7));
  }
  zpg() {
    var e = !ModelManager_1.ModelManager.PhoneMsgModel.IsAllPhoneMsgRead();
    var e = ModelManager_1.ModelManager.PhoneMsgModel.IsHasUnReceivedMsg() || e;
    var t = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10130) && e && !t) {
      this.JOm?.OnShowGamepadTopPanel();
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  Jpg() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10130)) {
      this.JOm?.OnHideGamepadTopPanel();
    }
  }
  GetPanelItem(e) {
    if (e === "PhoneMsgButton") {
      return this.GetItem(9);
    }
  }
  GetPhoneMsgButton() {
    return this.JOm;
  }
}
exports.GamepadTopPanel = GamepadTopPanel;
//# sourceMappingURL=GamepadTopPanel.js.map