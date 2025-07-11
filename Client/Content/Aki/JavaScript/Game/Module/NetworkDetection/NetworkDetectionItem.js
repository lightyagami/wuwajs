"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkDetectionItem = undefined;
const UE = require("ue");
const HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport");
const LauncherNetworkDetectionController_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionController");
const LauncherNetworkDetectionModel_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionModel");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class NetworkDetectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Aic = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e, t, r) {
    this.Aic = e;
    this.FTt();
  }
  FTt() {
    var e = this.Aic.EntryData;
    var t = this.Aic.Result;
    this.GetText(0).ShowTextNew(e.NameLocalKey);
    this.GetSprite(1).SetUIActive(t !== undefined && !t?.Success);
    this.GetSprite(2).SetUIActive(t !== undefined && t?.Success);
    this.GetSprite(3).SetUIActive(this.Aic.Proceed);
    var r = t?.Success === false && t?.Code !== undefined;
    if (r) {
      e = LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GetGenericErrorCodeTips(e.Type, t.Code, t);
      this.GetText(5).SetText(e);
      this.Aic.ErrorCodeText = e;
    }
    this.GetItem(4).SetUIActive(r);
  }
  OnBeforeDestroy() {
    if (this.Aic.EntryData.Type === 4) {
      UE.KuroNetworkDetection.DetectionFinish(this.Aic.Result?.Success ?? false);
    }
  }
  async Proceed() {
    if (this.Aic.Proceed) {
      return false;
    }
    this.Aic.Proceed = true;
    this.GetSprite(3).SetUIActive(true);
    this.SPe.PlayLevelSequenceByName("Load_Loop", false);
    var e = this.Aic.EntryData;
    var t = new Date().getTime();
    var r = await LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.StartDetection(e);
    var o = new Date().getTime();
    if (this.Aic !== undefined) {
      this.Aic.Proceed = false;
    }
    return !!this.IsShowOrShowing && (this.SPe.StopSequenceByKey("Load_Loop", false), this.Aic.Result = r, this.Aic?.Result !== undefined && ((r = new HotPatchLogReport_1.LauncherNetworkDetectionProgressLog()).i_cost_time = o - t, r.i_type = e.Type + 1, r.i_result_id = this.Aic.Result.Code ?? 0, LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.ReportDetectionLog(r)), this.FTt(), true);
  }
}
exports.NetworkDetectionItem = NetworkDetectionItem;
//# sourceMappingURL=NetworkDetectionItem.js.map