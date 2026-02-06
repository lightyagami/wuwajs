"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine");
const UiProhibitFightInputCenter_1 = require("../../../Ui/InputDistribute/UiProhibit/UiProhibitFightInputCenter");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PilotThrowTargetItem_1 = require("./PilotThrowTargetItem");
const NUMBERIN_ANIM = "Number_In";
class PilotThrowView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Kti = [];
    this.$pt = undefined;
    this.B6e = () => {
      ControllerHolder_1.ControllerHolder.PilotThrowController.RequestChangePilotState(false);
      ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint(), 4, undefined, 1);
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e && e.Entity) {
        e.Entity.GetComponent(43)?.StopAllSkills("铁驭中断,停止技能");
      }
      for (const t of this.Kti) {
        t.Close();
      }
      this.Kti.length = 0;
      this.CloseMe();
    };
    this.jZd = () => {
      ControllerHolder_1.ControllerHolder.PilotThrowController.RequestChangePilotState(true);
      ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(ModelManager_1.ModelManager.PilotThrowModel.GetCurrentInteractHookPoint(), 4, undefined, 2);
      for (const e of this.Kti) {
        e.Close();
      }
      this.Kti.length = 0;
      this.CloseMeAsync();
    };
    this.bpr = () => {
      for (const e of this.Kti) {
        e.Close();
      }
      this.Kti.length = 0;
      this.CloseMeAsync();
    };
    this.Fef = e => {
      this.$pt?.StopSequenceByKey("Ready_In");
      this.$pt?.StopSequenceByKey("Ready_Out");
      this.$pt?.PlayLevelSequenceByName(e ? "Ready_In" : "Ready_Out");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIArtText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.B6e], [2, this.jZd]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.PilotThrowModel.GetPilotThrowTargets();
    this.GetArtText(1)?.SetText(e.length.toString());
    this.kyr();
    await this.WZd(e);
    this.GetItem(4)?.SetUIActive(false);
  }
  OnStart() {
    this.$pt?.PlayLevelSequenceByName(NUMBERIN_ANIM);
    this.Fk1();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    ControllerHolder_1.ControllerHolder.PilotThrowController.GenerateProjectilePoints();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    ControllerHolder_1.ControllerHolder.PilotThrowController.ClearProjectilePoints();
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSpecialGameplayCamera();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
  }
  OnBeforeDestroy() {
    this.Vk1();
  }
  kyr() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  async WZd(e) {
    this.Kti.length = 0;
    var t = [];
    for (const r of e) {
      var i = new PilotThrowTargetItem_1.PilotThrowTargetItem(r);
      i.OnTargetInOutRange = this.Fef;
      t.push(i.CreateThenShowByResourceIdAsync("UiItem_IronCrossbowPoint", UiLayer_1.UiLayer.WorldSpaceUiRootItem));
      this.Kti.push(i);
    }
    await Promise.all(t);
  }
  OnTick(e) {
    for (const t of this.Kti) {
      t.OnTick(e);
    }
  }
  CheckCondition() {
    return true;
  }
  GetDistributeTags() {
    return [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInput.CameraRotationTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag];
  }
  Fk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.RegisterExtraRefreshData(this.Info.Name, this);
  }
  Vk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.UnRegisterExtraRefreshData(this.Info.Name);
  }
}
exports.PilotThrowView = PilotThrowView;
//# sourceMappingURL=PilotThrowView.js.map