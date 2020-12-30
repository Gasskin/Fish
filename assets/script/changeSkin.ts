// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property({ type:cc.Sprite,displayName:"当前背景Sprite" })
    bg_sprite: cc.Sprite = null;
    
    @property({ type:[cc.SpriteFrame],displayName:"所有的背景资源"})
    bg_res: cc.SpriteFrame[] = Array<cc.SpriteFrame>();

    onLoad()
    {
        cc.log("onLoad");
        this.bg_sprite.spriteFrame = this.bg_res[3];
    }

    start() 
    {
        cc.log("start");
    }
    // update (dt) {}
}
