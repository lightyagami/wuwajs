"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkDetectionView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport");
const LauncherLogUploadHandle_1 = require("../../../Launcher/LogUpload/LauncherLogUploadHandle");
const LauncherNetworkDetectionController_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionController");
const LauncherNetworkDetectionDefine_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionDefine");
const LauncherNetworkDetectionModel_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionModel");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const NetworkDetectionItem_1 = require("./NetworkDetectionItem");
const NetworkDetectionTips_1 = require("./NetworkDetectionTips");
class NetworkDetectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.AZs = undefined;
    this.Bic = [];
    this.kic = undefined;
    this.qic = 0;
    this.E9i = undefined;
    this.Oic = undefined;
    this.Gic = undefined;
    this.Fic = "";
    this.Lgu = "";
    this.Nic = () => {
      var e = new NetworkDetectionItem_1.NetworkDetectionItem();
      this.Bic.push(e);
      return e;
    };
    this.Vic = () => {
      if (this.qic === 1 || this.qic === 3) {
        this.Gic.ShowTip("NetworkDetection_Ing");
      } else {
        UiManager_1.UiManager.OpenView("NetworkDetectionSelectServerView");
      }
    };
    this.jic = () => {
      var e = ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData;
      if (e === undefined) {
        this.GetText(1).SetText("");
      } else {
        this.GetText(1).SetText(e.name);
      }
      this.l_i();
    };
    this.vbc = () => {
      var e = ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData;
      if (e !== undefined) {
        if (LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.SetDetectionConfig(e)) {
          this.jic();
        } else {
          ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData = undefined;
          this.Gic.ShowTip("NetworkDetection_Error");
        }
      }
    };
    this.Cwn = () => {
      if (this.qic !== 1 && this.qic !== 3 || !ModelManager_1.ModelManager.NetworkDetectionModel.NeedInterruptDetectionDoubleCheckTips()) {
        this.CloseMe();
      } else {
        this.Gic.ShowTip("NetworkDetection_tips");
        ModelManager_1.ModelManager.NetworkDetectionModel.ConfirmInterruptDetection();
      }
    };
    this.fwn = () => {
      switch (this.qic) {
        case 0:
          this.Hic();
          break;
        case 1:
          return;
        case 2:
          var e = this.AZs.GetDatas();
          var e = ModelManager_1.ModelManager.NetworkDetectionModel.GetFinalErrorCodeString(e);
          var e = `${this.Fic}
${e}`;
          UE.LGUIBPLibrary.ClipBoardCopy(e);
          this.Oic.Show();
          this.Oic.SetTipsLocalText("NetworkDetection_Submiting");
          this.kic.UploadLog();
          this.qic = 3;
      }
    };
    this.$ic = () => {
      this.qic = 4;
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(1);
      this.Oic.Hide();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 63, "网络检测->上传日志完成，打开联系客服");
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIScrollViewComponent], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIText]];
    this.BtnBindInfo = [[2, this.Vic], [5, this.Cwn]];
  }
  async OnBeforeStartAsync() {
    this.Oic = new NetworkDetectionTips_1.NetworkDetectionTips();
    await this.Oic.CreateByResourceIdAsync("UiItem_ErrSubmit", this.RootItem);
    this.Oic.SetTextureIconActive(true);
    this.Gic = new NetworkDetectionTips_1.NetworkDetectionTips();
    await this.Gic.CreateByResourceIdAsync("UiItem_ErrSubmit", this.RootItem);
    this.Gic.SetTextureIconActive(false);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.Cwn();
    });
    this.ChildPopView?.PopItem.SetMaskResponsibleState(false);
    this.E9i = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.E9i.SetFunction(this.fwn);
    this.AZs = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.Nic);
    var e = this.GetNetworkDetectionLayoutItemData();
    this.AZs.RefreshByData(e);
    this.kic = new LauncherLogUploadHandle_1.NetworkDetectionLogUploadHandle();
    this.kic.LogUploadFinishCallBack = this.$ic;
  }
  OnBeforeShow() {
    this.qic = 0;
    this.Wic();
    this.jic();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConfirmNetworkDetectionItem, this.vbc);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConfirmNetworkDetectionItem, this.vbc);
  }
  Wic() {
    var e = LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer();
    var t = Info_1.Info.IsPlayInEditor;
    var t = e || t;
    this.GetItem(0).SetUIActive(t);
    this.E9i.SetEnableClick(!t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 63, "网络检测->Login阶段初始化", ["isGlobalPlayer", e], ["needSelectServer", t]);
    }
    if (!t) {
      if ((e = ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion())?.length > 0) {
        ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData = e[0];
        this.vbc();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 63, "网络检测->初始化服务器数据失败，服务器列表为空", ["serverList", e]);
      }
    }
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.NetworkDetectionModel.ResetInterruptDetectionCheckTime();
  }
  OnBeforeDestroy() {
    this.Oic?.Destroy();
    this.Gic?.Destroy();
    this.E9i.Destroy();
    if (this.AZs) {
      this.AZs.ClearChildren();
      this.AZs = undefined;
    }
    this.kic.InterruptUploadLog();
    LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.ForceStopDomainDetect();
  }
  GetNetworkDetectionLayoutItemData() {
    var e = [];
    for (const i of LauncherNetworkDetectionDefine_1.networkDetectionEntries) {
      var t = {
        EntryData: i,
        Proceed: false
      };
      e.push(t);
    }
    return e;
  }
  l_i() {
    var e = ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData;
    this.E9i.SetEnableClick(e !== undefined && this.qic !== 1);
    switch (this.qic) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "NetworkDetection_Start_Tips");
        this.E9i.SetLocalTextNew("NetworkDetection_Start");
        break;
      case 1:
        this.GetText(8).SetText("");
        this.E9i.SetLocalTextNew("NetworkDetection_Ing");
        break;
      case 2:
        var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("NetworkDetection_Trace_Id");
        var i = LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GenerateTraceCode();
        this.Lgu = i;
        this.Fic = t + " " + i;
        this.GetText(8).SetText(this.Fic);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 63, "网络检测->开始检测", ["检测编码:(traceId)", i]);
        }
        this.E9i.SetLocalTextNew("NetworkDetection_Submit");
        break;
      default:
        this.E9i.SetLocalTextNew("NetworkDetection_Start");
    }
  }
  async Hic() {
    this.qic = 1;
    this.l_i();
    LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.ReportDetectionLog(new HotPatchLogReport_1.LauncherNetworkDetectionBaseLog());
    var t = new Date().getTime();
    for (const e of this.Bic) {
      if (!this.IsShowOrShowing) {
        return;
      }
      await e.Proceed();
    }
    var i = new Date().getTime();
    if (this.IsShowOrShowing) {
      this.qic = 2;
      this.l_i();
      let e = -1;
      for (const n of this.AZs.GetDatas()) {
        if (n.Result?.Success === false) {
          e = n.EntryData.Type;
          break;
        }
      }
      var r = new HotPatchLogReport_1.LauncherNetworkDetectionResultLog();
      var o = LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.PingResultCacheForLog;
      r.f_avg_ping = o?.Result?.Avg ?? 0;
      r.i_cost_time = i - t;
      r.i_pocket_lossrt = (o?.Result?.Loss ?? 0) * 100;
      r.i_result_id = e < 0 ? 1 : 2;
      r.i_type = e + 1;
      r.s_trace_id = this.Lgu;
      LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.ReportDetectionLog(r);
    }
  }
}
exports.NetworkDetectionView = NetworkDetectionView;
//# sourceMappingURL=NetworkDetectionView.js.map