"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionHintView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const GuideConfig_1 = require("../../Guide/GuideConfig");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const InteractionDefine_1 = require("../InteractionDefine");
const FishTipItem_1 = require("./FishTipItem");
const InteractionGuide_1 = require("./InteractionGuide");
const InteractionHint_1 = require("./InteractionHint");
const LONG_PRESS_SHOW_TIME = 100;
class InteractionHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.Eui = 0;
    this.Sui = undefined;
    this.yui = 1;
    this.Iui = 0;
    this.Tui = 0;
    this.Lui = 0;
    this.Dui = 0;
    this.Rui = InteractionDefine_1.LERP_TIME;
    this.C21 = -1;
    this.Uui = 0;
    this.Aui = undefined;
    this.Pui = [];
    this.xui = 0;
    this.wui = false;
    this.Bui = undefined;
    this.bui = undefined;
    this.qui = undefined;
    this.ai_ = undefined;
    this.xut = 0;
    this.Gui = false;
    this.Nui = 0;
    this.Oui = 0;
    this.kui = 0;
    this.Fui = false;
    this.Vui = 0;
    this.Hui = undefined;
    this.jui = false;
    this.IsHoverHint = false;
    this.Wui = false;
    this.YJs = false;
    this.XQa = false;
    this.Kui = false;
    this.nla = false;
    this.lqt = () => {
      this.eci();
      this.Jla();
      this.zla();
    };
    this.Mzt = () => {
      this.Lri();
    };
    this.Qui = () => {
      this.CloseMe();
    };
    this.Yui = () => {
      var t = new InteractionHint_1.InteractionHint();
      t.BindOnHover(this.Jui);
      t.BindOnUnHover(this.zui);
      t.BindOnToggleStateChanged(this.sui);
      return t;
    };
    this.Jui = t => {
      this.IsHoverHint = true;
      t = t.ActorIndex;
      this.Oei(t);
    };
    this.zui = t => {
      this.IsHoverHint = false;
      this.Hui?.SetSelected(true);
    };
    this.sui = (t, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionView]自动拾取-----当ExtendToggle状态改变时，会打断自动拾取");
      }
      this.Gui = false;
      this.Zui();
      this.InteractPawn(i, true);
    };
    this.fZt = t => {
      if (!t) {
        this.IsHoverHint = false;
      }
    };
    this.tci = () => {
      if (Info_1.Info.IsInTouch() && this.ici()) {
        this.oci();
      }
    };
    this.rci = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionView]自动拾取-----成功拾取", ["IsAutoPicked", this.Gui]);
      }
      if (this.Gui) {
        this.nci();
      } else {
        this.wui = false;
      }
    };
    this.sci = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionView]刷新交互选项时");
      }
      this.wui = false;
      if (this.wui) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 36, "[InteractionView]刷新交互选项 - 自动拾取中", ["Count", this.Pui?.length]);
        }
      } else if (this.bui) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 36, "[InteractionView]刷新交互选项 - 下一帧会刷新交互选项");
        }
      } else {
        this.bui = TimerSystem_1.TimerSystem.Next(this.K8a);
      }
    };
    this.K8a = () => {
      this.aci();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionView]刷新交互选项 - 开始刷新交互选项", ["Count", this.Pui?.length]);
      }
      this.$8a(this.Pui).then(() => {
        this.vci();
        this.lci();
      }, () => {});
      this.bui = undefined;
    };
    this.bMe = (t, i) => {
      if (i === 0) {
        this._ci();
      } else if (i === 1) {
        if (this.Hui) {
          this.$ui();
        } else {
          this.jui = true;
        }
      }
    };
    this.Oit = () => {
      this.oci();
    };
    this.uci = (t, i) => {
      if (i === 0) {
        this.cci(undefined, -1);
      }
    };
    this.cci = (t, i) => {
      if (i !== 0 && !this.IsHoverHint) {
        if (this.Sui.GetDisplayGridNum() !== 1) {
          this.SelectHint(i > 0);
        }
      }
    };
    this.mci = (t, i) => {
      if (i === 0) {
        this.SelectHint(true);
      }
    };
    this.dci = (t, i) => {
      if (i === 0) {
        this.SelectHint(false);
      }
    };
    this.Eqt = (t, i) => {
      i = i.TouchType;
      t = Number(t);
      t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t);
      if (t) {
        if (i === 0) {
          this.Fui = t.IsTouchComponentContainTag(InteractionDefine_1.autoPickUpTag);
        } else if (i === 1) {
          if (this.Fui && t.IsTouchComponentContainTag(InteractionDefine_1.autoPickUpTag)) {
            this.oci();
          }
          this.Fui = false;
        }
      }
    };
  }
  get hLt() {
    return this.C21;
  }
  set hLt(t) {
    this.C21 = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectHintChange, t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.tci]];
  }
  OnAddEventListener() {
    this.zla();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InteractionViewUpdate, this.sci);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideInteractView, this.Qui);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInteractDropItemSuccess, this.rci);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(19, this.Mzt);
  }
  zla() {
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.WheelAxis, this.cci);
    if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity !== undefined) {
      this.Kui = true;
      if (Info_1.Info.IsInGamepad()) {
        this.nla = true;
        InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆上, this.mci);
        InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆下, this.dci);
      } else {
        InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.mci);
        InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.dci);
      }
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.bMe);
    } else {
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.切换交互, this.uci);
    }
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  OnRemoveEventListener() {
    this.Jla();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InteractionViewUpdate, this.sci);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HideInteractView, this.Qui);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInteractDropItemSuccess, this.rci);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(19, this.Mzt);
  }
  Jla() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.WheelAxis, this.cci);
    if (this.Kui) {
      this.Kui = false;
      if (this.nla) {
        this.nla = false;
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆上, this.mci);
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆下, this.dci);
      } else {
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.mci);
        InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.dci);
      }
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.bMe);
    } else {
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.切换交互, this.uci);
    }
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  Lri() {
    var t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(19);
    this.SetUiActive(t);
    if (t && !ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity) {
      this.jui = false;
      InputDistributeController_1.InputDistributeController.ExecuteDelayInputAction(InputMappingsDefine_1.actionMappings.通用交互);
    }
  }
  async OnBeforeStartAsync() {
    this.xqe = this.GetScrollViewWithScrollbar(2);
    this.Aui = this.GetItem(3);
    this.Eui = this.xqe.ScrollSensitivity;
    this.Vui = this.Aui.GetAnchorOffsetY();
    this.Tui = this.Aui.GetAnchorOffsetY();
    var t = this.GetItem(1);
    this.Sui = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Yui, t?.GetOwner());
    this.Dui = t.GetHeight();
    this.Iui = this.Aui.GetHeight() / this.Dui;
    var t = ModelManager_1.ModelManager.InteractionModel;
    this.xut = t.AutoLongPressTime + t.ShowLongPressTime + LONG_PRESS_SHOW_TIME;
    this.aci();
    await this.$8a(this.Pui);
  }
  async OnShowAsyncImplementImplement() {
    this.Lri();
    await super.OnShowAsyncImplementImplement();
  }
  OnAfterShow() {
    this.lci();
    this.hi_();
    this.Oei(0);
  }
  OnAfterHide() {
    this.Hui = undefined;
  }
  oci() {
    this.Gui = true;
    this.wui = true;
    this.kui = this.Pui.length;
    this.Nui = 0;
    this.Oui = 0;
    var t = ModelManager_1.ModelManager.InteractionModel;
    if (Info_1.Info.IsInTouch()) {
      t.SaveTriggerMobileGuide(true);
    } else {
      t.SaveTriggerDesktopGuide(true);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 36, "[InteractionView]自动拾取-----开始", ["AutoPickLength", this.kui]);
    }
    this.nci();
  }
  nci() {
    this.Oui++;
    var t = this.Pui[this.Nui];
    if (!t?.Valid || (ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(t) || (this.Nui++, this.nci()), this.InteractPawn(this.Nui) ? (this.Pui.splice(this.Nui, 1), this.$8a(this.Pui)) : (this.Nui++, this.nci()), this.Oui >= this.kui)) {
      this.Cci();
    }
  }
  Cci() {
    this.aci();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 36, "[InteractionView]自动拾取-----结束", ["InteractLength", this.Pui.length]);
    }
    this.$8a(this.Pui);
    this.wui = false;
  }
  InteractPawn(t, i = false) {
    if (this.YJs) {
      return false;
    }
    var e = this.Pui[t];
    if (!e?.Valid) {
      return false;
    }
    e = e.GetComponent(129);
    if (!e?.IsPawnInteractive()) {
      return false;
    }
    if (this.Hui) {
      if (i) {
        if (this.Hui) {
          this.YJs = true;
          this.Hui.PlayReleaseSequence().then(() => {
            this.YJs = false;
          }, () => {});
          i = ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(t);
          e.InteractPawn(i);
        }
      } else {
        this.YJs = false;
        this.Hui?.PlayReleaseSequence().then(() => {}, () => {});
        var i = ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(t);
        e.InteractPawn(i);
      }
    } else {
      i = ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(t);
      e.InteractPawn(i);
    }
    return true;
  }
  OnBeforeDestroy() {
    if (this.Sui) {
      this.Sui.ClearChildren();
      this.Sui = undefined;
    }
    this.ai_?.Destroy();
    this.ai_ = undefined;
    this.qui?.Destroy();
    this.qui = undefined;
    this.Hui = undefined;
    this.Aui?.SetAnchorOffsetY(this.Vui);
    this.Aui = undefined;
    if (this.xqe) {
      this.xqe.ScrollSensitivity = this.Eui;
    }
    this.Eui = 0;
    this.xqe = undefined;
    this.wui = false;
    this.Pui.length = 0;
    this.Fui = false;
    this.XQa = false;
    this.Zui();
    this.gci();
  }
  gci() {
    if (this.bui && TimerSystem_1.TimerSystem.Has(this.bui)) {
      TimerSystem_1.TimerSystem.Remove(this.bui);
      this.bui = undefined;
    }
  }
  async $8a(t) {
    var i;
    await this.Sui.RefreshByDataAsync(t);
    if (this.Sui && (t = MathUtils_1.MathUtils.Clamp(this.hLt, 0, t.length - 1), this.Oei(t, false), this.Hui && this.jui && (this.jui = false, this.$ui()), t = this.Sui.GetDisplayGridNum(), i = this.yui > this.Iui ? this.Iui : this.yui, this.yui = t, i !== (t = this.yui > this.Iui ? this.Iui : this.yui))) {
      this.Lui = this.Tui + this.Dui * ((t - 1) / 2);
      this.Rui = 0;
      this.Wui = true;
    }
  }
  aci() {
    this.Pui.length = 0;
    this.xui = this.pci(this.Pui);
  }
  pci(t) {
    return ModelManager_1.ModelManager.InteractionModel.RefreshInteractEntities(t);
  }
  OnTick(t) {
    if (this.Wui) {
      if (this.Rui < InteractionDefine_1.LERP_TIME) {
        this.Rui += t;
        t = this.Aui.GetAnchorOffsetY();
        t = MathUtils_1.MathUtils.Lerp(t, this.Lui, Math.min(this.Rui / InteractionDefine_1.LERP_TIME, 1));
        this.Aui.SetAnchorOffsetY(t);
      } else {
        this.Wui = false;
      }
    }
    if (!this.qui?.InAsyncLoading()) {
      this.qui?.RefreshTextWidth();
    }
  }
  _ci() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 36, "[InteractionView]自动拾取-----当玩家按下通用交互，会打断自动拾取");
    }
    this.Gui = false;
    this.XQa = true;
    if (this.Hui && !Info_1.Info.IsInTouch() && this.ici() && this.GetActive()) {
      this.Zui();
      this.Bui = TimerSystem_1.TimerSystem.Delay(this.Oit, this.xut);
    }
  }
  Zui() {
    if (this.Bui && TimerSystem_1.TimerSystem.Has(this.Bui)) {
      TimerSystem_1.TimerSystem.Remove(this.Bui);
      this.Bui = undefined;
    }
  }
  $ui() {
    var t;
    this.Zui();
    if (this.XQa) {
      this.XQa = false;
      if (!this.Gui && !ModelManager_1.ModelManager.InteractionModel.InInteractCd()) {
        if (this.GetActive() && this.Hui && this.InteractPawn(this.Hui.ActorIndex, true)) {
          AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option");
          t = Math.max(this.Pui.length - 1, 0);
          this.hLt = Math.min(this.hLt, t);
        }
      }
    }
  }
  SelectHint(t) {
    let i = -1;
    var e = this.Pui.length - 1;
    if (!((i = t ? (i = this.hLt - 1) < 0 ? e : i : (i = this.hLt + 1) > e ? 0 : i) < 0)) {
      this.Uui = i;
      this.Oei(this.Uui);
    }
  }
  Oei(i, t = true) {
    if ((!t || i !== this.hLt) && !Info_1.Info.IsInTouch() && this.Sui) {
      let t = this.Sui.GetLayoutItemByIndex(i);
      if (t = t || this.Sui.GetLayoutItemByIndex(0)) {
        this.Hui?.SetSelected(false);
        this.Hui = t;
        this.hLt = i;
        this.Uui = -1;
        this.vci();
        this.Sui.SelectGridProxy(i);
        this.xqe.ScrollTo(t.GetRootItem());
      }
    }
  }
  vci() {
    var t;
    if (this.ici()) {
      t = ModelManager_1.ModelManager.InteractionModel;
      this.Hui?.SetLongPressTime(t.AutoLongPressTime);
    } else {
      this.Hui?.SetLongPressTime(0);
    }
  }
  lci() {
    var t = ModelManager_1.ModelManager.InteractionModel;
    if (t.IsInShowAutoInteractionGuideCountLimit()) {
      var i = Info_1.Info.IsInTouch();
      if (i) {
        if (t.IsTriggerMobileGuide) {
          return;
        }
      } else if (t.IsTriggerDesktopGuide) {
        return;
      }
      if (!(this.xui <= t.ActiveInteractGuideCount) && !this.qui) {
        if (i) {
          this.Mci().then(t => {
            t.Refresh("MobileAutoPickUpText");
          }, () => {});
        } else {
          this.Mci().then(t => {
            t.Refresh("DesktopAutoPickUpText");
          }, () => {});
        }
        t.SaveAutoInteractionGuideAppearCount(t.AutoInteractionGuideAppearCount + 1);
      }
    }
  }
  async Mci() {
    var t = this.GetItem(5);
    this.qui = new InteractionGuide_1.InteractionGuide();
    await this.qui.CreateThenShowByResourceIdAsync("UiItem_GuideNPCActScroll", t, false);
    return this.qui;
  }
  eci() {
    if (this.qui) {
      if (Info_1.Info.IsInTouch()) {
        this.qui.Refresh("MobileAutoPickUpText");
      } else {
        this.qui.Refresh("DesktopAutoPickUpText");
      }
    }
  }
  hi_() {
    for (const s of this.Pui) {
      if (s && s.Valid) {
        var t = ModelManager_1.ModelManager.InteractionModel.GetInteractController(s);
        if (!t) {
          return;
        }
        var i = t.GetInteractAdditionalInfoType();
        if (i === "FishingPoint") {
          ModelManager_1.ModelManager.GameAudioModel?.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.NearFishingPoint);
          var i = t.CreatureData;
          var e = i?.GetPbDataId() ?? 0;
          var i = i?.GetCreatureDataId() ?? 0;
          var t = t.CreatureData?.GetBaseInfo()?.Category?.FishingMechanismType ?? "FishingPoint";
          this.li_(e, i, t);
          break;
        }
      }
    }
  }
  async li_(t, i, e) {
    var s = this.GetItem(5);
    this.ai_ = new FishTipItem_1.FishTipItem();
    await this.ai_.CreateThenShowByResourceIdAsync("UiItem_FishTips", s, false);
    if (e === "FishingPoint") {
      this.ai_.RefreshByFishingPoint(t);
    } else if (e === "DynamicFishingPoint") {
      this.ai_.RefreshByDynamicFishingPoint(i);
    }
    return this.ai_;
  }
  ici() {
    return this.xui > 0;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t.length === 2 && t[0] === GuideConfig_1.GuideConfig.TabTag) {
      if ((i = this.Sui.GetLayoutItemList()).length <= 0) {
        return undefined;
      } else {
        return [i = i[0].GetButtonForGuide(), i];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", t]);
    }
  }
  OnGetLayer() {
    return UiLayerType_1.ELayerType.Normal;
  }
}
exports.InteractionHintView = InteractionHintView;
//# sourceMappingURL=InteractionHintView.js.map