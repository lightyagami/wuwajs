"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionHint = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem");
const InteractionDefine_1 = require("../InteractionDefine");
class InteractionHint extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.$_i = undefined;
    this.Y_i = 0;
    this.J_i = undefined;
    this.z_i = undefined;
    this.Z_i = undefined;
    this.XJs = undefined;
    this.tui = undefined;
    this.iui = undefined;
    this.oui = undefined;
    this.rui = undefined;
    this.ETt = 0;
    this.apt = undefined;
    this.nui = undefined;
    this.sui = undefined;
    this.aui = false;
    this.Fhc = false;
    this.wDe = 0;
    this.Mfu = undefined;
    this.VT1 = undefined;
    this.XBo = () => {
      this.RefreshChangeInteractionAction();
    };
    this.o21 = t => {
      if (t.TrackTarget === this.wDe) {
        this.P5e();
      }
    };
    this.n21 = t => {
      if (t.TrackTarget === this.wDe) {
        this.P5e();
      }
    };
    this.P5e = () => {
      var t;
      var e;
      var i;
      if (this.Z_i) {
        t = !!ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.wDe) && this.Mfu?.IsSpotViewShow();
        e = this.fui();
        i = this.pui();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 36, "[InteractionHint]刷新交互列表项名称", ["interactText", i], ["iconPath", e]);
        }
        this.$_i.SetToggleTexture(e, t);
        this.$_i.SetToggleText(i);
      }
    };
    this.hui = () => !ModelManager_1.ModelManager.InteractionModel.InInteractCd();
    this.lui = t => {
      if (this.sui) {
        this.sui(t, this.ActorIndex);
      }
    };
    this._ui = () => {
      if (this.tui) {
        this.tui(this);
      }
    };
    this.uui = () => {
      if (this.iui) {
        this.iui(this);
      }
    };
    this.cui = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [3, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.$_i = new ToggleActionItem_1.ToggleActionItem();
    var t = this.GetItem(2);
    this.oui = new InputMultiKeyItem_1.InputMultiKeyItem();
    var e = this.GetItem(3);
    this.rui = new InputMultiKeyItem_1.InputMultiKeyItem(true, true, "Hint_" + this.GridIndex);
    await Promise.all([this.cOc(), this.oui.CreateByActorAsync(t.GetOwner()), this.rui.CreateThenShowByActorAsync(e.GetOwner())]);
  }
  async cOc() {
    var t;
    if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()) {
      this.GetItem(0).SetUIActive(false);
      await this.$_i.CreateThenShowByResourceIdAsync("UiItem_TogAction2", this.RootItem);
    } else {
      t = this.GetItem(0);
      await this.$_i.CreateThenShowByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    this.mui();
    this.Z_i = this.$_i.GetToggleText();
    this.XJs = this.GetSprite(1);
    this.Z_i.OnSelfLanguageChange.Bind(() => {
      this.P5e();
    });
    this.RefreshInteractKeyItem();
    this.RefreshChangeInteractionAction();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.o21);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.n21);
  }
  OnBeforeShow() {
    this.PlayAppearSequence();
  }
  async OnBeforeHideAsync() {
    return this.PlayDisappearSequence();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.o21);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.n21);
    if (this.z_i && this.z_i.Entity && (EventSystem_1.EventSystem.HasWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.P5e) && EventSystem_1.EventSystem.RemoveWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.P5e), EventSystem_1.EventSystem.HasWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.P5e))) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.P5e);
    }
    this.Cui();
    this.$_i = undefined;
    this.Z_i.OnSelfLanguageChange.Unbind();
    this.Z_i = undefined;
    this.J_i = undefined;
    this.tui = undefined;
    this.Y_i = -1;
    this.z_i = undefined;
    this.XJs = undefined;
    this.oui = undefined;
    this.rui = undefined;
  }
  Refresh(t, e, i) {
    this.Y_i = this.GridIndex;
    this.J_i = t.GetComponent(127);
    this.z_i = t.GetComponent(126);
    this.wDe = t.GetComponent(0)?.GetPbDataId() ?? 0;
    this.Mfu = t.GetComponent(320);
    if (this.z_i) {
      this.ETt = this.z_i.DropItemId;
      if (this.ETt) {
        this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ETt);
      }
      if (this.VT1) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.VT1, EventDefine_1.EEventName.OnEntityNameChanged, this.P5e);
        EventSystem_1.EventSystem.RemoveWithTarget(this.VT1, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.P5e);
      }
      this.VT1 = this.z_i.Entity;
      EventSystem_1.EventSystem.AddWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnEntityNameChanged, this.P5e);
      EventSystem_1.EventSystem.AddWithTarget(this.z_i.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.P5e);
    }
    t = this.KSl(this.apt);
    this.nui = UE.Color.FromHex(t);
    this.Fhc = ModelManager_1.ModelManager.InteractionModel.GetToggleGray(this.ActorIndex);
    t = this.$_i.GetToggleItem();
    if (this.Fhc) {
      t.SetToggleState(2);
    } else {
      t.SetToggleState(0, false);
    }
    this.P5e();
    this.dui();
    this.rIn();
    this.rui?.ResetLongPress();
  }
  Clear() {
    this.Y_i = -1;
    this.J_i = undefined;
    this.z_i = undefined;
  }
  OnSelected(t) {
    this.SetSelected(true);
  }
  OnDeselected(t) {
    this.SetSelected(false);
  }
  GetKey(t, e) {
    return this.GridIndex;
  }
  RefreshChangeInteractionAction() {
    var t;
    if (Info_1.Info.IsInGamepad()) {
      t = {
        ActionOrAxisName: InputMappingsDefine_1.actionMappings.切换交互,
        IsDownArrowVisible: true
      };
      this.oui.RefreshByActionOrAxis(t);
    } else {
      t = {
        ActionOrAxisName: InputMappingsDefine_1.axisMappings.WheelAxis,
        IsUpArrowVisible: true,
        IsDownArrowVisible: true
      };
      this.oui.RefreshByActionOrAxis(t);
    }
  }
  RefreshInteractKeyItem() {
    var t = ModelManager_1.ModelManager.InteractionModel;
    this.rui.ResetLongPress();
    var e = ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity !== undefined ? InputMappingsDefine_1.actionMappings.UI键盘F手柄A : InputMappingsDefine_1.actionMappings.通用交互;
    var e = {
      ActionOrAxisName: e,
      IsLongPressDisable: !this.aui,
      LongPressTime: t.AutoLongPressTime,
      DelayPressTime: t.ShowLongPressTime,
      IsShowLongPressWhenPress: true,
      IsShowLongPressWhenRelease: false,
      IsTextArrowVisible: false,
      IsShowTextArrowWhenPress: false,
      IsShowTextArrowWhenRelease: false
    };
    this.rui?.RefreshByActionOrAxis(e);
  }
  SetLongPressTime(t) {
    this.rui?.SetLongPressTime(t);
  }
  gui() {
    return this.z_i?.IsDropItem() ?? false;
  }
  pui() {
    var t = ModelManager_1.ModelManager.InteractionModel.GetOptionNameByIndex(this.ActorIndex);
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionHint]GetInteractText", ["optionName", t]);
      }
      return t;
    }
    if ((0, RegisterComponent_1.isComponentInstance)(this.J_i, 207)) {
      t = this.J_i.GetInteractController().DefaultShowOption;
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 36, "[InteractionHint]GetInteractText", ["showOption", t]);
        }
        return t;
      }
    }
    if (this.z_i) {
      var t = this.z_i.DropItemCount;
      var e = this.z_i.PawnName;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 36, "[InteractionHint]GetInteractText", ["PawnName", e], ["count", t]);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        if (this.gui() && t > 1) {
          return e + "x" + t;
        } else {
          return e;
        }
      }
    }
    return "";
  }
  fui() {
    let t = "";
    if (ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()) {
      return t = this.vui("AbyssDialog");
    }
    if (this.wDe !== 0 && this.Mfu?.IsSpotViewShow()) {
      var e = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.wDe);
      if (e) {
        e = (t = e.IconPath).split(".")[1];
        if ((t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(e)?.Value) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Interaction", 31, "没有找到对应的交互图标", ["name", e]);
          }
          return "";
        } else {
          return t;
        }
      }
    }
    if (this.gui()) {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ETt);
      return (t = e?.IconMiddle) ?? "";
    }
    if (t = ModelManager_1.ModelManager.InteractionModel.GetConditionIconPath(this.ActorIndex)) {
      return t;
    }
    if ((0, RegisterComponent_1.isComponentInstance)(this.J_i, 207)) {
      e = this.J_i.GetInteractController().GetInteractIcon();
      if (e === "Collect") {
        var i = this.J_i.GetInteractController().CreatureData.GetPbEntityInitData();
        var s = (0, IComponent_1.getComponent)(i.ComponentsData, "CollectComponent");
        t = this.vui("Dialog");
        var i = (0, IComponent_1.getComponent)(i.ComponentsData, "RewardComponent");
        if (s && i) {
          var n = i.RewardId;
          var n = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(n).DropPreview;
          if (n.size > 0) {
            for (const o of n.keys()) {
              var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(Number(o));
              t = r.IconMiddle;
              break;
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Interaction", 36, "[InteractionHint]采集物组件不齐全", ["collectComponent", !!s], ["rewardComponent", !!i]);
        }
      } else {
        t = e === "BigTeleporter" || e === "SmallTeleporter" || e === "TreasureBox" || e === "UnknownCollect" ? this.Mui(e) : this.vui(e);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Interaction", 36, "InteractionHit.SetIconAndEffect 旧版交互已经废除");
    }
    return t ?? "";
  }
  uOc() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
      if (t && t.InstSubType === 33) {
        return false;
      }
    }
    return this.gui();
  }
  dui() {
    if (this.uOc()) {
      this.XJs.SetColor(this.nui);
      this.XJs.SetUIActive(true);
    } else {
      this.XJs.SetUIActive(false);
    }
  }
  Mui(t) {
    t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("EInteractDefaultIcon." + t);
    if (t === undefined) {
      return "";
    } else {
      return t.Value;
    }
  }
  vui(t) {
    t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("EInteractIcon." + t);
    if (t === undefined) {
      return "";
    } else {
      return t.Value;
    }
  }
  mui() {
    var t = this.$_i.GetToggleItem();
    t.CanExecuteChange.Bind(this.hui);
    t.OnStateChange.Add(this.lui);
    t.OnHover.Add(this._ui);
    t.OnUnHover.Add(this.uui);
  }
  Cui() {
    var t;
    if (this.$_i && (t = this.$_i.GetToggleItem())) {
      t.OnStateChange.Clear();
      t.CanExecuteChange.Unbind();
      t.OnHover.Clear();
      t.OnUnHover.Clear();
    }
  }
  KSl(t) {
    if (t) {
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityByConfig(t)?.InteractionHintColor ?? InteractionDefine_1.BASE_QUALITY_COLOR;
    } else {
      return InteractionDefine_1.BASE_QUALITY_COLOR;
    }
  }
  SetSelected(t) {
    this.aui = t;
    this.oIn();
    this.rIn();
    const e = this.$_i.GetToggleItem();
    if (t) {
      e.SetToggleState(0, false);
      e.SetToggleState(1, false);
    } else if (this.Fhc) {
      const e = this.$_i.GetToggleItem();
      e.SetToggleState(2);
    } else {
      e.SetToggleState(0, false);
    }
  }
  oIn() {
    this.oui?.SetActive(ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity === undefined && this.aui && ModelManager_1.ModelManager.InteractionModel.GetInteractItemCount() > 1);
  }
  rIn() {
    this.rui?.SetLongPressDisable(!this.aui);
    this.rui?.SetActive(this.aui);
  }
  BindOnHover(t) {
    this.tui = t;
  }
  BindOnUnHover(t) {
    this.iui = t;
  }
  BindOnToggleStateChanged(t) {
    this.sui = t;
  }
  get ActorIndex() {
    return this.Y_i;
  }
  GetPriority() {
    return this.cui;
  }
  UpdatePriority() {
    if ((0, RegisterComponent_1.isComponentInstance)(this.J_i, 207)) {
      this.cui = this.J_i.GetInteractController().InteractEntity.Priority;
    }
  }
  GetButtonForGuide() {
    return this.GetItem(0);
  }
  async PlayReleaseSequence() {
    return this.$_i.PlayReleaseSequence();
  }
  PlayAppearSequence() {
    this.$_i.PlayAppearSequence();
  }
  async PlayDisappearSequence() {
    await this.$_i.PlayDisappearSequence();
  }
}
exports.InteractionHint = InteractionHint;
//# sourceMappingURL=InteractionHint.js.map