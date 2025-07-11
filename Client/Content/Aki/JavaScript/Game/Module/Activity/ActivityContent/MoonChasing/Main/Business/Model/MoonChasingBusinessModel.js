"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingBusinessModel = undefined;
const ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const BusinessDefine_1 = require("../BusinessDefine");
const CharacterData_1 = require("./CharacterData");
const DelegationData_1 = require("./DelegationData");
const EditTeamData_1 = require("./EditTeamData");
class MoonChasingBusinessModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Qke = new Map();
    this.Xke = new Map();
    this.$ke = undefined;
    this.rha = [];
    this.oha = false;
    this.dTa = (e, t) => {
      var a;
      var r;
      if (e.IsOwn !== t.IsOwn) {
        if (e.IsOwn) {
          return -1;
        } else {
          return 1;
        }
      } else if (e.Level !== t.Level) {
        if (e.Level > t.Level) {
          return -1;
        } else {
          return 1;
        }
      } else if ((a = e.GetAllCharacterValue()) !== (r = t.GetAllCharacterValue())) {
        if (r < a) {
          return -1;
        } else {
          return 1;
        }
      } else if ((r = e.GetTeamDataUnLockState() === 1) != (t.GetTeamDataUnLockState() === 1)) {
        if (r) {
          return -1;
        } else {
          return 1;
        }
      } else if (e.Id < t.Id) {
        return -1;
      } else {
        return 1;
      }
    };
  }
  get IsInDelegate() {
    return this.oha;
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleAll();
    if (e) {
      for (const a of e) {
        var t = new EditTeamData_1.EditTeamData(a.Id, a.Type, a.UnLockCondition);
        this.Xke.set(a.Id, t);
      }
    }
    return true;
  }
  SetAllDelegationData(e) {
    for (const t of e) {
      this.SetDelegationData(t);
    }
  }
  SetDelegationData(e) {
    var t = new DelegationData_1.DelegationData(e.X6n, e.FGs, e.NGs);
    this.Qke.set(e.X6n, t);
  }
  ReplaceDelegationData(e, t) {
    if (e === t.X6n) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshDelegate, false);
    } else {
      this.Qke.delete(e);
      this.SetDelegationData(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshDelegate, true);
    }
  }
  ConditionUnlockDelegationData(e) {
    this.SetDelegationData(e);
  }
  GetDelegationData(e) {
    return this.Qke.get(e);
  }
  GetDelegationDataList() {
    var e = Array.from(this.Qke.values());
    e.sort((e, t) => {
      var a;
      var r;
      if (e.IsVisible !== t.IsVisible) {
        if (e.IsVisible) {
          return -1;
        } else {
          return 1;
        }
      } else {
        a = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(e.Id);
        r = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(t.Id);
        if (a.Star !== r.Star) {
          if (a.Star < r.Star) {
            return -1;
          } else {
            return 1;
          }
        } else if (e.BestEvaluateLevel !== t.BestEvaluateLevel) {
          if (e.BestEvaluateLevel < t.BestEvaluateLevel) {
            return -1;
          } else {
            return 1;
          }
        } else if (e.Id < t.Id) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    return e;
  }
  SetAllEditTeamData(e) {
    for (const t of e) {
      this.SetEditTeamData(t);
    }
  }
  SetEditTeamData(e) {
    var t = this.Xke.get(e.BGs.Q6n);
    if (t) {
      t.IsOwn = true;
      t.SetCharacterDataList(e.BGs);
    }
  }
  DeepCopyEditTeamData(e) {
    var t = new EditTeamData_1.EditTeamData(e.Id, e.Type, e.UnLockCondition);
    t.SetCharacterDataByEditTeamData(e);
    return t;
  }
  ConditionUnlockEditTeamData(e) {
    this.SetEditTeamData(e);
    this.rha.push(e.BGs.Q6n);
    ModelManager_1.ModelManager.MoonChasingModel.SaveRoleIdUnlockFlag(e.BGs.Q6n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ConditionUnlockRole);
  }
  PopUnlockRoleId() {
    return this.rha.shift();
  }
  IsUnlockRoleIdEmpty() {
    return this.rha.length === 0;
  }
  GetHelpEditTeamDataList(e = false) {
    var t = [];
    for (const a of this.Xke.values()) {
      if (!!this.x1a(a.Type) && (a.Type === 0 || !!e)) {
        t.push(a);
      }
    }
    t.sort(this.dTa);
    return t;
  }
  GetUnlockHelpEditTeamDataList(e = false) {
    var t = [];
    for (const a of this.Xke.values()) {
      if (this.x1a(a.Type) && (a.Type === 0 || e) && a.IsOwn) {
        t.push(a);
      }
    }
    t.sort(this.dTa);
    return t;
  }
  GetPlayerRoleId() {
    for (const e of this.Xke.values()) {
      if (this.x1a(e.Type) && e.Type !== 0) {
        return e.Id;
      }
    }
    return 0;
  }
  x1a(e) {
    var t = ModelManager_1.ModelManager.PlayerInfoModel;
    return (e !== 1 || t.GetPlayerGender() === 1) && (e !== 2 || t.GetPlayerGender() === 0);
  }
  GetOwnEditTeamDataList() {
    var e = [];
    for (const t of this.Xke.values()) {
      if (this.x1a(t.Type) && t.IsOwn) {
        e.push(t);
      }
    }
    e.sort((e, t) => {
      var a;
      var r;
      if (e.Level !== t.Level) {
        if (e.Level > t.Level) {
          return -1;
        } else {
          return 1;
        }
      } else if ((a = e.GetAllCharacterValue()) !== (r = t.GetAllCharacterValue())) {
        if (r < a) {
          return -1;
        } else {
          return 1;
        }
      } else if (e.Id < t.Id) {
        return -1;
      } else {
        return 1;
      }
    });
    return e;
  }
  GetEditTeamDataById(e) {
    return this.Xke.get(e);
  }
  SetResultData(e) {
    this.$ke = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetDelegationResultData);
  }
  GetResultData() {
    return this.$ke;
  }
  Yke(t) {
    var a = [];
    for (let e = 1; e <= BusinessDefine_1.CHARACTER_MAX; ++e) {
      var r = new CharacterData_1.CharacterData(e);
      r.SetUseScoreName(t);
      a.push(r);
    }
    return a;
  }
  GetCharacterValueListByRoleIds(e, t) {
    var a = this.Yke(t);
    for (const i of e) {
      var r = this.Xke.get(i).GetCharacterDataList();
      for (let e = 0; e < BusinessDefine_1.CHARACTER_MAX; ++e) {
        var n = a[e];
        n.SetCurrentValue(n.CurrentValue + r[e].CurrentValue);
      }
    }
    return a;
  }
  GetInvestData(e) {
    var t = this.GetResultData();
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(t.EntrustId);
    var a = Array.from(t.IdeaSuccRatio);
    let r = 0;
    r = e >= a[1][0] ? a[1][1] / 10 : ((a[1][1] - a[0][1]) / (a[1][0] - a[0][0]) * e + a[0][1]) / 10;
    a = t.IdeaSuccMul[0] / 1000 * e / (t.IdeaSuccMul[1] / 1000 + e);
    return {
      SuccessProbability: Math.floor(r),
      Ratio: Math.floor((1 + a) * 100)
    };
  }
  GetCurrentPopularityConfig() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    return this.GetPopularityConfigByValue(e);
  }
  GetLastPopularityConfig() {
    let e = undefined;
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetPopularityAll();
    var a = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    for (const r of t) {
      if (r.PopularityValue > a) {
        break;
      }
      e = r;
    }
    return e;
  }
  GetPopularityConfigByValue(e) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetPopularityAll();
    for (const a of t) {
      if (a.PopularityValue > e) {
        return a;
      }
    }
    return t[t.length - 1];
  }
  SetIsInDelegate(e) {
    if (!(this.oha = e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ConditionUnlockRole);
    }
  }
}
exports.MoonChasingBusinessModel = MoonChasingBusinessModel;
//# sourceMappingURL=MoonChasingBusinessModel.js.map