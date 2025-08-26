"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FloroRanchActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LimitTime() {
    return this.limittime();
  }
  get TechTreeCoinId() {
    return this.techtreecoinid();
  }
  get ResetGachaBaseCost() {
    return this.resetgachabasecost();
  }
  get ResetGachaRiseCost() {
    return this.resetgacharisecost();
  }
  get ResetShopBaseCost() {
    return this.resetshopbasecost();
  }
  get ResetShopRiseCost() {
    return this.resetshoprisecost();
  }
  get ShopItemTypeToyNum() {
    return this.shopitemtypetoynum();
  }
  get ShopItemTypeCardNum() {
    return this.shopitemtypecardnum();
  }
  get ShopItemTypeCardGroupNum() {
    return this.shopitemtypecardgroupnum();
  }
  get UnlimitedParamBase() {
    return this.unlimitedparambase();
  }
  get UnlimitedParamRise() {
    return this.unlimitedparamrise();
  }
  get EventCD() {
    return this.eventcd();
  }
  get Speed() {
    return this.speed();
  }
  get MilestoneItemId() {
    return this.milestoneitemid();
  }
  get CardItemId() {
    return this.carditemid();
  }
  get MaxToyNum() {
    return this.maxtoynum();
  }
  get StartToyNum() {
    return this.starttoynum();
  }
  get CardGroupBaseCardNum() {
    return this.cardgroupbasecardnum();
  }
  get TechPointItem() {
    return this.techpointitem();
  }
  get UnlimitedModeStageTargetParam() {
    return this.unlimitedmodestagetargetparam();
  }
  get AnimalNumLimit() {
    return this.animalnumlimit();
  }
  get StaticRaces() {
    return GameUtils_1.GameUtils.ConvertToArray(this.staticracesLength(), this.staticraces, this);
  }
  get VoidTagId() {
    return this.voidtagid();
  }
  get ActionStopTextKey() {
    return this.actionstoptextkey();
  }
  get MaxTotalCoin() {
    return this.maxtotalcoin();
  }
  get MaxDay() {
    return this.maxday();
  }
  get MaxSettleText() {
    return this.maxsettletext();
  }
  get GachaGuarantee() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gachaguaranteeLength(), this.gachaguarantee, this);
  }
  get ComicIntervalTime() {
    return this.comicintervaltime();
  }
  get RecommendQuestId() {
    return this.recommendquestid();
  }
  get RecommendQuestLinkList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendquestlinklistLength(), this.recommendquestlinklist, this);
  }
  get RecommendQuestLabel() {
    return this.recommendquestlabel();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFloroRanchActivity(t, i) {
    return (i || new FloroRanchActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limittime() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  techtreecoinid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetgachabasecost() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetgacharisecost() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetshopbasecost() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetshoprisecost() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopitemtypetoynum() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopitemtypecardnum() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopitemtypecardgroupnum() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlimitedparambase() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlimitedparamrise() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  eventcd() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  speed() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  milestoneitemid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  carditemid() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxtoynum() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  starttoynum() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardgroupbasecardnum() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  techpointitem() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlimitedmodestagetargetparam() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  animalnumlimit() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStaticracesAt(t) {
    return this.staticraces(t);
  }
  staticraces(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  staticracesLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  staticracesArray() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  voidtagid() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actionstoptextkey(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  maxtotalcoin() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt64(this.z7 + t);
    } else {
      return BigInt("0");
    }
  }
  maxday() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxsettletext(t) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetGachaguaranteeAt(t) {
    return this.gachaguarantee(t);
  }
  gachaguarantee(t) {
    var i = this.J7.__offset(this.z7, 60);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  gachaguaranteeLength() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gachaguaranteeArray() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  comicintervaltime() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendquestlinklistAt(t) {
    return this.recommendquestlinklist(t);
  }
  recommendquestlinklist(t) {
    var i = this.J7.__offset(this.z7, 66);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendquestlinklistLength() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendquestlinklistArray() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  recommendquestlabel(t) {
    var i = this.J7.__offset(this.z7, 68);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.FloroRanchActivity = FloroRanchActivity;
//# sourceMappingURL=FloroRanchActivity.js.map