"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeModel_1 = require("../../Attribute/AttributeModel");
const ItemDefine_1 = require("../../Item/ItemDefine");
const AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData");
const DangoAbyssData_1 = require("./DangoAbyssData");
const DangoAbyssDefine_1 = require("./DangoAbyssDefine");
class DangoAbyssModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LeaveFromAbyssWorld = false;
    this.uyc = false;
    this.CurrentSelectEntranceId = 0;
    this.CurrentSelectChallengeId = 0;
    this.A_r = 0;
    this.dyc = 0;
    this.myc = 0;
    this.fyc = 0;
    this.gyc = 0;
    this.BFe = 1;
    this.a6c = 0;
    this.Cyc = undefined;
    this.pyc = undefined;
    this.vyc = undefined;
    this.FormationIndex2DangoIdMapCache = new Map();
    this.Ed1 = undefined;
    this.xte = 0;
    this.HFe = 0;
    this.qRc = new Map();
    this.K61 = false;
    this.z71 = new Array();
  }
  OnLeaveLevel() {
    this.K61 = false;
    return !(this.gyc = 0);
  }
  OnAbyssChallengeResultNotify(e) {
    this.vyc = new DangoAbyssData_1.AbyssChallengeResultData();
    this.vyc.Phrase(e.j7n);
    this.K61 = true;
    this.SetLikeRecord(e.j7n.A71);
  }
  GetChallengeRankInfo() {
    this.Cyc ||= new DangoAbyssData_1.AbyssRankChallengeInfo();
    return this.Cyc;
  }
  OnAnonymousNameStateChange(e, t) {
    this.GetChallengeRankInfo().SetIsOpenAnonymousName(e, t);
  }
  GetChallengeAnonymousNameState(e) {
    return this.GetChallengeRankInfo().GetAnonymousNameMode(e);
  }
  CheckPayShopRedDot() {
    for (const e of this.GetPayShopGoods()) {
      if (e.GetIfNeedRemind()) {
        return true;
      }
    }
    return false;
  }
  GetPayShopGoods() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetOpenShopId();
    return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e, 1, false);
  }
  OnAbyssChallegenRankUpdate(e) {
    this.GetChallengeRankInfo().OnChallengeRankInfoUpdate(e);
  }
  OnAbyssChallengeSelfRankUpdate(e) {
    this.GetChallengeRankInfo().OnSelfRankInfoUpdate(e);
  }
  OnAbyssLikeNotify(e) {
    var t;
    if (this.vyc) {
      if (t = this.vyc.GetPlayerInfoByPlayerId(e.W5n)) {
        t.SetLikeCount(e.V0c);
        this.SetLikeRecord(e.A71);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 27, "没有找到玩家数据");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 27, "没有结算数据但是收到了喜欢通知");
    }
  }
  GetPlayerLikeCount(e) {
    if (this.vyc && (e = this.vyc.GetPlayerInfoByPlayerId(e))) {
      return e.GetLikeCount();
    } else {
      return 0;
    }
  }
  OnAbyssFormationRoleSelectUpdateNotify(e) {
    this.pyc = new DangoAbyssData_1.AbyssFormationInfo();
    this.pyc.Phrase(e);
  }
  GetCurrentOpenAbyssActivityData() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap()) {
      if (e[1].Type === Protocol_1.Aki.Protocol.uks.Proto_Abyss) {
        return e[1];
      }
    }
  }
  GetDangoAbyssRoleData(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetRoleDataById(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
    }
  }
  GetAbyssUnLockState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetAbyssChallengeDataById(e).GetIfUnlock();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return false;
    }
  }
  GetAbyssMaxProgress(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetAbyssChallengeDataById(e).GetMaxProgress();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return 0;
    }
  }
  GetAbyssTimeLimitState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetAbyssChallengeDataById(e).GetOverUnlockTime();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return false;
    }
  }
  GetAbyssConditionFinishState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetAbyssChallengeDataById(e).GetConditionFinishState();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return false;
    }
  }
  GetAbyssUnlockTimeText(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetAbyssChallengeDataById(e).GetLeftTimeText();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return "";
    }
  }
  GetAbyssPreChallengeFinishState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetPreChallengeFinishState(e);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
      return false;
    }
  }
  CheckIsSelf(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
  }
  CheckInAbyss() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())?.InstSubType === 33 && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  CheckInAbyssEditFormationState() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetCurrentDungeonConfig;
    return !!e && e.InstSubType === 33;
  }
  CheckAllDangoReady() {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e].GetRoleData?.PlayerId;
      if (a !== 0 && a !== undefined && a === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        var n = t[e].GetRoleConfigId;
        var a = this.GetRoleOwnerData(a, n);
        if (!a || !(a.DangoId > 0)) {
          return false;
        }
      }
    }
    return true;
  }
  CheckIsInMatch() {
    return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 0;
  }
  PhraseRoomInfo(e) {
    this.A_r = e.z0c;
    this.dyc = e.J0c;
    this.fyc = e.Z0c;
    this.myc = e.epc;
    this.a6c = e.I3c;
    this.BFe = e.e8n;
    this.Ed1 = e.hqc;
    this.xte = e.tBs;
    this.HFe = e.fu1;
    var t = this.gyc;
    this.gyc = e.Vy_;
    if (!t && this.gyc) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssFirstRoomEnter);
    }
    this.SetLikeRecord(e.A71);
  }
  GetRoleSelectDangoMap() {
    return this.Ed1 ?? {};
  }
  GetAbyssLayer() {
    return this.A_r;
  }
  GetMaxLayer() {
    return this.dyc;
  }
  GetCurrentAbyssCompletePercentage() {
    return this.A_r / this.dyc;
  }
  GetCurrentRoomId() {
    return this.gyc;
  }
  GetGainBoxCount() {
    return this.myc;
  }
  GetMaxBoxCount() {
    return this.fyc;
  }
  GetInAbyssFlow() {
    return this.uyc;
  }
  SetInAbyssFlow(e) {
    this.uyc = e;
  }
  GetPluginShowAttributeList(e) {
    const t = new Array();
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (e) {
      e.Prop.forEach(e => {
        t.push(new AttrListScrollData_1.AttrListScrollData(e.Id, e.Value, 0, 0, e.IsRatio, 0));
      });
      return t;
    } else {
      return [];
    }
  }
  GetPluginShowTagDataList(e) {
    var t;
    var r;
    var a = new Array();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (!e) {
      return [];
    }
    for ([t, r] of e.AddTag) {
      var n = new DangoAbyssDefine_1.DangoAbyssTagData();
      n.TagId = t;
      n.Value = r;
      a.push(n);
    }
    return a;
  }
  GetDangoItemConfig(e) {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
  }
  GetDangoItemBelongId(e) {
    return this.GetCurrentOpenAbyssActivityData()?.GetPluginItemInfoById(e)?.GetBelongRole() ?? 0;
  }
  GetDangoBelongRoleId(e, t) {
    var r;
    var a;
    let n = 0;
    for ([r, a] of this.GRc(e)) {
      if (a.DangoId === t) {
        n = r;
        break;
      }
    }
    return n;
  }
  GetDangoItemLockState(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    return !!t && (t.GetPluginItemInfoById(e)?.GetIsLock() ?? false);
  }
  GRc(e) {
    if (!this.qRc.has(e)) {
      this.qRc.set(e, new Map());
    }
    return this.qRc.get(e);
  }
  GetPlayerRoleCfgOwnerData(e, t) {
    if (t !== 0) {
      if (!this.qRc.has(e)) {
        this.qRc.set(e, new Map());
      }
      if (!(e = this.qRc.get(e)).has(t)) {
        e.set(t, new DangoAbyssData_1.AbyssDangoOwnerData());
      }
      return e.get(t);
    }
  }
  FRc(e, t) {
    var r = this.GetRoleOwnerData(e, t);
    if (r) {
      r.PlayerId = e;
      r.RoleCfgId = t;
      r.DangoId = 0;
    }
  }
  GetRoleOwnerData(e, t) {
    return this.GetPlayerRoleCfgOwnerData(e, t);
  }
  RefreshOwnerListByMatchTeamInfo(e) {
    if (e) {
      for (const n of e.TRs) {
        var t = n.W5n;
        for (const o of n.J6n) {
          this.FRc(t, o.Q6n);
          var r = this.GetRoleOwnerData(t, o.Q6n);
          var a = o.Q6n;
          if (r) {
            r.PlayerId = t;
            r.RoleCfgId = a;
            r.DangoId = o.vPc?.SPc?.J6n?.s5n ?? 0;
            r.DangoLevel = o.vPc?.SPc?.J6n?.F6n ?? 0;
            r.DangoEquipIds = o.vPc?.SPc?.J6n?.j0c ?? [];
          }
        }
      }
    }
  }
  CacheDangoSelect(e, t, r) {
    var a = new Map();
    var n = this.GRc(e);
    let o = 0;
    if (r !== 0) {
      var i;
      var s;
      var g = this.GetRoleOwnerData(e, t)?.DangoId;
      for ([i, s] of n) {
        if (s.DangoId === r && s.RoleCfgId !== t) {
          s.DangoId = 0;
          s.PlayerId = e;
          o = i;
          break;
        }
      }
      const l = this.GetPlayerRoleCfgOwnerData(e, o);
      if (l) {
        l.DangoId = g ?? 0;
      }
    }
    const l = this.GetPlayerRoleCfgOwnerData(e, t);
    if (l) {
      l.DangoId = r;
      l.PlayerId = e;
    }
    n = [];
    n.push(t);
    if (o !== 0) {
      n.push(o);
    }
    a.set(e, [t, o]);
    this.RefreshOwnDataAfterChange(e);
    return a;
  }
  GetInstanceProgress() {
    return Math.min(this.HFe / this.xte, 1);
  }
  GetInstanceReviveTipTips() {
    return "" + ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes;
  }
  GetInstanceFloorProgressText() {
    return (ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssCompletePercentage() * 100).toFixed(2) + "%";
  }
  GetInstanceFloorText() {
    return this.GetAbyssLayer() + "/" + this.GetMaxLayer();
  }
  GetInstanceFloorDetailProgressText() {
    return this.GetInstanceFloorText();
  }
  GetCurrentChallengeId() {
    return this.BFe;
  }
  GetCurrentAbyssFullTime() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this.BFe).TotalTime;
  }
  GetCurrentAbyssTotalScore() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this.BFe).TotalScore;
  }
  GetCurrentAbyssTreasureMap() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this.BFe).RewardTime;
  }
  IsPlanarDungeon() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstByInstId(ModelManager_1.ModelManager.CreatureModel.GetInstanceId()).PlanarDungeon;
  }
  GetCurrentAbyssName() {
    var e;
    var t;
    if (this.BFe !== 0 && (e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(this.BFe).Title, t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoInfoName"))) {
      return StringUtils_1.StringUtils.Format(t, MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e));
    } else {
      return "";
    }
  }
  GetCurrentRouteDesc() {
    var e;
    if (this.a6c === 0) {
      return "";
    } else {
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRouteByRouteIdAndFloorId(this.a6c, this.A_r).Desc;
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    }
  }
  GetInstanceRemainTimeText() {
    var e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo().Tree.GetChallengeRemainTime();
    return TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.ceil(e));
  }
  GetOpenShopId() {
    var e = this.GetCurrentOpenAbyssActivityData()?.Id ?? 0;
    if (e > 0) {
      return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(e).ShopId;
    } else {
      return 0;
    }
  }
  RefreshOwnDataAfterChange(e) {
    var t;
    var r;
    for ([t, r] of this.GRc(e)) {
      this.Id1(t, r);
    }
  }
  Id1(t, r) {
    var a = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    if (r.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      var n = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(r.DangoId);
      if (n) {
        let e = false;
        for (const o of a) {
          if (o.GetRoleConfigId === t) {
            e = true;
            break;
          }
        }
        if (e) {
          r.DangoLevel = n.GetLevel();
          r.DangoEquipIds = n.GetEquipItemConfigIdList();
        } else {
          this.GRc(r.PlayerId).delete(t);
        }
      }
    }
  }
  GetMatchDangoRoleOwnData(r, e) {
    var t = new Protocol_1.Aki.Protocol._qc();
    const a = {};
    e.forEach(e => {
      var t = this.GetRoleOwnerData(r, e);
      a[e.toString()] = t?.DangoId ?? 0;
    });
    t.hqc = a;
    return t;
  }
  GetAllDangoList() {
    var e = this.GetCurrentOpenAbyssActivityData();
    if (e) {
      return e.GetAllDangoList();
    } else {
      return [];
    }
  }
  GetPluginItemInfoById(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetPluginItemInfoById(e);
    }
  }
  GetPluginItemConfigByIncId(e) {
    return this.GetPluginItemInfoById(e)?.GetConfig();
  }
  GetPluginItemListByType(e) {
    var t = this.GetAllPluginItemList();
    var r = new Array();
    for (const a of t) {
      if (a.GetConfig().SlotType === e) {
        r.push(a);
      }
    }
    return r;
  }
  GetAllPluginItemList() {
    var e = this.GetCurrentOpenAbyssActivityData();
    if (e) {
      return e.GetPluginItemInfoAll();
    } else {
      return [];
    }
  }
  InitCacheDangoOwnerMap() {
    this.qRc.clear();
    for (const [r, a] of this.GetCacheDangoOwnerMap()) {
      a.forEach((e, t) => {
        if (e.DangoId !== 0 && !this.GetDangoAbyssRoleData(e.DangoId).GetIfLock()) {
          this.qRc.set(r, a);
        }
      });
    }
  }
  GetCacheDangoOwnerMap() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationSelect) ?? new Map();
  }
  SaveCacheDangoOwnerMap() {
    var e;
    var t;
    var r = new Map();
    for ([e, t] of this.qRc) {
      if (e === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        var a;
        var n;
        var o = new Map();
        for ([a, n] of t) {
          o.set(a, n);
        }
        r.set(e, o);
      }
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationSelect, r);
  }
  CheckInDangoAbyssInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33;
  }
  CheckIfInSmallWorldInstance() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return e !== 0 && (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))?.InstSubType === 12 && e?.WorldDungeonSubType === 1;
  }
  GetDangoAbyssItemTipsConfirmState(e) {
    var t;
    var r;
    if (!e.IncId || e.DangoId < 0 || e.SlotIndex < 0 || (t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId).GetConfig(), r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e.SlotIndex), t.SlotType !== r)) {
      return 0;
    } else if ((r = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(e.IncId)) !== 0 && e.DangoId !== r && t.SlotType === 1) {
      return 1;
    } else if (this.stu(e)) {
      return 8;
    } else if (this.atu(e)) {
      return 9;
    } else {
      return this.htu(e);
    }
  }
  stu(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId);
    var r = t.GetConfig();
    var t = t.GetBelongRole();
    var r = r.SlotType === 2 && t > 0;
    return t === e.DangoId && r;
  }
  atu(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId).GetRoleId();
    var t = t > 0 && t === e.DangoId;
    var r = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetEquipItems();
    var r = this.Zy1(r, e.IncId);
    return !!r[0] && r[1] !== e.SlotIndex && !t;
  }
  htu(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId);
    var r = t.GetConfig();
    var a = t.GetRoleId();
    var n = this.GetPluginItemIncIdBySlotIndex(e.DangoId, e.SlotIndex);
    if (a > 0 && a !== e.DangoId) {
      return 2;
    } else if (a > 0 && a === e.DangoId) {
      if (n > 0 && n === e.IncId) {
        return 3;
      } else if (n > 0 && n !== e.IncId) {
        return 4;
      } else {
        return 5;
      }
    } else {
      t = t.GetBelongRole();
      if (r.SlotType === 2 && t > 0) {
        return this.QG1(e);
      } else if (a === 0) {
        if (n > 0) {
          return 6;
        } else {
          return 7;
        }
      } else {
        return 0;
      }
    }
  }
  QG1(e) {
    var t;
    var r = this.GetPluginItemIncIdBySlotIndex(e.DangoId, e.SlotIndex);
    if (ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId).GetBelongRole() === e.DangoId) {
      return 8;
    } else {
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetEquipItems();
      if ((t = this.Zy1(t, e.IncId))[0]) {
        if (t[1] === e.SlotIndex) {
          return 6;
        } else {
          return 9;
        }
      } else if (r > 0) {
        return 6;
      } else {
        return 7;
      }
    }
  }
  Zy1(t, e) {
    var r = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e).GetBelongRole();
    for (let e = 0; e < t.length; e++) {
      var a = t[e];
      if (!(a <= 0)) {
        var a = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(a);
        var n = a.GetBelongRole();
        if (a.GetConfig().SlotType === 2 && n > 0 && n === r) {
          return [true, e];
        }
      }
    }
    return [false, -1];
  }
  _Nc(t, r, e) {
    let a = -1;
    var n = t[e];
    for (let e = 0; e < t.length; e++) {
      if (t[e] === r) {
        a = e;
      }
    }
    t[e] = r;
    t[a] = n;
    return t;
  }
  GetDangoAbyssItemNewEquip(e, t) {
    let r = [...ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetEquipItems()];
    var a = e.SlotIndex;
    if (t === 2 || t === 6 || t === 7) {
      r[a] = e.IncId;
    } else if (t === 4 || t === 5) {
      r = this._Nc(r, e.IncId, a);
    } else if (t === 3) {
      r[a] = 0;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 75, "非法的插件装备状态", ["dangoId", e.DangoId], ["state", t]);
    }
    return r;
  }
  GetPluginItemIncIdBySlotIndex(e, t) {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e).GetPluginSlotData(t)?.GetIncId() ?? 0;
  }
  GetSlotUnlockLevel(e, t) {
    var e = this.GetDangoAbyssRoleData(e);
    var r = this.v5c(t);
    for (const a of e.GetLevelGroupConfigs()) {
      if (a.PluginNum === r) {
        return a.Level;
      }
    }
    return -1;
  }
  v5c(e) {
    return e || DangoAbyssDefine_1.SLOT_COUNT;
  }
  GetSlotLockState(e, t) {
    var e = this.GetDangoAbyssRoleData(e);
    return !e || !!e.GetIfLock() || (e = e.GetLevelConfig(), t = this.v5c(t), e.PluginNum < t);
  }
  GetPluginItemQualityIcon(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (!e) {
      return "";
    }
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(e.QualityId);
    if (!t) {
      return "";
    }
    let r = t.AbyssItemBg;
    switch (e.SlotType) {
      case 1:
        r = t.AbyssCoreItemBg;
        break;
      case 2:
        r = t.AbyssPassiveItemBg;
    }
    return r;
  }
  IsPluginHasValidTag(e, t) {
    t = this.GetPluginItemConfigByIncId(t.GetUniqueId()).AddTag;
    if (t.size > 0) {
      for (const r of t.keys()) {
        if (this.eS1(e, r, 1)) {
          return true;
        }
      }
    }
    return false;
  }
  eS1(e, t, r) {
    var a = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(t);
    var e = this.GetDangoAbyssRoleData(e);
    return !!a && !!e && (a = a.AddType, e = e.GetConfig().TagList, a === 5 || a === 4 ? r !== 2 : !!e.includes(t) && r !== 2 || !e.includes(t) && r === 2);
  }
  tS1(e, t) {
    for (var [r, a] of t) {
      if (e.has(r)) {
        e.set(r, e.get(r) + a);
      } else {
        e.set(r, a);
      }
    }
    return e;
  }
  GetDangoTagData(e, t) {
    var r;
    var a = this.GetDangoAbyssRoleData(e);
    var n = a.GetConfig();
    var a = a.GetEquipItems();
    var n = n.TagList;
    let o = new Map();
    if (n.length > 0 && t !== 2) {
      for (const h of n) {
        o.set(h, 0);
      }
    }
    for (const u of a) {
      if (!(u <= 0)) {
        if ((r = this.GetPluginItemConfigByIncId(u).AddTag).size > 0) {
          o = this.tS1(o, r);
        }
      }
    }
    var i;
    var s;
    var g;
    var l = new Array();
    for ([i, s] of o) {
      if (this.eS1(e, i, t)) {
        (g = new DangoAbyssDefine_1.DangoAbyssTagData()).TagId = i;
        g.Value = s;
        l.push(g);
      }
    }
    l.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(e.TagId);
      return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(t.TagId).AddType - e.AddType;
    });
    return l;
  }
  Qj1(e, t) {
    if (t < 0) {
      return e < t;
    } else {
      return t < e;
    }
  }
  GetFormatAttributeValueByTagId(e, t, r) {
    t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(t);
    if (!t) {
      return "";
    }
    if (t.AddType === 5) {
      if ((s = this.GetDangoAbyssRoleData(e)) && s.GetConfig()) {
        s = s.GetConfig().Name;
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) ?? "id" + e;
      } else {
        return "id" + e;
      }
    }
    let a = t.TextFormat;
    if (r || t.AddType === 4) {
      a = t.NoMaxTextFormat;
    } else if (this.Qj1(e, t.MaxValue)) {
      a = t.MaxTextFormat;
    }
    let n = e.toString();
    let o = t.MaxValue.toString();
    if (t.AddType === 1) {
      n = AttributeModel_1.TipsDataTool.GetPropRatioValue(e, false).toString();
      o = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.MaxValue, false).toString();
    } else if (t.AddType === 2) {
      n = AttributeModel_1.TipsDataTool.GetPropRatioValue(e, true).toString();
      o = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.MaxValue, true).toString();
    }
    let i = "";
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
    return i = s ? r ? StringUtils_1.StringUtils.Format(s, n) : StringUtils_1.StringUtils.Format(s, n, o) : i;
  }
  GetSlotSwitchTypeByData(e, t) {
    if (t && e !== t) {
      e = e?.GetIncId() ?? 0;
      t = t?.GetIncId() ?? 0;
      if (e <= 0 && t > 0) {
        return 3;
      } else if (e > 0 && t <= 0) {
        return 1;
      } else if (e > 0 && t > 0 && e !== t) {
        return 2;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  GetDangoAddPropData(e) {
    var t = [];
    for (const r of this.GetDangoAbyssRoleData(e).GetEquipItems()) {
      if (!(r <= 0)) {
        for (const a of this.GetPluginItemConfigByIncId(r).Prop) {
          t.push(a);
        }
      }
    }
    return t;
  }
  GetDangoBaseProp(e) {
    return this.GetDangoAbyssRoleData(e).GetLevelConfig().Prop;
  }
  GetDangoShowAttributeList(e) {
    const o = new Array();
    var t = this.GetDangoBaseProp(e);
    var e = this.GetDangoAddPropData(e);
    t.forEach(e => {
      var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(e.Value, e.IsRatio);
      o.push(new AttrListScrollData_1.AttrListScrollData(e.Id, t, 0, 0, e.IsRatio, 0));
    });
    e.forEach((e, t) => {
      let r = false;
      var a = AttributeModel_1.TipsDataTool.GetPropRatioValue(e.Value, e.IsRatio);
      for (const n of o) {
        if (n.Id === e.Id && n.IsRatio === e.IsRatio) {
          n.AddValue += a;
          r = true;
        }
      }
      if (!r) {
        o.push(new AttrListScrollData_1.AttrListScrollData(e.Id, 0, a, 0, e.IsRatio, 0));
      }
    });
    return o;
  }
  Se1(e) {
    e = this.GetDangoAddPropData(e);
    const n = new Array();
    e.forEach((e, t) => {
      let r = false;
      for (const a of n) {
        if (a.Id === e.Id && a.IsRatio === e.IsRatio) {
          a.AddValue += e.Value;
          r = true;
        }
      }
      if (!r) {
        n.push(new AttrListScrollData_1.AttrListScrollData(e.Id, 0, e.Value, 0, e.IsRatio, 0));
      }
    });
    return n;
  }
  GetEquipViewAttributeDataById(e) {
    var t = new DangoAbyssDefine_1.EquipViewAttributeData();
    t.IsValid = true;
    var r = this.Se1(e);
    var a = this.GetDangoTagData(e, 1);
    let n = [];
    if (r.length + a.length > 0) {
      n = [t];
      for (const l of a) {
        var o = new DangoAbyssDefine_1.EquipViewAttributeData();
        o.IsValid = true;
        o.Tag = l;
        n.push(o);
      }
      for (const h of r) {
        var i = new DangoAbyssDefine_1.EquipViewAttributeData();
        i.IsValid = true;
        i.Attribute = h;
        n.push(i);
      }
    }
    t = new DangoAbyssDefine_1.EquipViewAttributeData();
    t.IsValid = false;
    a = this.GetDangoTagData(e, 2);
    let s = [];
    if (a.length > 0) {
      s = [t];
      for (const u of a) {
        var g = new DangoAbyssDefine_1.EquipViewAttributeData();
        g.IsValid = false;
        g.Tag = u;
        s.push(g);
      }
    }
    return s.concat(n);
  }
  gB1(e, t, r, a) {
    for (const i of e) {
      var n = i.Tag?.TagId;
      var o = i.Attribute?.Id;
      if (!a && o === t) {
        return i.Attribute?.AddValue === r;
      }
      if (a && n === t) {
        return i.Tag?.Value === r;
      }
    }
    return false;
  }
  SetEquipViewAttributeType(a, e) {
    for (const o of e) {
      o.IsChange = false;
      if (o.Attribute || o.Tag) {
        let e = 0;
        let t = false;
        let r = 0;
        if (o.Attribute) {
          e = o.Attribute.Id;
          t = false;
          r = o.Attribute.AddValue;
        } else if (o.Tag) {
          e = o.Tag.TagId;
          t = true;
          r = o.Tag.Value;
        }
        var n = this.gB1(a, e, r, t);
        o.IsChange = !n;
      }
    }
    return e;
  }
  GetSlotTypeTextIdBySlotIndex(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e);
    return DangoAbyssDefine_1.textSlotType.get(e);
  }
  GetPluginItemListBySlotIndex(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e);
    return ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListByType(e);
  }
  GetIfSlotTypeChange(e, t) {
    return e < 0 || ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(e) !== ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(t);
  }
  GetPluginItemPackageCapacity() {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(9).PackageId;
    return ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(e).Capacity;
  }
  SaveFormationSelectRole(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole) ?? new Map();
    r.set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole, r);
  }
  GetFormationSelectRoleList(e) {
    return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssSelectRole) ?? new Map()).get(e) ?? [];
  }
  GetDangoIfLock(e) {
    e = this.GetDangoAbyssRoleData(e);
    return !e || e.GetIfLock();
  }
  GetDangoDevelopRedDot() {
    return this.GetDangoNewRedDot() || this.GetDangoLevelUpRedDot(true);
  }
  GetDangoRoleRedDot(e) {
    return this.GetDangoNewRedDotById(e) || this.GetDangoLevelUpRedDotById(e, true);
  }
  GetDangoFormationNewRedDot() {
    for (const e of this.GetAllDangoList()) {
      if (this.GetDangoFormationNewRoleRedDot(e.GetId())) {
        return true;
      }
    }
    return false;
  }
  GetDangoFormationNewRoleRedDot(e) {
    return this.GetDangoFormationNewRedDotById(e);
  }
  GetDangoNewRedDot() {
    for (const e of this.GetAllDangoList()) {
      if (this.GetDangoNewRedDotById(e.GetId())) {
        return true;
      }
    }
    return false;
  }
  GetDangoNewRedDotById(e) {
    return !!this.GetDangoAbyssRoleData(e) && !!this.GetDangoIfNew(e);
  }
  GetDangoFormationNewRedDotById(e) {
    return !!this.GetDangoAbyssRoleData(e) && !!this.GetDangoFormationIfNew(e);
  }
  SetDangoHasCheck(e) {
    this.SetDangoIfNew(e, false);
    this.SetDangoLevelCheck(e);
  }
  SetDangoIfNew(e, t) {
    var r = this.GetDangoAbyssRoleData(e);
    if (r && !r.GetIfLock()) {
      (r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew) ?? new Map()).set(e, t);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew, r);
    }
  }
  GetDangoIfNew(e) {
    var t = this.GetDangoAbyssRoleData(e);
    return !!t && !t.GetIfLock() && ((LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoRoleNew) ?? new Map()).get(e) ?? false);
  }
  GetAbyssDangoEnterNew() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoEnterNew) ?? true;
  }
  SetAbyssDangoEnterNew(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoEnterNew, e);
  }
  SetDangoFormationIfNew(e, t) {
    var r;
    if (this.GetDangoAbyssRoleData(e)) {
      (r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew) ?? new Map()).set(e, t);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew, r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssDangoRedDot, e);
  }
  GetDangoFormationIfNew(e) {
    return !!this.GetDangoAbyssRoleData(e) && ((LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoFormationNew) ?? new Map()).get(e) ?? false);
  }
  SetDangoLevelCheck(e) {
    var t = this.GetDangoAbyssRoleData(e);
    var r = this.GetDangoLevelUpRedDotById(e, false);
    if (t && r) {
      r = t.GetLevel() + 1;
      (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck) ?? new Map()).set(e, r);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck, t);
    }
  }
  GetDangoLastCheckLevel(e) {
    return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AbyssDangoLevelCheck) ?? new Map()).get(e) ?? 1;
  }
  GetDangoLevelUpRedDot(e) {
    for (const t of this.GetAllDangoList()) {
      if (this.GetDangoLevelUpRedDotById(t.GetId(), e)) {
        return true;
      }
    }
    return false;
  }
  GetDangoLevelUpRedDotById(e, t) {
    var r;
    var a;
    var n = this.GetDangoAbyssRoleData(e);
    return !!n && !n.GetIfLock() && !(r = n.GetIfCanLevelUp(), a = n.GetIfLevelUpEnough(), !r) && !!a && (!t || !!(this.GetDangoLastCheckLevel(e) < n.GetLevel() + 1));
  }
  GetRecoverySelectionCountMap(e) {
    var t = new Map();
    for (const a of e) {
      var r = this.GetPluginItemConfigByIncId(a.IncId);
      if (r) {
        r = r.QualityId;
        if (t.has(r)) {
          t.set(r, t.get(r) + 1);
        } else {
          t.set(r, 1);
        }
      }
    }
    return t;
  }
  GetRecoveryTimesCountMap(e) {
    const r = new Map();
    e.forEach((e, t) => {
      e = Math.floor(e / DangoAbyssDefine_1.RECOVERY_NEEDS_COUNT);
      r.set(t, e);
    });
    return r;
  }
  GetRecoveryTimesCountAll(e) {
    let r = 0;
    e.forEach((e, t) => {
      r += Math.floor(e / DangoAbyssDefine_1.RECOVERY_NEEDS_COUNT);
    });
    return r;
  }
  GetRecoveryRewardItemMap(e) {
    const n = new Map();
    e.forEach((e, t) => {
      var r;
      var a;
      if (e > 0) {
        for ([r, a] of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetRecoveryRewardByQualityId(t)) {
          if (n.has(r)) {
            n.set(r, n.get(r) + e * a);
          } else {
            n.set(r, e * a);
          }
        }
      }
    });
    return n;
  }
  GetRecoveryAvailable() {
    var e = this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssSynthesisEntr;
  }
  GetRankOpen() {
    var e = this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssRank;
  }
  GetMainHonorRank(e, t = false) {
    if (e.length === 0) {
      return 0;
    }
    var r;
    var a = e[0].Id;
    var n = e[0].Count;
    let o = t ? -1 : 3;
    for ([r] of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssSettleById(a).Title) {
      if (n >= r) {
        if (t) {
          o++;
        } else {
          o--;
        }
      }
    }
    return o = Math.max(0, Math.min(2, o));
  }
  GetPluginItemTipsData(e, t, r, a) {
    a = {
      DangoId: a ?? -1,
      SlotIndex: r ?? -1
    };
    r = new ItemDefine_1.ItemTipsParam();
    r.ItemId = e;
    r.ItemUid = t;
    r.ExtraParam = a;
    return r;
  }
  GetSkillDescByDangoId(e) {
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(e);
    if (e) {
      e = e.PhantomItemId;
      e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e);
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescStringBySkillIdAndQuality(e.SkillId);
    } else {
      return "";
    }
  }
  GetDangoUpAvailable() {
    var e = this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssDevelopEntr;
  }
  GetShopAvailable() {
    var e = this.GetCurrentOpenAbyssActivityData().GetCurrentLastFinishChallengeId();
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(e);
    return !!e && e.AbyssStoreEntr;
  }
  GetRewardInfoById(e) {
    var t = this.GetCurrentOpenAbyssActivityData();
    if (t) {
      return t.GetRewardInfoById(e);
    }
  }
  SetLikeRecord(e) {
    this.z71 = [];
    for (const t of e) {
      const e = {
        PlayerId: t.W5n,
        LikedPlayerIdList: t.P71
      };
      this.z71.push(e);
    }
  }
  GetPlayerIfLikePlayer(e, t) {
    if (e === t) {
      return true;
    }
    for (const r of this.z71) {
      if (r.PlayerId === t) {
        return r.LikedPlayerIdList.includes(e);
      }
    }
    return false;
  }
  IsChallengeFinish() {
    return this.K61;
  }
}
exports.DangoAbyssModel = DangoAbyssModel;
//# sourceMappingURL=DangoAbyssModel.js.map