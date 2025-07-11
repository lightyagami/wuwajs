"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAudio = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class RoleAudio {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get FootstepEvent() {
    return this.footstepevent();
  }
  get FoleyEvent() {
    return this.foleyevent();
  }
  get FastClimbEvent() {
    return this.fastclimbevent();
  }
  get VisionMorphEvent() {
    return this.visionmorphevent();
  }
  get VisionSummonEvent() {
    return this.visionsummonevent();
  }
  get OpenTreasureBoxEvent() {
    return this.opentreasureboxevent();
  }
  get ScanTreasureBoxEvent() {
    return this.scantreasureboxevent();
  }
  get JoinTeamEvent() {
    return this.jointeamevent();
  }
  get LostHealthEventMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.losthealtheventmapLength(), this.losthealtheventmapKey, this.losthealtheventmapValue, this);
  }
  losthealtheventmapKey(t) {
    return this.losthealtheventmap(t)?.key();
  }
  losthealtheventmapValue(t) {
    return this.losthealtheventmap(t)?.value();
  }
  get DeathEvent() {
    return this.deathevent();
  }
  get LowStrengthEvent() {
    return this.lowstrengthevent();
  }
  get BreakUpEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.breakupeventlistLength(), this.breakupeventlist, this);
  }
  get ExtremeDodgeEvent() {
    return this.extremedodgeevent();
  }
  get ParryEvent() {
    return this.parryevent();
  }
  get EnterBattleEvent() {
    return this.enterbattleevent();
  }
  get UnderAttackEvent() {
    return this.underattackevent();
  }
  get KnockUpEvent() {
    return this.knockupevent();
  }
  get EnterGlideEvent() {
    return this.enterglideevent();
  }
  get UseExploreHookEvent() {
    return this.useexplorehookevent();
  }
  get ClimbLeapEvent() {
    return this.climbleapevent();
  }
  get AccelerateEvent() {
    return this.accelerateevent();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleAudio(t, e) {
    return (e || new RoleAudio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  footstepevent(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  foleyevent(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  fastclimbevent(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  visionmorphevent(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  visionsummonevent(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  opentreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  scantreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 20);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  jointeamevent(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetLosthealtheventmapAt(t, e) {
    return this.losthealtheventmap(t);
  }
  losthealtheventmap(t, e) {
    var s = this.J7.__offset(this.z7, 24);
    if (s) {
      return (e || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  losthealtheventmapLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  deathevent(t) {
    var e = this.J7.__offset(this.z7, 26);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  lowstrengthevent(t) {
    var e = this.J7.__offset(this.z7, 28);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetBreakupeventlistAt(t) {
    return this.breakupeventlist(t);
  }
  breakupeventlist(t, e) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  breakupeventlistLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extremedodgeevent(t) {
    var e = this.J7.__offset(this.z7, 32);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  parryevent(t) {
    var e = this.J7.__offset(this.z7, 34);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  enterbattleevent(t) {
    var e = this.J7.__offset(this.z7, 36);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  underattackevent(t) {
    var e = this.J7.__offset(this.z7, 38);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  knockupevent(t) {
    var e = this.J7.__offset(this.z7, 40);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  enterglideevent(t) {
    var e = this.J7.__offset(this.z7, 42);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  useexplorehookevent(t) {
    var e = this.J7.__offset(this.z7, 44);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  climbleapevent(t) {
    var e = this.J7.__offset(this.z7, 46);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  accelerateevent(t) {
    var e = this.J7.__offset(this.z7, 48);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RoleAudio = RoleAudio;
//# sourceMappingURL=RoleAudio.js.map