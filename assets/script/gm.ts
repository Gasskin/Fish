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
    @property({ type: cc.JsonAsset, tooltip: "关卡数据" })
    level_json: cc.JsonAsset = null;

    //内部属性
    msg_map: Map<cc.Vec2, String> = new Map();
    
    
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
            this.addItem(cc.v2(0,0),str);
        }
        else if (str == "log")
        {
            this.logArrMsg();
        }
        else if (str == "clear")
        {
            this.clearPanel();
        }
    }

    /**
     * 添加一个木块
     * @param index 目标的数组坐标
     * @param str 木块类型
     */
    addItem(index:cc.Vec2,str: String)
    {
        //cc.log("addItem");
        let block: cc.Node = cc.instantiate(this.block);
        block.setParent(this.game_panel);
        let pos: cc.Vec2 = block.getComponent("block").getItemPos(index.x, index.y);
        block.setPosition(pos.x-54,pos.y-54);
        switch (str)
        {
            case "1x2":
                //cc.log("1x2");
                block.width = 108;
                block.height = 220;
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[0];
                block.getComponent("block").init(str);
                break;
            case "1x3":
                //cc.log("1x3");
                block.width = 108;
                block.height = 332;
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[1];
                block.getComponent("block").init(str);
                break;
            case "2x1":
                //cc.log("2x1");
                block.width = 220;
                block.height = 108;
                block.getComponent("block").init(str);
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[2];
                break;
            case "3x1":
                //cc.log("3x1");
                block.width = 332;
                block.height = 108;
                block.getComponent("block").init(str);
                block.getComponent(cc.Sprite).spriteFrame = this.block_type[3];
                break
            default:
                break;
        }
    }

    /**
     * 打印编辑好的关卡信息，json数据
     */
    logArrMsg()
    {
        //cc.log("log");
        let children: cc.Node[] = this.game_panel.getComponentsInChildren("block");

        let str: string = "";
        str += "{\n";
        str += "\"level\":"+ (this.level_json.json.length+1) +",\n";
        str += "\"length\":" + children.length + ",\n";
        str += "\"data\":\n[\n";
        
        for (let i: number = 0; i < children.length; i++)
        {
            str += "{\n";
            str += "\"posX\":"  + children[i].cur_index.x + ",\n";
            str += "\"posY\":"  + children[i].cur_index.y + ",\n";
            str += "\"type\":"  + children[i].block_type + "\n"
            str += "}";
            if (i != children.length - 1)
            {
                str += ",\n";
            }
            else
            {
                str += "\n";
            }
        }
        str += "]\n}";
        cc.log(str);

    }

    /**
     * 删除木块节点
     */
    clearPanel()
    {
        for (let child of this.game_panel.children)
        {
            // if (child.getComponent("block"))
            // {
            //     this.game_panel.removeChild(child);
            // }
            if (child.name == "block")
            {
                //cc.log(child);
                child.destroy();
            }
        }
    }

    // update (dt) {}
}
