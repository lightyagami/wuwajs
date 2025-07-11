"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerInviteView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ShowerInviteItem_1 = require("./Item/ShowerInviteItem");
const ShowerRoleItem_1 = require("./Item/ShowerRoleItem");
class ShowerInviteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.AW1 = undefined;
    this.lqe = undefined;
    this.Vlo = [];
    this.PW1 = [];
    this.xW1 = 0;
    this.l7i = e => {
      if (e.ViewName === "ShowerInviteView") {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Camera", 78, "OnCameraFinish:ShowerInviteView OnCameraFinish");
        }
        TimerSystem_1.TimerSystem.Next(() => {
          this.GW1();
        });
      }
    };
    this.DW1 = () => {
      var e = new ShowerInviteItem_1.ShowerInviteItem();
      e.BindRoleSelectCallback(this.BW1);
      return e;
    };
    this.BW1 = e => {
      ModelManager_1.ModelManager.ShowerModel.InviteRole(e);
      this.Og();
    };
    this.kW1 = e => {
      ModelManager_1.ModelManager.ShowerModel.ChangePos(e);
      this.Og();
      this.wIi();
    };
    this.xco = () => {
      ModelManager_1.ModelManager.ShowerModel.SendAndSave();
      UiManager_1.UiManager.CloseAndOpenView("ShowerInviteView", "ShowerMainView");
    };
    this.OW1 = () => {
      ModelManager_1.ModelManager.ShowerModel.LeftPos();
      this.Og();
      this.wIi();
    };
    this.qW1 = () => {
      ModelManager_1.ModelManager.ShowerModel.RightPos();
      this.Og();
      this.wIi();
    };
    this._5e = () => {
      if (ModelManager_1.ModelManager.ShowerModel.IsInShower) {
        UiManager_1.UiManager.CloseAndOpenView("ShowerInviteView", "ShowerMainView");
      } else {
        ModelManager_1.ModelManager.ShowerModel.ClearCurInviteRoles();
        this.CloseMe();
      }
      AudioSystem_1.AudioSystem.PostEvent("play_ui_com_cam_whoosh");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIItem], [0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[2, this.xco], [6, this.OW1], [7, this.qW1]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(e.GetOwner());
    this.lqe.SetCloseCallBack(this._5e);
    this.AW1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.DW1);
    var e = this.GetItem(9);
    var i = this.GetItem(10);
    var t = this.GetItem(11);
    var r = new ShowerRoleItem_1.ShowerRoleItem();
    await r.CreateThenShowByActorAsync(e.GetOwner());
    var e = new ShowerRoleItem_1.ShowerRoleItem();
    await e.CreateThenShowByActorAsync(i.GetOwner());
    var i = new ShowerRoleItem_1.ShowerRoleItem();
    await i.CreateThenShowByActorAsync(t.GetOwner());
    this.PW1.length = 0;
    this.PW1.push(r);
    this.PW1.push(e);
    this.PW1.push(i);
  }
  OnStart() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.ShowerModel.SetShowerSeatConfigIds(e);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleListWithoutMainRole();
    const o = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    e.sort((e, i) => {
      var t = o.includes(e.GetRoleId());
      var r = o.includes(i.GetRoleId());
      if (t || r) {
        if (t && r) {
          return 0;
        } else if (t) {
          return 1;
        } else {
          return -1;
        }
      } else if ((r = e.GetFavorData().GetFavorLevel()) !== (t = i.GetFavorData().GetFavorLevel())) {
        return t - r;
      } else {
        return i.GetRoleCreateTime() - e.GetRoleCreateTime();
      }
    });
    this.Vlo = e;
    for (const i of this.PW1) {
      i.SetUiActive(false);
    }
    ModelManager_1.ModelManager.ShowerModel.ResetCurInviteRoles();
    this.kW1(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i);
  }
  GW1() {
    var e = ModelManager_1.ModelManager.ShowerModel.PosCount;
    var i = Math.min(e, this.PW1.length);
    for (let e = this.xW1 = 0; e < i; ++e) {
      var t = this.PW1[e];
      var r = ModelManager_1.ModelManager.ShowerModel.GetShowerSeatEntityByPos(e);
      var r = t.SetPos(e, r);
      t.SetUiActive(r);
      if (r) {
        this.xW1 += 1;
      }
    }
    for (let e = 0; e < this.xW1; ++e) {
      this.PW1[e].BindPosChangeCallback(this.kW1);
    }
    this.FW1();
  }
  FW1() {
    for (let e = 0; e < this.xW1; ++e) {
      var i = this.PW1[e];
      var t = ModelManager_1.ModelManager.ShowerModel.GetRoleInstanceByPos(e);
      i.RefreshRoleInfo(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex, t);
    }
  }
  Og() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "ShowerInvitePos", ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex + 1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "ShowerInviteNumber", ModelManager_1.ModelManager.ShowerModel.GetInviteNumString());
    this.AW1?.RefreshByData(this.Vlo);
    this.FW1();
  }
  wIi() {
    var i = ModelManager_1.ModelManager.ShowerModel.GetRoleInstanceByPos(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex);
    if (i) {
      let e = 0;
      for (this.AW1.DeselectCurrentGridProxy(); e < this.Vlo.length && i.GetRoleId() !== this.Vlo[e].GetRoleId(); e++);
      this.AW1.ScrollToGridIndex(e);
      this.AW1.SelectGridProxy(e);
    }
  }
}
exports.ShowerInviteView = ShowerInviteView;
//# sourceMappingURL=ShowerInviteView.js.map