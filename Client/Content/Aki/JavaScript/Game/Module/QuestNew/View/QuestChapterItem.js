"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestChapterItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestItem_1 = require("./QuestItem");
class QuestChapterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QuestList = undefined;
    this.dno = 0;
    this.Cno = undefined;
  }
  Init(t, e, i, s, r) {
    this.CreateThenShowByActor(t.GetOwner());
    t.SetActive(true);
    this.Cno = r;
    this.QuestList = [];
    this.UpdateItem(e, i, s);
    this.gno();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UISprite], [6, UE.UISprite]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(false);
  }
  OnTick(t) {
    if (this.QuestList) {
      for (const e of this.QuestList) {
        e.OnTick(t);
      }
    }
  }
  UpdateItem(t, i, s) {
    this.dno = t;
    var r;
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(i);
    if (!StringUtils_1.StringUtils.IsEmpty(t?.QuestChapterBg)) {
      this.SetSpriteByPath(t.QuestChapterBg, this.GetSprite(5), false);
    }
    {
      let e = 0;
      for (const h of s) {
        let t = undefined;
        if (e < this.QuestList.length) {
          t = this.QuestList[e];
        } else {
          r = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(2).GetParentAsUIItem());
          (t = new QuestItem_1.QuestItem(this.Cno)).SetRootActor(r.GetOwner(), true);
          this.QuestList.push(t);
        }
        t.UpdateItem(h, i);
        e++;
      }
    }
    this.QuestList.forEach((t, e) => {
      t.SetActiveItem(e < s.length);
    });
    this.fno();
  }
  FindByQuestId(e) {
    return this.QuestList.find(t => t.QuestId === e);
  }
  fno() {
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(this.dno);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterName) ?? "";
    this.GetText(0).SetText(e);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "QuestChapterText", e, t);
  }
  gno() {
    var t = this.GetExtendToggle(4);
    t.SetToggleState(1);
    t.OnStateChange.Add(t => {
      if (t === 1) {
        this.GetItem(3).SetUIActive(true);
      } else {
        this.GetItem(3).SetUIActive(false);
      }
    });
  }
  SetSelected(t) {
    if (t) {
      this.GetExtendToggle(4).SetToggleState(1, true);
    }
    this.GetSprite(6)?.SetUIActive(t);
  }
}
exports.QuestChapterItem = QuestChapterItem;
//# sourceMappingURL=QuestChapterItem.js.map