"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerInviteView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ShowerInviteItem_1 = require("./Item/ShowerInviteItem"),
  ShowerRoleItem_1 = require("./Item/ShowerRoleItem");
class ShowerInviteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Q$1 = void 0, this.lqe = void 0, this.Vlo = [], this.K$1 = [], this.X$1 = 0, this.l7i = e => {
      "ShowerInviteView" === e.ViewName && this.iW1()
    }, this.z$1 = () => {
      var e = new ShowerInviteItem_1.ShowerInviteItem;
      return e.BindRoleSelectCallback(this.J$1), e
    }, this.J$1 = e => {
      ModelManager_1.ModelManager.ShowerModel.InviteRole(e), this.Og()
    }, this.Z$1 = e => {
      ModelManager_1.ModelManager.ShowerModel.ChangePos(e), this.Og(), this.wIi()
    }, this.xco = () => {
      ModelManager_1.ModelManager.ShowerModel.SendAndSave(), UiManager_1.UiManager.CloseAndOpenView("ShowerInviteView", "ShowerMainView")
    }, this.eW1 = () => {
      ModelManager_1.ModelManager.ShowerModel.LeftPos(), this.Og(), this.wIi()
    }, this.tW1 = () => {
      ModelManager_1.ModelManager.ShowerModel.RightPos(), this.Og(), this.wIi()
    }, this._5e = () => {
      ModelManager_1.ModelManager.ShowerModel.IsInShower ? UiManager_1.UiManager.CloseAndOpenView("ShowerInviteView", "ShowerMainView") : (ModelManager_1.ModelManager.ShowerModel.ClearCurInviteRoles(), this.CloseMe()), AudioSystem_1.AudioSystem.PostEvent("play_ui_com_cam_whoosh")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [4, UE.UIItem],
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.xco],
      [6, this.eW1],
      [7, this.tW1]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4),
      e = (this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(e.GetOwner()), this.lqe.SetCloseCallBack(this._5e), this.Q$1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.z$1), this.GetItem(9)),
      t = this.GetItem(10),
      i = this.GetItem(11),
      r = new ShowerRoleItem_1.ShowerRoleItem,
      e = (await r.CreateThenShowByActorAsync(e.GetOwner()), new ShowerRoleItem_1.ShowerRoleItem),
      t = (await e.CreateThenShowByActorAsync(t.GetOwner()), new ShowerRoleItem_1.ShowerRoleItem);
    await t.CreateThenShowByActorAsync(i.GetOwner()), this.K$1.length = 0, this.K$1.push(r), this.K$1.push(e), this.K$1.push(t)
  }
  OnStart() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.ShowerModel.SetShowerSeatConfigIds(e)
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleListWithoutMainRole();
    const s = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    e.sort((e, t) => {
      var i = s.includes(e.GetRoleId()),
        r = s.includes(t.GetRoleId());
      return i || r ? i && r ? 0 : i ? 1 : -1 : (r = e.GetFavorData().GetFavorLevel()) !== (i = t.GetFavorData().GetFavorLevel()) ? i - r : t.GetRoleCreateTime() - e.GetRoleCreateTime()
    }), this.Vlo = e;
    for (const t of this.K$1) t.SetUiActive(!1);
    ModelManager_1.ModelManager.ShowerModel.ResetCurInviteRoles(), this.Z$1(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i)
  }
  iW1() {
    var e = ModelManager_1.ModelManager.ShowerModel.PosCount,
      t = Math.min(e, this.K$1.length);
    for (let e = this.X$1 = 0; e < t; ++e) {
      var i = this.K$1[e],
        r = ModelManager_1.ModelManager.ShowerModel.GetShowerSeatEntityByPos(e),
        r = i.SetPos(e, r);
      i.SetUiActive(r), r && (this.X$1 += 1)
    }
    for (let e = 0; e < this.X$1; ++e) this.K$1[e].BindPosChangeCallback(this.Z$1);
    this.rW1()
  }
  rW1() {
    for (let e = 0; e < this.X$1; ++e) {
      var t = this.K$1[e],
        i = ModelManager_1.ModelManager.ShowerModel.GetRoleInstanceByPos(e);
      t.RefreshRoleInfo(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex, i)
    }
  }
  Og() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "ShowerInvitePos", ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex + 1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "ShowerInviteNumber", ModelManager_1.ModelManager.ShowerModel.GetInviteNumString()), this.Q$1?.RefreshByData(this.Vlo), this.rW1()
  }
  wIi() {
    var t = ModelManager_1.ModelManager.ShowerModel.GetRoleInstanceByPos(ModelManager_1.ModelManager.ShowerModel.CurSelectPosIndex);
    if (t) {
      let e = 0;
      for (this.Q$1.DeselectCurrentGridProxy(); e < this.Vlo.length && t.GetRoleId() !== this.Vlo[e].GetRoleId(); e++);
      this.Q$1.ScrollToGridIndex(e), this.Q$1.SelectGridProxy(e)
    }
  }
}
exports.ShowerInviteView = ShowerInviteView;
//# sourceMappingURL=ShowerInviteView.js.map