"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionPreheatModel = undefined;
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityVersionPreheatController_1 = require("../Controller/ActivityVersionPreheatController");
const VersionPreheatDefine_1 = require("../VersionPreheatDefine");
const VersionPreheatActivityContext_1 = require("./VersionPreheatActivityContext");
const VersionPreheatConfigContext_1 = require("./VersionPreheatConfigContext");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class VersionPreheatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentUsingVersionPreheatId = undefined;
    this.I_l = undefined;
    this.FCl = undefined;
    this.VCl = undefined;
    this.HCl = undefined;
    this.T_l = undefined;
    this.UVa = undefined;
  }
  OnInit() {
    this.T_l = new VersionPreheatActivityContext_1.VersionPreheatActivityContext();
    this.UVa = new VersionPreheatConfigContext_1.VersionPreheatConfigContext();
    return true;
  }
  OnClear() {
    this.T_l.Dispose();
    return true;
  }
  get ActivityData() {
    return this.T_l;
  }
  get IsBonusAvailable() {
    if (this.T_l.QuestCache.size === 0) {
      return false;
    }
    for (var [, t] of this.T_l.QuestCache) {
      if (this.GetQuestStateById(t.Id) !== 3) {
        return false;
      }
    }
    return true;
  }
  get HasNewQuest() {
    if (this.IsBonusAvailable && !this.IsBonusClicked()) {
      return true;
    }
    for (const e of this.UVa.AllQuestCfg) {
      var t = this.T_l.QuestCache.get(e.Id);
      if (t !== undefined && this.GetQuestStateById(e.Id) !== 0 && !this.IsQuestClickedById(e.Id)) {
        return true;
      }
    }
    return false;
  }
  SyncPreheatSignSurveyInfo(t, e) {
    this.T_l.SyncPreheatSignSurveyInfo(t, e);
  }
  SyncPreheatRewardedState(t) {
    this.T_l.SyncPreheatRewardedState(t);
  }
  GetQuestIdById(t) {
    return this.UVa.GetQuestIdById(t);
  }
  GetQuestStateById(t) {
    t = this.T_l.QuestCache.get(t);
    if (t === undefined) {
      return 0;
    } else {
      return this.R_l(t);
    }
  }
  BuildQuestDataList() {
    var t;
    var e;
    var i = [];
    for ([t, e] of this.T_l.QuestCache) {
      var r = {
        Id: t,
        State: this.R_l(e),
        NumberTextId: "Preheating_Serial_Number",
        NumberTextArg: t.toString().padStart(2, "0"),
        TitleTextId: this.UVa.GetQuestTitleTextIdById(t),
        UnlockTimestamp: e.UnlockTimestamp
      };
      i.push(r);
    }
    return i;
  }
  BuildActivityInfoData() {
    var t = this.T_l.LocalConfig;
    return {
      TitleData: {
        TitleTextId: t?.Title ?? "",
        SubTitleTextId: t?.DescTheme ?? ""
      },
      DescriptionData: {
        ContentTextId: this.T_l.LocalConfig?.Desc ?? ""
      },
      RewardData: {
        TitleId: "CollectActivity_reward",
        RewardList: this.T_l.GetPreviewReward()
      },
      BottomData: {
        Test: true
      }
    };
  }
  BuildBonusQuestData() {
    return {
      NumberTextId: "Preheating_Serial_Number",
      NumberTextArg: "7",
      ContentTextId: this.UVa.BonusQuestContentTextId
    };
  }
  BuildQuestDetailDataById(t) {
    var e = this.GetQuestStateById(t);
    var i = e >= 2 ? this.U_l(t) : undefined;
    var r = e === 3 ? this.D_l(t, e) : undefined;
    var e = e > 0 && e <= 2 ? this.A_l(t, e) : undefined;
    return {
      PersistentData: this.x_l(t),
      VoteData: i,
      ChatData: r,
      RewardData: e
    };
  }
  BuildBonusDetailData() {
    return {
      PersistentData: {
        Index: VersionPreheatDefine_1.BONUS_ITEM_INDEX,
        QuestPhotoPath: this.UVa.BonusPhotoPath,
        QuestTitleTextId: this.UVa.BonusQuestTitleTextId,
        QuestContentTextId: this.UVa.BonusQuestContentTextId,
        QuestCrestIndex: this.UVa.BonusCrestIndex,
        QuestSharePhotoPath: this.UVa.BonusSharePhotoPath,
        CanShare: false
      },
      ChatData: this.P_l(),
      BonusTextId: this.UVa.BonusTextId
    };
  }
  BuildVoteDataById(t) {
    return {
      TitleTextId: this.UVa.GetVoteTitleTextIdById(t),
      ContentTextId: this.UVa.GetVoteContentTextIdById(t),
      CrestIndex: this.UVa.GetQuestCrestIndexById(t),
      LeftToggleData: {
        Id: t,
        ContentTextId: this.UVa.GetVoteLeftTipsTextIdById(t),
        ClickFunc: ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.HandleVoteClickAsync,
        ClickPassData: true
      },
      RightToggleData: {
        Id: t,
        ContentTextId: this.UVa.GetVoteRightTipsTextIdById(t),
        ClickFunc: ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.HandleVoteClickAsync,
        ClickPassData: false
      },
      ItemListData: this.UVa.GetQuestRewardItemListById(t),
      IsLeftChosen: this.T_l.IsLeftChosen(t)
    };
  }
  R_l(t) {
    if (TimeUtil_1.TimeUtil.GetServerTimeStamp() < t.UnlockTimestamp) {
      return 0;
    }
    var e = this.UVa.GetPreIdById(t.Id);
    if (e > 0 && (this.T_l.QuestCache.get(e) === undefined || !ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.IsQuestFinishedById(e))) {
      return 0;
    }
    if (ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.IsQuestFinishedById(t.Id)) {
      return 3;
    } else if (t.Rewarded) {
      return 2;
    } else {
      return 1;
    }
  }
  IsQuestClickedById(t) {
    if (this.I_l === undefined) {
      this.I_l = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatToQuestClicked);
    }
    return this.I_l?.get(t) ?? false;
  }
  SetQuestClickedById(t) {
    if (this.I_l === undefined) {
      this.I_l = new Map();
    }
    this.I_l.set(t, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatToQuestClicked, this.I_l);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.T_l.Id);
  }
  IsQuestPlayedById(t) {
    if (this.VCl === undefined) {
      this.VCl = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatToQuestPlayed);
    }
    return this.VCl?.get(t) ?? false;
  }
  SetQuestPlayedById(t) {
    if (this.VCl === undefined) {
      this.VCl = new Map();
    }
    this.VCl.set(t, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatToQuestPlayed, this.VCl);
  }
  IsBonusClicked() {
    if (this.FCl === undefined) {
      this.FCl = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusClicked);
    }
    return this.FCl ?? false;
  }
  SetBonusClicked() {
    if (this.FCl === undefined) {
      this.FCl = true;
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusClicked, this.FCl);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.T_l.Id);
  }
  IsBonusPlayed() {
    if (this.HCl === undefined) {
      this.HCl = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusPlayed);
    }
    return this.HCl ?? false;
  }
  SetBonusPlayed() {
    if (this.HCl === undefined) {
      this.HCl = true;
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusPlayed, this.HCl);
  }
  x_l(t) {
    var e = this.UVa;
    var i = this.T_l.IsRewardedById(t);
    return {
      Index: t - 1,
      QuestPhotoPath: e.GetQuestPhotoPathById(t),
      QuestTitleTextId: e.GetQuestTitleTextIdById(t),
      QuestContentTextId: i ? e.GetQuestAfterThemeTextIdById(t) : e.GetQuestBeforeThemeTextIdById(t),
      QuestCrestIndex: e.GetQuestCrestIndexById(t),
      QuestSharePhotoPath: e.GetQuestSharePhotoPathById(t),
      CanShare: this.GetQuestStateById(t) === 3
    };
  }
  U_l(t) {
    var e = this.T_l.GetVoteLeftCountById(t);
    var i = this.T_l.GetVoteRightCountById(t);
    let r = 0;
    let a = 0;
    a = e === i ? r = 0.5 : (r = e / (e + i), i / (e + i));
    e = Math.round(r * 100);
    i = 100 - e;
    return {
      LeftNormalized: r,
      RightNormalized: a,
      LeftPercentageText: e.toString() + "%",
      RightPercentageText: i.toString() + "%",
      LeftThemeTextId: this.UVa.GetVoteLeftThemeTextIdById(t),
      RightThemeTextId: this.UVa.GetVoteRightThemeTextIdById(t),
      IsLeftChosen: this.T_l.IsLeftChosen(t) ?? false
    };
  }
  D_l(t, e) {
    e = this.w_l(t, e);
    return {
      NpcContentTextId: this.UVa.GetNpcContentTextIdById(t),
      NpcIconPath: this.UVa.GetNpcIconPathById(t),
      SelfChatData: e
    };
  }
  P_l() {
    return {
      NpcContentTextId: this.UVa.BonusNpcContentTextId,
      NpcIconPath: this.UVa.BonusNpcIconPath
    };
  }
  w_l(t, e) {
    if (!(e < 2)) {
      e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1 ? VersionPreheatDefine_1.HERO_ROLE_ID : VersionPreheatDefine_1.HEROINE_ROLE_ID;
      return {
        NpcIconPath: ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e)?.RoleHeadIconCircle ?? "",
        NpcContentTextId: this.UVa.GetSelfChatContentTextIdById(t)
      };
    }
  }
  A_l(t, e) {
    return {
      QuestContentTextId: this.UVa.GetQuestContentTextIdById(t),
      ItemListData: this.UVa.GetQuestRewardItemListById(t),
      IsReceived: e === 2,
      ClickFunc: ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.HandleQuestDetailClickInReward,
      ClickPassData: this.UVa.GetQuestIdById(t)
    };
  }
}
exports.VersionPreheatModel = VersionPreheatModel;
//# sourceMappingURL=VersionPreheatModel.js.map