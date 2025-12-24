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
const InputSettings_1 = require("./InputSettings");
const InputSettingsManager_1 = require("./InputSettingsManager");
const LanguageKeyTransUtils_1 = require("./LanguageKeyTrans/LanguageKeyTransUtils");
class InputSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(27225, InputSettingsController.zih);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.Wvi);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(27225);
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
    Net_1.Net.Call(20959, Protocol_1.Aki.Protocol.jf_.create(t), this.Jih);
  }
  static InputSettingUpdateRequest(t) {
    var e = new Protocol_1.Aki.Protocol.$f_();
    e.Zih = this.Ttl(t);
    Net_1.Net.Call(29543, Protocol_1.Aki.Protocol.$f_.create(e), this.erh);
  }
  static nlf(t) {
    for (var [e, n] of this.slf) {
      if (n === t) {
        return e;
      }
    }
    return 0;
  }
  static aY1() {
    for (const u of KeySettingAll_1.configKeySettingAll.GetConfigList()) {
      var t = u.ConnectedKeySettingIdList;
      if (!(t.length <= 0)) {
        for (const p of t) {
          var e = KeySettingById_1.configKeySettingById.GetConfig(p);
          var n = u.ActionOrAxisName;
          var o = InputSettingsManager_1.InputSettingsManager.GetActionBinding(n);
          var a = InputSettingsManager_1.InputSettingsManager.TryGetCombinationActionBinding(n);
          var r = e.ActionOrAxisName;
          var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(r);
          var g = [];
          var s = new Map();
          var _ = InputSettingsController.nlf(u.ExclusiveType);
          switch (u.InputControllerType) {
            case 1:
              o.GetPcKeyNameList(g);
              i?.SetKeyboardKeys(g, _);
              a?.GetPcKeyNameMap(s, _);
              InputSettingsManager_1.InputSettingsManager.SetOrAddCombinationActionKeyboardKeys(r, s, _);
              break;
            case 2:
              o.GetGamepadKeyNameList(g);
              i?.SetGamepadKeys(g, _);
              a?.GetGamepadKeyNameMapByBindingType(s, _);
              InputSettingsManager_1.InputSettingsManager.SetOrAddCombinationActionGamepadKeys(r, s, _);
              break;
            default:
              o.GetKeyNameList(g);
              i?.SetKeys(g, _);
          }
          e = [];
          i?.GetKeyNameList(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("InputSettings", 10, "处理键位联动问题", ["ActionName", n], ["Type", u.InputControllerType], ["LinkActionName", r], ["KeyNames", g], ["after", e]);
          }
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
        var a = this.rrh(r.nhf, o);
        e = e || a;
        var a = this.orh(r.zR_, o);
        e = e || a;
        var a = this.nrh(r.JR_, o);
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
    if (!t || t.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["actionData", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(true);
      return false;
    }
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let o = false;
    for (const P of t) {
      var a = P.urh;
      var r = InputSettingsManager_1.InputSettingsManager.GetActionBinding(a);
      if (r) {
        var i = P.K7n;
        var g = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(InputSettingsController.nlf(P.ohf));
        switch (e) {
          case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
            var s = r.GetKeyboardVersion(g);
            o = o || i < s;
            if (i < s) {
              s = n?.GetActionMappingConfigByActionName(a);
              if (!s) {
                continue;
              }
              let t = [];
              t = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? s.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(InputSettingsManager_1.InputSettingsManager.CurrentDeviceLang).GetActionPcKeys(s);
              var _ = InputSettingsController.nlf(P.ohf);
              r.SetKeyboardKeys(t, _);
              var s = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(a);
              if (s) {
                var u;
                var p;
                var l = new Map();
                s.GetPcKeyNameMap(l, _);
                for ([u, p] of l) {
                  InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(a, u, p, _);
                }
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["actionName", a], ["keyNameList", t]);
              }
            } else {
              s = P.srh;
              l = InputSettingsController.nlf(P.ohf);
              r.SetKeyboardKeys(s, l);
              r.SetKeyboardVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键", ["actionName", a], ["keyNameList", s]);
              }
            }
            break;
          case Protocol_1.Aki.Protocol.ZR_.uVn:
            s = r.GetGamepadVersion(g);
            o = o || i < s;
            if (i < s) {
              var S = n?.GetActionMappingConfigByActionName(a);
              if (!S) {
                continue;
              }
              var S = S.GamepadKeys;
              var I = InputSettingsController.nlf(P.ohf);
              r.SetGamepadKeys(S, I);
              var c = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(a);
              if (c) {
                var f;
                var M;
                var v = new Map();
                c.GetGamepadKeyNameMapByBindingType(v, I);
                for ([f, M] of v) {
                  InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(a, f, M, I);
                }
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置", ["actionName", a], ["keyNameList", S]);
              }
            } else {
              var c = P.srh;
              var L = InputSettingsController.nlf(P.ohf);
              r.SetGamepadKeys(c, L);
              r.SetGamepadVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键", ["actionName", a], ["keyNameList", c]);
              }
              if (c.length > 0 && c[0] !== "Gamepad_Invalid") {
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("InputSettings", 10, "Proto_InputSettingData服务器发现有单键配置,尝试删除本地组合键配置", ["actionName", a], ["keyNameList", c]);
                }
                v = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(a);
                if (v) {
                  var m;
                  var C;
                  var S = new Map();
                  v.GetGamepadKeyNameMapByBindingType(S, L);
                  for ([m, C] of S) {
                    InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(a, m, C, L);
                  }
                }
              }
            }
        }
      }
    }
    return o;
  }
  static nrh(t, e) {
    if (!t || t.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["axisMap", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(true);
      return false;
    }
    var n = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let o = false;
    for (const M of t) {
      var a = M.crh;
      var r = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(a);
      if (r) {
        var i = M.K7n;
        var g = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(InputSettingsController.nlf(M.ohf));
        switch (e) {
          case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
            var s = r.GetKeyboardVersion(g);
            o = o || i < s;
            if (i < s) {
              s = n?.GetAxisMappingConfigByAxisName(a);
              if (!s) {
                continue;
              }
              let t = new Map();
              t = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? s.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(InputSettingsManager_1.InputSettingsManager.CurrentDeviceLang).GetAxisPcKeys(s);
              s = InputSettingsController.nlf(M.ohf);
              r.SetKeyboardKeys(t, s);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["axisName", a], ["keyboardKeyScaleMap", t]);
              }
            } else {
              var _ = new Map();
              var u = M.vL_;
              for (const v of Object.keys(u)) {
                var p = u[v];
                _.set(v, p / 1000);
              }
              s = InputSettingsController.nlf(M.ohf);
              r.SetKeyboardKeys(_, s);
              r.SetKeyboardVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，更新键鼠输入按键", ["actionName", a], ["keyScaleMap", _]);
              }
            }
            break;
          case Protocol_1.Aki.Protocol.ZR_.uVn:
            s = r.GetGamepadVersion(g);
            o = o || i < s;
            if (i < s) {
              var l = n?.GetAxisMappingConfigByAxisName(a);
              if (!l) {
                continue;
              }
              var l = l.GamepadKeys;
              var S = InputSettingsController.nlf(M.ohf);
              r.SetGamepadKeys(l, S);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，手柄配置版本号大于服务端版本号，手柄使用默认配置", ["axisName", a], ["gamepadKeyScaleMap", l]);
              }
            } else {
              var I = new Map();
              var c = M.vL_;
              for (const L of Object.keys(c)) {
                var f = c[L];
                I.set(L, f / 1000);
              }
              S = InputSettingsController.nlf(M.ohf);
              r.SetGamepadKeys(I, S);
              r.SetGamepadVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Axis输入时，更新手柄输入按键", ["actionName", a], ["gamepadKeyScaleMap", I]);
              }
            }
        }
      }
    }
    return o;
  }
  static rrh(t, e) {
    if (!t || t.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键", ["actionData", t]);
      }
      InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(true);
      return false;
    }
    let n = false;
    var o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    for (const S of t) {
      var a = S.urh;
      var r = InputSettingsManager_1.InputSettingsManager.TryGetCombinationActionBinding(a);
      if (r) {
        var i = S.K7n;
        var g = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(InputSettingsController.nlf(S.ohf));
        switch (e) {
          case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
            var s = r.GetKeyboardVersion(g);
            n = n || i < s;
            if (i < s) {
              s = o?.GetCombinationActionConfigByActionName(a);
              if (!s) {
                continue;
              }
              let t = new Map();
              t = InputSettingsManager_1.InputSettingsManager.CheckUseFrenchKeyboard ? s.FrancePcKeys : LanguageKeyTransUtils_1.LanguageKeyTransUtils.GetKeyTrans(InputSettingsManager_1.InputSettingsManager.CurrentDeviceLang).GetCombinationActionPcKeys(s);
              s = InputSettingsController.nlf(S.ohf);
              InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(a, t, s);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新CombinationAction输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置", ["actionName", a], ["keyboardKeys", t]);
              }
            } else {
              var _ = new Map();
              for (const I of S.yL_) {
                _.set(I.srh[0], I.srh[1]);
              }
              s = InputSettingsController.nlf(S.ohf);
              InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(a, _, s);
              r.SetKeyboardVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键", ["actionName", a], ["keyNameMap", _]);
              }
            }
            break;
          case Protocol_1.Aki.Protocol.ZR_.uVn:
            s = r.GetGamepadVersion(g);
            n = n || i < s;
            if (i < s) {
              var u = o?.GetCombinationActionConfigByActionName(a);
              if (!u) {
                continue;
              }
              var u = u.GamepadKeys;
              var p = InputSettingsController.nlf(S.ohf);
              InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(a, u, p);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置", ["actionName", a], ["gamepadKeys", u]);
              }
            } else {
              var l = new Map();
              for (const c of S.yL_) {
                l.set(c.srh[0], c.srh[1]);
              }
              p = InputSettingsController.nlf(S.ohf);
              InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(a, l, p);
              r.SetGamepadVersion(i, g);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("InputSettings", 10, "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键", ["actionName", a], ["keyNameMap", l]);
              }
            }
        }
      }
    }
    return n;
  }
  static Ttl(t) {
    var e = new Protocol_1.Aki.Protocol.Zih();
    var n = new Protocol_1.Aki.Protocol.eA_();
    var o = new Protocol_1.Aki.Protocol.eA_();
    n.irh = Protocol_1.Aki.Protocol.ZR_.Proto_Mouse;
    n.grh = InputSettingsManager_1.InputSettingsManager.DeviceLang;
    o.irh = Protocol_1.Aki.Protocol.ZR_.uVn;
    InputSettingsController.alf(t, n, o);
    InputSettingsController.hlf(t, n, o);
    InputSettingsController.llf(t, n, o);
    InputSettingsController._lf(t, n, o);
    e.trh = [n, o];
    return e;
  }
  static alf(t, e, n) {
    var o;
    var a;
    for ([o, a] of InputSettingsManager_1.InputSettingsManager.GetActionBindingMap()) {
      var r;
      var i;
      var g = new Map();
      a.GetAllPcKeyNameMap(g);
      for ([r, i] of g) {
        var s = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(r);
        var s = t ? 0 : a.GetKeyboardVersion(s);
        this.arh(o, e, i, s, r);
      }
      var _;
      var u;
      var g = new Map();
      a.GetAllGamepadKeyNameMap(g);
      for ([_, u] of g) {
        var p = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(_);
        var p = t ? 0 : a.GetGamepadVersion(p);
        this.arh(o, n, u, p, _);
      }
    }
  }
  static hlf(t, e, n) {
    var o;
    var a;
    for ([o, a] of InputSettingsManager_1.InputSettingsManager.GetAxisBindingMap()) {
      var r;
      var i;
      var g = new Map();
      a.GetAllPcKeyScaleMap(g);
      for ([r, i] of g) {
        var s = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(r);
        var s = t ? 0 : a.GetKeyboardVersion(s);
        this.hrh(o, e, i, s, r);
      }
      var _;
      var u;
      var g = new Map();
      a.GetAllGamepadKeyScaleMap(g);
      for ([_, u] of g) {
        var p = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(_);
        var p = t ? 0 : a.GetGamepadVersion(p);
        this.hrh(o, n, u, p, _);
      }
    }
  }
  static llf(t, e, n) {
    var o;
    var a;
    for ([o, a] of InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingMap()) {
      var r;
      var i;
      var g = new Map();
      a.GetAllPcKeyNameMap(g);
      for ([r, i] of g) {
        var s = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(r);
        var s = t ? 0 : a.GetKeyboardVersion(s);
        this.lrh(o, e, i, s, r);
      }
      var _;
      var u;
      var g = new Map();
      a.GetAllGamepadKeyNameMap(g);
      for ([_, u] of g) {
        var p = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(_);
        var p = t ? 0 : a.GetGamepadVersion(p);
        this.lrh(o, n, u, p, _);
      }
    }
  }
  static _lf(t, e, n) {
    var o;
    var a;
    for ([o, a] of InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMap()) {
      var r;
      var i;
      var g = new Map();
      a.GetAllPcKeyNameMap(g);
      for ([r, i] of g) {
        var s = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(r);
        var s = t ? 0 : a.GetKeyboardVersion(s);
        this._rh(o, e, i, s, r);
      }
      var _;
      var u;
      var g = new Map();
      a.GetAllGamepadKeyNameMap(g);
      for ([_, u] of g) {
        var p = InputSettingsManager_1.InputSettingsManager.GetExclusiveTypeByBindingType(_);
        var p = t ? 0 : a.GetGamepadVersion(p);
        this._rh(o, n, u, p, _);
      }
    }
  }
  static arh(t, e, n, o, a) {
    var a = InputSettingsController.slf.get(a);
    var r = new Protocol_1.Aki.Protocol.zR_();
    r.urh = t;
    r.K7n = o;
    r.ohf = a;
    r.srh = n;
    e.zR_.push(r);
  }
  static hrh(t, e, n, o, a) {
    var r;
    var i;
    var a = InputSettingsController.slf.get(a);
    var g = new Protocol_1.Aki.Protocol.JR_();
    g.crh = t;
    g.K7n = o;
    g.ohf = a;
    for ([r, i] of n) {
      var s = Math.round(i * 1000);
      g.vL_[r] = s;
    }
    e.JR_.push(g);
  }
  static lrh(t, e, n, o, a) {
    var r;
    var i;
    var a = InputSettingsController.slf.get(a);
    var g = new Protocol_1.Aki.Protocol.EL_();
    g.urh = t;
    g.K7n = o;
    g.ohf = a;
    for ([r, i] of n) {
      var s = new Protocol_1.Aki.Protocol.YR_();
      s.srh = [r, i];
      g.yL_.push(s);
    }
    e.nhf.push(g);
  }
  static _rh(t, e, n, o, a) {
    var r;
    var i;
    var a = InputSettingsController.slf.get(a);
    var g = new Protocol_1.Aki.Protocol.IL_();
    g.crh = t;
    g.K7n = o;
    g.ohf = a;
    for ([r, i] of n) {
      var s = new Protocol_1.Aki.Protocol.YR_();
      s.srh = [r, i];
      g.yL_.push(s);
    }
    e.shf.push(g);
  }
}
exports.InputSettingsController = InputSettingsController;
(_a = InputSettingsController).slf = new Map([[0, Protocol_1.Aki.Protocol.ahf.Proto_Normal], [1, Protocol_1.Aki.Protocol.ahf.Proto_Motorcycle]]);
InputSettingsController.Wvi = () => {
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
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 26345);
  }
}; //# sourceMappingURL=InputSettingsController.js.map