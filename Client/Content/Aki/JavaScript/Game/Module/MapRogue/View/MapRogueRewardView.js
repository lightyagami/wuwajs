"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueRewardView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MapRoguePopupBase_1 = require("./Components/MapRoguePopupBase");
const START_ANIM_EVENT = "InturnPlay";
class MapRogueRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Go1 = 0;
    this.BgItem = undefined;
    this.RewardLayout = undefined;
    this.BtnConfirm = undefined;
    this.OpData = undefined;
    this.CurrentSelectIndex = -1;
    this.C$c = false;
    this.Refresh = () => {
      if (this.OpData) {
        if (this.CurrentSelectIndex >= 0) {
          this.RewardLayout.GetLayoutItemByKey(this.CurrentSelectIndex)?.SetToggleState(false, true);
        }
        if (this.C$c) {
          this.GetButton(4).RootUIComp.SetUIActive(false);
          this.BtnConfirm?.SetLocalTextNew("RogueRes_FightGetAllItem_Desc");
          this.BtnConfirm?.SetEnableClick(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueRes_FightBooty_Desc");
        } else {
          this.GetButton(4).RootUIComp.SetUIActive(this.OpData.CanGiveUp);
          this.GetButton(4).SetSelfInteractive(!this.OpData.IsMax);
          this.BtnConfirm?.SetLocalTextNew("RogueRes_FightGetItem_Desc");
          this.BtnConfirm?.SetEnableClick(false);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueRes_Event_Rewards_3", this.OpData.CurrentSelectCount, this.OpData.MaxSelectCount);
        }
        this.v4e();
      }
    };
    this.$An = t => {
      if (START_ANIM_EVENT === t) {
        this.v4e();
      }
    };
    this.y7s = (t, i) => {
      var e;
      var s;
      var h = t.IsRole ? 1 : 0;
      var r = i.IsRole ? 1 : 0;
      if (h != r) {
        return r - h;
      } else if ((!h || !r) && !(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ConfigId), s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i.ConfigId), e.QualityId === s.QualityId)) {
        return s.QualityId - e.QualityId;
      } else {
        return 0;
      }
    };
    this.d2t = () => {
      var t = new RewardItemToggle();
      t.IsAllSelect = this.C$c;
      t.OnExtendToggleClicked = this.q3e;
      t.OnCanExecuteChangeFunc = this.TKi;
      return t;
    };
    this.Wfo = () => {
      if (this.OpData) {
        this.OpData.CloseViewFunc = undefined;
        this.OpData.UpdateViewFunc = undefined;
      }
      this.CloseMe();
    };
    this.yFc = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(304);
      t.FunctionMap.set(2, () => {
        this.OpData.Select(Protocol_1.Aki.Protocol.pd1.Proto_GiveUp);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.tWt = () => {
      var t;
      if (this.C$c) {
        t = this.p$c();
        this.OpData.SelectAll(t.map(t => t.Index));
      } else {
        this.OpData.Select(this.CurrentSelectIndex);
      }
    };
    this.q3e = (t, i) => {
      if (t) {
        this.Fp(i);
      } else if (this.CurrentSelectIndex === i.Index) {
        this.h01();
      }
    };
    this.TKi = (t, i) => !!t || !this.OpData.IsMax;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.yFc]];
  }
  async OnBeforeStartAsync() {
    this.BgItem = new MapRoguePopupBase_1.MapRoguePopupBase();
    await this.BgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.BtnConfirm = new ButtonItem_1.ButtonItem();
    await this.BtnConfirm.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.BtnConfirm.SetFunction(this.tWt);
  }
  OnStart() {
    this.Go1 = this.OpenParam;
    this.RewardLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.d2t);
    this.OpData = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.Go1);
    this.OpData.CloseViewFunc = this.Wfo;
    this.OpData.UpdateViewFunc = this.Refresh;
    var t = this.OpData.GetGainDataList();
    this.C$c = t.length === this.OpData.MaxSelectCount;
  }
  OnBeforeShow() {
    this.Refresh();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  v4e() {
    var t;
    if (this.OpData) {
      t = this.p$c();
      this.RewardLayout.RefreshByData(t, undefined, true);
    }
  }
  p$c() {
    var i = this.OpData.GetGainDataList();
    var e = [];
    for (let t = 0; t < i.length; t++) {
      var s = i[t].kl1;
      if (s) {
        s = {
          Index: t,
          ConfigId: s.L8n,
          Count: s.m9n,
          IsSelect: !this.C$c && s.k2s,
          IsRole: s.Mxu
        };
        e.push(s);
      }
    }
    e.sort(this.y7s);
    return e;
  }
  h01() {
    this.CurrentSelectIndex = -1;
    this.GetButton(5).SetSelfInteractive(false);
  }
  Fp(t) {
    if (this.CurrentSelectIndex >= 0) {
      this.RewardLayout.GetLayoutItemByKey(this.CurrentSelectIndex)?.SetToggleState(false, false);
    }
    this.CurrentSelectIndex = t.Index;
    this.GetButton(5).SetSelfInteractive(!t.IsSelect);
  }
}
exports.MapRogueRewardView = MapRogueRewardView;
class RewardItemToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Toggle = undefined;
    this.IsAllSelect = false;
    this.OnExtendToggleClicked = undefined;
    this.OnCanExecuteChangeFunc = undefined;
    this.Lke = () => !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.Toggle?.GetToggleState() === 1, this.Data);
    this.N8e = t => {
      this.OnExtendToggleClicked?.(t, this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(0);
    this.Toggle.SetSelfInteractive(!this.IsAllSelect);
    this.Toggle.CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.Toggle?.CanExecuteChange.Unbind();
    this.Toggle = undefined;
  }
  Refresh(t, i, e) {
    this.Data = t;
    var s = this.GetTexture(7);
    var h = this.GetTexture(1);
    var r = this.GetText(2);
    var o = this.GetText(5);
    let n = 1;
    if (t.IsRole) {
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.ConfigId);
      if (!a) {
        return;
      }
      var u = a.GetRoleSkinId();
      var u = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(u);
      h.SetUIActive(false);
      this.SetTextureShowUntilLoaded(u.FormationRoleCard, s);
      r.SetText(a.GetName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(o, "RogueRes_AddRole_Desc", a.GetName());
      n = a.GetQualityConfig().Id;
    } else {
      u = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ConfigId);
      if (!u) {
        return;
      }
      this.SetItemIcon(h, t.ConfigId);
      h.SetUIActive(true);
      s.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, u.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(o, u.AttributesDescription);
      n = u.QualityId;
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "RogueRes_AccuracyNumShow", t.Count);
    a = "T_RogueItemQualityBg" + n;
    h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a);
    this.SetTextureShowUntilLoaded(h, this.GetTexture(4));
    this.SetItemDone(t.IsSelect);
  }
  SetToggleState(t, i = false) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t, i);
  }
  SetItemDone(t) {
    this.GetText(6).SetUIActive(!t);
    this.GetItem(3).SetUIActive(t);
  }
  GetKey(t, i) {
    return this.Data.Index;
  }
}
//# sourceMappingURL=MapRogueRewardView.js.map