"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookDynamicLayoutItemData = exports.WeaponHandBookDynamicData = exports.MonsterHandBookDynamicData = exports.HandBookNounDynamicData = exports.HandBookChipDynamicData = exports.noSelectColor = exports.selectColor = exports.HandBookQuestViewOpenParam = exports.HandBookPlotDynamicData = exports.HandBookQuestDynamicData = exports.HandBookQuestNode = exports.HandBookPhotoData = exports.HandBookCommonItemData = exports.HandBookDropItemData = exports.HandBookContentItemData = exports.HandBookEntry = undefined;
const UE = require("ue");
class HandBookEntry {
  constructor(t, o, s, a) {
    this.Id = t;
    this.CreateTime = o;
    this.Num = s;
    this.IsRead = a;
  }
}
exports.HandBookEntry = HandBookEntry;
class HandBookContentItemData {
  constructor(t, o) {
    this.Title = t;
    this.Desc = o;
  }
}
exports.HandBookContentItemData = HandBookContentItemData;
class HandBookDropItemData {
  constructor(t, o, s) {
    this.Title = t;
    this.Place = o;
    this.ItemData = s;
  }
}
exports.HandBookDropItemData = HandBookDropItemData;
class HandBookCommonItemData {
  constructor() {
    this.Icon = "";
    this.QualityId = 0;
    this.Title = "";
    this.IsLock = false;
    this.IsNew = false;
    this.ConfigId = 0;
  }
}
exports.HandBookCommonItemData = HandBookCommonItemData;
class HandBookPhotoData {
  constructor() {
    this.TextureList = undefined;
    this.TypeText = undefined;
    this.NameText = undefined;
    this.DescrtptionText = undefined;
    this.DateText = undefined;
    this.Index = 0;
    this.HandBookType = 0;
    this.ConfigId = undefined;
  }
}
exports.HandBookPhotoData = HandBookPhotoData;
class HandBookQuestNode {
  constructor(t = "", o = undefined, s = 0, a = 0) {
    this.TidText = t;
    this.FlowListName = o;
    this.FlowId = s;
    this.StateId = a;
  }
}
exports.HandBookQuestNode = HandBookQuestNode;
class HandBookQuestDynamicData {
  constructor() {
    this.TidText = "";
  }
}
exports.HandBookQuestDynamicData = HandBookQuestDynamicData;
class HandBookPlotDynamicData {
  constructor() {
    this.PlotAudio = undefined;
    this.TalkOwnerName = undefined;
    this.TalkText = undefined;
    this.TalkOption = undefined;
    this.TalkItemId = -1;
    this.PlotId = -1;
    this.IsChoseOption = false;
    this.OptionIndex = 0;
    this.OptionTalker = false;
    this.MoveId = 0;
    this.NodeText = undefined;
    this.BelongToNode = "";
  }
}
exports.HandBookPlotDynamicData = HandBookPlotDynamicData;
class HandBookQuestViewOpenParam {
  constructor() {
    this.ConfigIdList = undefined;
    this.Index = 0;
  }
}
exports.HandBookQuestViewOpenParam = HandBookQuestViewOpenParam;
exports.selectColor = UE.Color.FromHex("ECE5D8FF");
exports.noSelectColor = UE.Color.FromHex("ADADADFF");
class HandBookChipDynamicData {
  constructor() {
    this.HandBookChipConfigId = 0;
    this.HandBookCommonItemData = undefined;
    this.IsShowContent = false;
  }
}
exports.HandBookChipDynamicData = HandBookChipDynamicData;
class HandBookNounDynamicData {
  constructor() {
    this.HandBookNounConfigId = 0;
    this.HandBookCommonItemData = undefined;
    this.IsShowContent = false;
  }
}
exports.HandBookNounDynamicData = HandBookNounDynamicData;
class MonsterHandBookDynamicData {
  constructor() {
    this.TitleId = undefined;
    this.MonsterList = undefined;
  }
}
exports.MonsterHandBookDynamicData = MonsterHandBookDynamicData;
class WeaponHandBookDynamicData {
  constructor() {
    this.TitleId = undefined;
    this.ItemData = undefined;
  }
}
exports.WeaponHandBookDynamicData = WeaponHandBookDynamicData;
class WeaponHandBookDynamicLayoutItemData {
  constructor() {
    this.IsSkin = false;
    this.ItemId = undefined;
  }
}
exports.WeaponHandBookDynamicLayoutItemData = WeaponHandBookDynamicLayoutItemData;
//# sourceMappingURL=HandBookDefine.js.map