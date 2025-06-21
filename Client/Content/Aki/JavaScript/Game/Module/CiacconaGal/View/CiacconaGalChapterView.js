"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalChapterView = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig"),
  CiacconaGalChapterRestartPanel_1 = require("./CiacconaGalChapterRestartPanel"),
  CiacconaGalChapterResultOrInitPanel_1 = require("./CiacconaGalChapterResultOrInitPanel"),
  CiacconaGalTitleItem_1 = require("./CiacconaGalTitleItem");
class CiacconaGalChapterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.vxc = void 0, this.Txc = void 0, this.bxc = void 0, this.Qyi = void 0, this.sVc = void 0, this.Hea = void 0, this.Lxc = () => {
      this.vxc.IsFinished ? this.Hea?.PlayLevelSequenceByName("Switch") : ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenGalViewByChapterId(this.vxc.Id, "CiacconaGalChapterView")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.vxc = this.OpenParam, this.SetTextureByPath(this.vxc.ImageLargePath, this.GetTexture(2)), this.Txc = new CiacconaGalChapterResultOrInitPanel_1.CiacconaGalChapterResultOrInitPanel(this.vxc, this.Lxc), this.bxc = new CiacconaGalChapterRestartPanel_1.CiacconaGalChapterRestartPanel(this.vxc), this.Qyi = new PopupCaptionItem_1.PopupCaptionItem, this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData);
    var e = [],
      e = (e.push(this.Txc.CreateByActorAsync(this.GetItem(3).GetOwner())), e.push(this.bxc.CreateByActorAsync(this.GetItem(4).GetOwner())), e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())), await Promise.all(e), await this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.Qyi.GetToggleRootItem()), this.Txc.SetActive(!0), this.bxc.SetActive(!1), this.Qyi.SetCloseCallBack(() => {
        this.CloseMe()
      }), CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_RESTART_TITLE));
    this.Qyi.SetTitleByTextIdAndArgNew(e), this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
}
exports.CiacconaGalChapterView = CiacconaGalChapterView;
//# sourceMappingURL=CiacconaGalChapterView.js.map