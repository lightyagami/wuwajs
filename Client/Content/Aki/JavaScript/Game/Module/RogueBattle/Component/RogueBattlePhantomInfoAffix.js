"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattlePhantomInfoAffix = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleTokenElementWithCount_1 = require("./RogueBattleTokenElementWithCount");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RogueBattleUtils_1 = require("../RogueBattleUtils");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
class RogueBattlePhantomInfoAffix extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.ElementLayout = undefined;
    this.LevelSequencePlayer = undefined;
    this.UnlockState = false;
    this.jli = () => new RogueBattleTokenElementWithCount_1.RogueBattleTokenElementWithCount();
    this.RefreshSelectGainData = () => {
      let i = true;
      var e = ModelManager_1.ModelManager.RogueBattleModel.SelectGainData;
      if (e) {
        const n = new Map();
        this.Data?.ZVc.forEach(e => {
          n.set(e.o5c, e.m9n);
        });
        const r = new Map();
        e.lIc.ZVc.forEach(e => {
          var t = ModelManager_1.ModelManager.RogueBattleModel.GetElementInfoById(e.o5c)?.Count ?? 0;
          r.set(e.o5c, e.m9n + t);
        });
        n.forEach((e, t) => {
          if (r.get(t) === undefined || r.get(t) < e) {
            i = false;
          }
        });
        var e = i && !this.Data?.t5c;
        this.GetItem(2).SetUIActive(e);
        var t = this.GetText(3);
        t?.SetChangeColor(e, t.changeColor);
        if (e) {
          this.LevelSequencePlayer?.PlayLevelSequenceByName("Complete");
          this.UnlockState = true;
        } else if (this.UnlockState) {
          this.LevelSequencePlayer?.PlayLevelSequenceByName("Disappear");
          this.UnlockState = false;
        }
      } else if (this.UnlockState) {
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Disappear");
        this.UnlockState = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ElementLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.jli);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    return Promise.resolve();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueBattleSelectOptionPreview, this.RefreshSelectGainData);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueBattleSelectOptionPreview, this.RefreshSelectGainData);
  }
  Refresh(e, t, i) {
    this.Data = e;
    var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResAffix(e.v9n);
    if (n !== undefined) {
      if (ModelManager_1.ModelManager.RogueBattleModel.DescMode === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), n.AffixDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), n.AffixDesc, ...n.AffixDescParam);
      }
      const r = RogueBattleUtils_1.RogueBattleUtils.ConvertElementUnitsToElementInfo(e.ZVc);
      n = new UiAsyncTask_1.UiAsyncTask("RogueBattlePhantomInfoAffix.Refresh", async () => {
        await this.ElementLayout?.RefreshByDataAsync(r);
      });
      this.RunAsyncTask(n);
    }
  }
}
exports.RogueBattlePhantomInfoAffix = RogueBattlePhantomInfoAffix;
//# sourceMappingURL=RogueBattlePhantomInfoAffix.js.map