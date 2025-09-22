"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monsterSortFunc = exports.silentAreasSortFunc = exports.AdventureGuideController = exports.REMAINFLUSHTIME = exports.RECEIVED_COUNT = exports.LOWLEVELTEXTID = exports.MIDLEVELTEXTID = exports.HIGHLEVELTEXTID = exports.DETECT = exports.UNDISCOVERED = exports.DOING = exports.LVLUNKNOWNTEXT = exports.UNKNOWNTEXT = exports.LEVELTEXT = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const InventoryGiftController_1 = require("../Inventory/InventoryGiftController");
const MapController_1 = require("../Map/Controller/MapController");
const MapDefine_1 = require("../Map/MapDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
const GuideView_1 = require("./Views/GuideView");
exports.LEVELTEXT = "LevelText";
exports.UNKNOWNTEXT = "Unknown";
exports.LVLUNKNOWNTEXT = "LvlUnknown";
const MAX_INT32_NUMBER = 2147483647;
const MAX_INT64_NUMBER = MathUtils_1.MathUtils.BigIntToLong(0x7fffffffffffffffn);
const DUNGEON_LOCKED = "DungeonLocked";
exports.DOING = "Doing";
exports.UNDISCOVERED = "UnDiscovered";
exports.DETECT = "Detect";
exports.HIGHLEVELTEXTID = 3;
exports.MIDLEVELTEXTID = 2;
exports.LOWLEVELTEXTID = 1;
exports.RECEIVED_COUNT = "ReceivedCount";
exports.REMAINFLUSHTIME = "FlushTimeRemain";
class AdventureGuideController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("AdventureGuideView", AdventureGuideController.OpenGuideView);
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveMapMark, this.X5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMapMark, this.OnTrackMapMark);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveMapMark, this.X5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMapMark, this.OnTrackMapMark);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static EmitRedDotFirstAwardEvent(e) {
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(e);
    if (r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotSilentFirstAwardCategory, r.Conf.Secondary);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotSilentFirstAwardResult, e);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16278, this.Y5e);
    Net_1.Net.Register(15087, this.J5e);
    Net_1.Net.Register(24492, this.z5e);
    Net_1.Net.Register(22158, this.Z5e);
    Net_1.Net.Register(24164, this.eVe);
    Net_1.Net.Register(27204, this.tVe);
    Net_1.Net.Register(17389, this.Wkl);
    Net_1.Net.Register(22271, this.wc1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16278);
    Net_1.Net.UnRegister(15087);
    Net_1.Net.UnRegister(24492);
    Net_1.Net.UnRegister(22158);
    Net_1.Net.UnRegister(24164);
    Net_1.Net.UnRegister(27204);
    Net_1.Net.UnRegister(17389);
    Net_1.Net.UnRegister(22271);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("AdventureGuideView", AdventureGuideController.iVe, "AdventureGuideController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("AdventureGuideView", AdventureGuideController.iVe);
  }
  static OpenGuideViewWithOpenData(e, r = undefined) {
    if (UiManager_1.UiManager.IsViewShow("AdventureGuideView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchAdventureGuideViewTab, e);
    } else {
      UiManager_1.UiManager.OpenView("AdventureGuideView", e, r);
    }
  }
  static UpdateAdventureNewSoundAreaTabRedDot() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate);
  }
  static UpdateAdventureNewChallengeTabRedDot() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureChallengeTabUpdate);
  }
  static async RequestForAdventureManual() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var e = Protocol_1.Aki.Protocol.J$n.create({
      W5n: e
    });
    var e = await Net_1.Net.CallAsync(23671, e);
    AdventureGuideController.oVe(e);
  }
  static rVe(e, r) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, r);
  }
  static RequestForAdventureManualData(e) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var r = Protocol_1.Aki.Protocol.V$n.create({
      W5n: r
    });
    Net_1.Net.Call(15532, r, AdventureGuideController.nVe);
  }
  static async RequestMultiForAdventureReward(e) {
    e = Protocol_1.Aki.Protocol.f8u.create({
      s5n: e
    });
    e = await Net_1.Net.CallAsync(20587, e);
    AdventureGuideController.U8u(e);
  }
  static async GetDetectionLabelInfoRequest() {
    var e = Protocol_1.Aki.Protocol.DXn.create({});
    var e = await Net_1.Net.CallAsync(15022, e);
    AdventureGuideController.aVe(e);
  }
  static RequestForDetection(e, r, t) {
    if (!this.HardCode(e, t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AdventureGuide", 5, "发送探测请求到后端 DetectionRequest", ["type", Protocol_1.Aki.Protocol.r8n[e]], ["confId", t]);
      }
      e = Protocol_1.Aki.Protocol.Q$n.create({
        r8n: e,
        o8n: r,
        n8n: t
      });
      Net_1.Net.Call(17453, e, AdventureGuideController.hVe);
    }
  }
  static HardCode(e, r) {
    AdventureGuideController.StopTrackCurDetectingDungeon();
    AdventureGuideController.StopTrackCurDetectingMonster();
    AdventureGuideController.StopTrackCurDetectingSilentArea();
    return false;
  }
  static lVe() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) {
        return e.ActorLocationProxy;
      }
    }
  }
  static StopTrackCurDetectingMonster() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId();
    if (e) {
      this.rVe(7, e);
    }
    if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
    }
  }
  static _Ve(n, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AdventureGuide", 5, "找到下一个距离最近的怪物", ["探测Id", n]);
    }
    if (n !== ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "pending列表与探测目标不一致");
      }
    } else {
      let e = MAX_INT32_NUMBER;
      let r = MAX_INT64_NUMBER;
      let t = undefined;
      let o = undefined;
      var i;
      var l = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList();
      var d = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      for (const u of l.values()) {
        var _ = MathUtils_1.MathUtils.LongToBigInt(u.RefreshTime);
        if (Number(_) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 && d === u.MapId && (_ = {
          X: u.PositionX,
          Y: u.PositionY,
          Z: u.PositionZ
        }, _ = Vector_1.Vector.Create(_), (_ = Vector_1.Vector.Dist(a, _)) < e)) {
          e = _;
          t = u.Id;
        }
        if (MathUtils_1.MathUtils.LongToBigInt(u.RefreshTime) < MathUtils_1.MathUtils.LongToBigInt(r)) {
          r = u.RefreshTime;
        }
      }
      if (t) {
        o = d;
      } else {
        for (const s of l.values()) {
          var M = MathUtils_1.MathUtils.LongToBigInt(s.RefreshTime);
          if (Number(M) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 && d !== s.MapId) {
            M = {
              X: s.PositionX,
              Y: s.PositionY,
              Z: s.PositionZ
            };
            M = Vector_1.Vector.Create(M);
            M = Vector_1.Vector.Dist(a, M);
            e = M;
            t = s.Id;
            o = s.MapId;
            if (MathUtils_1.MathUtils.LongToBigInt(s.RefreshTime) < MathUtils_1.MathUtils.LongToBigInt(r)) {
              r = s.RefreshTime;
            }
            break;
          }
        }
      }
      if (t !== undefined) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AdventureGuide", 5, "找到距离最近的怪物发起探测", ["探测Id", n], ["实体id", t], ["地图id", o], ["refreshtime", r]);
        }
        l = {
          o8n: n,
          h5n: Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster,
          s5n: t,
          w7n: o ?? 0
        };
        (i = Protocol_1.Aki.Protocol.SXn.create()).s8n = l;
        Net_1.Net.Call(15246, i, AdventureGuideController.uVe);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AdventureGuide", 5, "没有找到距离最近怪物，结束探测", ["探测Id", n]);
        }
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotFindTarget");
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(n, r);
        this.StopTrackCurDetectingMonster();
        this.CancelDetectingRequest();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AdventureGuide", 9, "剩余刷新时间", ["MathUtils.LongToBigInt(minRefreshTime)", MathUtils_1.MathUtils.LongToBigInt(r)]);
        }
      }
    }
  }
  static CancelDetectingRequest() {
    var e = Protocol_1.Aki.Protocol.SXn.create();
    e.a8n = true;
    Net_1.Net.Call(15246, e, () => {});
  }
  static NormalMonsterManualInfoRequest(e) {
    e = Protocol_1.Aki.Protocol.LXn.create({
      o8n: e
    });
    Net_1.Net.Call(25701, e, AdventureGuideController.cVe);
  }
  static StopTrackCurDetectingDungeon() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId();
    if (this.mVe(6, e)) {
      this.rVe(6, e);
    }
    if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
    }
  }
  static dVe(o, n) {
    if (o !== ModelManager_1.ModelManager.AdventureGuideModel.GetPendingDungeonConfId()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "探测目标与Pending列表不一致");
      }
    } else {
      let e = MAX_INT32_NUMBER;
      let r = undefined;
      let t = undefined;
      var a;
      for (const l of ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().values()) {
        var i = {
          X: l.PositionX,
          Y: l.PositionY,
          Z: l.PositionZ
        };
        var i = Vector_1.Vector.Create(i);
        var i = Vector_1.Vector.Dist(n, i);
        if (i < e) {
          r = l.Id;
          t = l.MapId;
          e = i;
        }
      }
      if (r !== undefined) {
        o = {
          o8n: o,
          h5n: Protocol_1.Aki.Protocol.r8n.sxu,
          s5n: r,
          w7n: t ?? 0
        };
        (a = Protocol_1.Aki.Protocol.SXn.create()).s8n = o;
        Net_1.Net.Call(15246, a, AdventureGuideController.uVe);
      } else {
        o = ConfigManager_1.ConfigManager.TextConfig.GetTextById(DUNGEON_LOCKED);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(o);
        this.StopTrackCurDetectingDungeon();
        this.CancelDetectingRequest();
      }
    }
  }
  static StopTrackCurDetectingSilentArea() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId();
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSlientAreaMarkType();
    if (this.mVe(r, e)) {
      this.rVe(r, e);
    }
    if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
    }
  }
  static RequestSilentFirstAward(o, n) {
    var e = Protocol_1.Aki.Protocol.Z$n.create();
    e.s5n = o;
    Net_1.Net.Call(24975, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26430);
      } else {
        var r = [];
        for (const t of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(n).entries()) {
          r.push([{
            IncId: 0,
            ItemId: t[0]
          }, t[1]]);
        }
        InventoryGiftController_1.InventoryGiftController.ShowRewardViewWithList(r);
        ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(o, true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotSilentFirstAward);
        AdventureGuideController.EmitRedDotFirstAwardEvent(o);
      }
    });
  }
  static CVe(n, a) {
    if (n !== ModelManager_1.ModelManager.AdventureGuideModel.GetPendingSilentAreaConfId()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "探测目标与Pending列表不一致");
      }
    } else {
      let e = undefined;
      let r = MAX_INT32_NUMBER;
      let t = true;
      let o = undefined;
      var i;
      var l;
      for (const _ of ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().values()) {
        var d = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(_.Id);
        t = t && (!d || d?.IsClose);
        var d = MathUtils_1.MathUtils.LongToBigInt(_.RefreshTime);
        if (Number(d) <= TimeUtil_1.TimeUtil.GetServerTime() && (d = Vector_1.Vector.Create(_.PositionX, _.PositionY, _.PositionZ), (d = Vector_1.Vector.Dist(a, d)) < r)) {
          e = _.Id;
          o = _.MapId;
          r = d;
        }
      }
      if (e !== undefined) {
        i = {
          o8n: n,
          h5n: Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
          s5n: e,
          w7n: o ?? 0
        };
        (l = Protocol_1.Aki.Protocol.SXn.create()).s8n = i;
        Net_1.Net.Call(15246, l, AdventureGuideController.uVe);
      } else if (!t) {
        if (ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(n)?.Secondary === 63) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("NightMareCountDown");
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SilentCountDown");
        }
        this.StopTrackCurDetectingSilentArea();
        this.CancelDetectingRequest();
      }
    }
  }
  static RequestForChapterReward(e) {
    e = Protocol_1.Aki.Protocol.W$n.create({
      h8n: e
    });
    Net_1.Net.Call(18766, e, AdventureGuideController.gVe);
  }
  static fVe(e) {
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    if (r !== e[0].o8n) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "Monster 更新的追踪目标与现有目标不一致", ["现有追踪目标：", r], ["更新追踪目标：", e[0].o8n]);
      }
    } else {
      ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(e, r);
      if (ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().size === 0) {
        ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId()).RefreshTime = MAX_INT32_NUMBER;
        AdventureGuideController.StopTrackCurDetectingMonster();
        AdventureGuideController.CancelDetectingRequest();
      } else if (e[0].s5n === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId()) {
        AdventureGuideController._Ve(r, AdventureGuideController.lVe());
      }
    }
  }
  static pVe(e) {
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId();
    if (r !== e[0].o8n) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "Dungeon 更新的追踪目标与现有目标不一致", ["现有追踪目标：", r], ["更新追踪目标：", e[0].o8n]);
      }
    } else {
      ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(e, r);
      if (ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().size === 0) {
        AdventureGuideController.StopTrackCurDetectingDungeon();
        AdventureGuideController.CancelDetectingRequest();
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AdventureGuide", 9, "Pending列表为空，等待刷新");
        }
      } else if (e[0].s5n === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonId()) {
        AdventureGuideController.dVe(r, AdventureGuideController.lVe());
      }
    }
  }
  static vVe(e) {
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId();
    if (r !== e[0].o8n) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AdventureGuide", 9, "SilentArea 更新的追踪目标与现有目标不一致", ["现有追踪目标：", r], ["更新追踪目标：", e[0].o8n]);
      }
    } else {
      ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(e, r);
      AdventureGuideController.StopTrackCurDetectingSilentArea();
      AdventureGuideController.CancelDetectingRequest();
    }
  }
  static GetValidMonsterEntityIdsOfDetectConf(e) {
    const r = ModelManager_1.ModelManager.AdventureGuideModel.GetAllCulledMonsters();
    return e.BlueprintTypeList.flatMap(e => ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(e)).filter(e => !r.has(e));
  }
  static mVe(e, r, t = false) {
    return !!r && !!e && (!!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(e, r) || !(t || (this.rVe(e, r), Log_1.Log.CheckError() && Log_1.Log.Error("AdventureGuide", 5, "该地图标记Id不存在, 让策划去检查 k.开拓探测 配置表", ["探测类型EMarkType", e], ["错误id", r])), 1));
  }
  static IsMarkUnlock(e) {
    var r;
    var t;
    return !!e && !(r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e), !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e) && r.ShowCondition > 0 && (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetConditionGroup(r.ShowCondition).HintText, StringUtils_1.StringUtils.IsEmpty(t) ? Log_1.Log.CheckError() && Log_1.Log.Error("AdventureGuide", 75, "该地图标记Id ConditionText不存在, 策划检查 d.地图标记、t.条件 配表", ["错误标记id", e], ["错误条件", r.ShowCondition]) : (e = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(t), ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UnlockCondition", e)), 1));
  }
  static MVe(e, r, t, o, n) {
    var a = {
      X: e.PositionX,
      Y: e.PositionY,
      Z: e.PositionZ
    };
    let i = r;
    if (!t) {
      t = new MapDefine_1.DynamicMarkCreateInfo({
        TrackTarget: Vector_1.Vector.Create(a),
        MarkConfigId: r,
        MarkType: o,
        DestroyOnUnTrack: true,
        MapAndDungeonInfo: {
          MapConfigId: e.MapId
        }
      });
      i = ModelManager_1.ModelManager.MapModel.CreateMapMark(t);
    }
    if (n) {
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: o,
        MarkId: i,
        Track: n
      });
    }
    return i;
  }
  static GetDungeonData(e) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e).InstanceDungeonList[0];
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).EnterControlId;
    if (e) {
      return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(e);
    }
  }
  static GetFirstDungeonConf(e) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e).InstanceDungeonList[0];
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  }
  static GetDungeonMaxCount(e) {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e).InstanceDungeonList[0];
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    if (e && e.EnterControlId && (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(e.EnterControlId))) {
      return e.EnterCount;
    } else {
      return 0;
    }
  }
  static JumpToTargetView(e, r = undefined, t = undefined) {
    AdventureGuideController.OpenGuideView(e, r, t);
  }
  static GetMarkAreaText(e) {
    var r;
    var t;
    var o;
    var e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e);
    if (e.EntityConfigId) {
      o = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(e.EntityConfigId);
      if (r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o)) {
        t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r.Title);
        o = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(o);
        o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o);
        o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(o.Title);
        return `${ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(r.CountryId)}-${o}-${t}`;
      } else {
        return "";
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AdventureGuide", 5, "地图标记配置缺乏实体id, 无法显示对应的区域文本", ["markId", e.MarkId]);
      }
      return "";
    }
  }
  static GetShowSilentAreasList(e, r) {
    if (ModelManager_1.ModelManager.AdventureGuideModel.DetectionSilentAreasDataList.length === 0) {
      ModelManager_1.ModelManager.AdventureGuideModel.InitAllDetectSilentAreasList();
    }
    var t = new Array();
    if (e === undefined && r === undefined) {
      ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(t);
    } else if (e !== undefined) {
      ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(t, e);
    } else if (r !== undefined) {
      ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(t, undefined, r);
    }
    return t;
  }
  static RecordAdventureNewSoundAreaTabClick() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RedDotAdventureNewSoundAreaTabLastUpdateTime, TimeUtil_1.TimeUtil.GetServerTimeStamp());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate);
  }
  static CheckIsAdventureGuideHasRedDot() {
    return AdventureGuideController.CheckCanGetTaskAward() || AdventureGuideController.CheckCanGetFirstAward() || AdventureGuideController.CheckCanGetDailyActivityAward();
  }
  static CheckCanGetDailyActivityAward() {
    return ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake();
  }
  static CheckCanGetFirstAward() {
    return false;
  }
  static CheckCanGetFirstAwardById(e) {
    return false;
  }
  static CheckCanGetFirstAwardByTypeId(e) {
    return false;
  }
  static CheckCanGetTaskAward() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023001)) {
      var e = ModelManager_1.ModelManager.AdventureGuideModel.GetUnLockChaptersList();
      var r = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList();
      for (const o of e) {
        for (const n of ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(o)) {
          if (n.Status === Protocol_1.Aki.Protocol.Aks.a3_) {
            return true;
          }
        }
        var t = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(o);
        if (t.Received === t.Total && !r.includes(o)) {
          return true;
        }
      }
    }
    return false;
  }
  static async RequestLevelPlayVarAsync(e, r) {
    var t = Protocol_1.Aki.Protocol.Gp_.create();
    t.r6n = e;
    t._ps = r;
    var t = await Net_1.Net.CallAsync(25811, t);
    if (t) {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18883);
      } else {
        ModelManager_1.ModelManager.AdventureGuideModel.UpdateNightMareMsg(e, r, t.hEs);
      }
    }
  }
}
exports.AdventureGuideController = AdventureGuideController;
(_a = AdventureGuideController).X5e = (e, r) => {
  if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId()) {
    ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
  }
  if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId()) {
    ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
  }
  if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId()) {
    ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
  }
};
AdventureGuideController.OnTrackMapMark = (e, r, t) => {
  if (!t) {
    let e = false;
    if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
      e = true;
    }
    if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
      e = true;
    }
    if (r === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId()) {
      ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
      e = true;
    }
    if (e) {
      _a.CancelDetectingRequest();
    }
  }
};
AdventureGuideController.iVe = e => {
  return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) || (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NoJumpTo"), false);
};
AdventureGuideController.OpenGuideView = (e, r = undefined, t = undefined) => {
  var o;
  if (UiManager_1.UiManager.IsViewShow("AdventureGuideView")) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeChildView, e ?? "DailyActivityTabView", r);
  } else {
    (o = new GuideView_1.AdventureGuideViewOpenData()).OpenTabViewName = e;
    o.OpenParam = r;
    if ((e = UiManager_1.UiManager.GetViewByName("AdventureGuideView")) !== undefined) {
      e.SetTabViewOpenData(o);
      UiManager_1.UiManager.NormalResetToView("AdventureGuideView", e => {
        t?.(e, 0);
      });
    } else {
      UiManager_1.UiManager.OpenView("AdventureGuideView", o, t);
    }
  }
};
AdventureGuideController.Q5e = () => {
  ModelManager_1.ModelManager.AdventureGuideModel.InitDetectionData();
};
AdventureGuideController.$5e = () => {
  ModelManager_1.ModelManager.AdventureGuideModel.DetectionRedDotRecord = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DetectionRedDotRecord) ?? new Map();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureManualUpdate);
  ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureManual();
};
AdventureGuideController.Y5e = e => {
  for (const r of e.NMs) {
    ModelManager_1.ModelManager.AdventureGuideModel.SetUnLockChapters(r.sK1);
    ModelManager_1.ModelManager.AdventureGuideModel.SetRewardChapters(r.aK1);
    for (const t of r.UMs) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetTaskById(t.s5n, t.Y4n, t.PMs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureTaskStateChange, [t.s5n]);
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureManualUpdate);
};
AdventureGuideController.J5e = e => {
  ModelManager_1.ModelManager.AdventureGuideModel.HandleMonsterDetectLockStatus(e.$Ms);
};
AdventureGuideController.oVe = e => {
  ModelManager_1.ModelManager.AdventureGuideModel.UpdateByAdventureManualResponse(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureManualUpdate);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotSilentFirstAward);
};
AdventureGuideController.Wkl = e => {
  if (e !== undefined) {
    ModelManager_1.ModelManager.AdventureGuideModel.FullUpdateDetectionPreOpenData(1, e.wE_);
    ModelManager_1.ModelManager.AdventureGuideModel.FullUpdateDetectionPreOpenData(0, e.LE_);
  }
};
AdventureGuideController.Ac1 = undefined;
AdventureGuideController.Pc1 = [];
AdventureGuideController.wc1 = e => {
  e = e.hl1;
  const r = ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
  if (r !== e.o8n) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("AdventureGuide", 5, "Monster 更新的追踪目标与现有目标不一致", ["现有追踪目标：", r], ["更新追踪目标：", e.o8n]);
    }
  } else {
    _a.Pc1.push(e);
    _a.Ac1 ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(_a.Pc1, r);
      if (ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().size === 0) {
        ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId()).RefreshTime = MAX_INT32_NUMBER;
        AdventureGuideController.StopTrackCurDetectingMonster();
        AdventureGuideController.CancelDetectingRequest();
      } else {
        for (const e of _a.Pc1) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AdventureGuide", 5, "DetectionListHandle", ["怪物id", e.s5n], ["探测id", e.o8n], ["RefreshTime", e.qMs]);
          }
          if (e.s5n === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId()) {
            AdventureGuideController._Ve(r, AdventureGuideController.lVe());
            break;
          }
        }
      }
      _a.Pc1 = [];
      _a.Ac1 = undefined;
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
};
AdventureGuideController.nVe = e => {};
AdventureGuideController.U8u = e => {
  if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 21048);
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖返回", ["ids", e.s5n]);
    }
    e.s5n.forEach(e => {
      ModelManager_1.ModelManager.AdventureGuideModel.GetTaskRecordById(e).Status = Protocol_1.Aki.Protocol.Aks.Proto_Received;
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdventureTaskStateChange, e.s5n);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖红点刷新", ["id", e.s5n]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureManualUpdate);
  }
};
AdventureGuideController.aVe = e => {
  for (const r of e?.QMs?.WMs) {
    ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(r, true);
  }
  for (const t of e?.QMs?.KMs) {
    ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(t, true);
  }
};
AdventureGuideController.hVe = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("AdventureGuide", 5, "收到探测请求响应消息 DetectionResponse");
  }
  if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 20360);
  } else {
    var r = AdventureGuideController.lVe();
    switch (e.FMs[0]?.h5n) {
      case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
        ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(e.FMs, e.n8n);
        AdventureGuideController._Ve(e.n8n, r);
        break;
      case Protocol_1.Aki.Protocol.r8n.sxu:
        ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(e.FMs, e.n8n);
        AdventureGuideController.dVe(e.n8n, r);
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
        ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(e.FMs, e.n8n);
        AdventureGuideController.CVe(e.n8n, r);
    }
  }
};
AdventureGuideController.cVe = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("AdventureGuide", 64, "普通怪物探测面板信息 DetectionResponse");
  }
  if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22886);
  }
  if (e.FMs.length !== 0) {
    ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(e.FMs[0].o8n, e.FMs[0].qMs);
  }
};
AdventureGuideController.Z5e = e => {
  if (e) {
    ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(e.s5n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotSilentFirstAward);
    AdventureGuideController.EmitRedDotFirstAwardEvent(e.s5n);
  }
};
AdventureGuideController.eVe = e => {
  if (e) {
    for (const r of e.WMs) {
      ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(r, true);
    }
  }
};
AdventureGuideController.tVe = e => {
  if (e) {
    for (const r of e.KMs) {
      ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(r, true);
    }
  }
};
AdventureGuideController.gVe = e => {
  if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 23813);
  } else {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChapterRewardReceived, e.h8n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotAdventureManualUpdate);
  }
};
AdventureGuideController.z5e = e => {
  switch (e.FMs[0].h5n) {
    case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
      var r = Protocol_1.Aki.Protocol.IXn.create({
        C6n: e.FMs
      });
      Net_1.Net.Call(21496, r, e => {
        AdventureGuideController.fVe(e.FMs);
      });
      break;
    case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
      AdventureGuideController.vVe(e.FMs);
      break;
    case Protocol_1.Aki.Protocol.r8n.sxu:
      AdventureGuideController.pVe(e.FMs);
  }
};
AdventureGuideController.sN_ = new Set([19, 6, 29]);
AdventureGuideController.uVe = e => {
  AdventureGuideController.StopTrackCurDetectingDungeon();
  AdventureGuideController.StopTrackCurDetectingMonster();
  AdventureGuideController.StopTrackCurDetectingSilentArea();
  if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    if (e.s8n.s5n === ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId()) {
      return undefined;
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16384);
      return;
    }
  }
  var r = e.s8n.s5n;
  var t = e.s8n.o8n;
  var e = e.s8n.h5n;
  let o = undefined;
  let n = 0;
  let a = 6;
  switch (e) {
    case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
      {
        AdventureGuideController.rVe(7, ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId());
        if (ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId() !== t) {
          ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterConfId(t);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AdventureGuide", 9, "追踪目标改变");
        }
        o = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().get(r);
        var i = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(t);
        let e = false;
        for (const M of _a.sN_) {
          if (AdventureGuideController.mVe(M, i.Conf.MarkId, true)) {
            e = true;
            a = M;
            break;
          }
        }
        var l = (a = e ? a : 7) === 7;
        n = AdventureGuideController.MVe(o, i.Conf.MarkId, e, a, l);
        ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterMarkId(n);
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterId(r);
      }
      break;
    case Protocol_1.Aki.Protocol.r8n.sxu:
      if (ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId() !== t) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingDungeonConfId(t);
      }
      o = ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().get(r);
      l = ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(t);
      l = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(l.Conf.DungeonId);
      if (AdventureGuideController.mVe(6, l.MarkId)) {
        a = 6;
        n = AdventureGuideController.MVe(o, l.MarkId, true, a, false);
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonMarkId(n);
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonId(r);
      }
      break;
    case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
      if (ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId() !== t) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(t);
      }
      o = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().get(r);
      var l = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(t);
      var d = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(l.Conf.MarkId);
      var _ = AdventureGuideController.mVe(d?.ObjectType, l.Conf.MarkId);
      a = _ ? d.ObjectType : 7;
      n = AdventureGuideController.MVe(o, l.Conf.MarkId, _, a, !_);
      ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaMarkId(n, a);
      ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaId(r);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DetectSuccess, t, e);
  if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect()) {
    ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(false);
    e = {
      MarkId: n,
      MarkType: a,
      OpenFogId: 0,
      IsNotFocusTween: true
    };
    WorldMapController_1.WorldMapController.OpenView(2, false, e);
  }
};
const silentAreasSortFunc = (e, r) => e.Conf.DangerType !== r.Conf.DangerType ? r.Conf.DangerType - e.Conf.DangerType : e.Conf.Secondary !== r.Conf.Secondary ? r.Conf.Secondary - e.Conf.Secondary : e.Conf.Id - r.Conf.Id;
exports.silentAreasSortFunc = silentAreasSortFunc;
const monsterSortFunc = (e, r) => e.Conf.DangerType !== r.Conf.DangerType ? r.Conf.DangerType - e.Conf.DangerType : e.Conf.TypeDescription2 !== r.Conf.TypeDescription2 ? r.Conf.TypeDescription2 - e.Conf.TypeDescription2 : r.Conf.Id - e.Conf.Id;
exports.monsterSortFunc = monsterSortFunc;
//# sourceMappingURL=AdventureGuideController.js.map