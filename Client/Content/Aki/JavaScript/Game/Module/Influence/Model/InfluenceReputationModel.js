"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceReputationModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
const InfluenceInstance_1 = require("./InfluenceInstance");
class InfluenceReputationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Xni = new Map();
    this.$ni = new Set();
  }
  SetInfluenceInfoList(e) {
    for (const t of e) {
      var n = this.Xni.get(t.y9n);
      if (n) {
        n.SetRelation(t.Cws);
        n.SetReceiveReward(t.I9n);
      } else {
        this.Xni.set(t.y9n, new InfluenceInstance_1.InfluenceInstance(t.y9n, t.I9n, t.Cws));
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotInfluence, t.y9n);
    }
  }
  UpdateInfluenceRewardIndex(e, n) {
    var t = this.Xni.get(e);
    if (t) {
      t.SetReceiveReward(n);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InfluenceReputation", 10, "奖励获取有问题,当前客户端没有该势力数据", ["Id", e]);
      }
      return false;
    }
  }
  GetInfluenceInstance(e) {
    return this.Xni.get(e);
  }
  GetCanReceiveReward(e) {
    if (e !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID) {
      var n = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(e);
      var e = ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(e);
      if (e) {
        if (n.ReputationReward.length === e.RewardIndex + 1) {
          return {
            IsAllReceived: true,
            Reward: n.ReputationReward[e.RewardIndex]
          };
        } else {
          return {
            IsAllReceived: false,
            Reward: n.ReputationReward[e.RewardIndex + 1]
          };
        }
      }
    }
  }
  GetRewardList(e) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    return Array.from(e.DropPreview);
  }
  GetReputationProgress(e) {
    let n = 0;
    let t = 0;
    for (const o of ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(e).ReputationItem) {
      n += o.Item2;
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o.Item1);
      t += MathUtils_1.MathUtils.Clamp(r, 0, o.Item2);
    }
    return {
      Current: t,
      Max: n
    };
  }
  SetUnLockCountry(t) {
    for (let e = 0, n = t.length; e < n; e++) {
      this.$ni.add(t[e]);
    }
  }
  GetUnLockCountry() {
    return Array.from(this.$ni);
  }
  IsCountryUnLock(e) {
    return this.$ni.has(e);
  }
  FilterUnLockInfluence(t, r) {
    var o = [];
    for (let e = 0, n = t.length; e < n; ++e) {
      var a;
      var i;
      var u = t[e];
      if (u !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID && this.Xni.has(u)) {
        a = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceTitle(u);
        i = new RegExp(r, "i");
        if (!(a.search(i) < 0)) {
          o.push(u);
        }
      }
    }
    return o;
  }
  FilterUnLockInfluenceList(e, n) {
    var t;
    var r = {
      HasResult: false,
      InfluenceList: []
    };
    for (const o of e) {
      if (o !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID) {
        t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(o);
        t = this.FilterUnLockInfluence(t.Influences, n);
        r.InfluenceList.push([o, t]);
        r.HasResult = r.HasResult || t.length > 0;
      }
    }
    return r;
  }
  RedDotInfluenceRewardCondition(e) {
    var n = this.GetCanReceiveReward(e);
    return !!n && !n.IsAllReceived && this.GetReputationProgress(e).Current >= n.Reward.Item1;
  }
  HasRedDotExcludeCurrentCountry(e) {
    for (const n of this.$ni) {
      if (n !== e) {
        if (this.HasRedDotInCurrentCountry(n)) {
          return true;
        }
      }
    }
    return false;
  }
  HasRedDotInCurrentCountry(e) {
    for (const n of ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e).Influences) {
      if (this.RedDotInfluenceRewardCondition(n)) {
        return true;
      }
    }
    return false;
  }
}
exports.InfluenceReputationModel = InfluenceReputationModel;
//# sourceMappingURL=InfluenceReputationModel.js.map