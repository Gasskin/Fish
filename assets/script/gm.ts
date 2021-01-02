// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Prefab, tooltip: "木块预制体" })
    block: cc.Prefab = null;
    @property({ type: cc.Node, tooltip: "GamePanel" })
    game_panel: cc.Node = null;
    @property({ type: [cc.SpriteFrame], tooltip: "block的类型，共4种" })
    block_type: cc.SpriteFrame[] = Array<cc.SpriteFrame>();
    
    // LIFE-CYCLE CALLBACKS:

    onLoad()
    {
        
    }

    start() 
    {

    }

    /**
     * 按钮事件
     * @param event 系统事件
     * @param str 传参
     */
    btnAction(event: Event, str: String)
    {
        if (str == "1x2" || str == "1x3" || str == "2x1" || str == "3x1")
        {
            this.addItem(str);
        }
    }

    /**
     * 添加一个木块
     * @param str 木块类型
     */
    addItem(str: String)
    {
        let block: cc.Node = cc.instantiate(this.block);
        switch (str)
        {
            case "1x2":
                cc.log("1x2");
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[0];
                block.setParent(this.game_panel);
                break;
            case "1x3":
                cc.log("1x3");
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[1];
                block.setParent(this.game_panel);
                break;
            case "2x1":
                cc.log("2x1");
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[2];
                block.setParent(this.game_panel);
                break;
            case "3x1":
                cc.log("3x1");
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[3];
                block.setParent(this.game_panel);
                break
            default:
                break;
        }
    }

    // update (dt) {}
}
