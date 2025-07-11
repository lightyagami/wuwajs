"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailBoxView = exports.MailLinkButton = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FunctionController_1 = require("../../Functional/FunctionController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const MailController_1 = require("../MailController");
const MailDropDownTitle_1 = require("./MailDropDown/MailDropDownTitle");
const MailImportantDropDownItem_1 = require("./MailDropDown/MailImportantDropDownItem");
const MailTotalDropDownItem_1 = require("./MailDropDown/MailTotalDropDownItem");
const MailUnReadDropDownItem_1 = require("./MailDropDown/MailUnReadDropDownItem");
const MailDynamicScrollItemNew_1 = require("./MailLeftSideScroll/MailDynamicScrollItemNew");
const MailScrollItemNew_1 = require("./MailLeftSideScroll/MailScrollItemNew");
class MailLinkButton extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.ClickDelegate = undefined;
    this.e0t = undefined;
    this.eTt = () => {
      this?.ClickDelegate();
    };
    this.CreateThenShowByActor(i.GetOwner());
  }
  SetTitle(i) {
    this.GetText(0).SetText(i);
  }
  SetColor(i) {
    this.GetText(0).SetColor(UE.Color.FromHex(i));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.e0t = this.RootActor.GetComponentByClass(UE.UIButtonComponent.StaticClass());
    this.e0t.OnClickCallBack.Bind(this.eTt);
  }
  OnBeforeDestroy() {
    this.ClickDelegate = undefined;
  }
}
exports.MailLinkButton = MailLinkButton;
const DEFAULT_MAIL_INDEX = 0;
class RewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Onwner = undefined;
    this.Mne = 0;
  }
  OnRefresh(i, t, e) {
    this.Refresh(i);
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
  OnExtendToggleStateChanged(i) {
    this.SetSelected(false, false);
  }
  Refresh(i) {
    var t = i[0];
    var e = i[1];
    this.Mne = t.ItemId;
    var t = this?.Onwner?.SelectedMailData?.GetAttachmentStatus() === 1;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Mne);
    if (s === 1) {
      var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
      const l = {
        Data: i,
        ElementId: o.ElementId,
        Type: 2,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: e > 0 ? "" + e : "",
        QualityId: o.QualityId
      };
      this.Apply(l);
    } else if (s === 3) {
      const l = {
        Data: i,
        Type: 3,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: e > 0 ? "" + e : ""
      };
      this.Apply(l);
    } else {
      const l = {
        Data: i,
        Type: 4,
        IsReceivedVisible: t,
        ItemConfigId: this.Mne,
        BottomText: e > 0 ? "" + e : ""
      };
      this.Apply(l);
    }
  }
}
class MailBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SelectedMailData = undefined;
    this.Kyi = 0;
    this.Qyi = undefined;
    this.BSi = undefined;
    this.Xyi = undefined;
    this.$yi = undefined;
    this.Yyi = undefined;
    this.Jyi = undefined;
    this.zyi = 1;
    this.Zyi = undefined;
    this.eIi = undefined;
    this.tIi = undefined;
    this.iIi = undefined;
    this.qSi = (i, t) => {
      let e = undefined;
      switch (t) {
        case 1:
          e = new MailTotalDropDownItem_1.MailTotalDropDownItem(i);
          break;
        case 2:
          e = new MailImportantDropDownItem_1.MailImportantDropDownItem(i);
          break;
        case 3:
          e = new MailUnReadDropDownItem_1.MailUnReadDropDownItem(i);
          break;
        default:
          e = new MailTotalDropDownItem_1.MailTotalDropDownItem(i);
      }
      return e;
    };
    this.DeleteAllExhaustedMail = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(49);
      i.FunctionMap.set(2, () => {
        var i = this.Jyi;
        var t = [];
        if (this.zyi === 2) {
          for (const e of i) {
            if (e.GetWasScanned() && e.GetAttachmentStatus() !== 2) {
              t.push(e.Id);
            }
          }
        } else {
          for (const s of i) {
            if (s.GetWasScanned() && s.GetMailLevel() !== 2 && s.GetAttachmentStatus() !== 2) {
              t.push(s.Id);
            }
          }
        }
        if (t.length > 0) {
          MailController_1.MailController.RequestDeleteMail(t);
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.PickAllAccessibleAttachment = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：一键领取");
      }
      var i = ModelManager_1.ModelManager.MailModel.GetMailList();
      var t = [];
      var e = this.zyi === 2 ? 2 : 1;
      for (const s of i) {
        if (s.GetAttachmentStatus() === 2 && s.Level >= e) {
          t.push(s.Id);
        }
      }
      if (t.length > 0) {
        MailController_1.MailController.RequestPickAttachment(t, 1);
      } else {
        switch (this.zyi) {
          case 1:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MailClearAllAttachment");
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MailClearImportantAttachment");
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Mail", 27, "邮件界面：没有可领取的附件");
        }
      }
    };
    this.GSi = i => new MailDropDownTitle_1.MailDropDownTitle(i);
    this.oIi = i => ModelManager_1.ModelManager.MailModel.GetMailFilterConfigData(i);
    this.rIi = (t, i) => {
      var e = this.Jyi.findIndex(i => i.Id === t);
      this.Xyi.GetScrollItemFromIndex(e).Update(this.Jyi[e], e);
      ModelManager_1.ModelManager.MailModel.SetCurrentSelectMailId(t);
      if (this.SelectedMailData) {
        this.LIi(this.SelectedMailData);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：选择邮件", ["mailId", t]);
      }
    };
    this.nIi = i => {
      var t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackPickMailView领取附件");
      }
      if (this.SelectedMailData && (t = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex())) && (this.sIi(t), this.aIi(this.Jyi, this.Kyi), this.hIi(this.Kyi, this.SelectedMailData), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackPickMailView领取附件Finish");
      }
    };
    this.lIi = i => {
      var t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackDeleteMailView删除邮件");
      }
      if (this.SelectedMailData) {
        this.BSi.RefreshAllDropDownItem();
        if ((t = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex())) && (i = i.length > 1 ? 0 : this.Kyi, this.sIi(t, i), this.aIi(this.Jyi, this.Kyi), this.SelectedMailData = this.Jyi[this.Kyi], this.hIi(this.Kyi, this.SelectedMailData), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Mail", 27, "邮件界面：CallBackDeleteMailView删除邮件结束");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackDeleteMailView没有选择邮件,没有选择邮件的时候但是却删除了邮件");
      }
    };
    this._Ii = () => {
      var i;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackPassivelyDeleteMailView被动删除邮件");
      }
      if (this.SelectedMailData) {
        this.BSi.RefreshAllDropDownItem();
        if ((i = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex())) && (this.sIi(i), this.aIi(this.Jyi, this.Kyi), this.SelectedMailData = this.Jyi[this.Kyi], this.hIi(this.Kyi, this.SelectedMailData), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Mail", 27, "邮件界面：CallBackPassivelyDeleteMailView被动删除邮件结束");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackPassivelyDeleteMailView没有选择邮件");
      }
    };
    this.uIi = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackAddMailView,添加新邮件");
      }
      var i = this.BSi.GetDropDownItemObject(this.BSi.GetSelectedIndex());
      if (i && (this.BSi.RefreshAllDropDownItem(), this.sIi(i), this.aIi(this.Jyi, this.Kyi), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Mail", 27, "邮件界面：CallBackAddMailView,添加新邮件结束", ["CurrentMailDataList", this.Jyi]);
      }
    };
    this.cIi = () => {
      var i;
      var t = this.SelectedMailData.GetSubContentJumpId();
      if (t > 0) {
        this.CloseMe();
        FunctionController_1.FunctionController.OpenFunctionRelateView(t);
      }
      var t = this.SelectedMailData.GetSubTitle() === undefined ? "" : this.SelectedMailData.GetSubTitle();
      if (this.SelectedMailData.IsQuestionMail()) {
        this.mIi(this.SelectedMailData.GetQuestionUrl(), t, this.SelectedMailData.GetUseDefaultBrowser(), this.SelectedMailData.GetIfLandscape());
      } else {
        i = this.SelectedMailData.GetSubUrl();
        if (!StringUtils_1.StringUtils.IsEmpty(i)) {
          this.mIi(i, t, this.SelectedMailData.GetUseDefaultBrowser(), this.SelectedMailData.GetIfLandscape());
        }
      }
    };
    this.I5t = () => {
      UiManager_1.UiManager.CloseView("MailBoxView");
    };
    this.dIi = (i, t) => {
      this.zyi = t;
      this.Jyi = this.BSi.GetDropDownItemObject(i).GetFilteredMailList();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件界面：选择下拉item OnSelectDropItem", ["index", i], ["this.CurrentMailDataList.length", this.Jyi?.length]);
      }
      this.Kyi = 0;
      this.aIi(this.Jyi, DEFAULT_MAIL_INDEX);
    };
    this.CIi = () => this.Kyi ?? 0;
    this.hIi = (i, t) => {
      if (!(i < 0) && !(i >= this.Jyi.length) && !!t) {
        this.Xyi.GetScrollItemFromIndex(this.Kyi)?.OnDeselected(true);
        this.SelectedMailData = t;
        this.Kyi = i;
        this.gIi(t);
        MailController_1.MailController.SelectedMail(t);
        t.SetWasScanned(1);
      }
    };
    this.fIi = () => {
      var i;
      if (this.SelectedMailData) {
        if (this.SelectedMailData.GetAttachmentStatus() === 2) {
          MailController_1.MailController.RequestPickAttachment([this.SelectedMailData.Id], 0);
        } else {
          (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(48)).FunctionMap.set(2, () => {
            if (ModelManager_1.ModelManager.MailModel.GetMailInstanceById(ModelManager_1.ModelManager.MailModel.GetCurrentSelectMailId())) {
              MailController_1.MailController.RequestDeleteMail([this.SelectedMailData.Id]);
            }
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIDynScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UILoopScrollViewComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.BSi = new CommonDropDown_1.CommonDropDown(this.GetItem(1), this.qSi, this.GSi);
    await this.BSi.Init();
    await this.pIi();
  }
  OnStart() {
    this.vIi();
    this.MIi();
    this.EIi();
    this.SIi();
    this.yIi();
    this.eIi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(5));
    this.eIi.BindCallback(this.DeleteAllExhaustedMail);
    this.eIi.RefreshText("DeleteReadedMail");
    this.tIi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4));
    this.tIi.BindCallback(this.PickAllAccessibleAttachment);
    this.tIi.RefreshText("GetAllItem");
    this.iIi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var i = ConfigManager_1.ConfigManager.MailConfig.GetFilterTypeList();
    this.BSi.InitScroll(i, this.oIi);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件界面：OnStartFinish");
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectedMail, this.rIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PickingAttachment, this.nIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DeletingMail, this.lIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DeletingMailPassively, this._Ii);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddingNewMail, this.uIi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectedMail, this.rIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PickingAttachment, this.nIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DeletingMail, this.lIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DeletingMailPassively, this._Ii);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddingNewMail, this.uIi);
  }
  OnBeforeDestroy() {
    this?.Qyi.Destroy();
    this?.BSi.Destroy();
    this?.$yi.Destroy();
    this.Xyi.ClearChildren();
    this.iIi.Clear();
  }
  vIi() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.Qyi.SetHelpBtnActive(true);
    this.Qyi.SetCloseBtnActive(true);
    this.Qyi.SetCloseCallBack(this.I5t);
    this.Qyi.SetTitle(ConfigManager_1.ConfigManager.TextConfig.GetTextById("Mail"));
  }
  SIi() {
    this.BSi.SetOnSelectCall(this.dIi);
  }
  async pIi() {
    this.Xyi = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(2), this.GetItem(3), new MailDynamicScrollItemNew_1.MailDynamicScrollItemNew(), (i, t, e) => {
      var s = new MailScrollItemNew_1.MailScrollItemNew();
      s.BindSelectCall(this.hIi);
      s.BindGetSelectedIndexFunction(this.CIi);
      return s;
    });
    await this.Xyi.Init();
  }
  MIi() {
    this.$yi = new MailLinkButton(this.GetItem(14));
    this.$yi.ClickDelegate = this.cIi;
  }
  yIi() {
    this.Zyi = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(18));
    this.Zyi.BindCallback(this.fIi);
  }
  EIi() {
    this.Yyi = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(16), this.GetItem(17).GetOwner(), () => {
      var i = new RewardItem();
      i.Onwner = this;
      return i;
    });
  }
  IIi() {
    this.Xyi.GetScrollItemFromIndex(this.Kyi)?.OnDeselected(true);
    this.Kyi = -1;
  }
  aIi(i, t = 0) {
    this.IIi();
    this.Kyi = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件界面：刷新列表 RefreshMailScrollList", ["selectedIndex", t], ["mailList长度", i?.length]);
    }
    this.Xyi.RefreshByData(i);
    if (i.length > 0) {
      this.GetItem(20).SetUIActive(true);
      this.GetItem(21).SetUIActive(false);
      this.tIi.SetActive(true);
      this.eIi.SetActive(this.zyi === 1);
      this.TIi(i[t], t);
    } else {
      this.GetItem(20).SetUIActive(false);
      this.GetItem(21).SetUIActive(true);
      this.tIi.SetActive(false);
      this.eIi.SetActive(false);
      this.Kyi = 0;
    }
  }
  async TIi(i, t) {
    await this.Xyi.ScrollToItemIndex(t);
    var e = this.Xyi.GetScrollItemFromIndex(t);
    if (e && !e.IsInit) {
      e.SelectTrigger = true;
    } else {
      e?.OnSelected(true);
      this.hIi(t, i);
    }
  }
  LIi(i) {
    var t;
    var e;
    if (i.GetMailLevel() === 2) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "ForeverValid");
    } else {
      i = i.GetExpiryTime();
      t = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(i, true);
      e = TimeUtil_1.TimeUtil.CalculateMinuteGapBetweenNow(i, true);
      if (t >= CommonDefine_1.HOUR_PER_DAY) {
        i = TimeUtil_1.TimeUtil.CalculateDayGapBetweenNow(i, true);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "AfterDayAutoDelete", i.toFixed(0));
      } else if (t > 1) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "AfterTimeAutoDelete", t.toFixed(0));
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "AfterMinAutoDelete", e.toFixed(0));
        if (e < 1) {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "AutoDeleteInOneMinute");
        }
      }
    }
  }
  DIi(i) {
    const t = [];
    i.GetAttachmentInfo().forEach(i => {
      t.push([{
        IncId: 0,
        ItemId: i.s5n
      }, i.m9n]);
    });
    this.Yyi.ReloadData(t);
    this.GetItem(15).SetUIActive(t.length > 0);
  }
  RIi(i) {
    if (i.GetAttachmentStatus() === 2) {
      this.Zyi.RefreshText("GetText");
    } else {
      this.Zyi.RefreshText("DeleteText");
    }
  }
  gIi(i) {
    var t;
    this.GetText(7).SetText(i.Title);
    this.GetText(13).SetText(i.GetText());
    this.GetText(13).bBestFit = false;
    this.GetText(8).SetText(i.Sender);
    this.GetText(9).SetText(TimeUtil_1.TimeUtil.DateFormatString(i.Time));
    if (StringUtils_1.StringUtils.IsBlank(i.GetSubUrl()) || StringUtils_1.StringUtils.IsEmpty(i.GetSubUrl())) {
      this.$yi.GetRootItem().SetUIActive(false);
    } else {
      this.$yi.GetRootItem().SetUIActive(true);
      this.$yi.SetTitle(i.GetSubText());
      t = i.GetSubTextColor();
      this.$yi.SetColor(t);
    }
    this.LIi(i);
    this.DIi(i);
    this.RIi(i);
    this.GetItem(6).SetUIActive(i.GetMailLevel() === 2);
    this.iIi.StopSequenceByKey("Switch", false, true);
    this.iIi.PlayLevelSequenceByName("Switch");
  }
  sIi(i, t = 0) {
    this.Jyi = i.GetFilteredMailList();
    this.Kyi = this.Jyi.findIndex(i => i.Id === this.SelectedMailData.Id);
    this.Kyi = this.Kyi === -1 ? t : this.Kyi;
    this.Kyi = MathUtils_1.MathUtils.Clamp(this.Kyi, 0, Math.max(0, this.Jyi.length - 1));
  }
  mIi(i, t = "", e = false, s = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件界面：OpenUrl", ["link", i], ["title", t], ["forceUseDefaultBrowser", e], ["ifLandscape", s]);
    }
    if (e) {
      e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(i, e);
      ModelManager_1.ModelManager.MailModel.OpenWebBrowser(e);
    } else if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(i, true);
      ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(t, e, s, false);
    } else {
      t = PublicUtil_1.PublicUtil.GetExtendExternalUrl(i, false);
      ModelManager_1.ModelManager.MailModel.OpenWebBrowser(t);
    }
  }
}
exports.MailBoxView = MailBoxView;
//# sourceMappingURL=MailBoxView.js.map