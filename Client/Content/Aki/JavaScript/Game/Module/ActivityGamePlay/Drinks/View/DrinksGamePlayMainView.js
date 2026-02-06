"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksGamePlayMainView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const DrinksDefine_1 = require("../DrinksDefine");
const DrinkBubblePanel_1 = require("./Item/DrinkBubblePanel");
const DrinksBlackMask_1 = require("./Item/DrinksBlackMask");
const DrinksCurrentStatePanel_1 = require("./Item/DrinksCurrentStatePanel");
const DrinksDialogBubble_1 = require("./Item/DrinksDialogBubble");
const DrinksFlavorBubblePanel_1 = require("./Item/DrinksFlavorBubblePanel");
const DrinksMenuPanel_1 = require("./Item/DrinksMenuPanel");
const DrinksQTEPanel_1 = require("./Item/DrinksQTEPanel");
const DrinksRoleStateItem_1 = require("./Item/DrinksRoleStateItem");
const DrinksTopStepPanel_1 = require("./Item/DrinksTopStepPanel");
class DrinksGamePlayMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.RoleStatePanel = undefined;
    this.TopPanel = undefined;
    this.MenuPanel = undefined;
    this.CurValuePanel = undefined;
    this.QTEPanel = undefined;
    this.BubblePanel = undefined;
    this.BubbleFlavorPanel = undefined;
    this.DialogBubble = undefined;
    this.MaskPanel = undefined;
    this.NeedTickQTE = false;
    this.StopTickOnClickClose = false;
    this.QTELevelSequence = undefined;
    this.NeedShowPlayer = false;
    this.CurCameraName = "";
    this.HasInitCamera = false;
    this.lyt = () => {
      this.StopTickOnClickClose = true;
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(431);
      e.IsEscViewTriggerCallBack = false;
      e.FunctionMap.set(0, () => {
        this.StopTickOnClickClose = false;
      });
      e.FunctionMap.set(1, () => {
        this.NeedTickQTE = false;
        ModelManager_1.ModelManager.DrinksModel.RestartGame();
      });
      e.FunctionMap.set(2, () => {
        var e = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
        if (ModelManager_1.ModelManager.DrinksModel.GameplayOpenWay === 3) {
          e.ShowNpc();
        }
        e.Destroy(true);
        this.NeedShowPlayer = true;
        this.CloseMe();
        if (ModelManager_1.ModelManager.DrinksModel.GameplayIsMainQuest) {
          ModelManager_1.ModelManager.DrinksModel.HideMainQuestNpcByEntityId();
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.CXf = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(430);
      e.FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.DrinksModel.BackToPrevStep();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyGuideBreakFocus);
    };
    this.ryg = e => {
      if (e === "Qteout") {
        this.QTEPanel.OnFadeSequenceEnd();
      }
    };
    this.W8g = e => {
      if (e === "HelpView") {
        this.StopTickOnClickClose = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.CXf]];
  }
  async OnBeforeStartAsync() {
    this.RegisterProxy();
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetHelpCallBack(() => {
      this.StopTickOnClickClose = true;
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(DrinksDefine_1.DRINKS_HELP_ID);
    });
    this.RoleStatePanel = new DrinksRoleStateItem_1.DrinksRoleStateItem();
    e.push(this.RoleStatePanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.TopPanel = new DrinksTopStepPanel_1.DrinksTopStepPanel();
    e.push(this.TopPanel.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.MenuPanel = new DrinksMenuPanel_1.DrinksMenuPanel();
    e.push(this.MenuPanel.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.CurValuePanel = new DrinksCurrentStatePanel_1.DrinksCurrentStatePanel();
    e.push(this.CurValuePanel.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.QTEPanel = new DrinksQTEPanel_1.DrinksQTEPanel();
    e.push(this.QTEPanel.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.BubblePanel = new DrinkBubblePanel_1.DrinksBubblePanel();
    e.push(this.BubblePanel.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.BubbleFlavorPanel = new DrinksFlavorBubblePanel_1.DrinksFlavorBubblePanel();
    e.push(this.BubbleFlavorPanel.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.DialogBubble = new DrinksDialogBubble_1.DrinksDialogBubble();
    e.push(this.DialogBubble.CreateByActorAsync(this.GetItem(10).GetOwner()));
    this.MaskPanel = new DrinksBlackMask_1.DrinksBlackMask();
    e.push(this.MaskPanel.CreateByActorAsync(this.GetItem(9).GetOwner()));
    var i = ModelManager_1.ModelManager.DrinksModel.GetSceneController();
    e.push(i.InitOnGameStart());
    await Promise.all(e);
    this.DialogBubble.SetUiActive(false);
    this.MaskPanel.SetUiActive(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.W8g);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.W8g);
  }
  OnStart() {
    this.QTELevelSequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.QTELevelSequence.BindSequenceCloseEvent(this.ryg);
    this.OnGameCurrentStepStart();
  }
  OnBeforeShow() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
  }
  OnBeforeDestroy() {
    if (this.NeedShowPlayer && ModelManager_1.ModelManager.DrinksModel.GameplayOpenWay === 3) {
      UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    }
    ModelManager_1.ModelManager.DrinksModel.RegisterProxy(false);
  }
  PushCameraHandle(e, i, t) {
    if (!this.HasInitCamera) {
      this.CurCameraName = e;
      this.HasInitCamera = true;
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e, i, t);
    }
  }
  PushCamera(e) {
    if (e !== this.CurCameraName && this.HasInitCamera) {
      this.CurCameraName = e;
      e = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraMappingConfig(e);
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.DefaultUiCameraSettingsName, true, true, "1001");
    }
  }
  PopCameraHandle(e, i, t, n) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e, i, t, n);
  }
  OnTick(e) {
    if (this.NeedTickQTE && !this.StopTickOnClickClose) {
      this.QTEPanel.OnTick(e);
    }
  }
  RegisterProxy() {
    var e = ModelManager_1.ModelManager.DrinksModel;
    e.RegisterProxy(true);
    e.GetProxy().RegisterMainView(this);
  }
  OnGameCurrentStepStart() {
    var e;
    this.lqe?.SetCloseBtnActive(true);
    this.lqe?.SetHelpBtnActive(true);
    this.StopTickOnClickClose = false;
    this.RefreshButtonState();
    this.QTEPanel.SetUiActive(false);
    this.TopPanel.UpdateStep();
    this.CurValuePanel.UpdateStep();
    this.QTELevelSequence?.PlayLevelSequenceByName("RigthUIin");
    this.MenuPanel.UpdateOnStepStart();
    this.BubblePanel.UpdateState(false);
    this.BubbleFlavorPanel.RefreshOnStart();
    if (ModelManager_1.ModelManager.DrinksModel.GetCurStep() < 4) {
      this.PushCamera("DrinksGameplayView");
    } else {
      e = ModelManager_1.ModelManager.DrinksModel.GetRoleId();
      e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfigByRole(e);
      this.PushCamera(e.OrnamentCamera);
    }
  }
  OnGameCurrentStepEnd() {
    this.RefreshButtonState(true);
    this.TopPanel.UpdateStepItem();
    this.BubblePanel.HideBubble();
  }
  OnDrinkBaseSelected(e, i) {
    this.TopPanel?.UpdateStepItem();
    this.BubblePanel.UpdateState(i);
    this.CurValuePanel?.OnDrinkSelected(e);
  }
  OnBatchingSelected(e, i) {
    this.TopPanel?.UpdateStepItem();
    if (i && e.size > 0) {
      this.MenuPanel?.SetRaycastOnStepEnd();
    }
    this.BubblePanel.UpdateState(i);
    this.CurValuePanel?.OnBatchingSelected(e);
  }
  OnNoBatchingConfirm() {
    this.MenuPanel?.SetRaycastOnStepEnd();
  }
  OnOrnamentSelected(e) {
    if (e) {
      this.MenuPanel?.SetRaycastOnStepEnd();
    }
    this.RoleStatePanel?.RefreshCurState();
    this.TopPanel?.UpdateStepItem();
  }
  OnEnterDrinkBaseQTE() {
    this.RefreshButtonState(true);
    this.DialogBubble.DeactivateBubble(true);
    this.MenuPanel?.SetRaycastOnStepEnd();
    this.QTELevelSequence?.PlayLevelSequenceByName("RigthUIout");
    this.QTEPanel.StartQTE();
    this.BubblePanel.HideBubble();
  }
  UpdateRoleRequire() {
    this.RoleStatePanel?.RefreshCurState();
  }
  UpdateFlavorBubble() {
    this.RefreshButtonState(true);
    this.DialogBubble.DeactivateBubble(true);
    this.CurValuePanel.RefreshOnEnterSeq();
    if (ModelManager_1.ModelManager.DrinksModel.GetCurStep() > 1) {
      this.MenuPanel?.SetRaycastOnStepEnd();
      this.QTELevelSequence?.PlayLevelSequenceByName("RigthUIout");
    }
    this.BubblePanel.HideBubble();
    this.BubbleFlavorPanel.Refresh();
  }
  ActivateDialogBubble(e, i) {
    this.DialogBubble.ActivateBubble(e, i);
  }
  DeactivateDialogBubble() {
    this.DialogBubble.DeactivateBubble(true);
  }
  ShowBackMask(e) {
    return this.MaskPanel.ShowBackMask(e);
  }
  RefreshButtonState(e = false) {
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurStep() !== 0;
    this.GetButton(4)?.RootUIComp.SetUIActive(i && !e);
  }
  SetNeedTickQTE(e) {
    if (this.NeedTickQTE = e) {
      this.QTELevelSequence?.PlayLevelSequenceByName("Qtein");
    } else {
      if (this.QTELevelSequence?.IsPlayingSequence("Qtein")) {
        this.QTELevelSequence?.StopCurrentSequence(false, true);
      }
      TimerSystem_1.TimerSystem.Delay(() => {
        this.QTELevelSequence?.PlayLevelSequenceByName("Qteout");
      }, 1000);
    }
  }
  SetShakeCamera(e) {
    UiCameraAnimationController_1.UiCameraAnimationController.DeepCopyCamera(e);
    ControllerHolder_1.ControllerHolder.CameraController.SetViewTarget(UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetCameraActor(), "DrinksGameplayView");
  }
  HideCaptionClose() {
    this.lqe?.SetCloseBtnActive(false);
    this.lqe?.SetHelpBtnActive(false);
  }
  OnFinishMixing() {
    this.DeactivateDialogBubble();
    this.SetUiActive(false);
  }
  OnFinishMixingEnd() {
    var e = {
      Data: ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData(),
      RoleId: ModelManager_1.ModelManager.DrinksModel.GetRoleId(),
      IsGamePlay: true
    };
    UiManager_1.UiManager.OpenView("DrinksShowView", e, () => {
      this.NeedShowPlayer = false;
      this.CloseMe();
    });
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "Ornament" && (e = Number(e[1])) && (e = this.MenuPanel.GuideGetOrnamentItem(e))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.DrinksGamePlayMainView = DrinksGamePlayMainView;
//# sourceMappingURL=DrinksGamePlayMainView.js.map