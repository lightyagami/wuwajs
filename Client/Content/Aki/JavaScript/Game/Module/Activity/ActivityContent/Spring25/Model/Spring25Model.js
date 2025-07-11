"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25Model = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const SettleRewardByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/SettleRewardByActivityId");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const Spring25Define_1 = require("../Spring25Define");
const Spring25ConfigContext_1 = require("./Spring25ConfigContext");
const Spring25ProtocolContext_1 = require("./Spring25ProtocolContext");
const Spring25UiContext_1 = require("./Spring25UiContext");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
class Spring25Model extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.UVa = undefined;
    this.xVa = undefined;
    this.PVa = undefined;
  }
  OnInit() {
    this.UVa = new Spring25ConfigContext_1.Spring25ConfigContext(this);
    this.xVa = new Spring25ProtocolContext_1.Spring25ProtocolContext(this);
    this.PVa = new Spring25UiContext_1.Spring25UiContext(this);
    return true;
  }
  OnClear() {
    this.UVa.Dispose();
    this.xVa.Dispose();
    this.PVa.Dispose();
    return true;
  }
  get ActivityData() {
    return this.xVa;
  }
  get CurrentActivityId() {
    return this.xVa.Id;
  }
  get IsLetterListViewAvailable() {
    return this.xVa.InvitedCount > 0;
  }
  get IsInviteAvailableExternal() {
    return this.xVa.IsInviteAvailable;
  }
  get IsAllInvited() {
    return this.UVa.SignCount === this.xVa.InvitedCount;
  }
  get HelpId() {
    return this.xVa.GetHelpId();
  }
  get IsSkinRewarded() {
    return this.xVa.IsSkinRewarded;
  }
  get NeedOpenEnvelopeView() {
    return this.PVa.CurrentSignId !== undefined;
  }
  get HasNewLetter() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick);
    if (t !== undefined) {
      for (var [, e] of t) {
        if (!e) {
          return true;
        }
      }
    }
    return false;
  }
  get HasAnyRewardExternal() {
    return this.xVa.HasAnyReward;
  }
  get HasRedDot() {
    return this.HasAnyRewardExternal || this.IsInviteAvailableExternal;
  }
  get BottomStateInInfoView() {
    if (this.IsSkinRewarded) {
      return 3;
    } else if (this.UVa.TaskCount === this.xVa.FinishTaskCount) {
      if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstTimeTaskAllDone) === undefined) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }
  get SharePhotoPath() {
    var t = SettleRewardByActivityId_1.configSettleRewardByActivityId.GetConfig(this.CurrentActivityId);
    return (ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1 ? t?.MalePhotoPath : t?.FemalePhotoPath) ?? "";
  }
  get NeedStartDialog() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstEnter, true) && this.xVa.InvitedCount === 0;
  }
  IsLetterNewBySignId(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick);
    return e !== undefined && (e = e.get(t)) !== undefined && !e;
  }
  SetLetterClickedBySignId(t, e) {
    let i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick);
    (i = i === undefined ? new Map() : i).set(t, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstLetterClick, i);
  }
  SyncSpringSignDrawRoleResponse(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Spring25", 64, "同步邀请角色数据", ["response", t]);
    }
    var e;
    var i;
    var t = t.WL_;
    this.PVa.CurrentSignId = t;
    var r = this.xVa;
    var a = this.UVa;
    r.InvitedRoleSet.add(t);
    r.CanInvite = false;
    for ([e, i] of r.TaskCache) {
      var o = a.GetTaskThresholdByTaskId(e);
      if (i.H6n === Proto_ActivityTaskState.Proto_ActivityTaskRunning && r.InvitedCount >= o) {
        i.H6n = Proto_ActivityTaskState.Proto_ActivityTaskFinish;
      }
    }
    this.SetLetterClickedBySignId(t, false);
  }
  SyncSpringSignDrawRewardResponse(t) {
    this.xVa.SyncTaskStateByTaskId(t);
  }
  SyncSpringSignSkinRewardResponse() {
    this.xVa.SyncSkinReward();
  }
  ResetCurrentSignId() {
    this.PVa.CurrentSignId = undefined;
  }
  TrySetCurrentLetterSignId(t) {
    if (t !== this.PVa.CurrentLetterSignId) {
      this.PVa.CurrentLetterSignId = t;
    }
  }
  InitLetterSignIdForLetterListView() {
    let t = undefined;
    for (const e of this.xVa.InvitedRoleSet) {
      if (t === undefined || t > e) {
        t = e;
      }
    }
    this.PVa.CurrentLetterSignId = t;
  }
  BuildActivitySubViewData() {
    return {
      ProgressTextId: Spring25Define_1.PROGRESS_TEXT_ID_IN_SUBVIEW,
      RewardTextId: Spring25Define_1.REWARD_TITLE_TEXT_ID_IN_SUBVIEW,
      ButtonTextId: Spring25Define_1.BUTTON_TEXT_ID_IN_SUBVIEW,
      Current: this.xVa.InvitedCount.toString(),
      TotalTextId: Spring25Define_1.FUNCTION_AND_NUMBER_TEXT_ID,
      TotalTextArg: this.UVa.TaskCount.toString(),
      IsMale: ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1,
      NeedStartDialog: this.NeedStartDialog
    };
  }
  BuildMainViewData(t = false) {
    var e;
    var i = new Map();
    var r = this.UVa;
    var a = this.xVa;
    var o = this.PVa;
    let n = undefined;
    for ([e] of r.SignCfgMap) {
      var s = r.GetResourceTypeBySignId(e);
      if (s !== undefined) {
        i.set(s, a.IsRoleInvitedById(e));
        if (o.CurrentSignId === e && !t) {
          n = s;
        }
      }
    }
    return {
      TitleTextId: a.LocalConfig?.Title ?? "",
      InviteRemainCount: a.SignCountRemain.toString(),
      CharacterInvitedMap: i,
      NewRoleType: n
    };
  }
  BuildDialogueViewData() {
    var t;
    var e = this.PVa.CurrentSignId;
    if (e !== undefined) {
      t = this.I3l(e);
      e = this.Z2l(e);
      return {
        IsOpening: false,
        LeftSpineData: t[0],
        RightSpineData: t[1],
        ChatDataList: e
      };
    }
  }
  BuildStartDialogueViewData() {
    var t = this.T3l();
    var e = this.L3l();
    return {
      IsOpening: true,
      LeftSpineData: t[0],
      RightSpineData: t[1],
      ChatDataList: e
    };
  }
  BuildInfoViewData() {
    var t = this.xVa.InvitedCount;
    var e = this.UVa.TaskCount;
    return {
      TitleTextId: this.xVa.LocalConfig?.Title ?? "",
      CurrentNum: t.toString(),
      TotalNumTextId: Spring25Define_1.FUNCTION_AND_NUMBER_TEXT_ID,
      TotalNumTextArg: e.toString(),
      BottomState: this.BottomStateInInfoView,
      ContentList: this.VGl(),
      ProgressList: this.HGl()
    };
  }
  BuildLetterListViewData() {
    let t = undefined;
    let e = undefined;
    var i = this.PVa.CurrentLetterSignId;
    if (i !== undefined) {
      t = this.UVa.GetLetterContentTextIdBySignId(i);
      e = this.UVa.GetLetterTitleTextIdBySignId(i);
    }
    var i = {
      TabDataList: this.jGl(),
      InfoTextId: t,
      TitleTextId: e
    };
    return i;
  }
  BuildEnvelopeViewData() {
    var t = this.PVa.CurrentSignId;
    return {
      TitleTextId: t === undefined ? undefined : this.UVa.GetLetterTitleTextIdBySignId(t),
      InfoTextId: t === undefined ? undefined : this.UVa.GetLetterContentTextIdBySignId(t)
    };
  }
  VGl() {
    var t;
    var e = [];
    var i = this.UVa;
    var r = this.xVa;
    for ([, t] of i.TaskCfgMap) {
      var a = t.Id;
      var o = r.GetTaskStateByTaskId(a);
      var a = {
        TaskId: a,
        State: o,
        ItemList: r.GetTaskRewardPreviewByTaskId(a),
        NameTextId: i.GetTaskNameTextIdByTaskId(a) ?? "",
        SubtitleTextId: "Text_ItemRecycleChosen_text",
        SubtitleTextArgs: [o < Proto_ActivityTaskState.Proto_ActivityTaskFinish ? "0" : "1", "1"],
        IsDone: o === Proto_ActivityTaskState.Proto_ActivityTaskTaken,
        CanReward: o === Proto_ActivityTaskState.Proto_ActivityTaskFinish,
        RightTextId: o === Proto_ActivityTaskState.Proto_ActivityTaskRunning ? "Text_NotFinished_Text" : undefined
      };
      e.push(a);
    }
    e.sort((t, e) => t.State === e.State ? t.TaskId - e.TaskId : t.State === Proto_ActivityTaskState.Proto_ActivityTaskFinish || e.State !== Proto_ActivityTaskState.Proto_ActivityTaskFinish && t.State === Proto_ActivityTaskState.Proto_ActivityTaskRunning ? -1 : 1);
    return e;
  }
  HGl() {
    var t;
    var e = [];
    let i = -1;
    for (let t = 0; t < this.UVa.TaskCount; t++) {
      var r = t < this.xVa.InvitedCount;
      if (r) {
        i = t;
      }
      var r = {
        IsLight: r,
        IsBlink: false
      };
      e.push(r);
    }
    if (i !== -1 && LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.Spring25FirstDoneTaskIndex, -1) < i) {
      (t = e[i]).IsBlink = true;
      e[i] = t;
    }
    return e;
  }
  jGl() {
    var t = this.UVa;
    var e = this.PVa;
    var i = [];
    for (const o of this.xVa.InvitedRoleSet) {
      i.push(o);
    }
    i.sort((t, e) => t - e);
    var r = [];
    for (const n of i) {
      var a = {
        SignId: n,
        IsChosen: n === e.CurrentLetterSignId,
        IsNew: this.IsLetterNewBySignId(n),
        TexturePath: t.GetLetterIconBySignId(n),
        DescriptionTextId: t.GetLetterTabTextIdBySignId(n)
      };
      r.push(a);
    }
    return r;
  }
  A3l(t) {
    var e = [];
    if (t !== undefined) {
      var i = t.ContentList;
      var r = t.PosList;
      var a = t.AnimNameList;
      for (let t = 0; t < i.length; t++) {
        var o = {
          ContentTextId: i[t],
          Position: r[t],
          SpineAnimName: a[t]
        };
        e.push(o);
      }
    }
    return e;
  }
  x3l(t) {
    return [{
      AtlasPath: t?.LeftSpineAtlas,
      SkeletonDataPath: t?.LeftSpineSkeletonData
    }, {
      AtlasPath: t?.RightSpineAtlas,
      SkeletonDataPath: t?.RightSpineSkeletonData
    }];
  }
  Z2l(t) {
    t = this.UVa.GetChatConfigBySignId(t, ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1);
    return this.A3l(t);
  }
  L3l() {
    var t = this.UVa.StartChatCfgByGender(ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1);
    return this.A3l(t);
  }
  I3l(t) {
    t = this.UVa.GetChatConfigBySignId(t, ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1);
    return this.x3l(t);
  }
  T3l() {
    var t = this.UVa.StartChatCfgByGender(ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ?? 1);
    return this.x3l(t);
  }
}
exports.Spring25Model = Spring25Model;
//# sourceMappingURL=Spring25Model.js.map