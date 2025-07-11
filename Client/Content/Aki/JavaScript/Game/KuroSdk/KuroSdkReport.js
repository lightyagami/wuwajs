"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkReportFirstUpFiveStarHero = exports.SdkReportFirstNormalFiveStarHero = exports.SdkReportGetRougeLevel60 = exports.SdkReportLevel = exports.SdkReportChapter = exports.SdkReportDirectBuy = exports.SdkReportPay = exports.SdkReportRecharge = exports.SdkReportStartFlow = exports.SdkReportQuestFinish = exports.SdkReportBattleTech = exports.SdkReportClickEnterGame = exports.SdkReportCreateRole = exports.SdkReportChangeAccount = exports.SdkReportOpenPrivacy = exports.SdkReportGameInitFinish = exports.KuroSdkReport = undefined;
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const HotPatchKuroSdk_1 = require("../../Launcher/HotPatchKuroSdk/HotPatchKuroSdk");
const SdkReportData_1 = require("../../Launcher/HotPatchKuroSdk/SdkReportData");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ModelManager_1 = require("../Manager/ModelManager");
const PayShopDefine_1 = require("../Module/PayShop/PayShopDefine");
const KILLPHANTOMMISSION = 139000025;
const CAPTUREPHANTOMMISSION = 139000026;
const CHAPTERCPRE1 = 139000025;
const CHAPTERCPRE2 = 139000026;
const CHAPTERC11 = 139000027;
const CHAPTERC12 = 139000029;
const CHAPTERC13 = 139000030;
const CHAPTERC14 = 139000031;
const CHAPTERC15 = 114000020;
const CHAPTERC16 = 140000004;
const KILLPHANTOMSTEP1 = 6;
const KILLPHANTOMSTEP2 = 10;
const KILLPHANTOMSTEP3 = 91;
const KILLPHANTOMSTEP4 = 132;
const GOJINZHOU = 16;
const STARTFLOW = 1;
const STARTSTATE = 1;
const RECHARGEONE = 1;
const RECHARGETWO = 2;
const RECHARGETHREE = 3;
const RECHARGEFOUR = 4;
const RECHARGEFIVE = 5;
const RECHARGESIX = 6;
const REPORTLEVEL8 = 8;
const REPORTLEVEL10 = 10;
const REPORTLEVEL12 = 12;
const REPORTLEVEL15 = 15;
const REPORTLEVEL20 = 20;
const REPORTLEVEL25 = 25;
const REPORTLEVEL30 = 30;
const REPORTLEVEL35 = 35;
const REPORTLEVEL40 = 40;
const REPORTLEVEL45 = 45;
const CREATEROLEEVENTID = "101104";
const BATTLEEVENTID = "101803";
const QUESTEVENTID = "101805";
const FLOWEVENTID = "123000";
const NORMALGACHAPOOLREPORTSTATEKEY = "NORMALGACHAPOOLREPORTSTATEKEY";
const HIGHGACHAPOOLREPORTSTATEKEY = "HIGHGACHAPOOLREPORTSTATEKEY";
const ROUGEFINISHSTATEKEY = "ROUGEFINISHSTATEKEY";
class KuroSdkReport {
  static Init() {
    this.mSe();
  }
  static Report(e) {
    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(e);
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.RSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  static OnPlayerLevelChange(e) {
    var t;
    if (SdkReportLevel.IfNeedReport(e)) {
      (t = new SdkReportLevel(undefined)).Level = e;
      this.Report(t);
    }
  }
  static OnPlotFinish(e) {
    var t;
    if (SdkReportStartFlow.IfNeedReport(e.FlowId, e.FlowStateId)) {
      (t = new SdkReportStartFlow(undefined)).FlowId = e.FlowId;
      this.Report(t);
    }
  }
  static OnSdkPay() {
    var e = new SdkReportPay(undefined);
    this.Report(e);
  }
  static OnPayShopDirectBuy(e) {
    var t;
    if (SdkReportDirectBuy.IfNeedReport(e)) {
      (t = new SdkReportDirectBuy(undefined)).PayItemId = e;
      this.Report(t);
    }
  }
  static OnChapterStart(e, t) {}
  static OnGachaResult(t, r) {
    if (t !== 0) {
      var e = ModelManager_1.ModelManager.GachaModel.GetValidGachaList().find(e => e.GachaInfo.Id === t);
      if (e) {
        var E = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e.PoolInfo.Id).Type;
        if (E === 2 || E === 4) {
          let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SdkReportStateMap);
          if (e) {
            if (E === 2 && e.get(HIGHGACHAPOOLREPORTSTATEKEY) === 1) {
              return;
            }
            if (E === 4 && e.get(NORMALGACHAPOOLREPORTSTATEKEY) === 1) {
              return;
            }
          }
          e = e || new Map();
          for (const R of r) {
            var o = R.e9n?.L8n;
            var o = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(o);
            if (o && o.QualityId >= 5) {
              if (E === 2) {
                o = new SdkReportFirstUpFiveStarHero(undefined);
                this.Report(o);
                e.set(HIGHGACHAPOOLREPORTSTATEKEY, 1);
                LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SdkReportStateMap, e);
                return;
              }
              if (E === 4) {
                o = new SdkReportFirstNormalFiveStarHero(undefined);
                this.Report(o);
                e.set(NORMALGACHAPOOLREPORTSTATEKEY, 1);
                LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SdkReportStateMap, e);
                return;
              }
            }
          }
        }
      }
    }
  }
  static OnRougeFinish() {
    let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SdkReportStateMap);
    var t;
    if (!e || e.get(ROUGEFINISHSTATEKEY) !== 1) {
      e = e || new Map();
      t = new SdkReportGetRougeLevel60(undefined);
      this.Report(t);
      e.set(ROUGEFINISHSTATEKEY, 1);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SdkReportStateMap, e);
    }
  }
}
exports.KuroSdkReport = KuroSdkReport;
(_a = KuroSdkReport).USe = e => {
  var t;
  if (SdkReportRecharge.IfNeedReport(e.PayItemId)) {
    (t = new SdkReportRecharge(undefined)).PayItemId = e.PayItemId;
    _a.Report(t);
  }
};
KuroSdkReport.DSe = (e, t) => {
  var r;
  if (SdkReportQuestFinish.IfNeedReport(e)) {
    (r = new SdkReportQuestFinish(undefined)).QuestId = e;
    _a.Report(r);
  }
  if (SdkReportChapter.IfNeedReport(e, 0) && t === Protocol_1.Aki.Protocol.hTs.a3_) {
    (r = new SdkReportChapter(undefined)).TreeConfigId = e;
    _a.Report(r);
  }
};
KuroSdkReport.RSe = (e, t, r) => {
  var E;
  if (e.Type === 6 && (E = e.TreeConfigId, e = e.NodeId, SdkReportBattleTech.IfNeedReport(E, e)) && r === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished) {
    (r = new SdkReportBattleTech(undefined)).TreeConfigId = E;
    r.NodeId = e;
    _a.Report(r);
  }
};
class SdkReportGameInitFinish extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "Game_Initialize";
    } else {
      return "";
    }
  }
}
exports.SdkReportGameInitFinish = SdkReportGameInitFinish;
class SdkReportOpenPrivacy extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "Game_Privacy";
    } else {
      return "";
    }
  }
}
exports.SdkReportOpenPrivacy = SdkReportOpenPrivacy;
class SdkReportChangeAccount extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "Change_account";
    } else {
      return "";
    }
  }
}
exports.SdkReportChangeAccount = SdkReportChangeAccount;
class SdkReportCreateRole extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "Completed_Registration";
    } else {
      return "event_1";
    }
  }
  GetEventDataJson() {
    if (this.IfGlobalSdk) {
      this.EventData = new Map();
      this.EventData.set("eventId", CREATEROLEEVENTID);
    } else {
      this.EventData = new Map();
      this.EventData.set("param1", CREATEROLEEVENTID);
    }
    return super.GetEventDataJson();
  }
}
exports.SdkReportCreateRole = SdkReportCreateRole;
class SdkReportClickEnterGame extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "click_entergame";
    } else {
      return "event_2";
    }
  }
}
exports.SdkReportClickEnterGame = SdkReportClickEnterGame;
class SdkReportBattleTech extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.TreeConfigId = 0;
    this.NodeId = 0;
  }
  static IfNeedReport(e, t) {
    return e === KILLPHANTOMMISSION && (t === KILLPHANTOMSTEP1 || t === KILLPHANTOMSTEP2 || t === KILLPHANTOMSTEP3) || e === CAPTUREPHANTOMMISSION && KILLPHANTOMSTEP4 === t || e === CAPTUREPHANTOMMISSION && GOJINZHOU === t;
  }
  GetEventName() {
    return this.IfGlobalSdk && SdkReportBattleTech.ASe.get(this.NodeId) || "";
  }
  GetEventDataJson() {
    this.EventData = new Map();
    this.EventData.set("eventId", BATTLEEVENTID);
    this.EventData.set("TreeId", this.TreeConfigId.toString());
    this.EventData.set("StepId", this.NodeId.toString());
    return super.GetEventDataJson();
  }
}
(exports.SdkReportBattleTech = SdkReportBattleTech).ASe = new Map([[KILLPHANTOMSTEP1, "Beginner_level_Battle_Teach_Finish"], [KILLPHANTOMSTEP2, "Intermediater_level_Battle_Teach_Finish"], [KILLPHANTOMSTEP3, "Advanced_level_Battle_Teach_Finish"], [KILLPHANTOMSTEP4, "capture_Teach_Finish"], [GOJINZHOU, "Prologue_Task_Finish"]]);
class SdkReportQuestFinish extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.QuestId = 0;
  }
  static IfNeedReport(e) {
    if (e === CAPTUREPHANTOMMISSION && ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3) {
      return true;
    }
    return false;
  }
  GetEventName() {
    return this.IfGlobalSdk && SdkReportQuestFinish.ASe.get(this.QuestId) || "";
  }
  GetEventDataJson() {
    if (this.QuestId === CAPTUREPHANTOMMISSION) {
      this.EventData = new Map();
      this.EventData.set("eventId", QUESTEVENTID);
      this.EventData.set("QuestId", this.QuestId.toString());
    }
    return super.GetEventDataJson();
  }
}
(exports.SdkReportQuestFinish = SdkReportQuestFinish).ASe = new Map([[CAPTUREPHANTOMMISSION, "Prologue_Task_Finish"]]);
class SdkReportStartFlow extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.FlowId = 0;
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "Anime_end";
    } else {
      return "";
    }
  }
  static IfNeedReport(e, t) {
    return e === STARTFLOW && t === STARTSTATE;
  }
  GetEventDataJson() {
    this.EventData = new Map();
    this.EventData.set("eventId", FLOWEVENTID);
    this.EventData.set("FlowId", this.FlowId.toString());
    return super.GetEventDataJson();
  }
}
exports.SdkReportStartFlow = SdkReportStartFlow;
class SdkReportRecharge extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.PayItemId = 0;
  }
  static IfNeedReport(e) {
    return e >= RECHARGEONE && e <= RECHARGESIX;
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      const e = SdkReportRecharge.ASe.get(this.PayItemId);
      if (e) {
        return e;
      } else {
        return "";
      }
    }
    const e = SdkReportRecharge.PSe.get(this.PayItemId);
    return e || "";
  }
}
(exports.SdkReportRecharge = SdkReportRecharge).ASe = new Map([[RECHARGEONE, "Purchase_099"], [RECHARGETWO, "Purchase_499"], [RECHARGETHREE, "Purchase_1499"], [RECHARGEFOUR, "Purchase_2999"], [RECHARGEFIVE, "Purchase_4999"], [RECHARGESIX, "Purchase_9999"]]);
SdkReportRecharge.PSe = new Map([[RECHARGEONE, "event_5"], [RECHARGETWO, "event_6"], [RECHARGETHREE, "event_7"], [RECHARGEFOUR, "event_8"], [RECHARGEFIVE, "event_9"], [RECHARGESIX, "event_10"]]);
class SdkReportPay extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "";
    } else {
      return "event_4";
    }
  }
}
exports.SdkReportPay = SdkReportPay;
class SdkReportDirectBuy extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.PayItemId = 0;
  }
  static IfNeedReport(e) {
    return e === PayShopDefine_1.MONTH_CARD_SHOP_ID || e === PayShopDefine_1.BATTLE_PASS_PRIMARY_ID || e === PayShopDefine_1.BATTLE_PASS_HIGH_ID || e === PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID;
  }
  GetEventName() {
    return this.IfGlobalSdk && SdkReportDirectBuy.ASe.get(this.PayItemId) || "";
  }
}
(exports.SdkReportDirectBuy = SdkReportDirectBuy).ASe = new Map([[PayShopDefine_1.MONTH_CARD_SHOP_ID, "Monthly_card"], [PayShopDefine_1.BATTLE_PASS_PRIMARY_ID, "BattlePass_Primary"], [PayShopDefine_1.BATTLE_PASS_HIGH_ID, "BattlePass_HIGH"], [PayShopDefine_1.BATTLE_PASS_PRIMARY_TO_HIGH_ID, "BattlePass_Primary_To_HIGH"]]);
class SdkReportChapter extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.TreeConfigId = 0;
  }
  static IfNeedReport(e, t) {
    return e === CHAPTERCPRE1 || e === CHAPTERCPRE2 || e === CHAPTERC11 || e === CHAPTERC12 || e === CHAPTERC13 || e === CHAPTERC14 || e === CHAPTERC15 || e === CHAPTERC16;
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      const e = SdkReportChapter.ASe.get(this.TreeConfigId);
      if (e) {
        return e;
      } else {
        return "";
      }
    }
    const e = SdkReportChapter.PSe.get(this.TreeConfigId);
    return e || "";
  }
}
(exports.SdkReportChapter = SdkReportChapter).ASe = new Map([[CHAPTERCPRE1, "Complete_pre_1"], [CHAPTERCPRE2, "Complete_pre_2"], [CHAPTERC11, "Complete_C1_1"], [CHAPTERC12, "Complete_C1_2"], [CHAPTERC13, "Complete_C1_3"], [CHAPTERC14, "Complete_C1_4"], [CHAPTERC15, "Complete_C1_5"], [CHAPTERC16, "Complete_C1_6"]]);
SdkReportChapter.PSe = new Map([[CHAPTERCPRE1, "event_12"], [CHAPTERCPRE2, "event_13"], [CHAPTERC11, "event_14"], [CHAPTERC12, "event_15"], [CHAPTERC13, "event_16"], [CHAPTERC14, "event_17"], [CHAPTERC15, "event_18"], [CHAPTERC16, "event_19"]]);
class SdkReportLevel extends SdkReportData_1.SdkReportData {
  constructor() {
    super(...arguments);
    this.Level = 0;
  }
  static IfNeedReport(e) {
    return !!SdkReportLevel.xSe.includes(e);
  }
  GetEventName() {
    if (this.IfGlobalSdk) {
      return StringUtils_1.StringUtils.Format("Level_{0}", this.Level.toString());
    } else {
      return SdkReportLevel.PSe.get(this.Level) || "";
    }
  }
}
(exports.SdkReportLevel = SdkReportLevel).xSe = new Array(REPORTLEVEL8, REPORTLEVEL10, REPORTLEVEL12, REPORTLEVEL15, REPORTLEVEL20, REPORTLEVEL25, REPORTLEVEL30, REPORTLEVEL35, REPORTLEVEL40, REPORTLEVEL45);
SdkReportLevel.PSe = new Map([[REPORTLEVEL8, "event_20"], [REPORTLEVEL10, "event_21"], [REPORTLEVEL12, "event_22"], [REPORTLEVEL15, "event_23"], [REPORTLEVEL20, "event_24"], [REPORTLEVEL25, "event_25"], [REPORTLEVEL30, "event_26"], [REPORTLEVEL35, "event_27"], [REPORTLEVEL40, "event_28"], [REPORTLEVEL45, "event_29"]]);
class SdkReportGetRougeLevel60 extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "rogue_level60";
    } else {
      return "";
    }
  }
}
exports.SdkReportGetRougeLevel60 = SdkReportGetRougeLevel60;
class SdkReportFirstNormalFiveStarHero extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "first_normal_5star_hero";
    } else {
      return "";
    }
  }
}
exports.SdkReportFirstNormalFiveStarHero = SdkReportFirstNormalFiveStarHero;
class SdkReportFirstUpFiveStarHero extends SdkReportData_1.SdkReportData {
  GetEventName() {
    if (this.IfGlobalSdk) {
      return "first_up_5star_hero";
    } else {
      return "";
    }
  }
}
exports.SdkReportFirstUpFiveStarHero = SdkReportFirstUpFiveStarHero;
//# sourceMappingURL=KuroSdkReport.js.map