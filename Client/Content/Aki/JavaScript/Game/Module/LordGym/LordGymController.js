"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymController = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const LordGymDefine_1 = require("./LordGymDefine");
const TIME_TO_REVIVE = 3000;
class LordGymController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnRegisterNetEvent();
    this.OnAddEvents();
    return true;
  }
  static OnClear() {
    this.OnUnRegisterNetEvent();
    this.OnRemoveEvents();
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25080, this.PSi);
    Net_1.Net.Register(16399, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25080);
    Net_1.Net.UnRegister(16399);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.$5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.$5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static async LordGymInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Ass.create({});
    var e = await Net_1.Net.CallAsync(22969, e);
    if (e.jxs?.length > 0) {
      ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.jxs;
      ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort((e, r) => e - r);
    }
    if (e.Wxs?.length) {
      ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.Wxs;
    }
    if (e.Kxs?.length > 0) {
      for (const r of e.Kxs) {
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.y7n, r);
      }
    }
    ModelManager_1.ModelManager.LordGymModel.PhraseEntranceInfo(e.rsd);
  }
  static async LordGymBeginRequest(e) {
    var r = Protocol_1.Aki.Protocol.wss.create();
    r.y7n = e;
    var r = await Net_1.Net.CallAsync(20019, r);
    return !!r && (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 20019), false) : (ModelManager_1.ModelManager.LordGymModel.CurrentChallengeLordGymId = e, ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) || LordGymController.ReadLordGym(e), true));
  }
  static async OpenLordGymEntrance(e, r = 0) {
    await this.LordGymInfoRequest();
    ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r;
    return (await UiManager_1.UiManager.OpenViewAsync("LordGymEntranceView", e)) !== undefined;
  }
  static async OpenLordGymLordEntranceSelectView(e, r = 0, o = false) {
    ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r;
    r = {
      EntranceSetId: ModelManager_1.ModelManager.LordGymModel.EntranceSetId = e,
      IsPlaySpecialSequence: o
    };
    return (await UiManager_1.UiManager.OpenViewAsync("LordGymLordEntranceSelectView", r)) !== undefined;
  }
  static OpenGymUnlockTipView(e) {
    UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e);
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = [];
  }
  static async ReadLordGym(e) {
    ModelManager_1.ModelManager.LordGymModel.ReadLordGym(e);
    var r = Protocol_1.Aki.Protocol.bss.create();
    r.y7n = e;
    await Net_1.Net.CallAsync(18645, r);
  }
  static async EnterLordGymDungeon() {
    var e;
    var r = ModelManager_1.ModelManager.LordGymModel.EntryChallengeId;
    return !!r && ((e = await LordGymController.LordGymBeginRequest(r)) && (ModelManager_1.ModelManager.LordGymModel.LastChallengeLordEntranceId = r), e);
  }
  static IsInEntranceEntity() {
    var e = ModelManager_1.ModelManager.LordGymModel.EntranceEntityId;
    return !e || !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))?.IsInit || (e.Entity?.GetComponent(128)?.IsInInteractRange ?? false);
  }
  static CreateLordModelByEntranceId() {
    var e = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle();
    UiModelUtil_1.UiModelUtil.SetTransformByTag(e.Model, "MonsterCase");
  }
  static async LoadLordModelByEntranceId(i, l = true, d = false) {
    if (UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle()) {
      const s = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(i);
      var e = s.MeshId;
      const _ = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle().Model;
      var r = _.CheckGetComponent(0).ModelConfigId;
      if (r !== e) {
        const c = _.CheckGetComponent(10);
        const m = _.CheckGetComponent(2);
        const M = _.CheckGetComponent(1);
        const C = s.StandAnim;
        var r = s.LordChangeMaterialController;
        var o = s.LordChangeMaterialController;
        var t = [C];
        if (!StringUtils_1.StringUtils.IsBlank(r)) {
          t.push(r);
        }
        if (!StringUtils_1.StringUtils.IsBlank(o)) {
          t.push(o);
        }
        const g = new CustomPromise_1.CustomPromise();
        m?.LoadModelByModelId(e, true, () => {
          g.SetResult();
          var e = ModelManager_1.ModelManager.LordGymModel;
          let r = e.CacheLocation;
          let o = e.CacheRotator;
          let t = e.CacheScale;
          let n = e.CacheTransform;
          var a = s.Location;
          if (r) {
            r.Set(a[0], a[1], a[2]);
          } else {
            r = new UE.Vector(a[0], a[1], a[2]);
            e.CacheLocation = r;
          }
          var a = s.Rotator;
          if (o) {
            o.Pitch = a[0];
            o.Yaw = a[1];
            o.Roll = a[2];
          } else {
            o = new UE.Rotator(a[0], a[1], a[2]);
            e.CacheRotator = o;
          }
          var a = s.Zoom;
          if (t) {
            t.Set(a[0], a[1], a[2]);
          } else {
            t = new UE.Vector(a[0], a[1], a[2]);
            e.CacheScale = t;
          }
          if (n) {
            n.SetLocation(r);
            n.SetRotation(o.Quaternion());
            n.SetScale3D(t);
          } else {
            n = new UE.Transform(o, r, t);
            e.CacheTransform = n;
          }
          M.SetAllMeshComponentRelativeTransform(n, false, undefined, false);
          var a = m?.GetLoadedResource(C);
          if (!a) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiCommon", 43, "[LordGym] 道馆界面待机动画预加载失败");
            }
          }
          c.PlayAnimation(a, true);
          if (l) {
            this.PlayLordModelMaterialAnimationByEntranceId(i, _, m, d);
          }
        }, t);
        await g.Promise;
      }
    }
  }
  static PlayLordModelMaterialAnimationByEntranceId(e, r, o, t = true) {
    var n;
    var a;
    if (UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle()) {
      if (t) {
        AudioSystem_1.AudioSystem.PostEvent(LordGymDefine_1.LORD_GYM_THIRD_AUDIO_BOSS);
      }
      e = (t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(e)).LordChangeMaterialController;
      n = t.LordChangeMaterialController;
      a = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle();
      r = r ?? a.Model;
      a = o ?? r.CheckGetComponent(2);
      o = r.CheckGetComponent(5);
      if (!StringUtils_1.StringUtils.IsBlank(e)) {
        if (r = a.GetLoadedResource(e)) {
          if (t.IsGroup) {
            o?.AddRenderingMaterialGroup(r);
          } else {
            o?.AddRenderingMaterialByData(r);
          }
        }
      }
      if (!StringUtils_1.StringUtils.IsBlank(n)) {
        if (e = a.GetLoadedResource(n)) {
          if (t.IsGroup) {
            o?.AddRenderingMaterialGroup(e);
          } else {
            o?.AddRenderingMaterialByData(e);
          }
        }
      }
    }
  }
  static IsInLordGymDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon;
    return !!e && e.InstSubType === 48;
  }
}
exports.LordGymController = LordGymController;
(_a = LordGymController).$5e = () => {
  ModelManager_1.ModelManager.LordGymModel?.InitNewLordGymEntranceIdRecord();
  _a.LordGymInfoRequest();
};
LordGymController.FWe = () => {
  if (_a.IsInLordGymDungeon()) {
    _a.EnterLordGymDungeon();
  }
};
LordGymController.PSi = e => {
  ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.jxs;
};
LordGymController.xSi = r => {
  var o = ModelManager_1.ModelManager.LordGymModel;
  var e = o.IsDeadInChallenge;
  o.IsDeadInChallenge = false;
  var t = r.Jxs.y7n;
  o.LordGymRecord.set(t, r.Jxs);
  if (r.Mws) {
    var n = [];
    for (const d of r.zxs) {
      var a = new RewardItemData_1.RewardItemData(d.L8n, d.m9n, d.Xxs !== 0 ? d.Xxs : undefined);
      n.push(a);
    }
    let e = undefined;
    o = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(t);
    const i = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(t);
    e = o.Version === 2 ? (t = {
      ButtonTextId: "Text_GymReturnToWorld_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true
    }, i && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i) ? [t, {
      ButtonTextId: "Text_GymContinueChallenge_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        LordGymController.LordGymBeginRequest(i);
      }
    }] : [t, {
      ButtonTextId: "Text_GymReturnToLordGym_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        var e = ModelManager_1.ModelManager.LordGymModel.EntranceSetId;
        if (e > 0) {
          e = {
            EntranceSetId: e,
            IsPlaySpecialSequence: false
          };
          UiManager_1.UiManager.OpenView("LordGymLordEntranceSelectView", e);
        }
      }
    }]) : o.Version === 3 ? (t = {
      ButtonTextId: "ChanllengeBackToCockpit",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(LordGymDefine_1.THRID_ENTRANCE_ID);
      }
    }, i && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i) ? [t, {
      ButtonTextId: "Text_GymContinueChallenge_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        ModelManager_1.ModelManager.LordGymModel.EntryChallengeId = i;
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }
    }] : [t, {
      ButtonTextId: "Text_GymReturnToWorld_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    }]) : [{
      ButtonTextId: "ConfirmBox_45_ButtonText_1",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true
    }];
    o = {
      TitleTextId: "LordGym_TimeTitle",
      Record: TimeUtil_1.TimeUtil.GetTimeString(r.Qxs),
      IsNewRecord: r.Yxs
    };
    const l = i && !ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(i) && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i);
    t = {
      ConfigId: ItemRewardDefine_1.LORD_GYM_RESULT,
      IsSuccess: true,
      RewardItemDataList: n,
      ExploreRecordInfo: o,
      ButtonInfoList: e,
      OnCloseCallback: () => {
        if (l) {
          UiManager_1.UiManager.OpenView("LordGymUnlockTipView", i);
        }
      },
      IsBagFull: r.vlc
    };
    ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(t);
  } else {
    o = r.E7_;
    t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
    if (t.Version !== 2 || e) {
      if (t.Version === 3) {
        const s = {
          LordId: o,
          Version: t.Version
        };
        r = () => {
          if (!UiManager_1.UiManager.IsViewOpen("LordGymThirdBossSelectView") && !UiManager_1.UiManager.IsViewOpen("LordGymThirdDifficultySelectView") && !!_a.IsInLordGymDungeon()) {
            UiManager_1.UiManager.OpenView("LordGymChallengeFailView", s);
          }
        };
        if (e) {
          TimerSystem_1.FlowTimeTimerSystem.Delay(r, TIME_TO_REVIVE);
        } else {
          r();
        }
      }
    } else {
      e = {
        LordId: o,
        Version: t.Version
      };
      UiManager_1.UiManager.OpenView("LordGymChallengeFailView", e);
    }
  }
}; //# sourceMappingURL=LordGymController.js.map