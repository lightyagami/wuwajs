"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const LogicTreeContainer_1 = require("../GeneralLogicTree/LogicTreeContainer");
const QuestDefine_1 = require("../QuestNew/QuestDefine");
const LevelPlayDefine_1 = require("./LevelPlayDefine");
class LevelPlayInfo extends LogicTreeContainer_1.LogicTreeContainer {
  constructor(t) {
    super();
    this.u1i = 0;
    this.Lpi = false;
    this.Dpi = 0;
    this.ac = 0;
    this.Rpi = false;
    this.TrackRadiusSquared = 0;
    this.CacheDistanceSquared = 0;
    this.c1i = "";
    this.m1i = 0;
    this.d1i = 0;
    this.C1i = 0;
    this.Upi = undefined;
    this.Api = undefined;
    this.RQ1 = 0;
    this.p1i = 0;
    this.Ppi = 0;
    this.v1i = 0;
    this.M1i = undefined;
    this.E1i = undefined;
    this.xpi = undefined;
    this.wpi = undefined;
    this.Bpi = "Local";
    this.bpi = undefined;
    this.Children = undefined;
    this.RangeAbsorbPhantom = undefined;
    this.$Bu = undefined;
    this.u1i = t;
    this.Lpi = false;
    this.Dpi = 0;
    this.ac = 0;
    this.CacheDistanceSquared = -1;
  }
  get Id() {
    return this.u1i;
  }
  get PlayState() {
    return this.ac;
  }
  get IsClose() {
    return this.ac === 0;
  }
  get IsFinish() {
    return this.ac === 3;
  }
  get CanExecOpenAction() {
    return this.ac < 3;
  }
  get CanTrack() {
    if (this.LevelPlayEntityId !== QuestDefine_1.INVALID_ENTITYDATAID && this.ac === 2 && this.Api && this.BehaviorTree) {
      var t = this.BehaviorTree.GetBlackBoard();
      if (!t.NoExpression) {
        if (t.IsCustomUi()) {
          return true;
        }
        t = this.BehaviorTree.GetActiveChildQuestNodesId();
        if (t) {
          for (const s of t) {
            var e = this.BehaviorTree.GetNode(s);
            var i = e?.MultiTrackText;
            if (i && !StringUtils_1.StringUtils.IsBlank(i) && !e.ContainTag(1)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  get IsFirstPass() {
    return this.Lpi;
  }
  get RefreshTime() {
    return this.Dpi;
  }
  get CanGetReward() {
    return this.Rpi;
  }
  get Name() {
    return this.c1i;
  }
  get LevelPlayEntityId() {
    return this.m1i;
  }
  get MapId() {
    return this.d1i;
  }
  get InstanceId() {
    return this.C1i;
  }
  get MarkConfig() {
    return this.Upi;
  }
  get NeedShowInMap() {
    return this.MarkConfig !== undefined;
  }
  get TrackPriority() {
    return this.Api?.TrackPriority ?? LevelPlayDefine_1.INVALID_LEVELPLAY_TRACKPRIORITY;
  }
  get CustomIconId() {
    return this.RQ1;
  }
  get RewardId() {
    return this.p1i;
  }
  get FirstRewardId() {
    return this.Ppi;
  }
  get RewardEntityId() {
    return this.v1i;
  }
  get AfterGetRewardAction() {
    return this.M1i;
  }
  get LevelPlayOpenAction() {
    return this.E1i;
  }
  get LevelPlayFirstPassAction() {
    return this.xpi;
  }
  get LevelPlayEnterAction() {
    return this.wpi;
  }
  get OnlineType() {
    return this.Bpi;
  }
  get IsInteractValid() {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || this.OnlineType !== "Local";
  }
  get LevelPlayType() {
    return this.bpi;
  }
  get LevelPlayTypeNumber() {
    if (this.bpi) {
      return LevelPlayDefine_1.levelPlayTypeToNumber[this.bpi];
    } else {
      return -1;
    }
  }
  get RangeAbsorbPbDataIds() {
    if (this.$Bu === undefined) {
      this.$Bu = new Set();
    }
    return this.$Bu;
  }
  InitConfig() {
    var t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(this.u1i);
    if (t) {
      this.d1i = t.LevelId;
      this.m1i = t.LevelPlayEntityId;
      this.C1i = t.InstanceId ?? 0;
      this.c1i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName);
      this.Upi = t.LevelPlayMark;
      this.Api = t.LevelPlayTrack;
      this.Rpi = true;
      this.E1i = t.LevelPlayOpenActions;
      this.wpi = t.EnterInRangeActions;
      this.Bpi = t.OnlineType;
      this.bpi = t.Type;
      this.RQ1 = t.CustomIcon ?? 0;
      this.RangeAbsorbPhantom = t.RangeAbsorbPhantom;
      this.Children = t.Children;
      switch (t.LevelPlayRewardConfig.Type) {
        case "Interact":
          this.p1i = t.LevelPlayRewardConfig.RewardId;
          this.Ppi = t.LevelPlayRewardConfig.FirstRewardId ?? 0;
          this.v1i = t.LevelPlayRewardConfig.RewardEntityId;
          this.M1i = t.LevelPlayRewardConfig.RewardCompleteActions;
          this.xpi = t.LevelPlayRewardConfig.FirstCompleteActions;
          break;
        case "Automatic":
          this.p1i = t.LevelPlayRewardConfig.RewardId;
          this.Ppi = t.LevelPlayRewardConfig.FirstRewardId ?? 0;
      }
      if (this.Api) {
        this.ChangeLevelPlayTrackRange(this.Api.TrackRadius);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 18, "创建玩法时找不到玩法配置", ["玩法id", this.u1i]);
    }
  }
  UpdateFirstPass(t) {
    this.Lpi = t ?? false;
  }
  UpdateState(t) {
    this.ac = t ?? 0;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelPlayStateChange, this.u1i, this.ac);
  }
  UpdateRefreshTime(t) {
    this.Dpi = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  UpdateCanGetReward(t) {
    this.Rpi = t;
  }
  UpdateDistanceSquared(t) {
    var e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(this.LevelPlayEntityId);
    if (e) {
      this.CacheDistanceSquared = this.qpi(e, t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 18, "配置的玩法追踪坐标为空", ["玩法id", this.u1i]);
    }
  }
  IsInTrackRange() {
    return !(this.CacheDistanceSquared < 0) && this.CacheDistanceSquared < this.TrackRadiusSquared;
  }
  qpi(t, e) {
    return Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2);
  }
  GetUiPriority() {
    if (this.Api) {
      return this.Api.TrackPriority;
    } else {
      return super.GetUiPriority();
    }
  }
  ChangeLevelPlayTrackRange(t) {
    t = t ?? this.Api.TrackRadius;
    this.TrackRadiusSquared = t * t;
  }
}
exports.LevelPlayInfo = LevelPlayInfo;
//# sourceMappingURL=LevelPlay.js.map