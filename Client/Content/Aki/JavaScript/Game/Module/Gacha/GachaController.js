"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUtils_1 = require("../../NewWorld/Character/CharacterUtils");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager");
const GachaDefine_1 = require("./GachaDefine");
const GachaModel_1 = require("./GachaModel");
class GachaController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("GachaMainView", GachaController.YHt);
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.JHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.JHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this.zHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterCloseGachaScene, this.OnAfterCloseGachaScent);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.JHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.JHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this.zHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterCloseGachaScene, this.OnAfterCloseGachaScent);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.nye);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20461, GachaController.OnGachaResultNotify);
    Net_1.Net.Register(20203, GachaController.OnGachaNewNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20461);
    Net_1.Net.UnRegister(20203);
  }
  static CanCloseView() {
    return !!ModelManager_1.ModelManager.GachaModel.CanCloseView || (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseGachaSceneView), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Gacha", 27, "GachaController关闭GachaScene"), false);
  }
  static GachaHistoryRequest(e) {}
  static IsNewRole(e) {
    var a = !GachaController.ZHt.has(e);
    if (a) {
      GachaController.ZHt.add(e);
    }
    return a;
  }
  static async GachaRequest(e, a) {
    var r = Protocol_1.Aki.Protocol.Jrs.create();
    r.t9n = e;
    r.i9n = a;
    ModelManager_1.ModelManager.RoleModel.GetRoleList().forEach(e => {
      if (e) {
        GachaController.ZHt.add(e.GetDataId());
      }
    });
    var o;
    var r = await Net_1.Net.CallAsync(17051, r);
    if (r) {
      if (r.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrGachaIsNotInOpenTime) {
        o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(67);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
        this.zHt();
      } else if (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 20661);
      } else {
        ModelManager_1.ModelManager.GachaModel.UpdateCount(e, a);
        ModelManager_1.ModelManager.GachaModel.CurGachaResult = r.tws;
        UiManager_1.UiManager.OpenView("DrawMainView");
        KuroSdkReport_1.KuroSdkReport.OnGachaResult(e, r.tws);
      }
    }
  }
  static async GachaPoolDetailRequestAsync(e) {
    var a = Protocol_1.Aki.Protocol._m_.create();
    a.o9n = e;
    var e = await Net_1.Net.CallAsync(25441, a);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28546);
    }
    return e;
  }
  static GachaInfoRequest(a, e = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTime() - this.ejt;
    this.ejt = TimeUtil_1.TimeUtil.GetServerTime();
    if (r < this.tjt) {
      if (a && !UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
        UiManager_1.UiManager.OpenView("GachaMainView");
      }
    } else {
      r = Protocol_1.Aki.Protocol.Xrs.create();
      Net_1.Net.Call(16989, r, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16411);
          } else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Gacha", 34, "[GachaController.GachaInfoRequest] 在Loading中,打开抽卡界面取消");
            }
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Gacha", 34, "抽卡服务端数据:", ["Result", JSON.stringify(e)]);
            }
            ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs);
            ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs;
            ModelManager_1.ModelManager.GachaModel.RecordId = e.ews;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGachaMainView);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenGachaChanged);
            if (a && !UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
              UiManager_1.UiManager.OpenView("GachaMainView");
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Gacha", 8, "请求抽奖数据失败");
        }
      });
    }
  }
  static async GachaInfoRequestAsync() {
    var e = TimeUtil_1.TimeUtil.GetServerTime() - this.ejt;
    this.ejt = TimeUtil_1.TimeUtil.GetServerTime();
    if (!(e < this.tjt)) {
      e = Protocol_1.Aki.Protocol.Xrs.create();
      if (e = await Net_1.Net.CallAsync(16989, e)) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16411);
        } else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Gacha", 34, "[GachaController.GachaInfoRequest] 在Loading中,打开抽卡界面取消");
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Gacha", 34, "抽卡服务端数据-Async:", ["Result", JSON.stringify(e)]);
          }
          ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs);
          ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs;
          ModelManager_1.ModelManager.GachaModel.RecordId = e.ews;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGachaMainView);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenGachaChanged);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Gacha", 8, "请求抽奖数据失败");
      }
    }
  }
  static TryGachaInfoRequest(a) {
    var e = TimeUtil_1.TimeUtil.GetServerTime() - this.ejt;
    this.ejt = TimeUtil_1.TimeUtil.GetServerTime();
    if (e < this.tjt) {
      a?.(true);
    }
    var e = Protocol_1.Aki.Protocol.Xrs.create();
    Net_1.Net.Call(16989, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16411);
          a?.(false);
        } else if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Gacha", 34, "[GachaController.GachaInfoRequest] 在Loading中,打开抽卡界面取消");
          }
          a?.(false);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Gacha", 34, "抽卡服务端数据:", ["Result", JSON.stringify(e)]);
          }
          ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs);
          ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs;
          ModelManager_1.ModelManager.GachaModel.RecordId = e.ews;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGachaMainView);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenGachaChanged);
          a?.(true);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Gacha", 8, "请求抽奖数据失败");
        }
        a?.(false);
      }
    });
  }
  static OpenGachaView(a) {
    this.TryGachaInfoRequest(e => {
      if (e && !UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
        UiManager_1.UiManager.OpenView("GachaMainView", a);
      }
    });
  }
  static CloseAndOpenGachaView(a, r) {
    this.TryGachaInfoRequest(e => {
      if (e && !UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
        UiManager_1.UiManager.CloseAndOpenView(a, "GachaMainView", r);
      }
    });
  }
  static GachaUsePoolRequest(a, r) {
    var e = Protocol_1.Aki.Protocol.eos.create();
    e.t9n = a;
    e.o9n = r;
    Net_1.Net.Call(25335, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19560);
        } else if (e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(a)) {
          e.UsePoolId = r;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaPoolSelectResponse, a, r);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Gacha", 43, "卡池设置失败");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Gacha", 43, "选择卡池失败");
      }
    });
  }
  static PreloadGachaResultResource(e) {
    const i = [];
    const _ = new Map();
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, a) => {
      var r = e.e9n.L8n;
      let o;
      switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(r)) {
        case 1:
          var n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(r);
          if (!_.get(r)) {
            _.set(r, true);
            i.push(...UiModelResourcesManager_1.UiModelResourcesManager.GetRoleResourcesPath(n.Id));
          }
          var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(n.Id);
          o = UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(t);
          if (!_.get(r)) {
            _.set(r, true);
            i.push(...o);
          }
          var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n.Id);
          i.push(...UiModelResourcesManager_1.UiModelResourcesManager.GetHuluResourcesPath(CharacterUtils_1.CharacterUtils.GetHuluModelId(t.PartyId)));
          break;
        case 2:
          o = UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(r);
          if (!_.get(r)) {
            _.set(r, true);
            i.push(...o);
          }
      }
    });
    UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(i, e);
  }
  static CommonShowRoleResult(e, a, r) {
    var o = e.wb_.s5n;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(o) === 1) {
      var n = new Array();
      var t = new GachaModel_1.GachaResult();
      var i = new Protocol_1.Aki.Protocol.e9n();
      i.L8n = o;
      i.n9n = 1;
      t.e9n = i;
      const _ = [];
      e.gws?.forEach(e => {
        _.push(new Protocol_1.Aki.Protocol.e9n({
          L8n: e.s5n,
          n9n: e.m9n
        }));
      });
      t.h9n = _;
      n.push(t);
      o = {
        SkipOnLoadResourceFinish: a,
        ResultViewHideExtraReward: r,
        IsOnlyShowGold: false
      };
      if (UiManager_1.UiManager.IsViewOpen("DrawMainView") || UiManager_1.UiManager.IsViewOpen("GachaScanView")) {
        ModelManager_1.ModelManager.GachaModel.CacheGachaInfo({
          ResultViewData: o,
          GachaResult: n
        });
      } else {
        ModelManager_1.ModelManager.GachaModel.CurGachaResult = n;
        if (o.SkipOnLoadResourceFinish) {
          UiManager_1.UiManager.OpenView("GachaScanView", o);
        } else {
          UiManager_1.UiManager.OpenView("DrawMainView", o);
        }
      }
    }
  }
}
(exports.GachaController = GachaController).ZHt = new Set();
GachaController.YHt = () => {
  GachaController.OpenGachaMainView(true);
};
GachaController.nye = () => {
  if (!!ModelManager_1.ModelManager.FunctionModel?.IsOpen(10009) && !UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
    GachaController.GachaInfoRequest(false);
  }
};
GachaController.OnGachaNewNotify = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10009)) {
    if (UiManager_1.UiManager.IsViewOpen("DrawMainView") || UiManager_1.UiManager.IsViewOpen("GachaScanView") || UiManager_1.UiManager.IsViewOpen("GachaResultView")) {
      ModelManager_1.ModelManager.GachaModel.IsCacheShowNewNotify = true;
    } else if (UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaNewNotify);
    } else {
      GachaController.GachaInfoRequest(false);
    }
  }
};
GachaController.OnGachaResultNotify = e => {
  var a;
  if (UiManager_1.UiManager.IsViewOpen("DrawMainView") || UiManager_1.UiManager.IsViewOpen("GachaScanView")) {
    a = {
      SkipOnLoadResourceFinish: false,
      ResultViewHideExtraReward: false,
      IsOnlyShowGold: false
    };
    ModelManager_1.ModelManager.GachaModel.CacheGachaInfo({
      ResultViewData: a,
      GachaResult: e.tws
    });
  } else {
    ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.tws;
    UiManager_1.UiManager.OpenView("DrawMainView");
  }
};
GachaController.JHt = (e, a) => {
  if (e === 10009 && a) {
    ModelManager_1.ModelManager.GachaModel.InitGachaPoolOpenRecord();
    GachaController.GachaInfoRequest(false);
  }
};
GachaController.zHt = () => {
  if (UiManager_1.UiManager.IsViewOpen("GachaMainView")) {
    GachaController.GachaInfoRequest(false);
  }
};
GachaController.OpenGachaMainView = (e = false) => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10009)) {
    GachaController.GachaInfoRequest(true, e);
  }
};
GachaController.ejt = 0;
GachaController.tjt = 1;
GachaController.OnAfterCloseGachaScent = () => {
  var e = ModelManager_1.ModelManager.GachaModel.GetCachedGachaInfo();
  if (e) {
    ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.GachaResult;
    if (e.ResultViewData.SkipOnLoadResourceFinish) {
      UiManager_1.UiManager.OpenView("GachaScanView", e.ResultViewData);
    } else {
      UiManager_1.UiManager.OpenView("DrawMainView", e.ResultViewData);
    }
  }
};
GachaController.OpenGachaSelectionView = e => {
  var a;
  if (UiManager_1.UiManager.IsViewOpen("GachaSelectionView")) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaSelectionViewRefresh, e);
  } else {
    (a = new GachaDefine_1.GachaSelectionViewData()).GachaInfo = e;
    UiManager_1.UiManager.OpenView("GachaSelectionView", a);
  }
}; //# sourceMappingURL=GachaController.js.map