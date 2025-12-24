"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMark = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const IntVector_1 = require("./SubType/IntVector");
class MapMark {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get InstanceDungeonId() {
    return this.instancedungeonid();
  }
  get MapId() {
    return this.mapid();
  }
  get RelativeDungeonId() {
    return this.relativedungeonid();
  }
  get RelativeType() {
    return this.relativetype();
  }
  get RelativeSubType() {
    return this.relativesubtype();
  }
  get RelativeId() {
    return this.relativeid();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  get FogHide() {
    return this.foghide();
  }
  get MarkVector() {
    return this.markvector();
  }
  get ObjectType() {
    return this.objecttype();
  }
  get MarkTitle() {
    return this.marktitle();
  }
  get MarkDesc() {
    return this.markdesc();
  }
  get ToBeDiscovered() {
    return this.tobediscovered();
  }
  get IsMonster() {
    return this.ismonster();
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), this.showrange, this);
  }
  get LockMarkPic() {
    return this.lockmarkpic();
  }
  get UnlockMarkPic() {
    return this.unlockmarkpic();
  }
  get ShowCondition() {
    return this.showcondition();
  }
  get FogShow() {
    return this.fogshow();
  }
  get MapShow() {
    return this.mapshow();
  }
  get Scale() {
    return this.scale();
  }
  get CornerScale() {
    return this.cornerscale();
  }
  get FirstReward() {
    return this.firstreward();
  }
  get Reward() {
    return this.reward();
  }
  get MultiMapFloorId() {
    return this.multimapfloorid();
  }
  get ConnetMultiMapFloorId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.connetmultimapflooridLength(), this.connetmultimapfloorid, this);
  }
  get TrackHudEnable() {
    return this.trackhudenable();
  }
  get TrackAutoCancelDistance() {
    return this.trackautocanceldistance();
  }
  get CreateOnStart() {
    return this.createonstart();
  }
  get EnableQuickTransfer() {
    return this.enablequicktransfer();
  }
  get FinishIsShow() {
    return this.finishisshow();
  }
  get HistoryState() {
    return this.historystate();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get DeliveryProp() {
    return GameUtils_1.GameUtils.ConvertToMap(this.deliverypropLength(), this.deliverypropKey, this.deliverypropValue, this);
  }
  deliverypropKey(t) {
    return this.deliveryprop(t)?.key();
  }
  deliverypropValue(t) {
    return this.deliveryprop(t)?.value();
  }
  get AssociatedGameplayMarks() {
    return GameUtils_1.GameUtils.ConvertToArray(this.associatedgameplaymarksLength(), this.associatedgameplaymarks, this);
  }
  get GameplayLockText() {
    return this.gameplaylocktext();
  }
  get GameplayLockJumpId() {
    return this.gameplaylockjumpid();
  }
  get AreaShowText() {
    return GameUtils_1.GameUtils.ConvertToArray(this.areashowtextLength(), this.areashowtext, this);
  }
  get IsDisableGameplayFinishIcon() {
    return this.isdisablegameplayfinishicon();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMapMark(t, i) {
    return (i || new MapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instancedungeonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  relativedungeonid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  relativetype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relativesubtype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  relativeid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  foghide() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markvector(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (t || new IntVector_1.IntVector()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  objecttype() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  marktitle(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  markdesc(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tobediscovered() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ismonster() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showpriority() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  lockmarkpic(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  unlockmarkpic(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showcondition() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fogshow() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapshow() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scale() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  cornerscale() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  firstreward() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  multimapfloorid() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConnetmultimapflooridAt(t) {
    return this.connetmultimapfloorid(t);
  }
  connetmultimapfloorid(t) {
    var i = this.J7.__offset(this.z7, 58);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  connetmultimapflooridLength() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  connetmultimapflooridArray() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  trackhudenable() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  trackautocanceldistance() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 400;
    }
  }
  createonstart() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  enablequicktransfer() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finishisshow() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  historystate() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDeliverypropAt(t, i) {
    return this.deliveryprop(t);
  }
  deliveryprop(t, i) {
    var s = this.J7.__offset(this.z7, 74);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  deliverypropLength() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAssociatedgameplaymarksAt(t) {
    return this.associatedgameplaymarks(t);
  }
  associatedgameplaymarks(t) {
    var i = this.J7.__offset(this.z7, 76);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  associatedgameplaymarksLength() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  associatedgameplaymarksArray() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  gameplaylocktext(t) {
    var i = this.J7.__offset(this.z7, 78);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  gameplaylockjumpid() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAreashowtextAt(t) {
    return this.areashowtext(t);
  }
  areashowtext(t, i) {
    var s = this.J7.__offset(this.z7, 82);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  areashowtextLength() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  isdisablegameplayfinishicon() {
    var t = this.J7.__offset(this.z7, 84);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.MapMark = MapMark;
//# sourceMappingURL=MapMark.js.map