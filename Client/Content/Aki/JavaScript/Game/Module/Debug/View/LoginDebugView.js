"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginDebugView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Json_1 = require("../../../../Core/Common/Json");
const Log_1 = require("../../../../Core/Common/Log");
const GmAccountAll_1 = require("../../../../Core/Define/ConfigQuery/GmAccountAll");
const Http_1 = require("../../../../Core/Http/Http");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const LoginController_1 = require("../../Login/LoginController");
const ReconnectDefine_1 = require("../../ReConnect/ReconnectDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
class LoginDebugView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IRe = undefined;
    this._3t = -1;
    this.u3t = undefined;
    this.c3t = undefined;
    this.m3t = undefined;
    this.d3t = () => {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.LoginViewQuit);
    };
    this.C3t = () => {
      if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
        if (this.GetInputText(2).Text === "") {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LoginFailEmptyAccount");
        } else {
          this.g3t();
          if (!Platform_1.Platform.IsWindowsPlatform()) {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DepthOfFieldQuality 1");
          }
          this.CloseMe(e => {
            if (e) {
              UiManager_1.UiManager.OpenView("LoginView");
            }
          });
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }
    };
    this.f3t = () => {
      if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
        if (this.GetInputText(2).Text === "") {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LoginFailEmptyAccount");
        } else {
          this.g3t();
          if (!Platform_1.Platform.IsWindowsPlatform()) {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DepthOfFieldQuality 1");
          }
          ModelManager_1.ModelManager.LoginModel.SetPlayerName("一键登录账号");
          this.p3t();
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }
    };
    this.v3t = () => {
      var e;
      if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
        this.g3t();
        if (!Platform_1.Platform.IsWindowsPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DepthOfFieldQuality 1");
        }
        e = this.M3t();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 8, "生成账号", ["ip", e]);
        }
        this.GetInputText(2).SetText(e);
        ModelManager_1.ModelManager.LoginModel.SetAccount(e);
        ModelManager_1.ModelManager.LoginModel.SetPlayerName("一键登录账号");
        this.p3t();
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }
    };
    this.E3t = e => {
      this.GetSprite(8).SetUIActive(e === 1);
    };
    this.$Km = e => {
      this.GetSprite(10).SetUIActive(e === 1);
      Platform_1.Platform.IsFakeCloudGame = e === 1;
      GameSettingsManager_1.GameSettingsManager.Clear();
    };
    this.S3t = e => {
      this.GetSprite(12).SetUIActive(e === 1);
    };
    this.zIa = e => {
      if (e === 1) {
        ModelManager_1.ModelManager.LoginModel.IsCopyAccount = true;
        this.GetItem(19)?.SetUIActive(true);
      } else {
        ModelManager_1.ModelManager.LoginModel.IsCopyAccount = false;
        this.GetItem(19)?.SetUIActive(false);
      }
    };
    this.y3t = e => {
      var i;
      if (e !== -1) {
        if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
          i = ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList();
          this.GetInputText(2).SetText(i[e]);
          if (this.GetInputText(2).Text === "") {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LoginFailEmptyAccount");
          } else {
            this.g3t();
            this.p3t();
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
        }
      }
    };
    this.I3t = e => {
      if ((this._3t = e) !== -1) {
        if (!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
          }
        }
        UiManager_1.UiManager.OpenView("LoginDebugPlayerNameView", this.T3t);
      }
    };
    this.T3t = () => {
      var e;
      var i;
      var o;
      var t;
      var r = this._3t;
      if (!(r < 0)) {
        e = ModelManager_1.ModelManager.LoginModel.GetPlayerName();
        o = (i = GmAccountAll_1.configGmAccountAll.GetConfigList())[r].FirstName;
        t = this.M3t();
        this.GetInputText(2).SetText("" + e + o + "-" + t);
        ModelManager_1.ModelManager.SundryModel.AccountGmId = i[r].GmOrderListId;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 8, "创建新的GM账号", ["index", "" + r], ["配置id", "" + i[r].Id]);
        }
        if (this.GetInputText(2).Text === "") {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LoginFailEmptyAccount");
        } else {
          this.g3t();
          this.p3t();
        }
      }
    };
    this.L3t = () => {
      var i = this.GetInputText(13).GetText();
      var e = this.GetDropdown(4);
      if (StringUtils_1.StringUtils.IsEmpty(i)) {
        e.SetOptions(this.u3t);
      } else {
        this.c3t.Empty();
        for (let e = 0; e < this.u3t.Num(); e++) {
          var o = this.u3t.Get(e);
          if (o.TextOrConfigTableName.includes(i)) {
            this.c3t.Add(o);
          }
        }
        if (this.c3t.Num() !== 0) {
          e.Options.Empty();
          e.SetOptions(this.c3t);
        }
      }
    };
    this.lLu = e => {
      var i = ModelManager_1.ModelManager.LoginModel.GetServerInfoList();
      if (i) {
        if (i = i[e]) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 63, "切换服务器IP", ["ServerIp", i.Ip]);
          }
          this.GetInputText(14).SetText(i.Ip);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 63, "切换服务器IP失败, 服务器列表为空", ["SelectIndex", e]);
      }
    };
    this.D3t = (e, i, o) => {
      var t;
      if (o === 0) {
        if (t = BaseConfigController_1.BaseConfigController.GetPrivateServers()) {
          t = t.serverUrl;
          Http_1.Http.Get(t, undefined, this.R3t);
          this.IRe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.IRe = undefined;
            this.R3t(false, undefined, undefined, true);
          }, TimeUtil_1.TimeUtil.InverseMillisecond * 5);
          return;
        } else {
          return undefined;
        }
      }
      if (o === 3) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(`私服列表域名解析失败[${e}], 可能是本地开了VPN, 请关闭后重试`);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(`私服列表获取失败[${e}], EIcmpResponseStatus:${o}`);
      }
    };
    this.R3t = (e = 0, i, o = undefined, t = true) => {
      var r;
      if (this.IRe !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
        this.IRe = undefined;
      }
      ModelManager_1.ModelManager.LoginModel.AddExtraServer();
      if (o) {
        if (r = Json_1.Json.Parse(o)) {
          ModelManager_1.ModelManager.LoginModel.AddServerInfos(r);
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Login", 41, "序列化ServerInfo失败", ["JsonData", o]);
        }
      }
      if (t) {
        ModelManager_1.ModelManager.LoginModel.AddDataTableServers();
      }
      this.U3t();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITextInputComponent], [3, UE.UIDropdownComponent], [4, UE.UIDropdownComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIExtendToggle], [8, UE.UISprite], [9, UE.UIExtendToggle], [10, UE.UISprite], [11, UE.UIExtendToggle], [12, UE.UISprite], [13, UE.UITextInputComponent], [14, UE.UITextInputComponent], [15, UE.UIDropdownComponent], [16, UE.UIDropdownComponent], [17, UE.UITextInputComponent], [18, UE.UIExtendToggle], [19, UE.UIItem], [20, UE.UITextInputComponent]];
    this.BtnBindInfo = [[0, this.d3t], [1, this.C3t], [5, this.v3t], [6, this.f3t], [7, this.E3t], [9, this.$Km], [11, this.S3t], [18, this.zIa]];
  }
  OnStart() {
    this.m3t = (0, puerts_1.toManualReleaseDelegate)(this.D3t);
    ModelManager_1.ModelManager.LoginModel.InitConfig();
    ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
    ModelManager_1.ModelManager.LoginModel.InitRecentlyAccountList();
    this.GetExtendToggle(18)?.SetToggleState(0);
    this.GetItem(19)?.SetUIActive(false);
    this.u3t = UE.NewArray(UE.UIDropdownOptionData);
    this.c3t = UE.NewArray(UE.UIDropdownOptionData);
    this.GetInputText(13).OnTextChange.Bind(this.L3t);
    this.GetDropdown(3).OnSelectChange.Bind(this.lLu);
    this._Lu();
    this.GetInputText(2).SetText(ModelManager_1.ModelManager.LoginModel.GetAccount());
    this.A3t();
  }
  U3t() {
    this.P3t();
    this.x3t();
    this.w3t();
    this.WKm();
    this.B3t();
    if (GlobalData_1.GlobalData.IsPlayInEditor && !UiManager_1.UiManager.IsViewShow("LoginStatusView")) {
      UiManager_1.UiManager.OpenView("LoginStatusView");
    }
    this.b3t();
    this.q3t();
    ModelManager_1.ModelManager.LoginModel.SmokeTestReady = true;
  }
  P3t() {
    var o = this.GetDropdown(3);
    if (o) {
      var e;
      var t = o.GetOption(0).Sprite;
      o.Options.Empty();
      var r = ModelManager_1.ModelManager.LoginModel.GetServerInfoList();
      var a = this.tFn();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "debug 登录信息", ["serverIp", a], ["serverInfoList", r]);
      }
      let i = false;
      if (r) {
        for (let e = 0; e < r.length; ++e) {
          var n = r[e];
          o.Options.Add(new UE.UIDropdownOptionData(n.Name, t, 0, ""));
          if (n.Ip === a) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 10, "设置服务器下拉列表", ["Value", e]);
            }
            o.Value = e;
            o.CaptionText.UIText.SetText(n.Name);
            this._Lu();
            i = true;
          }
        }
      }
      if (!i) {
        if (r && r.length > 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 10, "设置服务器下拉列表", ["Value", 0]);
          }
          e = r[o.Value = 0];
          o.CaptionText.UIText.SetText(e.Name);
        }
      }
    }
  }
  _Lu() {
    var e = this.tFn() ?? "";
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 63, "设置服务器IP", ["ServerIp", e]);
    }
    this.GetInputText(14).SetText(e);
  }
  x3t() {
    var t = this.GetDropdown(4);
    if (t) {
      var e;
      var r = t.GetOption(0).Sprite;
      t.Options.Empty();
      var a = ModelManager_1.ModelManager.LoginModel.GetSingleMapList();
      var n = ModelManager_1.ModelManager.LoginModel.GetSingleMapId();
      var _ = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId();
      let i = undefined;
      let o = false;
      if (a) {
        for (let e = 0; e < a.length; ++e) {
          var g = a[e];
          var s = g.MapId + "-" + g.MapName;
          var l = new UE.UIDropdownOptionData(s, r, 0, "");
          this.u3t.Add(l);
          t.Options.Add(l);
          if (g.MapId === n) {
            t.Value = e;
            t.CaptionText.UIText.SetText(s);
            o = true;
          }
          if (g.MapId === _) {
            i = e;
          }
        }
      }
      if (!o) {
        e = i || 0;
        if (a && a.length > e) {
          e = (e = a[t.Value = e]).MapId + "-" + e.MapName;
          t.CaptionText.UIText.SetText(e);
        }
      }
    }
  }
  w3t() {
    var e;
    if (this.GetExtendToggle(7)) {
      e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex, true) ? 1 : 0;
      this.GetExtendToggle(7).SetToggleState(e);
      this.E3t(e);
    }
  }
  WKm() {
    if (this.GetExtendToggle(9)) {
      this.GetExtendToggle(9).SetToggleState(0);
      this.$Km(0);
    }
  }
  B3t() {
    var e;
    var i = this.GetExtendToggle(11);
    if (i) {
      e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot, false) ? 1 : 0;
      i.SetToggleState(e);
      this.S3t(e);
      i.GetRootComponent().SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    if (this.m3t) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.D3t);
      this.m3t = undefined;
    }
    this.GetDropdown(15).OnSelectChange.Unbind();
    ModelManager_1.ModelManager.LoginModel.SaveRecentlyAccountList();
    ModelManager_1.ModelManager.LoginModel.CleanConfig();
    ModelManager_1.ModelManager.LoginModel.SetServerId(this.GetInputText(20).GetText());
  }
  q3t() {
    var e = this.GetDropdown(16);
    if (e) {
      e.CaptionText.UIText.text = "选择最近登录账号";
      var i = e.GetOption(0).Sprite;
      e.Options.Empty();
      var o = ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList();
      if (o) {
        for (const t of o) {
          e.Options.Add(new UE.UIDropdownOptionData(t, i, 0, ""));
        }
      }
      e.OnSelectChange.Bind(this.y3t);
    }
  }
  b3t() {
    var e = this.GetDropdown(15);
    if (e) {
      var i = e.GetOption(0).Sprite;
      e.Options.Empty();
      var o = GmAccountAll_1.configGmAccountAll.GetConfigList();
      for (const t of o) {
        e.Options.Add(new UE.UIDropdownOptionData(t.GmName, i, 0, ""));
      }
      e.CaptionText.UIText.SetText("创建指定GM账号");
      e.OnSelectChange.Bind(this.I3t);
    }
  }
  p3t() {
    PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(() => {
      LoginController_1.LoginController.GetHttp(true);
    }, undefined).catch(e => {});
  }
  M3t() {
    return `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(new Date())}]`;
  }
  aGn(e) {
    e = /(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(?<port>\d{1,5}))?/.exec(e);
    if (e && e.groups) {
      return {
        Ip: e.groups.ip,
        Port: e.groups.port
      };
    }
  }
  g3t() {
    var i = this.GetDropdown(4);
    let e = i?.Value;
    if (e === -1) {
      e = 0;
    }
    var o = i.GetOption(e);
    let t = -1;
    for (let e = 0; e < this.u3t.Num(); e++) {
      if (this.u3t.Get(e).TextOrConfigTableName === o.TextOrConfigTableName) {
        t = e;
        break;
      }
    }
    if (t === -1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 10, "当前选择的地图 在初始地图数据集合里 不存在", ["地图名称", o.TextOrConfigTableName]);
      }
      t = 0;
    }
    if (t !== undefined && t >= 0 && (i = ModelManager_1.ModelManager.LoginModel.GetSingleMapIp(t))) {
      ModelManager_1.ModelManager.LoginModel.SetSingleMapId(i);
    }
    var i = this.GetDropdown(3);
    if (i) {
      let e = i.GetValue();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 10, "获取服务器下拉列表当前设置值", ["serverValue", e]);
      }
      if (e !== undefined) {
        if (e < 0) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Login", 10, "服务器下拉列表当前设置值不符合预期,默认为0");
          }
          e = 0;
        }
        if (i = ModelManager_1.ModelManager.LoginModel.GetServerInfo(e)) {
          ModelManager_1.ModelManager.LoginModel.SetServerName(i.Name);
          this.iFn(i.Ip, 1);
        } else {
          i = ModelManager_1.ModelManager.LoginModel.GetServerInfoList();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 10, "获取服务器数据为空", ["serverInfoList", i]);
          }
        }
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 10, "服务器下拉列表节点获取不到");
    }
    var i = this.GetInputText(14).GetText();
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      if (r = this.aGn(i)) {
        ModelManager_1.ModelManager.LoginModel.SetServerName("手动输入IP地址服务器");
        this.iFn(i, 2);
        ModelManager_1.ModelManager.LoginModel.TrySetCustomServerPort(r.Port, 2);
      }
    }
    var i = this.GetExtendToggle(7).ToggleState === 1 ? LoginDefine_1.ELoginSex.Girl : LoginDefine_1.ELoginSex.Boy;
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex, i === LoginDefine_1.ELoginSex.Girl);
    ModelManager_1.ModelManager.LoginModel.SetPlayerSex(i);
    ModelManager_1.ModelManager.LoginModel.SetAccount(this.GetInputText(2).Text);
    ModelManager_1.ModelManager.LoginModel.SetSourceAccount(this.GetInputText(17).Text);
    var r = this.GetExtendToggle(11).ToggleState === 1;
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot, r);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "已保存登录数据", ["ServerIp", this.tFn()], ["CustomServerPort", ModelManager_1.ModelManager.LoginModel.GetCustomServerPort()], ["SingleId", ModelManager_1.ModelManager.LoginModel.GetSingleMapId()], ["MultiMapId", ModelManager_1.ModelManager.LoginModel.GetMultiMapId()], ["Account", ModelManager_1.ModelManager.LoginModel.GetAccount()], ["LoginSex", LoginDefine_1.ELoginSex[i]]);
    }
  }
  A3t() {
    var e;
    var i;
    if (!ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (e = BaseConfigController_1.BaseConfigController.GetPrivateServers()) {
        ModelManager_1.ModelManager.LoginModel.AddServerInfoByCdn();
        if (e.enable) {
          if ((i = e.serverUrl.match(/:\/\/.*?\//g)).length >= 0) {
            i = i[0];
            UE.KuroStaticLibrary.IcmpPing(i.substring(3, i.length - 1), 5, this.m3t);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(`私服域名截取失败[${e.serverUrl}]`);
          }
        } else {
          this.R3t(false, undefined, undefined, false);
        }
      }
    }
  }
  iFn(e, i) {
    ModelManager_1.ModelManager.LoginModel.SetServerIp(e, i);
    LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginDebugServerIp, e);
  }
  tFn() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LoginDebugServerIp, "-1");
    if (e === "-1") {
      return ModelManager_1.ModelManager.LoginModel.GetServerIp();
    } else {
      return e;
    }
  }
}
exports.LoginDebugView = LoginDebugView;
//# sourceMappingURL=LoginDebugView.js.map