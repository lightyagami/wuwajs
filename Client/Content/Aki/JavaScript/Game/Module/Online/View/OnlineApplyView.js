"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineApplyView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
class OnlineApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.XFt = undefined;
    this.pNi = undefined;
    this.vNi = false;
    this.MNi = () => {
      if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1) {
        if (ModelManager_1.ModelManager.OnlineModel.CurrentApply) {
          OnlineController_1.OnlineController.AgreeJoinResultRequest(ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayerId, true);
          return;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiPlayerTeam", 5, "当前申请不存在");
          }
          UiManager_1.UiManager.CloseView("OnlineMultipleApplyView");
          return;
        }
      }
      UiManager_1.UiManager.OpenView("OnlineMultipleApplyView");
      this.CloseMe();
    };
    this.uHe = () => {
      if (ModelManager_1.ModelManager.OnlineModel.CurrentApply) {
        OnlineController_1.OnlineController.AgreeJoinResultRequest(ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayerId, false);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiPlayerTeam", 5, "当前申请不存在");
        }
        UiManager_1.UiManager.CloseView("OnlineMultipleApplyView");
      }
    };
    this.ENi = () => {
      this.RefreshView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIText]];
    this.BtnBindInfo = [[2, this.MNi], [8, this.uHe]];
  }
  OnStart() {
    this.XFt = this.GetText(5);
    this.pNi = this.GetSprite(6);
    this.RefreshView();
    this.sPa();
    this.Nxa();
  }
  OnTick(e) {
    var i = ModelManager_1.ModelManager.OnlineModel.CurrentApply;
    if (!i || i.ApplyTimeLeftTime < 0) {
      if (!this.vNi) {
        this.CloseMe();
        this.vNi = true;
      }
    } else {
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(i.ApplyTimeLeftTime));
      this.pNi.SetFillAmount(i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshApply, this.ENi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshApply, this.ENi);
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize();
    var i = this.GetItem(3);
    var t = this.GetItem(4);
    var n = this.GetText(7);
    if (e <= 1) {
      i.SetUIActive(true);
      t.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalText(n, "OnlineSingleApply");
    } else {
      i.SetUIActive(false);
      t.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(n, "OnlineMultipleApply", e);
    }
    var i = ModelManager_1.ModelManager.OnlineModel.CurrentApply;
    if (i) {
      this.GetText(1).SetText(i.Name);
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(ModelManager_1.ModelManager.OnlineModel.CurrentApply.ApplyTimeLeftTime));
      this.pNi.SetFillAmount(i.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd);
      if (t = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(i.HeadId, false)) {
        this.SetTextureByPath(t.GetRoleHeadIconCircle(), this.GetTexture(0));
      }
      this.GetButton(8)?.RootUIComp.SetUIActive(true);
    }
  }
  sPa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayStationOnlineId !== "";
      this.GetItem(15)?.SetUIActive(!e);
    } else {
      this.GetItem(15)?.SetUIActive(false);
    }
  }
  Nxa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayStationOnlineId !== "";
      this.GetItem(16)?.SetUIActive(e);
      if (e) {
        e = ModelManager_1.ModelManager.OnlineModel.CurrentApply.PlayStationOnlineId;
        this.GetText(17)?.SetText(e);
      }
    } else {
      this.GetItem(16)?.SetUIActive(false);
    }
  }
}
exports.OnlineApplyView = OnlineApplyView;
//# sourceMappingURL=OnlineApplyView.js.map