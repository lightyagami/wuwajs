"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndLineChatItem = exports.EndLineChatGridData = exports.RewardChatItem = exports.RewardChatGridData = exports.BirthdayChatItem = exports.BirthdayChatGridData = exports.TaskChatItem = exports.TaskChatGridData = exports.TipsChatItem = exports.TipsChatGridData = exports.PhoneMsgOtherChatItem = exports.OtherChatGridData = exports.PhoneMsgSelfChatItem = exports.SelfChatGridData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const BirthDayByItemId_1 = require("../../../../Core/Define/ConfigQuery/BirthDayByItemId");
const PhoneMessageAttachmentById_1 = require("../../../../Core/Define/ConfigQuery/PhoneMessageAttachmentById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const QuestUtil_1 = require("../../QuestNew/QuestUtil");
const SyncGridProxyAbstract_1 = require("../../Util/Grid/SyncGridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const PhoneMsgEmojiItem_1 = require("./PhoneMsgEmojiItem");
const PhoneMsgPhraseItem_1 = require("./PhoneMsgPhraseItem");
class SelfChatGridData {
  constructor(t) {
    this.Data = t;
    this.OnOptionItemClickDelegate = undefined;
    this.GetTemplateIndex = () => 1;
    this.CreateProxy = () => {
      var t = new PhoneMsgSelfChatItem();
      t.OnOptionItemClickDelegate = this.OnOptionItemClickDelegate;
      return t;
    };
  }
}
exports.SelfChatGridData = SelfChatGridData;
class PhoneMsgSelfChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PhoneMsgChatData = undefined;
    this.LevelSequencePlayer = undefined;
    this.G4f = [];
    this.F4f = [];
    this.Saf = undefined;
    this.yaf = undefined;
    this.vWf = 0;
    this.yWf = 0;
    this.SWf = 0;
    this.MWf = 0;
    this.OnOptionItemClickDelegate = undefined;
    this.RefreshChatDialogShow = () => {
      var t = ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatDialogId;
      var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatDialogConfig(t);
      if (t) {
        t = t.BgPath;
        this.SetSpriteByPath(t, this.GetSprite(10), false);
      }
    };
    this.geg = () => {
      var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      if (t) {
        this.PhoneMsgChatData.SpeakerName = t;
        this.GetText(2).SetText(t);
      }
    };
    this.N4f = () => {
      var t = new PhoneMsgEmojiItem_1.PhoneMsgEmojiItem();
      t.OnClickDelegate = this.V4f;
      return t;
    };
    this.H4f = () => {
      var t = new PhoneMsgPhraseItem_1.PhoneMsgPhraseItem();
      t.OnClickDelegate = this.V4f;
      return t;
    };
    this.V4f = t => {
      this.OnOptionItemClickDelegate?.(this.GridIndex, t);
    };
    this.haf = () => {
      var t = this.PhoneMsgChatData?.ContentNum ?? 0;
      if (!(t <= 0)) {
        ControllerHolder_1.ControllerHolder.PhoneMsgController.OpenAttachmentImgView(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIScrollViewWithScrollbarComponent], [13, UE.UILayoutBase], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIScrollViewWithScrollbarComponent], [17, UE.UILayoutBase], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[8, this.haf]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var t = this.GetText(4);
    var e = this.GetText(2);
    t.bGameRichText = true;
    t.richText = true;
    e.bGameRichText = true;
    e.richText = true;
    this.yaf = new GenericLayout_1.GenericLayout(this.GetLayoutBase(17), this.N4f);
    this.Saf = new GenericLayout_1.GenericLayout(this.GetLayoutBase(13), this.H4f);
    var t = this.GetItem(19);
    this.vWf = t.Alpha;
    this.yWf = t.GetAnchorOffsetY();
    var e = this.GetItem(15);
    this.SWf = e.Alpha;
    this.MWf = e.GetStretchBottom();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.RefreshChatDialogShow);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.geg);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgChatShowChange, this.RefreshChatDialogShow);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.geg);
  }
  Refresh(t) {
    this.PhoneMsgChatData = t;
    this.UpdateOptionData();
    this.RefreshDisplayItem();
    this.ResetTextOptionAnimItem();
    this.ResetEmojiOptionAnimItem();
    this.RefreshTimeText();
    this.RefreshSpeakerInfo();
    this.RefreshChatContent();
    this.RefreshChatDialogShow();
  }
  UpdateOptionData() {
    var t = this.PhoneMsgChatData.TalkItem.Options;
    if (t && t.length !== 0) {
      this.G4f.length = 0;
      this.F4f.length = 0;
      for (const e of t) {
        if (e.TypeParams) {
          if (e.TypeParams.Type === "PhoneMessageEmoji") {
            this.F4f.push(e.TypeParams.EmojiId ?? 0);
          }
        } else {
          this.G4f.push(PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TidTalkOption) ?? "");
        }
      }
    }
  }
  RefreshTimeText() {
    this.GetText(0).SetUIActive(false);
  }
  RefreshSpeakerInfo() {
    this.GetText(2).SetText(this.PhoneMsgChatData.SpeakerName);
    var t = this.GetTexture(1);
    var e = this.PhoneMsgChatData.SpeakerIcon;
    if (e) {
      e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, false);
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), t);
    } else {
      e = this.PhoneMsgChatData.SpeakerHeadIconPath;
      if (StringUtils_1.StringUtils.IsEmpty(e)) {
        t.SetUIActive(false);
      } else {
        this.SetTextureShowUntilLoaded(e, t);
      }
    }
  }
  RefreshChatContent() {
    switch (this.PhoneMsgChatData.ContentType) {
      case 1:
        this.GetText(4).SetText(this.PhoneMsgChatData.ContentStr);
        break;
      case 2:
        var t = this.PhoneMsgChatData.ContentNum;
        var t = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t);
        this.SetTextureByPath(t.ExpressionTexturePath, this.GetTexture(6));
        break;
      case 3:
        t = PhoneMessageAttachmentById_1.configPhoneMessageAttachmentById.GetConfig(this.PhoneMsgChatData.ContentNum);
        this.SetTextureByPath(t.Thumbnail, this.GetTexture(9));
        break;
      case 8:
        this.Saf.RefreshByData(this.G4f);
        break;
      case 9:
        this.yaf.RefreshByData(this.F4f);
    }
  }
  RefreshDisplayItem() {
    var t = this.PhoneMsgChatData.ContentType;
    this.GetItem(11).SetUIActive(t === 8);
    this.GetItem(15).SetUIActive(t === 9);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(5).SetUIActive(this.PhoneMsgChatData.IsSendError);
    this.GetItem(3).SetUIActive(t === 1);
    this.GetTexture(6).SetUIActive(t === 2);
    this.GetButton(8).RootUIComp.SetUIActive(t === 3);
  }
  GetChatContentSequenceName(t = false) {
    switch (this.PhoneMsgChatData.ContentType) {
      case 1:
        if (t) {
          return "Send_Text_NoHead";
        } else {
          return "Send_Text";
        }
      case 2:
        if (t) {
          return "Emote_In_NoHead";
        } else {
          return "Emote_In";
        }
      case 3:
        return "Pic_In";
      case 8:
        return "Reply_In";
      case 9:
        return "Reply_Emote_In";
      default:
        return "";
    }
  }
  async PlayChatContentAnimationAsync(t = false) {
    this.GetItem(5).SetUIActive(false);
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync(this.GetChatContentSequenceName(t), e);
    await this.PlayRedDotAnimationAsync();
    if (Info_1.Info.IsInGamepad() && !t) {
      this.dYf();
    }
  }
  dYf() {
    var t;
    var e = this.PhoneMsgChatData.ContentType;
    if (e === 8) {
      if ((t = this.Saf.GetLayoutItemList()[0]) && (t = t.GetRootItem(), t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetNoneTagNavigateItemByUiItem(t))) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t, true);
      }
    } else if (e === 9 && (t = this.yaf.GetLayoutItemList()[0]) && (e = t.GetRootItem(), t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetNoneTagNavigateItemByUiItem(e))) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t, true);
    }
  }
  StopChatContentAnimation(t = false) {
    t = this.GetChatContentSequenceName(t);
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.LevelSequencePlayer.StopSequenceByKey(t, false, true);
      this.StopRedDotAnimation();
    }
  }
  async PlayRedDotAnimationAsync() {
    var t;
    if (this.PhoneMsgChatData?.IsSendError) {
      t = new CustomPromise_1.CustomPromise();
      await this.LevelSequencePlayer.PlaySequenceAsync("Red_Tips", t);
    }
  }
  StopRedDotAnimation() {
    if (this.PhoneMsgChatData?.IsSendError) {
      this.LevelSequencePlayer.StopSequenceByKey("Red_Tips", false, true);
    }
  }
  async PlayTextOptionAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Reply_Out", t);
  }
  StopTextOptionAnimation() {
    this.LevelSequencePlayer.StopSequenceByKey("Reply_Out", false, true);
  }
  async PlayEmojiOptionAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Reply_Emote_Out", t);
  }
  StopEmojiOptionAnimation() {
    this.LevelSequencePlayer.StopSequenceByKey("Reply_Emote_Out", false, true);
  }
  async PlayOptionHideAnimationAsync() {
    if (this.PhoneMsgChatData.ContentType === 8) {
      await this.PlayTextOptionAnimationAsync();
    } else if (this.PhoneMsgChatData.ContentType === 9) {
      await this.PlayEmojiOptionAnimationAsync();
    }
  }
  StopOptionHideAnimation() {
    if (this.PhoneMsgChatData.ContentType === 8) {
      this.StopTextOptionAnimation();
    } else if (this.PhoneMsgChatData.ContentType === 9) {
      this.StopEmojiOptionAnimation();
    }
  }
  ResetTextOptionAnimItem() {
    var t = this.GetItem(19);
    t.SetAlpha(this.vWf);
    t.SetAnchorOffsetY(this.yWf);
  }
  ResetEmojiOptionAnimItem() {
    var t = this.GetItem(15);
    t.SetAlpha(this.SWf);
    t.SetStretchBottom(this.MWf);
  }
}
exports.PhoneMsgSelfChatItem = PhoneMsgSelfChatItem;
class OtherChatGridData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 0;
    this.CreateProxy = () => new PhoneMsgOtherChatItem();
  }
}
exports.OtherChatGridData = OtherChatGridData;
class PhoneMsgOtherChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PhoneMsgChatData = undefined;
    this.LevelSequencePlayer = undefined;
    this.haf = () => {
      var t = this.PhoneMsgChatData?.ContentNum ?? 0;
      if (!(t <= 0)) {
        ControllerHolder_1.ControllerHolder.PhoneMsgController.OpenAttachmentImgView(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UISprite]];
    this.BtnBindInfo = [[8, this.haf]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var t = this.GetText(4);
    var e = this.GetText(2);
    t.bGameRichText = true;
    t.richText = true;
    e.bGameRichText = true;
    e.richText = true;
  }
  Refresh(t) {
    this.PhoneMsgChatData = t;
    this.RefreshDisplayItem();
    this.RefreshTimeText();
    this.RefreshSpeakerInfo();
    this.RefreshChatContent();
  }
  RefreshDisplayItem() {
    var t = this.PhoneMsgChatData.ContentType;
    this.GetItem(7).SetUIActive(false);
    this.GetItem(5).SetUIActive(this.PhoneMsgChatData.IsSendError);
    this.GetItem(3).SetUIActive(t === 1);
    this.GetTexture(6).SetUIActive(t === 2);
    this.GetButton(8).RootUIComp.SetUIActive(t === 3);
  }
  RefreshTimeText() {
    this.GetText(0).SetUIActive(false);
  }
  RefreshSpeakerInfo() {
    this.GetText(2).SetText(this.PhoneMsgChatData.SpeakerName);
    var t = this.GetTexture(1);
    var e = this.PhoneMsgChatData.SpeakerIcon;
    if (e) {
      e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, false);
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), t);
    } else {
      e = this.PhoneMsgChatData.SpeakerHeadIconPath;
      if (StringUtils_1.StringUtils.IsEmpty(e)) {
        t.SetUIActive(false);
      } else {
        this.SetTextureShowUntilLoaded(e, t);
      }
    }
  }
  RefreshChatContent() {
    switch (this.PhoneMsgChatData.ContentType) {
      case 1:
        this.GetText(4).SetText(this.PhoneMsgChatData.ContentStr);
        break;
      case 2:
        var e = this.PhoneMsgChatData.ContentNum;
        var e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e);
        this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(6));
        break;
      case 3:
        {
          e = PhoneMessageAttachmentById_1.configPhoneMessageAttachmentById.GetConfig(this.PhoneMsgChatData.ContentNum);
          let t = e.ThumbnailMaleVariant;
          t = t && ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? e.ThumbnailMaleVariant : e.Thumbnail;
          this.SetTextureByPath(t, this.GetTexture(9));
        }
    }
  }
  HideAllItemsExceptInputtingItem() {
    this.GetTexture(6).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetButton(8).RootUIComp.SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
  }
  async PlayInputtingAnimationAsync() {
    this.GetItem(7).SetUIActive(true);
    this.HideAllItemsExceptInputtingItem();
    await this.LevelSequencePlayer.PlaySequenceAsync("Send_Text_1", new CustomPromise_1.CustomPromise());
  }
  StopInputtingAnimation() {
    this.LevelSequencePlayer.StopSequenceByKey("Send_Text_1", false, true);
  }
  GetChatContentSequenceName() {
    switch (this.PhoneMsgChatData.ContentType) {
      case 1:
        return "Send_Text_2";
      case 2:
        return "Emote_In";
      case 3:
        return "Pic_In";
      default:
        return "";
    }
  }
  async PlayChatContentAnimationAsync() {
    this.GetItem(5).SetUIActive(false);
    var t = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync(this.GetChatContentSequenceName(), t);
    await this.PlayRedDotAnimationAsync();
  }
  StopChatContentAnimation() {
    var t = this.GetChatContentSequenceName();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.LevelSequencePlayer.StopSequenceByKey(t, false, true);
      this.StopRedDotAnimation();
    }
  }
  async PlayRedDotAnimationAsync() {
    var t;
    if (this.PhoneMsgChatData?.IsSendError) {
      t = new CustomPromise_1.CustomPromise();
      await this.LevelSequencePlayer.PlaySequenceAsync("Red_Tips", t);
    }
  }
  StopRedDotAnimation() {
    if (this.PhoneMsgChatData?.IsSendError) {
      this.LevelSequencePlayer.StopSequenceByKey("Red_Tips", false, true);
    }
  }
}
exports.PhoneMsgOtherChatItem = PhoneMsgOtherChatItem;
class TipsChatGridData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 2;
    this.CreateProxy = () => new TipsChatItem();
  }
}
exports.TipsChatGridData = TipsChatGridData;
class TipsChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aaf = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var t = this.GetText(1);
    var e = this.GetText(2);
    t.bGameRichText = true;
    t.richText = true;
    e.bGameRichText = true;
    e.richText = true;
  }
  Refresh(t) {
    this.aaf = t;
    this.GetItem(0).SetUIActive(true);
    this.GetText(1).SetUIActive(true);
    this.GetText(2).SetUIActive(false);
    this.GetText(1).SetText(this.aaf.ContentStr);
  }
  async PlayTipsAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("In", t);
  }
  StopTipsAnimation() {
    this.SPe.StopSequenceByKey("In", false, true);
  }
}
exports.TipsChatItem = TipsChatItem;
class TaskChatGridData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 3;
    this.CreateProxy = () => new TaskChatItem();
  }
}
exports.TaskChatGridData = TaskChatGridData;
class TaskChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aaf = undefined;
    this._af = undefined;
    this.SPe = undefined;
    this.uaf = () => {
      var t;
      var e;
      if (this._af && this.aaf) {
        UiManager_1.UiManager.OpenView("QuestView", this._af.Id);
        t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.aaf.ShortMessageId);
        (e = new LogReportDefine_1.OnJumpInShortMessageLogEvent()).i_id = this._af.Id;
        e.i_type = this.aaf.IsGroupChat ? 1 : 2;
        e.i_role_id = t.WhichChat;
        e.l_received_time = this.aaf.UnLockTime.low ?? 0;
        e.i_trigger_type = 1;
        e.i_config_id = this._af.Id;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UISprite]];
    this.BtnBindInfo = [[4, this.uaf]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(t) {
    var e;
    this.aaf = t;
    this._af = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(t.QuestId);
    if (this._af) {
      this.caf();
      e = (t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId)) === 3;
      t = t === 2;
      this.GetButton(4).SetSelfInteractive(t);
      this.GetSprite(5).SetUIActive(e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Message_QuestCompleted");
      } else if (t) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Message_QuestAccepted");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Message_QuestNotAccepted");
      }
    }
  }
  caf() {
    var t;
    if (this._af && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this._af.TidName), t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfig(this._af.Type))) {
      t = QuestUtil_1.QuestUtil.GetQuestMarkId(t.MainId, this._af.Id) ?? 0;
      t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t);
      this.SetSpriteByPath(t, this.GetSprite(1), false);
    }
  }
  async PlayTaskAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("In", t);
  }
  StopTaskAnimation() {
    this.SPe.StopSequenceByKey("In", false, true);
  }
}
exports.TaskChatItem = TaskChatItem;
class BirthdayChatGridData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 4;
    this.CreateProxy = () => new BirthdayChatItem();
  }
}
exports.BirthdayChatGridData = BirthdayChatGridData;
class BirthdayChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aaf = undefined;
    this.SPe = undefined;
    this.uaf = () => {
      var t;
      var e = this.aaf.BirthdayCardItemId;
      if (e) {
        ControllerHolder_1.ControllerHolder.BirthdayController.UseBirthdayItem(e);
        e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(this.aaf.ShortMessageId);
        (t = new LogReportDefine_1.OnJumpInShortMessageLogEvent()).i_id = this.aaf.ShortMessageId;
        t.i_type = this.aaf.IsGroupChat ? 1 : 2;
        t.i_role_id = e.WhichChat;
        t.l_received_time = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(this.aaf.ShortMessageId)?.UnLockTime.low ?? 0;
        t.i_trigger_type = 2;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UISprite], [5, UE.UITexture], [6, UE.UITextureTransitionComponent], [7, UE.UITextureTransitionComponent]];
    this.BtnBindInfo = [[3, this.uaf]];
  }
  OnStart() {
    this.GetSprite(4).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetButton(3).RootUIComp.SetUIActive(true);
  }
  Refresh(t) {
    this.aaf = t;
    var e;
    var i;
    var t = BirthDayByItemId_1.configBirthDayByItemId.GetConfig(t.BirthdayCardItemId);
    if (t) {
      e = this.GetUiTextureTransitionComponent(6);
      i = this.GetUiTextureTransitionComponent(7);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeBg, e, 0);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeBg, e, 2);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeBg, e, 3);
      this.SetTextureTransitionByPath(t.PhoneMsgHighLightCakeBg, e, 1);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeIcon, i, 0);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeIcon, i, 2);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeIcon, i, 3);
      this.SetTextureTransitionByPath(t.PhoneMsgCakeIcon, i, 1);
      this.SetTextureByPath(t.PhoneMsgCakeBg, this.GetTexture(5));
      this.SetTextureByPath(t.PhoneMsgCakeIcon, this.GetTexture(0));
    }
  }
  async PlayBirthdayAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("In", t);
  }
  StopBirthdayAnimation() {
    this.SPe.StopSequenceByKey("In", false, true);
  }
}
exports.BirthdayChatItem = BirthdayChatItem;
class RewardChatGridData {
  constructor(t) {
    this.Data = t;
    this.OnRewardClick = undefined;
    this.GetTemplateIndex = () => 5;
    this.CreateProxy = () => {
      var t = new RewardChatItem();
      t.OnRewardClick = this.OnRewardClick;
      return t;
    };
  }
}
exports.RewardChatGridData = RewardChatGridData;
class RewardChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnRewardClick = undefined;
    this.T8e = undefined;
    this.SPe = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.maf = () => {
      this.OnRewardClick?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.maf]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.W2e);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(t) {
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.DropId)?.DropPreview;
    if (e) {
      var i;
      var s;
      var h = [];
      for ([i, s] of e) {
        var r = [{
          IncId: 0,
          ItemId: i
        }, s];
        h.push(r);
      }
      this.T8e.RefreshByData(h);
      this.GetButton(0).RootUIComp.SetUIActive(!t.IsFinish);
      this.GetSprite(1).SetUIActive(t.IsFinish);
    }
  }
  async PlayRewardAnimationAsync() {
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("In", t);
  }
  StopRewardAnimation() {
    this.SPe.StopSequenceByKey("In", false, true);
  }
}
exports.RewardChatItem = RewardChatItem;
class EndLineChatGridData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 6;
    this.CreateProxy = () => new EndLineChatItem();
  }
}
exports.EndLineChatGridData = EndLineChatGridData;
class EndLineChatItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  Refresh(t) {}
}
exports.EndLineChatItem = EndLineChatItem;
//# sourceMappingURL=PhoneSystemChatItem.js.map