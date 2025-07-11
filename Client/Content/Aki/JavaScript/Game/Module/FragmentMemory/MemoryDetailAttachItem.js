"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryDetailAttachItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const AutoAttachItem_1 = require("../AutoAttach/AutoAttachItem");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class MemoryDetailAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.NHe = 0;
    this.SPe = undefined;
    this.Ypt = false;
    this.l4e = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFragmentTopicClick, this.NHe);
    }]];
  }
  AOn() {
    if (this.SPe === undefined) {
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    }
  }
  OnRefreshItem(e) {
    var t;
    this.AOn();
    this.Ovt();
    if ((this.NHe = e) === -1) {
      this.$8i = undefined;
    } else {
      t = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(e);
      this.$8i = t;
    }
    this.e6e();
    this.Iwn();
    this.Wbe();
    this.u7e();
    this.K8e(e);
  }
  K8e(e) {
    if (e === -1) {
      this.GetItem(6)?.SetUIActive(false);
    } else {
      this.l4e = "FragmentMemoryTopic";
      if (this.l4e) {
        RedDotController_1.RedDotController.BindRedDot(this.l4e, this.GetItem(6), undefined, e);
      }
    }
  }
  Ovt() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(6), this.$8i?.Id);
      this.l4e = undefined;
    }
  }
  u7e() {
    if (this.NHe === -1) {
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTexturePath(), this.GetSprite(0), false);
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTextureLightPath(), this.GetSprite(1), false);
    } else {
      this.SetSpriteByPath(this.$8i.BgResource, this.GetSprite(0), false);
      this.SetSpriteByPath(this.$8i.BgResourceLight, this.GetSprite(1), false);
    }
  }
  Wbe() {
    if (this.NHe === -1 || this.$8i === undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FragmentMemoryNotOpen");
    } else {
      this.GetText(2)?.ShowTextNew(this.$8i.Title);
    }
  }
  Iwn() {
    if (this.NHe === -1 || this.$8i === undefined) {
      this.GetText(3)?.SetText("");
    } else {
      var t = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(this.$8i.Id);
      let e = 0;
      for (const s of t) {
        var i = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(s.Id);
        if (i && i.GetIfUnlock()) {
          e++;
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "FragmentMemoryCollectProgress", e.toString(), t.length.toString());
    }
  }
  e6e() {
    if (this.$8i === undefined) {
      this.GetItem(4)?.SetUIActive(false);
    } else {
      var t = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(this.$8i.Id);
      let e = false;
      if (t && t.GetAllCollectState()) {
        e = true;
      }
      this.GetItem(4)?.SetUIActive(e);
    }
  }
  OnSelect() {
    this.GetExtendToggle(5)?.SetToggleState(1);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely("Select");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFragmentTopicSelect, this.NHe);
    this.Ypt = true;
  }
  OnUnSelect() {
    if (this.Ypt) {
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlaySequencePurely("Unselect");
    }
    this.GetExtendToggle(5)?.SetToggleState(0);
    this.Ypt = false;
  }
  OnBeforeDestroyImplement() {
    this.Ovt();
  }
  OnMoveItem() {}
}
exports.MemoryDetailAttachItem = MemoryDetailAttachItem;
//# sourceMappingURL=MemoryDetailAttachItem.js.map