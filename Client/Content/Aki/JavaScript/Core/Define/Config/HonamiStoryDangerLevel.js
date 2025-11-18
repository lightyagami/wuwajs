"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryDangerLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryDangerLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Level() {
    return this.level();
  }
  get MonsterEnhanceLevel() {
    return this.monsterenhancelevel();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeitemsLength(), this.consumeitemsKey, this.consumeitemsValue, this);
  }
  consumeitemsKey(t) {
    return this.consumeitems(t)?.key();
  }
  consumeitemsValue(t) {
    return this.consumeitems(t)?.value();
  }
  get SafeLeavePrice() {
    return this.safeleaveprice();
  }
  get AddDropLevel() {
    return this.adddroplevel();
  }
  get DangerLv() {
    return this.dangerlv();
  }
  get PollutionGroup() {
    return this.pollutiongroup();
  }
  get LvShow() {
    return this.lvshow();
  }
  get FallQuaId() {
    return this.fallquaid();
  }
  get HightQuality() {
    return this.hightquality();
  }
  get BoZaiTalk() {
    return this.bozaitalk();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryDangerLevel(t, i) {
    return (i || new HonamiStoryDangerLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterenhancelevel() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  safeleaveprice() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  adddroplevel() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dangerlv() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pollutiongroup() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lvshow(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fallquaid(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  hightquality() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bozaitalk() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryDangerLevel = HonamiStoryDangerLevel;
//# sourceMappingURL=HonamiStoryDangerLevel.js.map