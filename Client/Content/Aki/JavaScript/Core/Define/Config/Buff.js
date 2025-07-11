"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Buff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class Buff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GeDesc() {
    return this.gedesc();
  }
  get DurationPolicy() {
    return this.durationpolicy();
  }
  get DurationCalculationPolicy() {
    return GameUtils_1.GameUtils.ConvertToArray(this.durationcalculationpolicyLength(), this.durationcalculationpolicy, this);
  }
  get DurationMagnitude() {
    return GameUtils_1.GameUtils.ConvertToArray(this.durationmagnitudeLength(), this.durationmagnitude, this);
  }
  get DurationMagnitude2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.durationmagnitude2Length(), this.durationmagnitude2, this);
  }
  get bDurationAffectedByBulletTime() {
    return this.bdurationaffectedbybullettime();
  }
  get FormationPolicy() {
    return this.formationpolicy();
  }
  get Probability() {
    return this.probability();
  }
  get Period() {
    return this.period();
  }
  get bExecutePeriodicEffectOnApplication() {
    return this.bexecuteperiodiceffectonapplication();
  }
  get PeriodicInhibitionPolicy() {
    return this.periodicinhibitionpolicy();
  }
  get GameAttributeID() {
    return this.gameattributeid();
  }
  get CalculationPolicy() {
    return GameUtils_1.GameUtils.ConvertToArray(this.calculationpolicyLength(), this.calculationpolicy, this);
  }
  get ModifierMagnitude() {
    return GameUtils_1.GameUtils.ConvertToArray(this.modifiermagnitudeLength(), this.modifiermagnitude, this);
  }
  get ModifierMagnitude2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.modifiermagnitude2Length(), this.modifiermagnitude2, this);
  }
  get StackingType() {
    return this.stackingtype();
  }
  get DefaultStackCount() {
    return this.defaultstackcount();
  }
  get StackAppendCount() {
    return this.stackappendcount();
  }
  get StackLimitCount() {
    return this.stacklimitcount();
  }
  get StackDurationRefreshPolicy() {
    return this.stackdurationrefreshpolicy();
  }
  get StackPeriodResetPolicy() {
    return this.stackperiodresetpolicy();
  }
  get StackExpirationRemoveNumber() {
    return this.stackexpirationremovenumber();
  }
  get bDenyOverflowApplication() {
    return this.bdenyoverflowapplication();
  }
  get bClearStackOnOverflow() {
    return this.bclearstackonoverflow();
  }
  get bRequireModifierSuccessToTriggerCues() {
    return this.brequiremodifiersuccesstotriggercues();
  }
  get bSuppressStackingCues() {
    return this.bsuppressstackingcues();
  }
  get GameplayCueIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gameplaycueidsLength(), this.gameplaycueids, this);
  }
  get GrantedTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.grantedtagsLength(), this.grantedtags, this);
  }
  get ApplicationSourceTagRequirements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.applicationsourcetagrequirementsLength(), this.applicationsourcetagrequirements, this);
  }
  get ApplicationSourceTagIgnores() {
    return GameUtils_1.GameUtils.ConvertToArray(this.applicationsourcetagignoresLength(), this.applicationsourcetagignores, this);
  }
  get ApplicationTagRequirements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.applicationtagrequirementsLength(), this.applicationtagrequirements, this);
  }
  get ApplicationTagIgnores() {
    return GameUtils_1.GameUtils.ConvertToArray(this.applicationtagignoresLength(), this.applicationtagignores, this);
  }
  get OngoingTagRequirements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ongoingtagrequirementsLength(), this.ongoingtagrequirements, this);
  }
  get OngoingTagIgnores() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ongoingtagignoresLength(), this.ongoingtagignores, this);
  }
  get RemovalTagRequirements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.removaltagrequirementsLength(), this.removaltagrequirements, this);
  }
  get RemovalTagIgnores() {
    return GameUtils_1.GameUtils.ConvertToArray(this.removaltagignoresLength(), this.removaltagignores, this);
  }
  get RemoveBuffWithTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.removebuffwithtagsLength(), this.removebuffwithtags, this);
  }
  get GrantedApplicationImmunityTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.grantedapplicationimmunitytagsLength(), this.grantedapplicationimmunitytags, this);
  }
  get GrantedApplicationImmunityTagIgnores() {
    return GameUtils_1.GameUtils.ConvertToArray(this.grantedapplicationimmunitytagignoresLength(), this.grantedapplicationimmunitytagignores, this);
  }
  get PrematureExpirationEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.prematureexpirationeffectsLength(), this.prematureexpirationeffects, this);
  }
  get RoutineExpirationEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.routineexpirationeffectsLength(), this.routineexpirationeffects, this);
  }
  get OverflowEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.overfloweffectsLength(), this.overfloweffects, this);
  }
  get RelatedExtraEffectBuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.relatedextraeffectbuffidLength(), this.relatedextraeffectbuffid, this);
  }
  get ExtraEffectID() {
    return this.extraeffectid();
  }
  get ExtraEffectParameters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectparametersLength(), this.extraeffectparameters, this);
  }
  get ExtraEffectParametersGrow1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectparametersgrow1Length(), this.extraeffectparametersgrow1, this);
  }
  get ExtraEffectParametersGrow2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectparametersgrow2Length(), this.extraeffectparametersgrow2, this);
  }
  get ExtraEffectRequirements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectrequirementsLength(), this.extraeffectrequirements, this);
  }
  get ExtraEffectReqPara() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectreqparaLength(), this.extraeffectreqpara, this);
  }
  get ExtraEffectReqSetting() {
    return this.extraeffectreqsetting();
  }
  get ExtraEffectCD() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectcdLength(), this.extraeffectcd, this);
  }
  get ExtraEffectRemoveStackNum() {
    return this.extraeffectremovestacknum();
  }
  get ExtraEffectProbability() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffectprobabilityLength(), this.extraeffectprobability, this);
  }
  get BuffAction() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffactionLength(), this.buffaction, this);
  }
  get TagLogic() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taglogicLength(), this.taglogic, this);
  }
  get DeadRemove() {
    return this.deadremove();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBuff(t, i) {
    return (i || new Buff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  gedesc(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  durationpolicy() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDurationcalculationpolicyAt(t) {
    return this.durationcalculationpolicy(t);
  }
  durationcalculationpolicy(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  durationcalculationpolicyLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationcalculationpolicyArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDurationmagnitudeAt(t) {
    return this.durationmagnitude(t);
  }
  durationmagnitude(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  durationmagnitudeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationmagnitudeArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDurationmagnitude2At(t) {
    return this.durationmagnitude2(t);
  }
  durationmagnitude2(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  durationmagnitude2Length() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationmagnitude2Array() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  bdurationaffectedbybullettime() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  formationpolicy() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  probability() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  period() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bexecuteperiodiceffectonapplication() {
    var t = this.J7.__offset(this.z7, 24);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  periodicinhibitionpolicy() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gameattributeid() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCalculationpolicyAt(t) {
    return this.calculationpolicy(t);
  }
  calculationpolicy(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  calculationpolicyLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  calculationpolicyArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetModifiermagnitudeAt(t) {
    return this.modifiermagnitude(t);
  }
  modifiermagnitude(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  modifiermagnitudeLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  modifiermagnitudeArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetModifiermagnitude2At(t) {
    return this.modifiermagnitude2(t);
  }
  modifiermagnitude2(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  modifiermagnitude2Length() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  modifiermagnitude2Array() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  stackingtype() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  defaultstackcount() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  stackappendcount() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stacklimitcount() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  stackdurationrefreshpolicy() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stackperiodresetpolicy() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stackexpirationremovenumber() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  bdenyoverflowapplication() {
    var t = this.J7.__offset(this.z7, 50);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  bclearstackonoverflow() {
    var t = this.J7.__offset(this.z7, 52);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  brequiremodifiersuccesstotriggercues() {
    var t = this.J7.__offset(this.z7, 54);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  bsuppressstackingcues() {
    var t = this.J7.__offset(this.z7, 56);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetGameplaycueidsAt(t) {
    return this.gameplaycueids(t);
  }
  gameplaycueids(t) {
    var i = this.J7.__offset(this.z7, 58);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  gameplaycueidsLength() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  gameplaycueidsArray() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGrantedtagsAt(t) {
    return this.grantedtags(t);
  }
  grantedtags(t, i) {
    var s = this.J7.__offset(this.z7, 60);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  grantedtagsLength() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetApplicationsourcetagrequirementsAt(t) {
    return this.applicationsourcetagrequirements(t);
  }
  applicationsourcetagrequirements(t, i) {
    var s = this.J7.__offset(this.z7, 62);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  applicationsourcetagrequirementsLength() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetApplicationsourcetagignoresAt(t) {
    return this.applicationsourcetagignores(t);
  }
  applicationsourcetagignores(t, i) {
    var s = this.J7.__offset(this.z7, 64);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  applicationsourcetagignoresLength() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetApplicationtagrequirementsAt(t) {
    return this.applicationtagrequirements(t);
  }
  applicationtagrequirements(t, i) {
    var s = this.J7.__offset(this.z7, 66);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  applicationtagrequirementsLength() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetApplicationtagignoresAt(t) {
    return this.applicationtagignores(t);
  }
  applicationtagignores(t, i) {
    var s = this.J7.__offset(this.z7, 68);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  applicationtagignoresLength() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOngoingtagrequirementsAt(t) {
    return this.ongoingtagrequirements(t);
  }
  ongoingtagrequirements(t, i) {
    var s = this.J7.__offset(this.z7, 70);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ongoingtagrequirementsLength() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOngoingtagignoresAt(t) {
    return this.ongoingtagignores(t);
  }
  ongoingtagignores(t, i) {
    var s = this.J7.__offset(this.z7, 72);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ongoingtagignoresLength() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRemovaltagrequirementsAt(t) {
    return this.removaltagrequirements(t);
  }
  removaltagrequirements(t, i) {
    var s = this.J7.__offset(this.z7, 74);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  removaltagrequirementsLength() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRemovaltagignoresAt(t) {
    return this.removaltagignores(t);
  }
  removaltagignores(t, i) {
    var s = this.J7.__offset(this.z7, 76);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  removaltagignoresLength() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRemovebuffwithtagsAt(t) {
    return this.removebuffwithtags(t);
  }
  removebuffwithtags(t, i) {
    var s = this.J7.__offset(this.z7, 78);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  removebuffwithtagsLength() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGrantedapplicationimmunitytagsAt(t) {
    return this.grantedapplicationimmunitytags(t);
  }
  grantedapplicationimmunitytags(t, i) {
    var s = this.J7.__offset(this.z7, 80);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  grantedapplicationimmunitytagsLength() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGrantedapplicationimmunitytagignoresAt(t) {
    return this.grantedapplicationimmunitytagignores(t);
  }
  grantedapplicationimmunitytagignores(t, i) {
    var s = this.J7.__offset(this.z7, 82);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  grantedapplicationimmunitytagignoresLength() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPrematureexpirationeffectsAt(t) {
    return this.prematureexpirationeffects(t);
  }
  prematureexpirationeffects(t) {
    var i = this.J7.__offset(this.z7, 84);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  prematureexpirationeffectsLength() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  prematureexpirationeffectsArray() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRoutineexpirationeffectsAt(t) {
    return this.routineexpirationeffects(t);
  }
  routineexpirationeffects(t) {
    var i = this.J7.__offset(this.z7, 86);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  routineexpirationeffectsLength() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  routineexpirationeffectsArray() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetOverfloweffectsAt(t) {
    return this.overfloweffects(t);
  }
  overfloweffects(t) {
    var i = this.J7.__offset(this.z7, 88);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  overfloweffectsLength() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  overfloweffectsArray() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRelatedextraeffectbuffidAt(t) {
    return this.relatedextraeffectbuffid(t);
  }
  relatedextraeffectbuffid(t) {
    var i = this.J7.__offset(this.z7, 90);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  relatedextraeffectbuffidLength() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  relatedextraeffectbuffidArray() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  extraeffectid() {
    var t = this.J7.__offset(this.z7, 92);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffectparametersAt(t) {
    return this.extraeffectparameters(t);
  }
  extraeffectparameters(t, i) {
    var s = this.J7.__offset(this.z7, 94);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffectparametersLength() {
    var t = this.J7.__offset(this.z7, 94);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffectparametersgrow1At(t) {
    return this.extraeffectparametersgrow1(t);
  }
  extraeffectparametersgrow1(t) {
    var i = this.J7.__offset(this.z7, 96);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  extraeffectparametersgrow1Length() {
    var t = this.J7.__offset(this.z7, 96);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectparametersgrow1Array() {
    var t = this.J7.__offset(this.z7, 96);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExtraeffectparametersgrow2At(t) {
    return this.extraeffectparametersgrow2(t);
  }
  extraeffectparametersgrow2(t) {
    var i = this.J7.__offset(this.z7, 98);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  extraeffectparametersgrow2Length() {
    var t = this.J7.__offset(this.z7, 98);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectparametersgrow2Array() {
    var t = this.J7.__offset(this.z7, 98);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExtraeffectrequirementsAt(t) {
    return this.extraeffectrequirements(t);
  }
  extraeffectrequirements(t) {
    var i = this.J7.__offset(this.z7, 100);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  extraeffectrequirementsLength() {
    var t = this.J7.__offset(this.z7, 100);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectrequirementsArray() {
    var t = this.J7.__offset(this.z7, 100);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExtraeffectreqparaAt(t) {
    return this.extraeffectreqpara(t);
  }
  extraeffectreqpara(t, i) {
    var s = this.J7.__offset(this.z7, 102);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffectreqparaLength() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectreqsetting() {
    var t = this.J7.__offset(this.z7, 104);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffectcdAt(t) {
    return this.extraeffectcd(t);
  }
  extraeffectcd(t) {
    var i = this.J7.__offset(this.z7, 106);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  extraeffectcdLength() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectcdArray() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  extraeffectremovestacknum() {
    var t = this.J7.__offset(this.z7, 108);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffectprobabilityAt(t) {
    return this.extraeffectprobability(t);
  }
  extraeffectprobability(t) {
    var i = this.J7.__offset(this.z7, 110);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  extraeffectprobabilityLength() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraeffectprobabilityArray() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBuffactionAt(t) {
    return this.buffaction(t);
  }
  buffaction(t, i) {
    var s = this.J7.__offset(this.z7, 112);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffactionLength() {
    var t = this.J7.__offset(this.z7, 112);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTaglogicAt(t, i) {
    return this.taglogic(t);
  }
  taglogic(t, i) {
    var s = this.J7.__offset(this.z7, 114);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  taglogicLength() {
    var t = this.J7.__offset(this.z7, 114);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  deadremove() {
    var t = this.J7.__offset(this.z7, 116);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.Buff = Buff;
//# sourceMappingURL=Buff.js.map