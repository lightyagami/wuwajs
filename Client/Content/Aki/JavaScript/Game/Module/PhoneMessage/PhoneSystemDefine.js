"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgBgItemData = exports.PhoneMsgDialogItemData = exports.ShortMessageDisplayData = exports.ChatTalkTabItemData = exports.ChatPartnerTabItemData = exports.PhoneMsgShortMsgData = exports.PhoneMsgChatData = exports.TIPS_ITEM_FLY_TO_LOCATION_DURATION = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
exports.TIPS_ITEM_FLY_TO_LOCATION_DURATION = 0.25;
class PhoneMsgChatData {
  constructor(t) {
    this.ChatContentType = 2;
    this.ContentType = 0;
    this.SpeakerIcon = 0;
    this.SpeakerHeadIconPath = "";
    this.SpeakerName = "";
    this.ChatDialogId = 0;
    this.ContentStr = "";
    this.ContentNum = 0;
    this.IsSendError = false;
    this.IsFinish = false;
    this.QuestId = 0;
    this.BirthdayCardItemId = 0;
    this.DropId = 0;
    this.IsGroupChat = false;
    this.TalkItem = undefined;
    this.ShortMessageId = 0;
    this.ChatParnetId = 0;
    this.UnLockTime = 0;
    this.ChatContentType = t;
  }
}
exports.PhoneMsgChatData = PhoneMsgChatData;
class PhoneMsgShortMsgData {
  constructor(t) {
    this.ShortMsgId = 0;
    this.IsRead = false;
    this.IsReceived = false;
    this.UnLockTime = 0;
    this.LatestProgress = 0;
    this.SelectedOptionsDict = new Map();
    this.ShortMsgId = t;
  }
}
exports.PhoneMsgShortMsgData = PhoneMsgShortMsgData;
class ChatPartnerTabItemData {
  constructor(t) {
    this.ChatPartnerId = 0;
    this.ChatPartnerId = t;
  }
}
exports.ChatPartnerTabItemData = ChatPartnerTabItemData;
class ChatTalkTabItemData {
  constructor(t) {
    this.ShortMsgData = undefined;
    this.Title = "";
    this.IsFinish = false;
    this.UnFinishIconNormal = "";
    this.UnFinishIconSelect = "";
    this.ShortMsgData = t;
    var s = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(t.ShortMsgId);
    switch (s.FinallPopType) {
      case 4:
        this.UnFinishIconSelect = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgTaskIconSel");
        this.UnFinishIconNormal = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgTaskIconNml");
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.QuestId) === 3) {
          this.IsFinish = true;
        }
        break;
      case 5:
        this.UnFinishIconSelect = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgJumpIconSel");
        this.UnFinishIconNormal = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgJumpIconNml");
        if (t.IsRead) {
          this.IsFinish = true;
        }
        break;
      case 6:
        this.UnFinishIconSelect = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgRewardIconSel");
        this.UnFinishIconNormal = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgRewardIconNml");
        if (t.IsReceived) {
          this.IsFinish = true;
        }
        break;
      default:
        this.UnFinishIconSelect = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgNormalIconSel");
        this.UnFinishIconNormal = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("PhoneMsgNormalIconNml");
        if (t.IsRead) {
          this.IsFinish = true;
        }
    }
    var a = ModelManager_1.ModelManager.PhoneMsgModel.GetFirstMsgDataByShortMsgId(t.ShortMsgId);
    this.Title = a ? a[2] : "";
  }
}
exports.ChatTalkTabItemData = ChatTalkTabItemData;
class ShortMessageDisplayData {
  constructor(t) {
    this.ShortMsgId = 0;
    this.ChatDialogId = 0;
    this.ChatBgId = 0;
    this.ReadIndex = -1;
    this.ChatDataList = [];
    this.OptionSelectedMap = new Map();
    this.IsJumpToFirstOption = false;
    this.IsReceivedReward = false;
    this.ShowTalkConfig = undefined;
    this.IdToIndexMap = new Map();
    this.ShortMsgId = t;
  }
  IsLastOption() {
    return this.ChatDataList[this.ChatDataList.length - 1].ContentType === 8 || this.ChatDataList[this.ChatDataList.length - 1].ContentType === 9;
  }
  IsFinished() {
    return this.IsAllChatRead() && !this.IsLastOption();
  }
  IsAllChatRead() {
    return this.ReadIndex >= this.ChatDataList.length - 1;
  }
  InitTalkItemData(t) {
    (this.ShowTalkConfig = t).TalkItems.forEach((t, s) => {
      this.IdToIndexMap.set(t.Id, s);
    });
  }
}
exports.ShortMessageDisplayData = ShortMessageDisplayData;
class PhoneMsgDialogItemData {
  constructor() {
    this.DialogId = 0;
    this.IsSelected = false;
    this.IsUsing = false;
    this.IsUnlocked = false;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatDialogConfig(this.DialogId);
  }
}
exports.PhoneMsgDialogItemData = PhoneMsgDialogItemData;
class PhoneMsgBgItemData {
  constructor() {
    this.BgId = 0;
    this.IsSelected = false;
    this.IsUsing = false;
    this.IsUnlocked = false;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatBgConfig(this.BgId);
  }
}
exports.PhoneMsgBgItemData = PhoneMsgBgItemData;
//# sourceMappingURL=PhoneSystemDefine.js.map