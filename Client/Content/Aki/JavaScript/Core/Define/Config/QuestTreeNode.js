"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNode = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class QuestTreeNode {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ChapterId() {
    return this.chapterid();
  }
  get QuestArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.questarrayLength(), this.questarray, this);
  }
  get Name() {
    return this.name();
  }
  get QuestType() {
    return this.questtype();
  }
  get NodeType() {
    return this.nodetype();
  }
  get MainQuestNode() {
    return this.mainquestnode();
  }
  get PreNode() {
    return GameUtils_1.GameUtils.ConvertToArray(this.prenodeLength(), this.prenode, this);
  }
  get NextNode() {
    return this.nextnode();
  }
  get IsChapterEnding() {
    return this.ischapterending();
  }
  get IncludeNodes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.includenodesLength(), this.includenodes, this);
  }
  get UnlockConditions() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockconditionsLength(), this.unlockconditions, this);
  }
  get AccessPath() {
    return this.accesspath();
  }
  get AccessDesc() {
    return this.accessdesc();
  }
  get SortOrder() {
    return this.sortorder();
  }
  get Summary() {
    return this.summary();
  }
  get ImageSmall() {
    return this.imagesmall();
  }
  get ImageSmallFemale() {
    return this.imagesmallfemale();
  }
  get ImageLarge() {
    return this.imagelarge();
  }
  get ImageLargeFemale() {
    return this.imagelargefemale();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsQuestTreeNode(t, s) {
    return (s || new QuestTreeNode()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  chapterid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuestarrayAt(t) {
    return this.questarray(t);
  }
  questarray(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  questarrayLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  questarrayArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  questtype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nodetype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainquestnode() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPrenodeAt(t) {
    return this.prenode(t);
  }
  prenode(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  prenodeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  prenodeArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  nextnode() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ischapterending() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetIncludenodesAt(t) {
    return this.includenodes(t);
  }
  includenodes(t) {
    var s = this.J7.__offset(this.z7, 24);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  includenodesLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  includenodesArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUnlockconditionsAt(t) {
    return this.unlockconditions(t);
  }
  unlockconditions(t) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  unlockconditionsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockconditionsArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  accesspath() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  accessdesc(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  sortorder() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  summary(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagesmall(t) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagesmallfemale(t) {
    var s = this.J7.__offset(this.z7, 38);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagelarge(t) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagelargefemale(t) {
    var s = this.J7.__offset(this.z7, 42);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.QuestTreeNode = QuestTreeNode;
//# sourceMappingURL=QuestTreeNode.js.map