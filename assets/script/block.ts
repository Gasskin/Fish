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
            cc.log("start");
            this.default_pos = this.node.getPosition();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event)
        {
            cc.log("move");
            let move_dis: cc.Vec2 = event.getDelta();
            this.default_pos = cc.v2(this.default_pos.x + move_dis.x, this.default_pos.y + move_dis.y);
            this.node.setPosition(this.default_pos);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event)
        {
            cc.log("end");
        }, this);
    }

    // update (dt) {}
}
