"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TogChatTalkItem = exports.TogChatPartner = exports.PhoneSystemChatPartnerTabItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhoneSystemDefine_1 = require("../PhoneSystemDefine");
class PhoneSystemChatPartnerTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.l1f = undefined;
    this._1f = undefined;
    this.nSf = undefined;
    this.Nji = undefined;
    this.u1f = undefined;
    this.Hea = undefined;
    this.hpf = (t, e, i) => {
      if (this.u1f) {
        this.u1f(e, i);
      }
    };
    this.Bpt = t => this._1f.GetSelectedGridIndex() !== t;
    this.c1f = () => {
      var t = new TogChatTalkItem();
      t.SetOnTogClickCallBack(this.hpf);
      t.SetCanExecuteChange(this.Bpt);
      return t;
    };
    this.OnClickThisItem = () => {
      if (this.Nji) {
        this.Nji(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.l1f = new TogChatPartner();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var t = [this.l1f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(t);
    this._1f = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.c1f, undefined, true);
  }
  OnBeforeShow() {
    this.d1f();
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
  SetToggleState(t) {
    var e = t ? 1 : 0;
    this.l1f.GetTogglePartner().SetToggleState(e);
    this.l1f.SetSelected(t);
  }
  OnSelected(t) {
    this.SetToggleState(true);
    this.ExpandChatTabItem();
  }
  OnDeselected(t) {
    this.SetToggleState(false);
    this.d1f();
  }
  DeselectAllChatTabItem() {
    this._1f.DeselectCurrentGridProxy();
  }
  SetRefreshMainPanelFunc(t) {
    this.u1f = t;
  }
  async RefreshAsync(t, e, i) {
    this.l1f?.RefreshView(t.ChatPartnerId, e, i);
    this.l1f?.SetClickCallBack(this.OnClickThisItem);
    e = ModelManager_1.ModelManager.PhoneMsgModel.GetAllPhoneMsgShortMsgDataByChatPartnerId(t.ChatPartnerId);
    if (e) {
      this.nSf = [];
      for (const h of e) {
        var s = new PhoneSystemDefine_1.ChatTalkTabItemData(h);
        this.nSf.push(s);
      }
      await this._1f?.RefreshByDataAsync(this.nSf);
    }
  }
  SetClickCallBack(t) {
    this.Nji = t;
  }
  ExpandChatTabItem() {
    this._1f?.SetActive(true);
    this.Hea?.StopSequenceByKey("Switch_In");
    this.Hea?.PlayLevelSequenceByName("Switch_In");
  }
  d1f() {
    this._1f?.SetActive(false);
  }
  RefreshShowChatText(t) {
    t = this._1f?.GetLayoutItemByKey(t);
    if (t) {
      t.RefreshShowChatText();
    }
  }
  GetKey(t, e) {
    return t.ChatPartnerId;
  }
}
exports.PhoneSystemChatPartnerTabItem = PhoneSystemChatPartnerTabItem;
class TogChatPartner extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.f1f = undefined;
    this.Tsg = 0;
    this.LDf = false;
    this.Toggle = undefined;
    this.g1f = () => {
      if (this.f1f) {
        this.f1f();
      }
    };
    this.HandleSubItemSelected = (t, e) => {
      if (e === this.Tsg) {
        this.SetSelectBgShow(true);
      } else {
        this.SetSelectBgShow(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.g1f]];
  }
  PDf(t) {
    if (!this.LDf) {
      RedDotController_1.RedDotController.BindRedDot("PhoneMsgChatPartnerRedDot", this.GetItem(3), undefined, t);
      RedDotController_1.RedDotController.BindRedDot("PhoneMsgChatPartnerRedDotGiftIcon", this.GetItem(5), undefined, t);
      this.LDf = true;
    }
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, this.HandleSubItemSelected);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, this.HandleSubItemSelected);
    RedDotController_1.RedDotController.UnBindRedDot("PhoneMsgChatItemRedDot");
    RedDotController_1.RedDotController.UnBindRedDot("PhoneMsgChatPartnerRedDotGiftIcon");
    this.LDf = false;
  }
  GetTogglePartner() {
    return this.GetExtendToggle(0);
  }
  RefreshView(t, e, i) {
    var s = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(t);
    if (s) {
      this.Tsg = t;
      if (s.Icon) {
        this.SetTextureByPath(s.Icon, this.GetTexture(1));
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), s.Name);
      this.PDf(t);
    }
  }
  SetClickCallBack(t) {
    this.f1f = t;
  }
  SetSelected(t) {
    this.GetText(2).SetUIActive(!t);
    this.GetText(8).SetUIActive(t);
  }
  SetSelectBgShow(t) {
    this.GetSprite(7).SetUIActive(t);
  }
}
exports.TogChatPartner = TogChatPartner;
class TogChatTalkItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ShortMsgId = 0;
    this.C1f = undefined;
    this.x1_ = undefined;
    this.LDf = false;
    this.Hea = undefined;
    this.HandleSelected = (t, e) => {
      if (t === this.ShortMsgId) {
        this.OnSelected(false);
      } else {
        this.OnDeselected(false);
      }
    };
    this.HandleSetAsRead = t => {
      if (t === this.ShortMsgId) {
        var e = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(this.ShortMsgId);
        var i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.ShortMsgId);
        switch (i.FinallPopType) {
          case 4:
            if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.QuestId) === 3) {
              this.J9f();
            }
            break;
          case 6:
            if (e.IsReceived) {
              this.J9f();
            }
            break;
          default:
            this.J9f();
        }
      }
    };
    this.Wpu = (t, e) => {
      var i;
      if (e === "Switch") {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgFinishIconSel");
        i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgFinishIconNml");
        this.SetSpriteByPath(i, this.GetSprite(1), false);
        this.SetSpriteByPath(e, this.GetSprite(2), false);
      }
    };
    this.g1f = () => {
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.ShortMsgId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, this.ShortMsgId, t.WhichChat);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.g1f]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => !this.x1_ || this.x1_(this.GridIndex));
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, this.HandleSelected);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgSetAsRead, this.HandleSetAsRead);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgSetReceived, this.HandleSetAsRead);
    this.GetText(3).bGameRichText = true;
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
    this.RootActor.OnSequencePlayEvent.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatTabClick, this.HandleSelected);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgSetAsRead, this.HandleSetAsRead);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgSetReceived, this.HandleSetAsRead);
    RedDotController_1.RedDotController.UnBindRedDot("PhoneMsgChatItemRedDot");
    this.LDf = false;
  }
  PDf(t) {
    if (!this.LDf) {
      RedDotController_1.RedDotController.BindRedDot("PhoneMsgChatItemRedDot", this.GetItem(4), undefined, t);
      this.LDf = true;
    }
  }
  J9f() {
    this.Hea?.StopSequenceByKey("Switch");
    this.Hea?.PlayLevelSequenceByName("Switch");
  }
  ADf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgFinishIconSel");
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgFinishIconNml");
    this.SetSpriteByPath(e, this.GetSprite(1), false);
    this.SetSpriteByPath(t, this.GetSprite(2), false);
  }
  async RefreshAsync(t, e, i) {
    this.ShortMsgId = t.ShortMsgData.ShortMsgId;
    if (t.IsFinish) {
      this.ADf();
    } else {
      this.SetSpriteByPath(t.UnFinishIconNormal, this.GetSprite(1), false);
      this.SetSpriteByPath(t.UnFinishIconSelect, this.GetSprite(2), false);
    }
    this.RefreshShowChatText();
    this.PDf(this.ShortMsgId);
  }
  RefreshShowChatText() {
    var t = ModelManager_1.ModelManager.PhoneMsgModel.GetLastChatTextByShortMsgId(this.ShortMsgId);
    this.GetText(3).SetText(t);
  }
  SetShowChatText(t) {
    this.GetText(3).SetText(t);
  }
  SetOnTogClickCallBack(t) {
    this.C1f = t;
  }
  SetCanExecuteChange(t) {
    this.x1_ = t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  OnSelected(t) {
    if (this.C1f) {
      this.C1f(this.GridIndex, this.ShortMsgId, this);
    }
    this.SetToggleState(true);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
  GetKey(t, e) {
    return t.ShortMsgData?.ShortMsgId;
  }
}
exports.TogChatTalkItem = TogChatTalkItem;
//# sourceMappingURL=PhoneSystemChatPartnerTabItem.js.map