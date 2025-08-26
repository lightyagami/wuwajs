"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChapterDivideFloatTips = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const QuestChapterById_1 = require("../../../../Core/Define/ConfigQuery/QuestChapterById");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class ChapterDivideFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments);
    this.aJt = undefined;
    this.hJt = () => {
      this.CloseMe(t => {
        if (t) {
          this.Data.CloseCallback?.();
        }
      });
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UIText]);
    this.ComponentRegisterInfos.push([3, UE.UITexture]);
    this.ComponentRegisterInfos.push([4, UE.UIButtonComponent]);
    this.BtnBindInfo.push([4, this.hJt]);
  }
  lJt() {
    this.RootItem.SetAlpha(1);
    this.MainText.GetParentAsUIItem().GetParentAsUIItem().SetAlpha(1);
  }
  OnAfterShow() {
    this.lJt();
    this.GetButton(4)?.RootUIComp.SetRaycastTarget(true);
  }
  _Jt(t) {
    this.aJt = QuestChapterById_1.configQuestChapterById.GetConfig(t);
    if (!this.aJt) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 10, "策划的章节Id配错了！！", ["错误的章节Id", t]);
      }
    }
  }
  SetExtraText(...t) {
    var e = t[0];
    this._Jt(e);
    if (this.aJt) {
      this.SetTextureByPath(this.aJt.ChapterIcon, this.GetTexture(3));
    }
    if (this.aJt) {
      this.ExtraText.SetText(this.CombineChapterExtraText(this.aJt));
    }
    if (t.length > 1) {
      e = t[1];
      this.GetText(2)?.SetText(e);
    }
  }
  OnBeforeShow() {
    var t;
    this.GetButton(4)?.RootUIComp.SetRaycastTarget(false);
    if (this.Info.Name === "ChapterEndFloatTips" || this.Info.Name === "FlowChapterEndTips") {
      (t = this.OpenParam).StartSequenceName = "Accomplish";
      this.UiViewSequence?.SetSequenceName(t);
    } else if (this.Info.Name === "ChapterA" || this.Info.Name === "PlotChapterA") {
      if (this.OpenParam.ChapterState === 1) {
        (t = this.OpenParam).StartSequenceName = "Accomplish";
        this.UiViewSequence?.SetSequenceName(t);
      }
    }
  }
  CombineChapterExtraText(t) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum) + "·" + MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum);
  }
}
exports.ChapterDivideFloatTips = ChapterDivideFloatTips;
//# sourceMappingURL=ChapterDivideFloatTips.js.map