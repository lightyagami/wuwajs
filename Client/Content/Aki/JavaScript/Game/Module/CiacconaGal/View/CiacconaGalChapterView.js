"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChapterView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CiacconaGalDefine_1 = require("../CiacconaGalDefine");
const CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig");
const CiacconaGalChapterRestartPanel_1 = require("./CiacconaGalChapterRestartPanel");
const CiacconaGalChapterResultOrInitPanel_1 = require("./CiacconaGalChapterResultOrInitPanel");
const CiacconaGalTitleItem_1 = require("./CiacconaGalTitleItem");
class CiacconaGalChapterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vxc = undefined;
    this.Txc = undefined;
    this.bxc = undefined;
    this.Qyi = undefined;
    this.sVc = undefined;
    this.Hea = undefined;
    this.Lxc = () => {
      if (this.vxc.IsFinished) {
        this.Hea?.PlayLevelSequenceByName("Switch");
      } else {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenGalViewByChapterId(this.vxc.Id, "CiacconaGalChapterView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.vxc = this.OpenParam;
    this.SetTextureByPath(this.vxc.ImageLargePath, this.GetTexture(2));
    this.Txc = new CiacconaGalChapterResultOrInitPanel_1.CiacconaGalChapterResultOrInitPanel(this.vxc, this.Lxc);
    this.bxc = new CiacconaGalChapterRestartPanel_1.CiacconaGalChapterRestartPanel(this.vxc);
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.sVc = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(ModelManager_1.ModelManager.CiacconaGalModel.ActivityData);
    var e = [];
    e.push(this.Txc.CreateByActorAsync(this.GetItem(3).GetOwner()));
    e.push(this.bxc.CreateByActorAsync(this.GetItem(4).GetOwner()));
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
    await this.sVc.CreateThenShowByResourceIdAsync("PnlTimeInfo", this.Qyi.GetToggleRootItem());
    this.Txc.SetActive(true);
    this.bxc.SetActive(false);
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_RESTART_TITLE);
    this.Qyi.SetTitleByTextIdAndArgNew(e);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
}
exports.CiacconaGalChapterView = CiacconaGalChapterView;
//# sourceMappingURL=CiacconaGalChapterView.js.map