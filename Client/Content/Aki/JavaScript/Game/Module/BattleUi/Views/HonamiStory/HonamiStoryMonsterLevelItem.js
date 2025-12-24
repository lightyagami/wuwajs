"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMonsterLevelItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const StateExtraItemBase_1 = require("../StateExtra/StateExtraItemBase");
class HonamiStoryMonsterLevelItem extends StateExtraItemBase_1.StateExtraItemBase {
  constructor() {
    super(...arguments);
    this.$sm = 0;
    this.PGc = 0;
    this.Wft = 0;
    this.G2e = 0;
    this.Wsm = e => {
      e = this.$sm + e + ModelManager_1.ModelManager.HonamiStoryModel.MonsterBaseEnhanceLevel;
      this.pmt(e, this.PGc);
    };
    this.Qsm = (e, t) => {
      this.pmt(this.Wft, t);
    };
  }
  OnInitExtraParams(e) {
    var e = e.HonamiStoryLevel;
    var t = ModelManager_1.ModelManager.HonamiStoryModel.PlayerData.PowerLevel ?? 0;
    this.$sm = e;
    var s = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
    var e = e + (ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap?.get(s)?.MonsterEnhanceLevel ?? 0) + ModelManager_1.ModelManager.HonamiStoryModel.MonsterBaseEnhanceLevel;
    this.pmt(e, t, true);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.Qsm)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.Qsm);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, this.Wsm)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, this.Wsm);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite]];
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.Qsm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, this.Wsm);
  }
  pmt(e, t, s = false) {
    this.PGc = t;
    t = this.Ksm(e, t);
    if (!!s || this.G2e !== t) {
      this.Xsm(t);
      this.G2e = t;
    }
    if (!!s || this.Wft !== e) {
      this.GetText(0).SetText(e.toString());
      this.Wft = e;
    }
  }
  Xsm(e) {
    let t = "#a5f3cbff";
    let s = "#a5f3cb99";
    if (e === 1) {
      t = "#f8dc97ff";
      s = "#fae8bd99";
    } else if (e === 2) {
      t = "#f47d89ff";
      s = "#90586099";
    }
    this.GetText(0).SetColor(UE.Color.FromHex(t));
    e = UE.Color.FromHex(s);
    this.GetSprite(1).SetColor(e);
    this.GetSprite(2).SetColor(e);
    this.GetSprite(3).SetColor(e);
  }
  Ksm(e, t) {
    t -= e;
    if (t > ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelSafeOffset) {
      return 0;
    } else if (t < ModelManager_1.ModelManager.HonamiStoryModel.MonsterLevelDangerOffset) {
      return 2;
    } else {
      return 1;
    }
  }
}
exports.HonamiStoryMonsterLevelItem = HonamiStoryMonsterLevelItem;
//# sourceMappingURL=HonamiStoryMonsterLevelItem.js.map