"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuestItemChildItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const RICHTXT_SELECTED = "<color=#5988a5>{0}</color>";
const RICHTXT_DESELECTED = "<color=#b3dffa>{0}</color>";
class HonamiStoryQuestItemChildItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.CNe = undefined;
    this.sOn = undefined;
    this.Z6c = undefined;
    this.kqe = () => {
      this.Z6c?.(this);
    };
    this.Yai = () => {
      this.Shm();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[4, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(4)?.OnStateChange.Add(this.Yai);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(4)?.OnStateChange.Remove(this.Yai);
  }
  get Data() {
    return this.sOn;
  }
  Refresh(t, i, e) {
    this.CNe ||= ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.sOn = t;
    this.Shm();
    this.GetText(3).SetUIActive(false);
    this.GetText(8).SetUIActive(false);
  }
  Shm() {
    var t;
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.sOn.GetNameKey());
    var e = this.GetText(2);
    let s = "";
    if (this.sOn.TaskType === 1) {
      t = this.GetExtendToggle(4).GetToggleState() === 1 ? RICHTXT_SELECTED : RICHTXT_DESELECTED;
      s = StringUtils_1.StringUtils.Format(t, i);
      e?.SetRichText(true);
    } else {
      t = this.sOn.Config;
      s = t.TaskType !== 1 ? (e?.SetRichText(false), i) : (e?.SetRichText(true), t = this.GetExtendToggle(4).GetToggleState() === 1 ? RICHTXT_SELECTED : RICHTXT_DESELECTED, StringUtils_1.StringUtils.Format(t, i));
    }
    e?.SetText(s);
    this.GetItem(9).SetUIActive(this.sOn.IsFinished());
  }
  BindOnClickTask(t) {
    this.Z6c = t;
  }
  Clear() {}
  OnSelected() {
    this.GetExtendToggle(4).SetToggleState(1, false);
    this.Shm();
  }
  OnDeselected() {
    this.GetExtendToggle(4).SetToggleState(0, false);
    this.Shm();
  }
  GetKey(t, i) {
    return this.GridIndex;
  }
}
exports.HonamiStoryQuestItemChildItem = HonamiStoryQuestItemChildItem;
//# sourceMappingURL=HonamiStoryQuestItemChildItem.js.map