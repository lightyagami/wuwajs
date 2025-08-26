"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleRootView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const RoleTabItem_1 = require("../Common/TabComponent/TabItem/RoleTabItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const GuideConfig_1 = require("../Guide/GuideConfig");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const RoleBackgroundMusicSwitchItem_1 = require("./Component/RoleBackgroundMusicSwitchItem");
const RoleListComponent_1 = require("./Component/RoleListComponent");
const RoleDefine_1 = require("./RoleDefine");
class OperationParam {
  constructor(e, t) {
    this.OperationType = e;
    this.Param = t;
  }
}
class RoleRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RoleBackgroundMusicSwitchItem = undefined;
    this.RoleListComponent = undefined;
    this.TabViewComponent = undefined;
    this.TabComponent = undefined;
    this.dmo = undefined;
    this.TabDataList = [];
    this.Nlo = 0;
    this.RoleRootUiCameraHandleData = undefined;
    this.I6e = 0;
    this.rmo = undefined;
    this.RHt = undefined;
    this.nmo = 0;
    this.L6e = undefined;
    this.smo = true;
    this.cVi = new Map();
    this.amo = new Map();
    this.U8i = false;
    this.A8i = undefined;
    this.d1o = undefined;
    this.hmo = new Queue_1.Queue();
    this.pjt = false;
    this.RDn = true;
    this.OnRoleSelect = () => {
      var e;
      if (this.Rjt) {
        e = new OperationParam(2);
        this.hmo.Push(e);
      } else {
        this.Ujt();
        this.OnRoleSelectAsync().finally(() => {
          this.Jft();
        });
      }
    };
    this.OnSelectRoleTabOutside = e => {
      this.Ujt();
      this.SelectRoleTabOutSide(e).finally(() => {
        this.Jft();
      });
    };
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.R6e = (e, t) => {
      return new RoleTabItem_1.RoleTabItem();
    };
    this.pqe = e => {
      this.nmo++;
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      var s = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, s, this.d1o);
      this.I6e = e;
      this.rmo = i;
      this.lmo(e, this.nmo);
      this.U8i = this.P8i();
      this.nn_(i);
      this.RefreshRoleBackgroundMusicSwitchItem();
    };
    this.q8i = e => {
      if (e !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddPitchInput(-e);
      }
    };
    this.G8i = e => {
      if (e !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddYawInput(e);
      }
    };
    this.PUn = (e, t) => {
      if (t !== 0 && this.U8i && Info_1.Info.IsInGamepad()) {
        this.A8i.AddZoomInput(t);
      }
    };
    this._mo = () => {
      var e;
      if (this.U8i && (e = UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData())) {
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e.HandleName, true, true, "1001");
      }
    };
    this.Eqt = (e, t) => {
      if (this.U8i && t.TouchType === 2) {
        this.Egt();
      }
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
    this.OnInternalViewQuit = () => {
      this.d1o.RoleViewState = 0;
      this._Vi();
      this.TabComponent.ShowItem();
    };
    this.OnInternalViewEnter = () => {
      this.d1o.RoleViewState = 1;
      this.umo();
      this.TabComponent.HideItem();
    };
    this.RoleListClick = () => {
      UiManager_1.UiManager.OpenView("RoleSelectionView", this.d1o);
    };
    this.x8i = undefined;
    this.w8i = e => {
      if (this.U8i) {
        this.x8i = e.GetLocalPointInPlane();
      }
    };
    this.B8i = e => {
      var t;
      if (!this.U8i || TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")) {
        this.x8i = undefined;
      } else {
        t = this.x8i;
        this.x8i = e.GetLocalPointInPlane();
        if (t && (e = this.x8i.X - t.X, t = this.x8i.Y - t.Y, e != 0 && this.A8i.AddYawInput(e), t != 0)) {
          this.A8i.AddPitchInput(t);
        }
      }
    };
    this.b8i = e => {
      if (this.U8i) {
        this.x8i = undefined;
      }
    };
    this.N8i = e => {
      if (this.U8i && e.scrollAxisValue !== 0) {
        this.A8i.AddZoomInput(-e.scrollAxisValue);
      }
    };
    this.cmo = () => {
      this.U8i = false;
      this.A8i?.PauseTick();
    };
    this.mmo = e => {
      var t;
      if (this.Z0l(e.ViewName)) {
        e = UiCameraManager_1.UiCameraManager.Get();
        this.A8i = e.AddUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent, false);
        e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetDefaultRoleCameraConfig();
        this.A8i.InitDataByConfig(e);
        this.A8i.SetNeedFloorReflection(true);
        this.U8i = this.P8i();
        if (this.U8i) {
          t = (e = this.dmo).D_K2_GetActorLocation();
          e = (e.Model?.CheckGetComponent(13)).RoleConfigId;
          e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).RoleBody;
          e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(e);
          this.A8i.UpdateData(t, e.镜头浮动最大高度, e.镜头浮动最低高度, e.镜头浮动最长臂长, e.镜头浮动最短臂长);
          this.A8i.Activate();
          this.A8i.ResumeTick();
        } else {
          TimerSystem_1.TimerSystem.Next(() => {
            UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(false, false);
          });
        }
      }
    };
    this.Cmo = e => {
      this.GetItem(2).SetUIActive(e);
    };
    this.gmo = e => {
      this.UiViewSequence.PlaySequencePurely(e ? "hide" : "show");
    };
    this.fmo = () => {
      var e;
      if (this.smo) {
        e = UiSceneManager_1.UiSceneManager.GetUiStartSequenceFrame();
        e = new UE.FrameNumber(e);
        e = new UE.FrameTime(e, 0);
        e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, 1);
        this.RHt.SetPlaybackPosition(e);
      }
    };
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    this.pjt = false;
    if (this.hmo.Size !== 0) {
      var e = this.hmo.Pop();
      if (e) {
        switch (e.OperationType) {
          case 0:
            this.RefreshRoleList();
            break;
          case 1:
            this.RefreshTabList();
            break;
          case 2:
            this.OnRoleSelect();
        }
      }
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIDraggableComponent], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[1, this.RoleListClick]];
  }
  async OnBeforeStartAsync() {
    this.d1o = this.OpenParam;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleRootView"]);
      }
    } else {
      this.RoleBackgroundMusicSwitchItem = new RoleBackgroundMusicSwitchItem_1.RoleBackgroundMusicSwitchItem();
      RenderUtil_1.RenderUtil.BeginPSOSyncMode();
      this.RoleListComponent = new RoleListComponent_1.RoleListComponent();
      await Promise.all([this.RoleListComponent.CreateThenShowByActorAsync(this.GetItem(3).GetOwner(), this.d1o), this.RoleBackgroundMusicSwitchItem.CreateByActorAsync(this.GetItem(9).GetOwner())]);
      this.InitTabComponent();
      this.d1o.RoleViewState = 0;
      this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
      AudioController_1.AudioController.SetSwitch("actor_ui_switch", "sys_ui", this.dmo);
      this.rmo = this.d1o.GetCurSelectTabName();
      this.RefreshRoleSystemModeUiParam();
    }
  }
  ADn() {
    if (this.RDn) {
      this.RDn = false;
      this.dmo ||= UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
      this.LoadFloorEffect();
      this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    }
  }
  OnHandleLoadScene() {
    this.ADn();
  }
  OnBeforeShow() {
    this.ADn();
    this.RefreshRoleList();
  }
  RefreshRoleList() {
    var e;
    if (this.Rjt) {
      e = new OperationParam(0);
      this.hmo.Push(e);
    } else {
      this.Ujt();
      this.RefreshRoleListAsync().finally(() => {
        this.Jft();
      });
    }
  }
  async RefreshRoleListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", true);
    const i = this.d1o.GetRoleIdList();
    const s = this.d1o.GetCurSelectRoleId();
    await this.RoleListComponent.UpdateComponent(i).finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", false);
      var e = i.indexOf(s);
      const t = this.RoleListComponent?.GetSelfScrollView()?.GetScrollItemByIndex(e);
      if (t) {
        TimerSystem_1.TimerSystem.Next(() => {
          this.RoleListComponent.GetSelfScrollView().ScrollTo(t.GetRootItem());
        });
      }
    });
    this.RoleListComponent?.SetCurSelection(s);
  }
  RefreshTabList() {
    var e;
    if (this.Rjt) {
      e = new OperationParam(1);
      this.hmo.Push(e);
    } else {
      this.Ujt();
      this.RefreshTabListAsync().finally(() => {
        this.Jft();
      });
    }
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", true);
    var e = this.d1o.GetRoleTabDataList();
    var t = this.TabDataList.toString() !== e.toString();
    this.TabDataList = e;
    var i = this.TabDataList.length;
    var s = this.TabComponent.CreateTabItemDataByLength(i);
    if (this.d1o.GetRoleSystemUiParams().TabRedDot) {
      var n = this.d1o?.GetCurSelectRoleData();
      for (let e = 0; e < i; e++) {
        var o = this.TabDataList[e].ChildViewName;
        var o = this.GetRedDotName(o);
        if (o) {
          s[e].RedDotName = o;
          s[e].RedDotUid = n.GetDataId();
        }
      }
    }
    await this.TabComponent.RefreshTabItemAsync(s, t).finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", false);
    });
    if (t) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    } else {
      this.TabViewComponent?.SetCurrentTabViewState(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetRoleFlag);
    }
  }
  async OnRoleSelectAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", true);
    this.RefreshUiMode();
    await this.RefreshTabListAsync().finally(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", false);
    });
  }
  async SelectRoleTabOutSide(t) {
    var e = new CustomPromise_1.CustomPromise();
    await Promise.all([this.UiViewSequence.PlaySequenceAsync("RoleListStart", e), this.TabComponent.ShowItemAsync()]);
    this.d1o.RoleViewState = 0;
    var e = this.TabDataList.findIndex(e => e.ChildViewName === t);
    this.TabComponent.SelectToggleByIndex(e);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(2), e, this.CloseClick);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(4));
  }
  nn_(e) {
    this.TabComponent?.SetHelpButtonShowState(false);
    if (e === "RolePhantomTabView") {
      this.TabComponent?.SetHelpButtonCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipHelpGroupId());
      });
      this.TabComponent?.SetHelpButtonShowState(true);
    }
  }
  lmo(s, e) {
    const n = this.TabDataList[s].LightSequence;
    var t = this.cVi.get(s);
    if (t) {
      if (this.RHt) {
        this.RHt.Stop();
        this.smo = false;
        this.RHt = undefined;
      }
      (t = t.SequencePlayer).Play();
      this.smo = true;
      this.RHt = t;
    } else if (this.amo.get(s) !== 1) {
      this.amo.set(s, 1);
      ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.LevelSequence, e => {
        var t;
        var i;
        if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
          e = e;
          (i = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = true;
          t = (0, puerts_1.$ref)(undefined);
          UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), t);
          (t = (0, puerts_1.$unref)(t)).PlaybackSettings = i;
          t.SetSequence(e);
          this.cVi.set(s, t);
          if (this.RHt) {
            this.RHt.Stop();
            this.smo = false;
            this.RHt = undefined;
          }
          if (this.I6e === s) {
            this.RHt = t.SequencePlayer;
            t.bOverrideInstanceData = true;
            i = t.DefaultInstanceData;
            e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
            i.TransformOrigin = e;
            this.RHt.Play();
            this.smo = true;
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 43, "加载level sequence失败:", ["sequencePath", n]);
        }
        this.amo.set(s, 0);
      });
    }
  }
  Egt() {
    var e;
    if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
      e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      this.A8i.AddZoomInput(-e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.Rjt) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 43, "异步操作执行过程中不能触发引导");
      }
    } else {
      if (e.length === 2 && e[0] === GuideConfig_1.GuideConfig.TabTag) {
        if (!this.TabComponent) {
          t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
          this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(2), t, this.CloseClick);
        }
        var t = this.TabComponent.GetTabComponent().GetLayout();
        if (!t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 16, "角色界面聚焦引导的额外参数配置有误, 找不到Layout", ["configParams", e]);
          }
          return;
        }
        const s = Number(e[1]);
        t = t.GetLayoutItemByIndex(s);
        if (t) {
          return [t.GetRootItem(), t.GetIconSprite()];
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 43, "Layout加载未完成");
          }
          return;
        }
      }
      if (e.length === 2 && e[0] === GuideConfig_1.GuideConfig.SlotTag) {
        const s = Number(e[1]);
        t = this.RoleListComponent.GetSelfScrollView().GetScrollItemByIndex(s).GetToggleForGuide().RootUIComp;
        if (t) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      t = e.length !== 2 ? e[0] : e.find(e => Number(e) === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId());
      const i = Number(t);
      e = this.d1o.GetRoleIdList();
      const s = e.findIndex(e => e === i);
      if (s < 0 || s >= e.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "角色界面聚焦引导的额外参数配置有误, 找不到角色Id", ["roleId", i]);
        }
      } else {
        const n = this.RoleListComponent?.GetSelfScrollView()?.GetScrollItemByIndex(s);
        if (n) {
          TimerSystem_1.TimerSystem.Next(() => {
            this.RoleListComponent.GetSelfScrollView().ScrollTo(n.GetRootItem());
          });
          t = n.RoleIconItem?.GetRootItem();
          if (t) {
            return [t, t];
          }
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 43, "角色界面聚焦引导的额外参数配置有误, 找不到角色Id", ["roleId", i]);
        }
      }
    }
  }
  _Vi() {
    this.UiViewSequence.PlaySequence("RoleListStart");
  }
  umo() {
    this.UiViewSequence.PlaySequence("RoleListClose");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchRootTabState, this.Cmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AttributeComponentEvent, this.gmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame, this.fmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectRoleTab, this.pqe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectRoleTabOutside, this.OnSelectRoleTabOutside);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewEnter, this.OnInternalViewEnter);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.OnInternalViewQuit);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
    var e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Bind(this.w8i);
    e.OnPointerDragCallBack.Bind(this.B8i);
    e.OnPointerEndDragCallBack.Bind(this.b8i);
    e.OnPointerScrollCallBack.Bind(this.N8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchRootTabState, this.Cmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AttributeComponentEvent, this.gmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame, this.fmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTab, this.pqe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTabOutside, this.OnSelectRoleTabOutside);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewEnter, this.OnInternalViewEnter);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.OnInternalViewQuit);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
  }
  pmo() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationStart, this.cmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
    var e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Unbind();
    e.OnPointerDragCallBack.Unbind();
    e.OnPointerEndDragCallBack.Unbind();
    e.OnPointerScrollCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleLookUp, this.q8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleTurn, this.G8i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleZoom, this.PUn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerRoleReset, this._mo);
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
  }
  P8i() {
    if (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()) {
      return false;
    }
    const t = this.TabViewComponent.GetCurrentTabViewName();
    let i = false;
    RoleDefine_1.UI_ROLE_CAN_ROTATE_TABVIEW.forEach(e => {
      if (t === e) {
        i = true;
      }
    });
    return i;
  }
  Z0l(e) {
    for (const t of this.TabDataList) {
      if (t.ChildViewName === e) {
        return true;
      }
    }
    return false;
  }
  RefreshUiMode() {
    this.RefreshRoleSystemModeUiParam();
  }
  RefreshRoleSystemModeUiParam() {
    var e = this.d1o.GetRoleSystemUiParams();
    this.BindRedDot(e.RoleListButtonRedDot);
    this.SetRoleListButtonVisible(e.RoleListButton);
    this.RoleListComponent.SetRoleSystemUiParams(e);
    this.RefreshRoleBackgroundMusicSwitchItem();
  }
  LoadFloorEffect() {
    var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    if (e) {
      this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect("RoleSystemFloorEffect", "[RoleRootView.LoadFloorEffect]", e.D_GetTransform(), new EffectContext_1.EffectContext(undefined, e));
    }
  }
  GetRedDotName(e) {
    if (e === "RoleAttributeTabView") {
      return "RoleAttributeTab";
    } else if (e === "RoleResonanceTabNewView") {
      return "RoleResonanceTab";
    } else if (e === "RolePhantomTabView") {
      return "VisionTabRedDot";
    } else if (e === "RoleWeaponTabView") {
      return "RoleWeaponTabBreakUp";
    } else {
      return undefined;
    }
  }
  BindRedDot(e) {
    if (e) {
      RedDotController_1.RedDotController.BindRedDot("RoleSelectionList", this.GetItem(8));
    } else {
      RedDotController_1.RedDotController.UnBindGivenUi("RoleSelectionList", this.GetItem(8));
      this.GetItem(8).SetUIActive(false);
    }
  }
  UnBindRedDot() {
    for (const e of this.TabComponent.GetTabItemMap().values()) {
      e.UnBindRedDot();
    }
    RedDotController_1.RedDotController.UnBindRedDot("RoleSelectionList");
  }
  SetRoleListButtonVisible(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  SetRoleListVisible(e) {
    this.GetItem(3).SetUIActive(e);
  }
  RefreshRoleBackgroundMusicSwitchItem() {
    var e = this.d1o.GetRoleSystemUiParams();
    var t = this.d1o?.GetCurSelectRoleData();
    if (this.rmo === "RoleSkillTabView" && e.BackgroundMusicSwitch && t !== undefined && !t.IsTrialRole() && t.GetRoleConfig().EnableOperateSelfBgm) {
      this.GetItem(9).SetUIActive(true);
      this.RoleBackgroundMusicSwitchItem?.RefreshByRoleData(t);
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  OnBeforeHide() {
    this.pmo();
    this.U8i = false;
    if (this.RHt) {
      this.smo = false;
      this.RHt.Stop();
      this.RHt = undefined;
    }
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    this.A8i = undefined;
  }
  OnHandleReleaseScene() {
    this.UDn();
  }
  OnAfterHide() {
    this.RoleListComponent.UnBindRedDot();
    this.TabViewComponent.SetCurrentTabViewState(false);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Role", 43, "角色界面关闭");
    }
  }
  UDn() {
    if (!this.RDn) {
      this.RDn = true;
      if (EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
        EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleRootView.HandleReleaseScene]", false);
      }
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
      this.dmo = undefined;
      UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame();
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
      RenderUtil_1.RenderUtil.EndPSOSyncMode();
    }
  }
  OnBeforeDestroyImplement() {
    this.UDn();
    this.ClearData();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Role", 43, "角色界面销毁");
    }
  }
  ClearData() {
    if (this.TabViewComponent) {
      this.TabViewComponent.DestroyTabViewComponent();
      this.TabViewComponent = undefined;
    }
    if (EffectSystem_1.EffectSystem.IsValid(this.Nlo)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Nlo, "[RoleRootView.ClearData]", true);
      this.Nlo = 0;
    }
    for (const e of this.cVi.values()) {
      e.SetShouldLatentDestroy(true);
    }
    this.cVi.clear();
    this.I6e = 0;
    this.nmo = 0;
    UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(UiCameraControlRotationComponent_1.UiCameraControlRotationComponent);
    this.d1o.GetRoleIdList().forEach(e => {
      ModelManager_1.ModelManager.SortModel.ClearSortConfigData(3, 10, e.toString());
      ModelManager_1.ModelManager.FilterModel.ClearFilterConfigData(3, 10, e.toString());
    });
  }
}
exports.RoleRootView = RoleRootView;
//# sourceMappingURL=RoleRootView.js.map