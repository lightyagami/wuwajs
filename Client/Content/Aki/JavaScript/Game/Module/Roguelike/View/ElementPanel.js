"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementPanel = undefined;
const UE = require("ue");
const BuffById_1 = require("../../../../Core/Define/ConfigQuery/BuffById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const ElementItem_1 = require("./ElementItem");
class TipPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  UpdateNum(i) {
    this.GetText(1).SetText(i.toString());
    if (i === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Roguelike_Yuansu_Empty");
    } else {
      var t = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetElementLevelConfigById(4);
      if (t) {
        let e = 0;
        for (const n of t.AddBuffs) {
          var s = BuffById_1.configBuffById.GetConfig(n);
          if (s) {
            e += s.ModifierMagnitude[0] * i / 100;
          }
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TextId, e);
      } else {
        this.GetText(2).SetText("");
      }
    }
  }
}
class ElementPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eho = undefined;
    this.Mli = undefined;
    this.jli = () => {
      return new ElementItem_1.ElementItem();
    };
    this.tho = e => {
      switch (e) {
        case 1:
          this.GetExtendToggle(0).SetToggleState(1);
          this.GetItem(4).SetUIActive(true);
          break;
        case 0:
          this.GetExtendToggle(0).SetToggleState(0);
          this.GetItem(4).SetUIActive(false);
      }
    };
    this.iho = e => {
      switch (e) {
        case 1:
          this.GetExtendToggle(5).SetToggleState(1);
          this.GetItem(4).SetUIActive(true);
          break;
        case 0:
          this.GetExtendToggle(5).SetToggleState(0);
          this.GetItem(4).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle]];
    this.BtnBindInfo = [[5, this.tho], [0, this.iho]];
  }
  async OnBeforeStartAsync() {
    this.eho = new TipPanel();
    await this.eho.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.jli);
    this.GetExtendToggle(5).SetToggleState(0, true);
    this.GetItem(4).SetUIActive(false);
  }
  Refresh(e = undefined) {
    var i = new Array();
    var [, t] = ModelManager_1.ModelManager.RoguelikeModel.GetSortElementInfoArrayMap(e?.ElementDict);
    for (const n of RoguelikeDefine_1.sortElementArray) {
      let e = t.get(n);
      e = e || new RoguelikeDefine_1.ElementInfo(n, 0);
      i.push(e);
    }
    this.Mli.RefreshByData(i);
    let s = 0;
    i.forEach(e => {
      if (e.ElementId !== 7) {
        s += e.Count;
      }
    });
    if (e === undefined || e.ElementDict.size <= 0) {
      this.GetText(1).SetText(s.toString());
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), RoguelikeDefine_1.ROGUELIKEVIEW_17_TEXT, s.toString());
    }
    this.eho.UpdateNum(s);
  }
}
exports.ElementPanel = ElementPanel;
//# sourceMappingURL=ElementPanel.js.map