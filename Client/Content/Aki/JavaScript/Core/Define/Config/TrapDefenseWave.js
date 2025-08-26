"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseWave = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TrapDefenseWave {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WaveId() {
    return this.waveid();
  }
  get TrapDefenseLevelId() {
    return this.trapdefenselevelid();
  }
  get RewardGold() {
    return this.rewardgold();
  }
  get BdDrawConfigId() {
    return this.bddrawconfigid();
  }
  get BdDrawCount() {
    return this.bddrawcount();
  }
  get BdDrawConfigIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bddrawconfigidsLength(), this.bddrawconfigids, this);
  }
  get GurantteBdDrawRefreshCount() {
    return this.guranttebddrawrefreshcount();
  }
  get GurantteBdDrawRefreshGold() {
    return this.guranttebddrawrefreshgold();
  }
  get ShopConfigId() {
    return this.shopconfigid();
  }
  get ReadStageEnhanceTips() {
    return this.readstageenhancetips();
  }
  get WaveEnhanceTips() {
    return this.waveenhancetips();
  }
  get WaveWarningTips() {
    return this.wavewarningtips();
  }
  get MapId() {
    return this.mapid();
  }
  get SplineList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.splinelistLength(), this.splinelist, this);
  }
  get CampEntityId() {
    return this.campentityid();
  }
  get WaveGainings() {
    return GameUtils_1.GameUtils.ConvertToArray(this.wavegainingsLength(), this.wavegainings, this);
  }
  get CanBuildMachine() {
    return this.canbuildmachine();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTrapDefenseWave(t, i) {
    return (i || new TrapDefenseWave()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  waveid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trapdefenselevelid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardgold() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bddrawconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bddrawcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBddrawconfigidsAt(t) {
    return this.bddrawconfigids(t);
  }
  bddrawconfigids(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bddrawconfigidsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bddrawconfigidsArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  guranttebddrawrefreshcount() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guranttebddrawrefreshgold() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopconfigid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  readstageenhancetips(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  waveenhancetips(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  wavewarningtips(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSplinelistAt(t) {
    return this.splinelist(t);
  }
  splinelist(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  splinelistLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  splinelistArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  campentityid() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWavegainingsAt(t) {
    return this.wavegainings(t);
  }
  wavegainings(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  wavegainingsLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  wavegainingsArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  canbuildmachine() {
    var t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.TrapDefenseWave = TrapDefenseWave;
//# sourceMappingURL=TrapDefenseWave.js.map