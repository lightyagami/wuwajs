"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendApplyView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FriendController_1 = require("../FriendController");
var Proto_FriendApplyOperator = Protocol_1.Aki.Protocol.A6s;
class FriendApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.XFt = undefined;
    this.pNi = undefined;
    this.vNi = false;
    this.Wra = undefined;
    this.MNi = () => {
      var e;
      var i = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(this.Wra);
      if (i.length < 1) {
        UiManager_1.UiManager.CloseView("FriendMultipleApplyView");
      } else if (i.length === 1) {
        e = i[0].ApplyPlayerData;
        FriendController_1.FriendController.RequestFriendApplyHandle([e.PlayerId], Proto_FriendApplyOperator.Proto_Approve);
      } else if (UiManager_1.UiManager.IsViewOpen("FriendMultipleApplyView")) {
        UiManager_1.UiManager.CloseView("FriendMultipleApplyView");
      } else {
        UiManager_1.UiManager.OpenView("FriendMultipleApplyView", i);
      }
    };
    this.uHe = () => {
      var e = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(this.Wra);
      if (e.length < 1) {
        UiManager_1.UiManager.CloseView("OnlineMultipleApplyView");
      } else {
        var i = [];
        for (const r of e) {
          var t = r.ApplyPlayerData;
          if (t) {
            i.push(t.PlayerId);
          }
        }
        FriendController_1.FriendController.RequestFriendApplyHandle(i, Proto_FriendApplyOperator.Proto_Reject);
      }
    };
    this.Qra = () => {
      this.Kra();
      this.Og();
    };
    this.eCa = e => {
      if (this.Wra) {
        if ((e = this.Wra?.indexOf(e)) !== -1) {
          this.Wra.splice(e, 1);
        }
        this.Og();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.MNi], [8, this.uHe]];
  }
  OnStart() {
    this.Wra = this.OpenParam;
    this.XFt = this.GetText(5);
    this.pNi = this.GetSprite(6);
    this.Kra();
    this.Og();
  }
  OnBeforeDestroy() {
    if (UiManager_1.UiManager.IsViewOpen("FriendMultipleApplyView")) {
      UiManager_1.UiManager.CloseView("FriendMultipleApplyView");
    }
  }
  OnTick(e) {
    var i = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(this.Wra);
    if (i.length === 0 || i[0].ApplyTimeLeftTime < 0) {
      if (!this.vNi) {
        this.CloseMe();
        this.vNi = true;
      }
    } else {
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(i[0].ApplyTimeLeftTime));
      this.pNi.SetFillAmount(i[0].ApplyTimeLeftTime / ModelManager_1.ModelManager.FriendModel.ApplyCdTime);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshFriendApplicationRedDot, this.Qra);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FriendOnMultiItemAction, this.eCa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshFriendApplicationRedDot, this.Qra);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FriendOnMultiItemAction, this.eCa);
  }
  Kra() {
    var e = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(this.Wra);
    if (e.length !== 0) {
      for (const i of e) {
        i.ApplyTimeLeftTime = TimeUtil_1.TimeUtil.GetServerTime();
      }
    }
  }
  Og() {
    var e;
    var i;
    var t;
    var r = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(this.Wra);
    if (r.length === 0) {
      this.Hide();
    } else {
      e = this.GetItem(3);
      i = this.GetItem(4);
      t = this.GetText(7);
      if (r.length === 1) {
        e.SetUIActive(true);
        i.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalText(t, "TowerDefence_friendOnly");
        this.GetButton(8)?.RootUIComp.SetUIActive(true);
      } else {
        e.SetUIActive(false);
        i.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(t, "TowerDefence_friendMore", r.length);
        this.GetButton(8)?.RootUIComp.SetUIActive(false);
      }
      i = (e = r[0]).ApplyPlayerData;
      this.GetText(1).SetText(i.PlayerName);
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(e.ApplyTimeLeftTime));
      this.pNi.SetFillAmount(e.ApplyTimeLeftTime / ModelManager_1.ModelManager.FriendModel.ApplyCdTime);
      if (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.PlayerHeadPhoto)?.Card) {
        this.SetTextureByPath(t, this.GetTexture(0));
      }
      this.GetButton(8)?.RootUIComp.SetUIActive(true);
    }
  }
}
exports.FriendApplyView = FriendApplyView;
//# sourceMappingURL=FriendApplyView.js.map