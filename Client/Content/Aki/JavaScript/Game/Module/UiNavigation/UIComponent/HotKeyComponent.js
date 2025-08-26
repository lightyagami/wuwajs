"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotKeyComponent = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const IconKeyComponent_1 = require("../KeyComponent/IconKeyComponent");
const UiNavigationUtil_1 = require("../UiNavigationUtil");
class HotKeyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.HotKeyMapIndex = 0;
    this.CurComponent = undefined;
    this.IsPress = false;
    this.IsAction = true;
    this.nqo = undefined;
    this.sqo = 0;
    this.HotKeyTextId = undefined;
    this.w7t = undefined;
    this.aqo = undefined;
    this.Xnl = undefined;
    this.Dut = t => {
      var i = this.GetActionName();
      if (!StringUtils_1.StringUtils.IsEmpty(i) && i === t) {
        this.hqo();
      }
    };
    this.lqo = false;
    this._qo = false;
    this.HotKeyMapIndex = t;
    this.nqo = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(this.HotKeyMapIndex);
  }
  OnBeforeCreateImplement() {
    this.OnInit();
  }
  async OnBeforeStartAsync() {
    this._qo = !!this.nqo && this.nqo.LongPressTime > 0;
    this.CurComponent = new IconKeyComponent_1.IconKeyComponent();
    this.CurComponent.SetIsNeedLongPress(this._qo);
    this.CurComponent.SetKeyName(this.uqo());
    await this.CurComponent.CreateThenShowByActorAsync(this.RootActor);
    this.aqo = UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(this.CurComponent.GetRootActor());
  }
  uqo() {
    var t = this.GetHotKeyConfig();
    if (!t || Info_1.Info.IsInTouch()) {
      return "";
    } else {
      return this.Trt(t);
    }
  }
  cqo() {
    return this.sqo === 0;
  }
  mqo(t) {
    if (t) {
      this.OnRefreshMode();
    } else if (this.IsPress) {
      this.ReleaseWithoutCheck();
    }
    this.CurComponent.SetActive(t);
  }
  OnRefreshMode() {
    this.dqo();
    this.RefreshHotKeyNameText();
  }
  dqo() {
    var t = this.GetHotKeyConfig();
    if (t) {
      if (Info_1.Info.IsInTouch()) {
        this.CurComponent.SetActive(false);
      } else {
        t = this.Trt(t);
        this.CurComponent.RefreshKeyIcon(t);
        this.CurComponent.SetActive(true);
      }
    }
  }
  hqo() {
    var t = this.GetHotKeyConfig();
    if (t && !Info_1.Info.IsInTouch()) {
      t = this.Trt(t);
      this.CurComponent.RefreshKeyIcon(t);
    }
  }
  GetHotKeyConfig() {
    return this.nqo;
  }
  Trt(t) {
    var i = t.ActionName;
    var t = t.AxisName;
    if (!StringUtils_1.StringUtils.IsEmpty(i) && this.IsAction) {
      if (i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(i)) {
        return i.GetCurrentPlatformKeyByIndex(0)?.KeyName;
      } else {
        return undefined;
      }
    } else if (!StringUtils_1.StringUtils.IsEmpty(t) && (i = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t))) {
      return i.GetCurrentPlatformKeyByIndex(0)?.KeyName;
    } else {
      return undefined;
    }
  }
  Cqo(t, i) {
    if (ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigationHotKey", 10, "[LogicMode]模式设置", ["配置id", this.HotKeyMapIndex], ["Tag", this.GetBindButtonTag()], ["模式", HotKeyViewDefine_1.logicModeLogString[t]], ["值", i]);
    }
    if (i) {
      if (this.sqo & t) {
        this.sqo = this.sqo ^ t;
      }
    } else {
      this.sqo = this.sqo | t;
    }
  }
  RefreshHotKeyNameText() {
    var t = this.HotKeyTextId ?? this.GetHotKeyConfig().TextId;
    this.CurComponent.RefreshNameText(t);
  }
  OnRefreshSelfHotKeyState(t) {
    var i = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      t = t.GetActiveListenerByTag(i);
      this.SetVisibleMode(2, t !== undefined);
    }
  }
  OnRefreshHotKeyText(t) {}
  OnRefreshHotKeyTextId(t) {
    var i;
    if (!this.CurComponent.GetIsForceSetText() && !(i = this.GetBindButtonTag(), StringUtils_1.StringUtils.IsEmpty(i))) {
      t = t.GetActiveListenerByTag(i)?.GetTipsTextIdByState();
      this.SetHotKeyTextId(t);
      this.RefreshHotKeyNameText();
    }
  }
  OnRefreshHotKeyShield(t) {
    t = t.GetFocusListener();
    this.SetVisibleMode(8, !t?.ShieldHotKeyIndexArray.Contains(this.HotKeyMapIndex));
  }
  gqo(t = false) {
    var i;
    var e = this.nqo.ApplicableType;
    if (e === 0) {
      this.SetVisibleMode(64, true, true);
    } else if (e === 1) {
      this.SetVisibleMode(64, Info_1.Info.IsInKeyBoard(), t);
    } else if (e === 2) {
      this.SetVisibleMode(64, Info_1.Info.IsInGamepad(), t);
    } else if (e === 3) {
      i = Info_1.Info.IsInKeyBoard();
      this.RootItem.SetAlpha(i ? 0 : 1);
      this.SetVisibleMode(64, true, t);
      if (ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigationHotKey", 10, "仅键鼠透明", ["配置id", this.HotKeyMapIndex], ["Tag", this.GetBindButtonTag()]);
      }
    } else if (e === 4) {
      i = Info_1.Info.IsInGamepad();
      this.RootItem.SetAlpha(i ? 0 : 1);
      this.SetVisibleMode(64, true, t);
      if (ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigationHotKey", 10, "仅手柄透明", ["配置id", this.HotKeyMapIndex], ["Tag", this.GetBindButtonTag()]);
      }
    } else if (e === 5 && (i = Info_1.Info.IsInKeyBoard(), t = Info_1.Info.IsInGamepad(), this.RootItem.SetAlpha(i || t ? 0 : 1), this.SetVisibleMode(64, true, true), ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigationHotKey", 10, "键盘和手柄透明", ["配置id", this.HotKeyMapIndex], ["Tag", this.GetBindButtonTag()]);
    }
  }
  InitHotKeyLogicMode() {
    this.SetVisibleMode(16, !Info_1.Info.IsInTouch());
    this.SetVisibleMode(2, false, true);
    this.gqo();
  }
  RegisterMe() {
    this.dde();
    this.gqo(true);
    this.hqo();
  }
  UnRegisterMe() {
    this.Cde();
    this.OnUnRegisterMe();
    this.fqo(this.GetAxisName());
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    this.OnAddEventListener();
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
    this.OnRemoveEventListener();
  }
  SetVisibleMode(t, i, e = false) {
    var s = this.sqo;
    this.Cqo(t, i);
    if (this.sqo !== s || !!e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigationHotKey", 10, "[LogicMode]当前设置可见性模式", ["配置id", this.HotKeyMapIndex], ["this.LogicMode", MathUtils_1.MathUtils.DecimalToBinary(this.sqo)], ["lastLogicMode", MathUtils_1.MathUtils.DecimalToBinary(s)], ["Tag", this.GetBindButtonTag()], ["Path", this.aqo]);
      }
      this.mqo(this.cqo());
    }
  }
  SetHotKeyDescTextForce(t) {
    this.CurComponent.SetNameTextForce(true);
    this.CurComponent.SetNameText(t);
  }
  ResetHotKeyDescTextForce() {
    this.CurComponent.SetNameTextForce(false);
  }
  SetHotKeyTextId(t) {
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      this.HotKeyTextId = undefined;
    } else {
      this.HotKeyTextId = t;
    }
  }
  IsHotKeyActive() {
    return this.sqo === 0;
  }
  IsAllowTickContinue() {
    return this.sqo === 0 || this.lqo;
  }
  RefreshMode() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigationHotKey", 10, "切换了控制器,强制刷新表现");
    }
    this.gqo(true);
    this.CurComponent?.RefreshPcAndGamepad();
  }
  Press() {
    if (this.cqo()) {
      this.IsPress = true;
      this.OnPress(this.GetHotKeyConfig());
    }
  }
  Release() {
    if (this.cqo() && this.IsPress) {
      this.ReleaseWithoutCheck();
    }
  }
  ReleaseWithoutCheck() {
    this.IsPress = false;
    var t = this.GetHotKeyConfig();
    this.OnRelease(t);
  }
  InputAxis(t, i) {
    if (this.cqo()) {
      this.pqo(t);
      this.OnInputAxis(t, i);
    } else {
      this.fqo(t);
    }
  }
  pqo(t) {
    if (!this.lqo) {
      this.lqo = true;
      this.OnStartInputAxis(t);
    }
  }
  fqo(t) {
    if (this.lqo) {
      this.lqo = false;
      this.OnFinishInputAxis(t);
    }
  }
  GetBindButtonTag() {
    return this.nqo?.BindButtonTag;
  }
  GetActionName() {
    return this.nqo?.ActionName;
  }
  GetAxisName() {
    return this.nqo?.AxisName;
  }
  IsAxisAllDirection() {
    return this.nqo?.AxisDirection === 0;
  }
  IsAxisPositive() {
    return this.nqo?.AxisDirection !== 1;
  }
  IsAxisReverse() {
    return this.nqo?.AxisDirection !== 2;
  }
  SetHotKeyFunctionType(t) {
    this.w7t = t;
  }
  GetHotKeyFunctionType() {
    return this.w7t;
  }
  IsOccupancyFightInput() {
    return this.OnIsOccupancyFightInput();
  }
  RefreshSelfHotKeyState(t) {
    this.OnRefreshHotKeyShield(t);
    this.OnRefreshSelfHotKeyState(t);
    this.gqo();
  }
  RefreshSelfHotKeyText(t) {
    this.OnRefreshHotKeyText(t);
    this.OnRefreshHotKeyTextId(t);
  }
  SetHotKeyType(t) {
    this.CurComponent.SetHotKeyType(t);
  }
  SetLinkComponent(t) {
    this.Xnl = t;
  }
  IsLinkListener(t) {
    return !this.Xnl || !!t && (this.Xnl.ActorList?.Contains(t) ?? false);
  }
  Clear() {
    this.OnClear();
  }
  OnInit() {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnUnRegisterMe() {}
  OnClear() {}
  OnIsOccupancyFightInput() {
    return this.nqo?.IsOccupancyFightInput ?? true;
  }
  OnPress(t) {}
  OnRelease(t) {}
  OnInputAxis(t, i) {}
  OnStartInputAxis(t) {}
  OnFinishInputAxis(t) {}
  ResetPressState() {
    if (!this._qo && this.IsPress) {
      this.IsPress = false;
    }
  }
}
exports.HotKeyComponent = HotKeyComponent;
//# sourceMappingURL=HotKeyComponent.js.map