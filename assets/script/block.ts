const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    //内部属性
    default_pos: cc.Vec2 = null;

    onLoad()
    {
        this.bindTouchFunc();
    }

    start() 
    {

    }

    /**
     * 注册木块的触摸事件
     */
    bindTouchFunc()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event)
        {
            //cc.log("start");
            this.default_pos = this.node.getPosition();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event)
        {
            //cc.log("move");
            let move_dis: cc.Vec2 = event.getDelta();
            this.default_pos = cc.v2(this.default_pos.x + move_dis.x, this.default_pos.y + move_dis.y);
            this.node.setPosition(this.default_pos);

        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event)
        {
            //cc.log("end");
            let final_index: cc.Vec2 = this.getItemIndex(this.default_pos.x, this.default_pos.y);
            let final_pos: cc.Vec2 = this.getItemPos(final_index.x, final_index.y);
            this.node.setPosition(final_pos.x-54,final_pos.y-54);
        }, this);
    }

    /**
     * 输入数组坐标，获得对应屏幕坐标，左下角是(0,0)，右上角是(5,5)，行列都是从左下角开始算起
     * @param x 行
     * @param y 列
     */
    getItemPos(x: number, y: number): cc.Vec2
    {
        return cc.v2(-338 + (x + 1) * 4 + x * 108 + 54, -338 + (y + 1) * 4 + y * 108 + 54);
    }

    getItemIndex(posX: number, posY: number):cc.Vec2
    {
        let x: number = -1;
        let y: number = -1;
        //cc.log("pos:" + posX + "," + posY);
        for (let i: number = 0; i <= 6; i++)
        {
            if ((-280 + 112 * i) >= posX && x == -1)
            {
                x = Math.min(i, 5);
            }
            if ((-280 + 112 * i) >= posY && y == -1)
            {
                y = Math.min(i, 5);
            }
        }
        //cc.log("index:" + x + "," + y);
        return cc.v2(x,y);
    }

    // update (dt) {}
}
