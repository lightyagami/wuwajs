"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestTreeChapterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.sZr = false;
    this.Hea = undefined;
    this.swd = () => {
      this.GetExtendToggle(3).SetToggleState(0);
      if (this.Pe.IsUnlock) {
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenChapterView(this.Pe.Id);
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.SetShouldLocateToDefaultNode(false);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("QuestTree_ChapterIsLocked");
      }
    };
    this.t3d = (e, t) => {
      var i;
      if (e === this.Pe && (i = this.GetExtendToggle(3).GetRootComponent(), ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.LocatingHelper?.LocateToNode(i, t), e?.IsTracking && this.Hea.PlayLevelSequenceByName("Jumpy"), Info_1.Info.IsInGamepad())) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(i, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIText], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[3, this.swd]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.AddOnLocatingNode(this.t3d);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.RemoveOnLocatingNode(this.t3d);
  }
  async LoadOrRefresh(e, t) {
    this.Pe = e;
    if (!this.sZr) {
      await this.CreateThenShowByResourceIdAsync("UiItem_TaskTreeMain", t);
      this.sZr = true;
    }
    this.nOe();
    await this.zMd();
  }
  async zMd() {
    var e;
    var t;
    var i;
    var s;
    if (this.Pe) {
      e = this.GetTexture(0);
      t = this.GetTexture(4);
      i = this.GetTexture(8);
      s = [];
      if (this.Pe.Config.RegionImage) {
        s.push(this.SetTextureAsync(this.Pe.Config.RegionImage, e));
      }
      s.push(this.SetTextureAsync(this.Pe.Image, t), this.SetTextureAsync(this.Pe.Config.RomanNumberImage, i));
      await Promise.all(s);
    }
  }
  nOe() {
    var e;
    var t;
    if (this.Pe) {
      if (this.Pe.IsUnlock) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.Config.RegionName);
      } else {
        this.GetText(1).SetText("???");
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), this.Pe.IsUnlock ? this.Pe.Config.Name : "QuestTree_Hide");
      [e, t] = this.Pe.Progress;
      this.GetText(2).SetText(`<color=#ffffff>${e}</color>/${t}`);
      if (!this.Pe.IsUnlock) {
        this.GetText(2).SetText("<color=#ffffff>0</color>/??");
      }
      this.GetItem(10).SetUIActive(false);
      this.GetItem(12).SetUIActive(this.Pe.IsTracking);
      this.GetItem(11).SetUIActive(this.Pe.IsUnlock && !this.Pe.IsTracking);
      this.GetItem(9).SetUIActive(!this.Pe.IsUnlock);
      this.GetSprite(6).SetUIActive(this.Pe.IsUnlock);
      this.GetItem(5).SetUIActive(this.Pe.HasAvailableQuest);
    }
  }
}
exports.QuestTreeChapterItem = QuestTreeChapterItem;
//# sourceMappingURL=QuestTreeChapterItem.js.map