"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleCard = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const OneItemConfig_1 = require("./SubType/OneItemConfig");
class PhantomBattleCard {
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
  get Type() {
    return this.type();
  }
  get ItemType() {
    return this.itemtype();
  }
  get DealDurabilityEmptyType() {
    return this.dealdurabilityemptytype();
  }
  get CopyLifeRound() {
    return this.copyliferound();
  }
  get SkillDelay() {
    return this.skilldelay();
  }
  get UnlockConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockconsumeitemsLength(), this.unlockconsumeitems, this);
  }
  get UpOutLookConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(this.upoutlookconsumeitemsLength(), this.upoutlookconsumeitems, this);
  }
  get Name() {
    return this.name();
  }
  get BattlePower() {
    return this.battlepower();
  }
  get Cost() {
    return this.cost();
  }
  get BackRecoverCost() {
    return this.backrecovercost();
  }
  get Element() {
    return this.element();
  }
  get CardGroupNum() {
    return this.cardgroupnum();
  }
  get SlotTendency() {
    return this.slottendency();
  }
  get CardAddTendency() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardaddtendencyLength(), this.cardaddtendency, this);
  }
  get PassiveSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskillidLength(), this.passiveskillid, this);
  }
  get CountSkill() {
    return this.countskill();
  }
  get CountConfig() {
    return this.countconfig();
  }
  get ActiveSkillTag() {
    return this.activeskilltag();
  }
  get ActiveSkillId() {
    return this.activeskillid();
  }
  get DurableSkillId() {
    return this.durableskillid();
  }
  get DurableSkillCd() {
    return this.durableskillcd();
  }
  get FieldConditionDesc() {
    return this.fieldconditiondesc();
  }
  get FieldUnlockConditionDesc() {
    return this.fieldunlockconditiondesc();
  }
  get FieldConditionIcon() {
    return this.fieldconditionicon();
  }
  get FieldTriggerDesc() {
    return this.fieldtriggerdesc();
  }
  get CardFactorId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardfactoridLength(), this.cardfactorid, this);
  }
  get InitAttack() {
    return GameUtils_1.GameUtils.ConvertToMap(this.initattackLength(), this.initattackKey, this.initattackValue, this);
  }
  initattackKey(t) {
    return this.initattack(t)?.key();
  }
  initattackValue(t) {
    return this.initattack(t)?.value();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get AttrLevel() {
    return this.attrlevel();
  }
  get BaseProId() {
    return this.baseproid();
  }
  get CardEffectDescription() {
    return this.cardeffectdescription();
  }
  get CardEffectDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardeffectdescriptionparamsLength(), this.cardeffectdescriptionparams, this);
  }
  get DurableSkillDescription() {
    return this.durableskilldescription();
  }
  get DurableSkillDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.durableskilldescriptionparamsLength(), this.durableskilldescriptionparams, this);
  }
  get CountSkillDescription() {
    return this.countskilldescription();
  }
  get CountSkillDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.countskilldescriptionparamsLength(), this.countskilldescriptionparams, this);
  }
  get EntryIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.entryidlistLength(), this.entryidlist, this);
  }
  get CardFaceTexture() {
    return this.cardfacetexture();
  }
  get DeckFaceTexture() {
    return this.deckfacetexture();
  }
  get BvbIcon() {
    return this.bvbicon();
  }
  get SpineAtlas() {
    return this.spineatlas();
  }
  get SpineSkeleton() {
    return this.spineskeleton();
  }
  get QualityId() {
    return this.qualityid();
  }
  get ConditionDesc() {
    return this.conditiondesc();
  }
  get EnableBuy() {
    return this.enablebuy();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get BgDescription() {
    return this.bgdescription();
  }
  get Icon() {
    return this.icon();
  }
  get IconMiddle() {
    return this.iconmiddle();
  }
  get IconSmall() {
    return this.iconsmall();
  }
  get Mesh() {
    return this.mesh();
  }
  get ObtainedShowDescription() {
    return this.obtainedshowdescription();
  }
  get ShowInBag() {
    return this.showinbag();
  }
  get ItemAccess() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemaccessLength(), this.itemaccess, this);
  }
  get SortIndex() {
    return this.sortindex();
  }
  get RedDotDisableRule() {
    return this.reddotdisablerule();
  }
  get AtmosphereEffect() {
    return this.atmosphereeffect();
  }
  get SettingEffect() {
    return GameUtils_1.GameUtils.ConvertToArray(this.settingeffectLength(), this.settingeffect, this);
  }
  get TaskBg() {
    return this.taskbg();
  }
  get FieldBg() {
    return this.fieldbg();
  }
  get EffectId() {
    return this.effectid();
  }
  get IsNpcCard() {
    return this.isnpccard();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleCard(t, i) {
    return (i || new PhantomBattleCard()).__init(t.readInt32(t.position()) + t.position(), t);
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
  type() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  itemtype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dealdurabilityemptytype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  copyliferound() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  skilldelay() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetUnlockconsumeitemsAt(t, i) {
    return this.unlockconsumeitems(t);
  }
  unlockconsumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new OneItemConfig_1.OneItemConfig()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  unlockconsumeitemsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetUpoutlookconsumeitemsAt(t, i) {
    return this.upoutlookconsumeitems(t);
  }
  upoutlookconsumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new OneItemConfig_1.OneItemConfig()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  upoutlookconsumeitemsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  battlepower() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cost() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  backrecovercost() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  element() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardgroupnum() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  slottendency() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetCardaddtendencyAt(t) {
    return this.cardaddtendency(t);
  }
  cardaddtendency(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  cardaddtendencyLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardaddtendencyArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPassiveskillidAt(t) {
    return this.passiveskillid(t);
  }
  passiveskillid(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  passiveskillidLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  passiveskillidArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  countskill() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  countconfig() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activeskilltag() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activeskillid() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durableskillid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durableskillcd() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  fieldconditiondesc(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fieldunlockconditiondesc(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fieldconditionicon(t) {
    var i = this.J7.__offset(this.z7, 56);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fieldtriggerdesc(t) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetCardfactoridAt(t) {
    return this.cardfactorid(t);
  }
  cardfactorid(t) {
    var i = this.J7.__offset(this.z7, 60);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  cardfactoridLength() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardfactoridArray() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetInitattackAt(t, i) {
    return this.initattack(t);
  }
  initattack(t, i) {
    var s = this.J7.__offset(this.z7, 62);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  initattackLength() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attrlevel() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  baseproid() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardeffectdescription(t) {
    var i = this.J7.__offset(this.z7, 70);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetCardeffectdescriptionparamsAt(t) {
    return this.cardeffectdescriptionparams(t);
  }
  cardeffectdescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 72);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  cardeffectdescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  durableskilldescription(t) {
    var i = this.J7.__offset(this.z7, 74);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetDurableskilldescriptionparamsAt(t) {
    return this.durableskilldescriptionparams(t);
  }
  durableskilldescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 76);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  durableskilldescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  countskilldescription(t) {
    var i = this.J7.__offset(this.z7, 78);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetCountskilldescriptionparamsAt(t) {
    return this.countskilldescriptionparams(t);
  }
  countskilldescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 80);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  countskilldescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEntryidlistAt(t) {
    return this.entryidlist(t);
  }
  entryidlist(t) {
    var i = this.J7.__offset(this.z7, 82);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  entryidlistLength() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  entryidlistArray() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  cardfacetexture(t) {
    var i = this.J7.__offset(this.z7, 84);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  deckfacetexture(t) {
    var i = this.J7.__offset(this.z7, 86);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbicon(t) {
    var i = this.J7.__offset(this.z7, 88);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  spineatlas(t) {
    var i = this.J7.__offset(this.z7, 90);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  spineskeleton(t) {
    var i = this.J7.__offset(this.z7, 92);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 94);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiondesc(t) {
    var i = this.J7.__offset(this.z7, 96);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  enablebuy() {
    var t = this.J7.__offset(this.z7, 98);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 100);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 102);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bgdescription(t) {
    var i = this.J7.__offset(this.z7, 104);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 106);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconmiddle(t) {
    var i = this.J7.__offset(this.z7, 108);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconsmall(t) {
    var i = this.J7.__offset(this.z7, 110);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 112);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  obtainedshowdescription(t) {
    var i = this.J7.__offset(this.z7, 114);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showinbag() {
    var t = this.J7.__offset(this.z7, 116);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetItemaccessAt(t) {
    return this.itemaccess(t);
  }
  itemaccess(t) {
    var i = this.J7.__offset(this.z7, 118);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  itemaccessLength() {
    var t = this.J7.__offset(this.z7, 118);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemaccessArray() {
    var t = this.J7.__offset(this.z7, 118);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reddotdisablerule() {
    var t = this.J7.__offset(this.z7, 122);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atmosphereeffect(t) {
    var i = this.J7.__offset(this.z7, 124);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSettingeffectAt(t) {
    return this.settingeffect(t);
  }
  settingeffect(t, i) {
    var s = this.J7.__offset(this.z7, 126);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  settingeffectLength() {
    var t = this.J7.__offset(this.z7, 126);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskbg(t) {
    var i = this.J7.__offset(this.z7, 128);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fieldbg(t) {
    var i = this.J7.__offset(this.z7, 130);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effectid() {
    var t = this.J7.__offset(this.z7, 132);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  isnpccard() {
    var t = this.J7.__offset(this.z7, 134);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PhantomBattleCard = PhantomBattleCard;
//# sourceMappingURL=PhantomBattleCard.js.map