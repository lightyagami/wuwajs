"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemRewardModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const RewardData_1 = require("./RewardData/RewardData");
class ItemRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.q0i = undefined;
    this.CurrentReasonId = undefined;
  }
  OnClear() {
    this.q0i = undefined;
    return !(this.CurrentReasonId = undefined);
  }
  RefreshRewardData(e, t) {
    e = {
      Type: 0,
      ViewName: e
    };
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetRewardInfo(e);
    this.q0i.SetItemList(t);
    return this.q0i;
  }
  RefreshExploreLevelRewardData(e, t, i, s) {
    e = {
      Type: 0,
      ViewName: e,
      CurrentExploreLevel: t,
      TargetExploreLevel: i
    };
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetRewardInfo(e);
    this.q0i.SetItemList(s);
    return this.q0i;
  }
  GetExploreLevelRewardData(e, t, i, s) {
    e = {
      Type: 0,
      ViewName: e,
      CurrentExploreLevel: t,
      TargetExploreLevel: i
    };
    t = new RewardData_1.RewardData();
    t.SetRewardInfo(e);
    t.SetItemList(s);
    return t;
  }
  RefreshCommonRewardDataFromConfig(e, t, i, s, r, a, o, h, n = true) {
    e = ConfigManager_1.ConfigManager.ItemRewardConfig.GetCommonRewardViewDisplayConfig(e);
    if (e) {
      t = {
        Type: 1,
        ViewName: t,
        AudioId: e.AudioId,
        Title: e.Title,
        ContinueText: e.ContinueText,
        IsItemVisible: e.IsItemVisible,
        OnCloseCallback: s,
        LeftBtnTextId: r,
        RightBtnTextId: a,
        LeftAction: o,
        RightAction: h,
        TipsCanSkip: n
      };
      if (!this.q0i) {
        this.NewRewardData();
      }
      this.q0i.SetRewardInfo(t);
      this.q0i.SetItemList(i);
      return this.q0i;
    }
  }
  RefreshCompositeRewardDataFromConfig(e, t = true, i, s) {
    e = ConfigManager_1.ConfigManager.ItemRewardConfig.GetCompositeRewardViewDisplayConfig(e);
    if (e) {
      t = {
        Type: 2,
        ViewName: "CompositeRewardView",
        AudioId: e.AudioId,
        IsSuccess: t,
        Title: e.Title,
        ContinueText: e.ContinueText,
        TitleIconPath: e.TitleIconPath,
        IsProgressVisible: e.IsProgressVisible,
        ProgressBarTitle: e.ProgressBarTitle,
        ProgressBarAnimationTime: e.ProgressBarAnimationTime,
        IsItemVisible: e.IsItemVisible
      };
      if (!this.q0i) {
        this.NewRewardData();
      }
      this.q0i.SetRewardInfo(t);
      this.q0i.SetItemList(i);
      if (s) {
        this.q0i.SetProgressQueue(s);
      }
      return this.q0i;
    }
  }
  RefreshExploreRewardDataFromConfig(e, t = true, i, s, r, a, o, h, n, l, d, I, p, u, w, C) {
    e = ConfigManager_1.ConfigManager.ItemRewardConfig.GetExploreRewardDisplayConfig(e);
    if (e) {
      t = {
        Type: 3,
        ViewName: "ExploreRewardView",
        AudioId: e.AudioId,
        IsSuccess: t,
        Title: C ?? e.Title,
        TitleHexColor: e.TitleHexColor,
        TitleIconPath: e.TitleIconPath,
        TitleIconHexColor: e.TitleIconHexColor,
        IsRecordVisible: e.IsRecordVisible,
        IsItemVisible: e.IsItemVisible,
        IsExploreProgressVisible: e.IsExploreProgressVisible,
        ExploreBarTipsTextId: e.ExploreBarTipsTextId,
        IsDescription: e.IsDescription,
        Description: e.Description,
        OnCloseCallback: n,
        Tip: l,
        IsShowOnlineChallengePlayer: d,
        IsRewardMultiLine: u
      };
      if (!this.q0i) {
        this.NewRewardData();
      }
      this.q0i.SetRewardInfo(t);
      this.q0i.SetItemList(i);
      if (s) {
        this.q0i.SetExploreRecordInfo(s);
      }
      if (r) {
        this.q0i.SetExploreBarDataList(r);
      }
      if (a) {
        this.q0i.SetButtonInfoList(a);
      }
      if (o) {
        this.q0i.SetTargetReached(o);
      }
      if (h) {
        this.q0i.SetStateToggle(h);
      }
      if (I) {
        this.q0i.SetExploreFriendDataList(I);
      }
      if (p) {
        this.q0i.SetScoreReached(p);
      }
      if (w) {
        this.q0i.SetAccumulatedScoreData(w);
      }
      return this.q0i;
    }
  }
  RefreshExploreRewardDataFromConfigNew(e) {
    var t = ConfigManager_1.ConfigManager.ItemRewardConfig.GetExploreRewardDisplayConfig(e.ConfigId);
    if (t) {
      t = {
        Type: 3,
        ViewName: "ExploreRewardView",
        AudioId: t.AudioId,
        IsSuccess: e.IsSuccess,
        Title: e.TitleTextId ?? t.Title,
        TitleHexColor: t.TitleHexColor,
        TitleIconPath: t.TitleIconPath,
        TitleIconHexColor: t.TitleIconHexColor,
        IsRecordVisible: t.IsRecordVisible,
        IsItemVisible: t.IsItemVisible,
        IsExploreProgressVisible: t.IsExploreProgressVisible,
        ExploreBarTipsTextId: t.ExploreBarTipsTextId,
        IsDescription: t.IsDescription,
        Description: t.Description,
        OnCloseCallback: e.OnCloseCallback,
        Tip: e.Tip,
        IsShowOnlineChallengePlayer: e.IsShowOnlineChallengePlayer,
        IsRewardMultiLine: e.IsRewardMultiLine,
        IsBagFull: e.IsBagFull
      };
      if (!this.q0i) {
        this.NewRewardData();
      }
      this.q0i.SetRewardInfo(t);
      this.q0i.SetItemList(e.RewardItemDataList);
      if (e.ExploreRecordInfo) {
        this.q0i.SetExploreRecordInfo(e.ExploreRecordInfo);
      }
      if (e.ExploreBarDataList) {
        this.q0i.SetExploreBarDataList(e.ExploreBarDataList);
      }
      if (e.ButtonInfoList) {
        this.q0i.SetButtonInfoList(e.ButtonInfoList);
      }
      if (e.TargetReached) {
        this.q0i.SetTargetReached(e.TargetReached);
      }
      if (e.StateToggle) {
        this.q0i.SetStateToggle(e.StateToggle);
      }
      if (e.ExploreFriendDataList) {
        this.q0i.SetExploreFriendDataList(e.ExploreFriendDataList);
      }
      if (e.ScoreReachedData) {
        this.q0i.SetScoreReached(e.ScoreReachedData);
      }
      if (e.AccumulatedScoreData) {
        this.q0i.SetAccumulatedScoreData(e.AccumulatedScoreData);
      }
      if (e.BabelTowerSuccessData) {
        this.q0i.SetBabelTowerSuccessData(e.BabelTowerSuccessData);
      }
      if (e.DangoAbyssSuccessData) {
        this.q0i.SetDangoAbyssSuccessData(e.DangoAbyssSuccessData);
      }
      if (e.HonamiTowerSuccessData) {
        this.q0i.SetHonamiTowerSuccessData(e.HonamiTowerSuccessData);
      }
      return this.q0i;
    }
  }
  SetItemList(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    if (!!e && !(e.length < 1)) {
      this.q0i.SetItemList(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardViewItemList, e);
    }
  }
  AddItemList(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    if (!!e && !(e.length < 1)) {
      this.q0i.AddItemList(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardViewItemList, e);
    }
  }
  SetProgressQueue(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetProgressQueue(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardProgressBar);
  }
  SetExploreBarDataList(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetExploreBarDataList(e);
  }
  SetExploreRecordInfo(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetExploreRecordInfo(e);
  }
  SetExploreFriendDataList(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    this.q0i.SetExploreFriendDataList(e);
  }
  SetButtonList(e) {
    if (!this.q0i) {
      this.NewRewardData();
    }
    if (!!e && !(e.length < 1)) {
      this.q0i.SetButtonInfoList(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshRewardButton);
    }
  }
  NewRewardData() {
    var e;
    return this.q0i || (e = new RewardData_1.RewardData(), this.q0i = e);
  }
  ClearCurrentRewardData() {
    this.q0i = undefined;
  }
  GetCurrentRewardData() {
    return this.q0i;
  }
}
exports.ItemRewardModel = ItemRewardModel;
//# sourceMappingURL=ItemRewardModel.js.map