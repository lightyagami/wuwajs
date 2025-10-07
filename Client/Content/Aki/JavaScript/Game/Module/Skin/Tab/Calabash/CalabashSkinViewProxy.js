"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinViewProxy = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const UiCameraHandleData_1 = require("../../../UiCameraAnimation/UiCameraContext/UiCameraHandleData");
const CalabashSkinData_1 = require("./CalabashSkinData");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
class CalabashSkinViewProxy {
  constructor() {
    this.View = undefined;
    this.SkinRootViewModel = undefined;
    this.TimeHandler = undefined;
    this.FailRequestCd = 0;
    this.NeedStopRotate = false;
    this.SkinDataList = [];
    this.EquipSkinId = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.SelectedSkinId = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.SkinIdFromSkip = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.CalabashHideUiClick = i => {
      if (i === 1) {
        this.View?.ShowView();
        this.SkinRootViewModel.ShowRootView();
        this.View?.SwitchHuluRotate(false);
        this.VDd();
        this.iHa();
      } else {
        this.View?.HideView();
        this.SkinRootViewModel.HideRootView();
        this.View?.SwitchHuluRotate(this.NeedStopRotate);
        this.jDd();
      }
    };
    this.CalabashConfirmClick = async () => {
      var i;
      var a;
      if (!this.TimeHandler) {
        if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
          if (await ControllerHolder_1.ControllerHolder.CalabashSkinController.RequestCalabashSkinTakeOn(this.SelectedSkinId)) {
            i = this.Ril(this.EquipSkinId);
            a = this.Ril(this.SelectedSkinId);
            this.View?.RefreshGridSelect(i, a);
            this.View?.RefreshConfirmBox(true);
            this.View?.ShowEquipTips();
            this.View?.RefreshMainRoleHulu();
            this.EquipSkinId = this.SelectedSkinId;
          }
        } else {
          this.HDd();
        }
      }
    };
    this.CalabashGridItemClick = i => {
      i = i.Data.SkinId;
      this.Pil(i);
      this.View?.SwitchHuluObserver(i);
      this.SelectedSkinId = i;
    };
    this.CalabashGridItemCanExecuteChange = i => {
      i = i.SkinId;
      return this.SelectedSkinId !== i;
    };
  }
  RegisterView(i, a) {
    this.View = i;
    this.SkinRootViewModel = a;
    this.FailRequestCd = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinFailRequestCd();
    this.NeedStopRotate = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinNeedStopRotate();
  }
  $Dd(i) {
    return new CalabashSkinData_1.CalabashSkinData(i);
  }
  Ril(a) {
    var i = this.SkinDataList.findIndex(i => i.SkinId === a);
    if (i < 0) {
      return 0;
    } else {
      return i;
    }
  }
  Pil(i) {
    var a = this.Ril(i);
    var t = this.SkinDataList[a];
    this.View?.RefreshBottom(t, this.EquipSkinId === i);
    this.View?.RefreshText(t.Name, t.Description);
    this.View?.SelectedGrid(a);
  }
  HDd() {
    this.TimeHandler ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TimeHandler = undefined;
    }, this.FailRequestCd);
  }
  WDd() {
    if (this.TimeHandler) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimeHandler);
      this.TimeHandler = undefined;
    }
  }
  QDd() {
    var i;
    var a;
    if (this.SkinRootViewModel.CameraInputComponent) {
      a = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(CalabashSkinDefine_1.CALABASH_CONFIG_TAG);
      i = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(CalabashSkinDefine_1.DEFAULT_CALABASH_SKIN_CASE), 1).D_K2_GetActorLocation();
      a = {
        DragComponent: this.View.GetDragItem(),
        CameraSettingConfig: a,
        SourceLocation: i
      };
      this.SkinRootViewModel.CameraInputComponent.InitData(a);
    }
  }
  jDd() {
    if (this.SkinRootViewModel.CameraInputComponent) {
      this.QDd();
      this.SkinRootViewModel.CameraInputComponent.CanCameraInput = true;
      this.SkinRootViewModel.CameraInputComponent.Start();
      this.SkinRootViewModel.CameraInputComponent.Activate();
    }
  }
  VDd() {
    if (this.SkinRootViewModel.CameraInputComponent) {
      this.SkinRootViewModel.CameraInputComponent.CanCameraInput = false;
      this.SkinRootViewModel.CameraInputComponent.End();
    }
  }
  iHa() {
    var i = UiCameraHandleData_1.UiCameraHandleData.NewByView("CalabashSkinTabView");
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandle(i, true, true, "1001");
  }
  InitGridSelected() {
    if (this.SkinIdFromSkip !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      this.SelectedSkinId = this.SkinIdFromSkip;
    } else {
      this.SelectedSkinId = ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId();
    }
    this.EquipSkinId = ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId();
    this.Pil(this.SelectedSkinId);
  }
  InitSkinDataList() {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfigList();
    const a = this.$Dd(CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID);
    this.SkinDataList.push(a);
    for (const s of i) {
      var t = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(s.Id);
      if (t) {
        var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.Id);
        if (!(e <= 0) || t.ShowWhenLocked) {
          const a = this.$Dd(s.Id);
          this.SkinDataList.push(a);
        }
      }
    }
    this.SkinDataList.sort((i, a) => {
      var t;
      if (i.IsEmptyData !== a.IsEmptyData) {
        if (i.IsEmptyData) {
          return -1;
        } else {
          return 1;
        }
      } else if ((t = i.GetIsLock()) !== a.GetIsLock()) {
        if (t) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return a.SortIndex - i.SortIndex;
      }
    });
  }
  BeforeDestroy() {
    this.View?.ReleaseHuluObserver();
    this.WDd();
  }
}
exports.CalabashSkinViewProxy = CalabashSkinViewProxy;
//# sourceMappingURL=CalabashSkinViewProxy.js.map