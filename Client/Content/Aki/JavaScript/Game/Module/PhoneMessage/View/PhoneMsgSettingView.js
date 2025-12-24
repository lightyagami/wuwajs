"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingViewLeftBgItemData = exports.SettingViewLeftDialogItemData = exports.PhoneMsgBgItem = exports.PhoneMsgDialogItem = exports.RightChatItem = exports.PhoneMsgSettingView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const SyncGridProxyAbstract_1 = require("../../Util/Grid/SyncGridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MultiTemplateScrollView_1 = require("../../Util/ScrollView/MultiTemplateScrollView");
const PhoneMsgController_1 = require("../PhoneMsgController");
const PhoneSystemDefine_1 = require("../PhoneSystemDefine");
class PhoneMsgSettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.hfm = undefined;
    this.Nsf = undefined;
    this.m8t = undefined;
    this.Vsf = [];
    this.Hsf = [];
    this.sbf = 0;
    this.mFf = -1;
    this.abf = 0;
    this.fFf = -1;
    this.Yvf = undefined;
    this.XAt = () => {
      this.Yvf.OnNameChange();
    };
    this.rLf = () => {
      this.Ksf();
      this.P7e();
    };
    this.Wsf = () => {
      if (this.hfm !== 0) {
        this.dfm(0);
      }
    };
    this.Qsf = () => {
      if (this.hfm !== 1) {
        this.dfm(1);
      }
    };
    this.Ksf = () => {
      switch (this.hfm) {
        case 0:
          this.Jsf();
          this.Vsf[0].Data.IsSelected = true;
          this.mFf = 0;
          var t = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.Vsf);
          this.Nsf.RefreshByData(t);
          break;
        case 1:
          this.Zsf();
          this.Hsf[0].Data.IsSelected = true;
          this.fFf = 0;
          t = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.Hsf);
          this.Nsf.RefreshByData(t);
      }
    };
    this.Xsf = (t, i) => {
      if (this.mFf >= 0) {
        var e = this.mFf;
        this.Vsf[e].Data.IsSelected = false;
        const s = this.Nsf.GetProxyByGridIndex(e);
        s?.SetToggleState(false);
      }
      this.mFf = t;
      this.sbf = i.DialogId;
      i.IsSelected = true;
      const s = this.Nsf.GetProxyByGridIndex(t);
      s?.SetToggleState(true);
      this.P7e();
      this.Ysf();
    };
    this.zsf = (t, i) => {
      if (this.fFf >= 0) {
        var e = this.fFf;
        this.Hsf[e].Data.IsSelected = false;
        const s = this.Nsf.GetProxyByGridIndex(e);
        s?.SetToggleState(false);
      }
      this.fFf = t;
      this.abf = i.BgId;
      i.IsSelected = true;
      const s = this.Nsf.GetProxyByGridIndex(t);
      s?.SetToggleState(true);
      this.P7e();
      this.WNe();
    };
    this.OnBtnConfirmClick = () => {
      PhoneMsgController_1.PhoneMsgController.SendChangeChatDialogAndBgRequest(this.sbf, this.abf);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIMultiTemplateScrollViewComponent], [5, UE.UIItem], [7, UE.UIItem], [6, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIText], [12, UE.UIText], [13, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Wsf], [3, this.Qsf]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.Yvf = new RightChatItem();
    this.Nsf = new MultiTemplateScrollView_1.MultiTemplateScrollView(this.GetMultiTemplateScrollViewComponent(4));
    this.m8t = new ButtonItem_1.ButtonItem();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Yvf.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()), this.m8t.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())]);
    this.m8t.SetFunction(this.OnBtnConfirmClick);
    this.Yvf.InitView();
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.GetExtendToggle(2).CanExecuteChange.Bind(() => this.hfm !== 0);
    this.GetExtendToggle(3).CanExecuteChange.Bind(() => this.hfm !== 1);
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.PhoneMsgModel;
    this.sbf = t.CurrentUsingChatDialogId;
    this.abf = t.CurrentUsingChatBgId;
    this.Jsf();
    this.Zsf();
    this.Hsf[0].Data.IsSelected = true;
    this.Vsf[0].Data.IsSelected = true;
    this.mFf = 0;
    this.fFf = 0;
    this.Ysf();
    this.WNe();
    this.Wsf();
    this.GetItem(7).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.P7e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.rLf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.rLf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt);
  }
  dfm(t) {
    var i = this.GetExtendToggle(2);
    var e = this.GetExtendToggle(3);
    switch (t) {
      case 0:
        var s = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.Vsf);
        this.Nsf.RefreshByData(s);
        i.SetToggleState(1, false);
        this.hfm = 0;
        e.SetToggleState(0, false);
        this.Ysf();
        break;
      case 1:
        s = new MultiTemplateScrollView_1.MultiTemplateScrollViewRefreshContext(this.Hsf);
        this.Nsf.RefreshByData(s);
        e.SetToggleState(1, false);
        this.hfm = 1;
        i.SetToggleState(0, false);
        this.WNe();
    }
    this.P7e();
  }
  Jsf() {
    this.Vsf.length = 0;
    var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetAllChatDialogConfigList();
    if (t) {
      var i = [];
      var e = [];
      for (const r of t) {
        var s = new PhoneSystemDefine_1.PhoneMsgDialogItemData();
        s.DialogId = r.Id;
        s.IsUnlocked = ModelManager_1.ModelManager.PhoneMsgModel.IsChatDialogUnlocked(r.Id);
        s.IsUsing = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatDialogId === r.Id;
        s.IsSelected = false;
        var h = new SettingViewLeftDialogItemData(s);
        h.OnToggleCallBack = this.Xsf;
        (s.IsUsing ? this.Vsf : s.IsUnlocked ? i : e).push(h);
      }
      this.pjf(i);
      this.pjf(e);
      this.Vsf.push(...i);
      this.Vsf.push(...e);
    }
  }
  Zsf() {
    this.Hsf.length = 0;
    var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetAllChatBgConfigList();
    if (t) {
      var i = [];
      var e = [];
      for (const r of t) {
        var s = new PhoneSystemDefine_1.PhoneMsgBgItemData();
        s.BgId = r.Id;
        s.IsUnlocked = ModelManager_1.ModelManager.PhoneMsgModel.IsChatBgUnlocked(r.Id);
        s.IsUsing = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatBgId === r.Id;
        s.IsSelected = false;
        var h = new SettingViewLeftBgItemData(s);
        h.OnToggleCallBack = this.zsf;
        (s.IsUsing ? this.Hsf : s.IsUnlocked ? i : e).push(h);
      }
      this.pjf(i);
      this.pjf(e);
      this.Hsf.push(...i);
      this.Hsf.push(...e);
    }
  }
  pjf(t) {
    t.sort((t, i) => {
      t = t.Data?.GetConfig?.()?.SortId ?? 0;
      return (i.Data?.GetConfig?.()?.SortId ?? 0) - t;
    });
  }
  Ysf() {
    var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatDialogConfig(this.sbf);
    if (t) {
      this.Yvf.RefreshDialog(this.sbf);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.Desc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.GetWay);
    }
  }
  WNe() {
    var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(this.abf);
    if (t) {
      this.SetTextureByPath(t.BgPath, this.GetTexture(10));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.Desc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.GetWay);
    }
  }
  P7e() {
    let t = false;
    let i = false;
    var e = ModelManager_1.ModelManager.PhoneMsgModel;
    switch (this.hfm) {
      case 0:
        t = e.IsChatDialogUnlocked(this.sbf) && e.CurrentUsingChatDialogId !== this.sbf;
        i = e.CurrentUsingChatDialogId === this.sbf;
        break;
      case 1:
        t = e.IsChatBgUnlocked(this.abf) && e.CurrentUsingChatBgId !== this.abf;
        i = e.CurrentUsingChatBgId === this.abf;
    }
    this.m8t.SetEnableClick(t);
    var s = i ? "Text_InUse_Text" : "ChatBubble_SettingUse";
    this.m8t.SetLocalTextNew(s);
  }
}
exports.PhoneMsgSettingView = PhoneMsgSettingView;
class RightChatItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UISprite]];
  }
  InitView() {
    this.laf();
    var t = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatDialogId;
    this.RefreshDialog(t);
  }
  laf() {
    var t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    var t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(t);
    var t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t).RoleHeadIconCircle;
    var i = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    this.GetText(2).SetText(i);
    this.SetTextureShowUntilLoaded(t, this.GetTexture(1));
  }
  OnNameChange() {
    var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    if (t) {
      this.GetText(2).SetText(t);
    }
  }
  RefreshDialog(t) {
    t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatDialogConfig(t);
    if (t) {
      this.SetSpriteByPath(t.BgPath, this.GetSprite(10), false);
    }
  }
}
exports.RightChatItem = RightChatItem;
class PhoneMsgDialogItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.taf = undefined;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.taf);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(t) {
    if (t) {
      this.taf = t;
      this.SetSpriteByPath(t.GetConfig().BgPath, this.GetSprite(1), false);
      this.GetSprite(2).SetUIActive(t.IsUsing);
      this.GetItem(3).SetUIActive(!t.IsUnlocked);
      this.SetToggleState(t.IsSelected, true);
    }
  }
  SetToggleState(t, i = false) {
    t = (this.taf.IsSelected = t) ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, undefined, i, i);
  }
}
exports.PhoneMsgDialogItem = PhoneMsgDialogItem;
class PhoneMsgBgItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.iaf = undefined;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.iaf);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(t) {
    if (t) {
      this.iaf = t;
      this.SetTextureByPath(t.GetConfig().ScrollViewBgPath, this.GetTexture(2));
      this.GetSprite(3).SetUIActive(t.IsUsing);
      this.GetItem(4).SetUIActive(!t.IsUnlocked);
      this.SetToggleState(t.IsSelected, true);
    }
  }
  SetToggleState(t, i = false) {
    t = (this.iaf.IsSelected = t) ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, undefined, i, i);
  }
  OnSelected() {
    this.SetToggleState(true);
  }
  OnDeselected() {
    this.SetToggleState(false);
  }
}
exports.PhoneMsgBgItem = PhoneMsgBgItem;
class SettingViewLeftDialogItemData {
  constructor(t) {
    this.Data = undefined;
    this.OnToggleCallBack = undefined;
    this.Data = t;
  }
  GetTemplateIndex() {
    return 1;
  }
  CreateProxy() {
    var t = new PhoneMsgDialogItem();
    t.OnToggleCallBack = this.OnToggleCallBack;
    return t;
  }
}
exports.SettingViewLeftDialogItemData = SettingViewLeftDialogItemData;
class SettingViewLeftBgItemData {
  constructor(t) {
    this.Data = undefined;
    this.Index = 0;
    this.OnToggleCallBack = undefined;
    this.Data = t;
  }
  GetTemplateIndex() {
    return 0;
  }
  CreateProxy() {
    var t = new PhoneMsgBgItem();
    t.OnToggleCallBack = this.OnToggleCallBack;
    return t;
  }
}
exports.SettingViewLeftBgItemData = SettingViewLeftBgItemData;
//# sourceMappingURL=PhoneMsgSettingView.js.map