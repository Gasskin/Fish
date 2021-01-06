
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Node, tooltip: "Next节点" })
    next_btn: cc.Node = null;

    //内置属性
    next_btn_pos: cc.Vec2 = null;

    onLoad()
    {
        this.next_btn_pos = this.next_btn.getPosition();
        cc.tween(this.next_btn)
            .repeatForever(cc.tween()
                .to(1, { position: cc.v3(this.next_btn_pos.x, this.next_btn_pos.y + 7, 0) }, { easing: "smooth" })
                .to(1, { position: cc.v3(this.next_btn_pos.x, this.next_btn_pos.y - 7, 0) }, { easing: "smooth" })    
            )
            .start();
    }

    start() 
    {

    }

    // update (dt) {}
}
