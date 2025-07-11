"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInitHit = exports.PLAYER_GROUP_NUMBER = exports.ENEMY_NUMBER = exports.TEAM_NUMBER = exports.FRIEND_NUMBER = exports.SELF_NUMBER = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletActionBase_1 = require("./BulletActionBase");
exports.SELF_NUMBER = 1;
exports.FRIEND_NUMBER = 2;
exports.TEAM_NUMBER = 3;
exports.ENEMY_NUMBER = 4;
exports.PLAYER_GROUP_NUMBER = 11;
const campNumbers = [exports.SELF_NUMBER, exports.FRIEND_NUMBER, exports.ENEMY_NUMBER, exports.TEAM_NUMBER, exports.PLAYER_GROUP_NUMBER];
const collisionChannelToObjectTypeQueryMap = new Map([[QueryTypeDefine_1.KuroCollisionChannel.Pawn, QueryTypeDefine_1.KuroObjectTypeQuery.Pawn], [QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer], [QueryTypeDefine_1.KuroCollisionChannel.PawnMonster, QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster]]);
class BulletActionInitHit extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e;
    var t = this.BulletInfo.BulletDataMain;
    this.BulletInfo.CountByParent = t.Base.ShareCounter;
    if (this.BulletInfo.CountByParent) {
      if (e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(this.BulletInfo.ParentEntityId)) {
        if (e = e.GetBulletInfo()) {
          (this.BulletInfo.ParentBulletInfo = e).NeedNotifyChildrenWhenDestroy = true;
          e.ChildEntityIds ||= [];
          e.ChildEntityIds.push(this.BulletInfo.BulletEntityId);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "子弹勾选了共享父子弹次数，但是生成时没有父子弹", ["BulletEntityId", this.BulletInfo.BulletEntityId], ["BulletRowName", this.BulletInfo.BulletRowName]);
      }
    }
    if (t.Base.DaHitTypePreset) {
      this.BulletInfo.BulletCamp = t.Base.BulletCamp;
    } else {
      this.BulletInfo.BulletCamp = campNumbers[t.Base.HitType];
    }
    this.Y5o();
  }
  Y5o() {
    var e;
    var t;
    var r = this.J5o();
    if (r !== QueryTypeDefine_1.KuroCollisionChannel.Pawn && (e = this.BulletInfo.CollisionInfo, this.BulletInfo.BulletCamp & exports.ENEMY_NUMBER || (t = QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer + QueryTypeDefine_1.KuroCollisionChannel.PawnMonster - r, e.IgnoreChannels.add(t), e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(t))), this.BulletInfo.BulletCamp & exports.TEAM_NUMBER || (e.IgnoreChannels.add(r), e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(r))), this.BulletInfo.BulletCamp === exports.SELF_NUMBER)) {
      t = QueryTypeDefine_1.KuroCollisionChannel.Pawn;
      e.IgnoreChannels.add(t);
      e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(t));
    }
  }
  J5o() {
    if (this.BulletInfo.AttackerCamp === 0) {
      return QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer;
    } else if (this.BulletInfo.AttackerCamp === 1) {
      return QueryTypeDefine_1.KuroCollisionChannel.PawnMonster;
    } else {
      return QueryTypeDefine_1.KuroCollisionChannel.Pawn;
    }
  }
}
exports.BulletActionInitHit = BulletActionInitHit;
//# sourceMappingURL=BulletActionInitHit.js.map