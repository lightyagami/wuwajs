"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettingsController = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const KeySettingAll_1 = require("../../Core/Define/ConfigQuery/KeySettingAll");
const KeySettingById_1 = require("../../Core/Define/ConfigQuery/KeySettingById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Net_1 = require("../../Core/Net/Net");
const Platform_1 = require("../../Launcher/Platform/Platform");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GameSettingsUtils_1 = require("../GameSettings/GameSettingsUtils");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
const InputSettingsManager_1 = require("./InputSettingsManager");
class InputSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(25496, InputSettingsController.zih);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.Wvi);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(25496);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.Wvi);
    return true;
  }
  static I1h() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(1);
    if (ModelManager_1.ModelManager.LoginModel.IsNewAccount) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "新号没有输入数据，还原至配置表配置");
      }
      InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "老号没有输入数据，默认本地存储按键");
    }
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(1);
  }
  static InputSettingRequest() {
    var t = new Protocol_1.Aki.Protocol.jf_();
    Net_1.Net.Call(19804, Protocol_1.Aki.Protocol.jf_.create(t), this.Jih);
  }
  static InputSettingUpdateRequest(t) {
    var e = new Protocol_1.Aki.Protocol.$f_();
    e.Zih = this.Ttl(t);
    Net_1.Net.Call(26982, Protocol_1.Aki.Protocol.$f_.create(e), this.erh);
  }
  static aY1() {
    for (const a of KeySettingAll_1.configKeySettingAll.GetConfigList()) {
      if (a.ActionOrAxisName === InputMappingsDefine_1.actionMappings.切换角色4) {
        for (const r of a.ConnectedKeySettingIdList) {
          var t = KeySettingById_1.configKeySettingById.GetConfig(r);
          var e = a.ActionOrAxisName;
          var n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(e);
          var t = t.ActionOrAxisName;
          var o = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("InputSettings", 10, "处理键位联动问题", ["ActionName", e], ["LinkActionName", t]);
          }
          var e = [];
          n.GetPcKeyNameList(e);
          o?.SetKeyboardKeys(e);
        }
      }
    }
  }
  static RefreshInputSettingsFromProtoData(n) {
    if (!n || !n.trh || n.trh.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "[RefreshInputSettingsFromProtoData]服务端没有数据，使用本地配置");
      }
      this.I1h();
      GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(Info_1.Info.InputControllerMainType);
    } else {
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(1);
      let t = "";
      let e = false;
      for (const r of n.trh) {
        var o = r.irh;
        if (o === Protocol_1.Aki.Protocol.ZR_.Proto_Mouse) {
          t = InputSettingsManager_1.InputSettingsManager.DeviceLang;
          InputSettingsManager_1.InputSettingsManager.DeviceLang = r.grh;
        }
        var a = this.rrh(r.EL_, o);
        e = e || a;
        var a = this.orh(r.SL_, o);
        e = e || a;
        var a = this.nrh(r.ML_, o);
        e = e || a;
      }
      this.aY1();
      if (Platform_1.Platform.IsPcPlatform()) {
        InputSettingsManager_1.InputSettingsManager.ChangeActionAndAxisPcKeys(t);
      }
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(1);
      if (e) {
        this.InputSettingUpdateRequest(false);
      } else {
        GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(Info_1.Info.InputControllerMainType);
      }
    }
  }
  static orh(t, e) {
    if (!t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["actionData", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(true);
      return false;
    }
    var n = Object.keys(t);
    var o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = false;
    for (const m of n) {
      var r = InputSettingsManager_1.InputSettingsManager.GetActionBinding(m);
      if (r) {
        var i = t[m];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              a = a || g < _;
              if (g < _) {
                _ = o?.GetActionMappingConfigByActionName(m);
                if (!_) {
                  continue;
                }
                let t = [];
                t = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? _.FrancePcKeys : _.PcKeys;
                r.SetKeyboardKeys(t);
                _ = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(m);
                if (_) {
                  var s;
                  var u;
                  var p = new Map();
                  _.GetPcKeyNameMap(p);
                  for ([s, u] of p) {
                    InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(m, s, u);
                  }
                }
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["actionName", m], ["keyNameList", t]);
                }
              } else {
                _ = i.srh;
                r.SetKeyboardKeys(_);
                r.SetKeyboardVersion(g);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键", ["actionName", m], ["keyNameList", _]);
                }
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              p = r.GetGamepadVersion();
              a = a || g < p;
              if (g < p) {
                _ = o?.GetActionMappingConfigByActionName(m);
                if (!_) {
                  continue;
                }
                var c = _.GamepadKeys;
                r.SetGamepadKeys(c);
                var l = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(m);
                if (l) {
                  var S;
                  var f;
                  var I = new Map();
                  l.GetGamepadKeyNameMap(I);
                  for ([S, f] of I) {
                    InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(m, S, f);
                  }
                }
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置", ["actionName", m], ["keyNameList", c]);
                }
              } else {
                l = i.srh;
                r.SetGamepadKeys(l);
                r.SetGamepadVersion(g);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键", ["actionName", m], ["keyNameList", l]);
                }
                if (l.length > 0 && l[0] !== "Gamepad_Invalid") {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("InputSettings", 10, "Proto_InputSettingData服务器发现有单键配置,尝试删除本地组合键配置", ["actionName", m], ["keyNameList", l]);
                  }
                  I = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(m);
                  if (I) {
                    var M;
                    var v;
                    var c = new Map();
                    I.GetGamepadKeyNameMap(c);
                    for ([M, v] of c) {
                      InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(m, M, v);
                    }
                  }
                }
              }
          }
        }
      }
    }
    return a;
  }
  static nrh(t, e) {
    if (!t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["axisMap", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(true);
      return false;
    }
    var n = Object.keys(t);
    var o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = false;
    for (const I of n) {
      var r = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(I);
      if (r) {
        var i = t[I];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              a = a || g < _;
              if (g < _) {
                _ = o?.GetAxisMappingConfigByAxisName(I);
                if (!_) {
                  continue;
                }
                let t = new Map();
                t = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? _.FrancePcKeys : _.PcKeys;
                r.SetKeyboardKeys(t);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["axisName", I], ["keyboardKeyScaleMap", t]);
                }
              } else {
                var s = new Map();
                var u = i.vL_;
                for (const M of Object.keys(u)) {
                  var p = u[M];
                  s.set(M, p / 1000);
                }
                r.SetKeyboardKeys(s);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，更新键鼠输入按键", ["actionName", I], ["keyScaleMap", s]);
                }
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              _ = r.GetGamepadVersion();
              a = a || g < _;
              if (g < _) {
                var c = o?.GetAxisMappingConfigByAxisName(I);
                if (!c) {
                  continue;
                }
                c = c.GamepadKeys;
                r.SetGamepadKeys(c);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，手柄配置版本号大于服务端版本号，手柄使用默认配置", ["axisName", I], ["gamepadKeyScaleMap", c]);
                }
              } else {
                var l = new Map();
                var S = i.vL_;
                for (const v of Object.keys(S)) {
                  var f = S[v];
                  l.set(v, f / 1000);
                }
                r.SetGamepadKeys(l);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，更新手柄输入按键", ["actionName", I], ["gamepadKeyScaleMap", l]);
                }
              }
          }
        }
      }
    }
    return a;
  }
  static rrh(t, e) {
    if (!t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["actionData", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(true);
      return false;
    }
    var n = Object.keys(t);
    var o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = false;
    for (const c of n) {
      var r = InputSettingsManager_1.InputSettingsManager.TryGetCombinationActionBinding(c);
      if (r) {
        var i = t[c];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              a = a || g < _;
              if (g < _) {
                _ = o?.GetCombinationActionConfigByActionName(c);
                if (!_) {
                  continue;
                }
                _ = _.PcKeys;
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(c, _);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新CombinationAction输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["actionName", c], ["keyboardKeys", _]);
                }
              } else {
                var s = new Map();
                for (const l of i.yL_) {
                  s.set(l.srh[0], l.srh[1]);
                }
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(c, s);
                r.SetKeyboardVersion(g);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键", ["actionName", c], ["keyNameMap", s]);
                }
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              _ = r.GetGamepadVersion();
              a = a || g < _;
              if (g < _) {
                var u = o?.GetCombinationActionConfigByActionName(c);
                if (!u) {
                  continue;
                }
                u = u.GamepadKeys;
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(c, u);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置", ["actionName", c], ["gamepadKeys", u]);
                }
              } else {
                var p = new Map();
                for (const S of i.yL_) {
                  p.set(S.srh[0], S.srh[1]);
                }
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(c, p);
                r.SetGamepadVersion(g);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键", ["actionName", c], ["keyNameMap", p]);
                }
              }
          }
        }
      }
    }
    return a;
  }
  static Ttl(t) {
    var e;
    var n;
    var o;
    var a;
    var r;
    var i;
    var g;
    var _;
    var s = new Protocol_1.Aki.Protocol.Zih();
    var u = new Protocol_1.Aki.Protocol.eA_();
    var p = new Protocol_1.Aki.Protocol.eA_();
    u.irh = Protocol_1.Aki.Protocol.ZR_.Proto_Mouse;
    u.grh = InputSettingsManager_1.InputSettingsManager.DeviceLang;
    p.irh = Protocol_1.Aki.Protocol.ZR_.uVn;
    var c = InputSettingsManager_1.InputSettingsManager.GetActionBindingMap();
    for ([e, n] of c) {
      var l = [];
      var S = t ? 0 : n.GetKeyboardVersion();
      n.GetPcKeyNameList(l);
      this.arh(e, u, l, S);
      var l = [];
      var S = t ? 0 : n.GetGamepadVersion();
      n.GetGamepadKeyNameList(l);
      this.arh(e, p, l, S);
    }
    for ([o, a] of InputSettingsManager_1.InputSettingsManager.GetAxisBindingMap()) {
      var f = new Map();
      var I = t ? 0 : a.GetKeyboardVersion();
      a.GetPcKeyScaleMap(f);
      this.hrh(o, u, f, I);
      var f = new Map();
      var I = t ? 0 : a.GetGamepadVersion();
      a.GetGamepadKeyScaleMap(f);
      this.hrh(o, p, f, I);
    }
    for ([r, i] of InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingMap()) {
      var M = new Map();
      var v = t ? 0 : i.GetKeyboardVersion();
      i.GetPcKeyNameMap(M);
      this.lrh(r, u, M, v);
      var M = new Map();
      var v = t ? 0 : i.GetGamepadVersion();
      i.GetGamepadKeyNameMap(M);
      this.lrh(r, p, M, v);
    }
    for ([g, _] of InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMap()) {
      var m = new Map();
      var L = t ? 0 : _.GetKeyboardVersion();
      _.GetPcKeyNameMap(m);
      this._rh(g, u, m, L);
      var m = new Map();
      var L = t ? 0 : _.GetGamepadVersion();
      _.GetGamepadKeyNameMap(m);
      this._rh(g, p, m, L);
    }
    s.trh = [u, p];
    return s;
  }
  static arh(t, e, n, o) {
    var a = new Protocol_1.Aki.Protocol.zR_();
    a.urh = t;
    a.K7n = o;
    a.srh = n;
    e.SL_[t] = a;
  }
  static hrh(t, e, n, o) {
    var a;
    var r;
    var i = new Protocol_1.Aki.Protocol.JR_();
    i.crh = t;
    i.K7n = o;
    for ([a, r] of n) {
      var g = Math.round(r * 1000);
      i.vL_[a] = g;
    }
    e.ML_[t] = i;
  }
  static lrh(t, e, n, o) {
    var a;
    var r;
    var i = new Protocol_1.Aki.Protocol.EL_();
    i.urh = t;
    i.K7n = o;
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.YR_();
      g.srh = [a, r];
      i.yL_.push(g);
    }
    e.EL_[t] = i;
  }
  static _rh(t, e, n, o) {
    var a;
    var r;
    var i = new Protocol_1.Aki.Protocol.IL_();
    i.crh = t;
    i.K7n = o;
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.YR_();
      g.srh = [a, r];
      i.yL_.push(g);
    }
    e.IL_[t] = i;
  }
}
exports.InputSettingsController = InputSettingsController;
(_a = InputSettingsController).Wvi = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("InputSettings", 10, "登录直接请求服务端输入数据");
  }
  _a.InputSettingRequest();
};
InputSettingsController.zih = t => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InputSettings", 10, "服务端通知更新按键信息");
  }
  _a.RefreshInputSettingsFromProtoData(t.Zih);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputSettingUpdateNotify);
};
InputSettingsController.Jih = t => {
  if (!t || !t.Zih || t.Zih.trh.length <= 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "服务端没有数据，使用本地配置并同步给服务端");
    }
    _a.I1h();
    if (!Platform_1.Platform.IsMobilePlatform()) {
      _a.InputSettingUpdateRequest(!ModelManager_1.ModelManager.LoginModel.IsNewAccount);
    }
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "服务端有对应数据,使用服务端数据刷新本地输入数据");
    }
    _a.RefreshInputSettingsFromProtoData(t?.Zih);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputSettingResponse);
  }
};
InputSettingsController.erh = t => {
  if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 27541);
  }
}; //# sourceMappingURL=InputSettingsController.js.map